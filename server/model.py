import nltk
from nltk.tokenize import word_tokenize
import contractions
import re
import string
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from sklearn.feature_extraction.text import TfidfVectorizer
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
from skmultilearn.problem_transform import BinaryRelevance
from sklearn.linear_model import LogisticRegression
import pickle
from itertools import islice
from googlesearch import search
from bs4 import BeautifulSoup
import requests
import time
from urllib.request import urlopen, Request
from selenium import webdriver
from nltk.corpus import stopwords
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import warnings

book_descriptions = []
book_genres = []
book_titles = []
book_authors = []

def get_lists():
    desription_file = open("datasets/book_descriptions2.txt",encoding='utf-8')
    list1_ = desription_file.readlines()
    list1 = []

    genre_file = open("datasets/book_genres2.txt",encoding='utf-8')
    list2 = genre_file.readlines()

    titles_file = open("datasets/book_titles2.txt",encoding='utf-8')
    list3 = titles_file.readlines()  

    authors_file = open("datasets/book_authors2.txt",encoding='utf-8')
    list4 = authors_file.readlines()  

    i = 0

    for e in list1_:
        e = e.strip()
        num = e.split(' ', 1)[0]
        if(e != ""):
            if(num == str(i) or e == "END"):
                list1.append(e)
                i+=1

    print(len(list1))
    print(len(list2))
    print(len(list3))
    print(len(list4))

    no = 0
    for i in range (len(list1)):
        description = list1[i].strip()
        genre = list2[i].strip()
        #empty description entry
        if(description == "END"):
            continue
        description = description = description.split(' ', 1)[1]
        #no description
        if(description == "No description"):
            continue
        
        genre_list = genre.split(' ', 1)
        #no genre tags
        if(len(genre_list) == 1):
            continue
        genre = genre_list[1]
        genre = genre.split(',')
        genre_text = "".join(g.strip().replace(" ", "_")+ " " for g in genre)
        
        book_descriptions.append(description)
        book_genres.append(genre_text)
        book_titles.append(list3[i])
        book_authors.append(list4[i])
        
def get_recommendations_title(user_title):
    book_title = ""
    book_author = ""
    book_summary = ""
    book_image = ""
    

def get_recommendations_text(user_input):
    warnings.filterwarnings('ignore')
    get_lists()
    processed_text = preprocessing_input_text(user_input)
    text_in_list = []
    text_in_list.append(processed_text)

    description_vectorizer = pickle.load(open('description_vectorizer.pkl', 'rb'))
    vectors = description_vectorizer.transform(text_in_list)
    feature_names = description_vectorizer.get_feature_names_out()
    dense = vectors.todense()
    denselist = dense.tolist()
    x_input = pd.DataFrame(denselist, columns=feature_names)
    
    classifier =  pickle.load(open('logreg_binary_relevance.pkl', 'rb'))
    predict_proba = classifier.predict_proba(x_input)
    t = 0.3
    # predict_new = (predict_proba >= t).astype(int)
    # predictions_j = predict_new[0].toarray()[0]
    
    genre_cosine_similarities = genre_cosine_similarity(predict_proba)
    cosine_similarities_books = text_cosine_similarity(description_vectorizer, genre_cosine_similarities, x_input, book_descriptions)
    
    top_3 = dict(islice(cosine_similarities_books.items(), 3))
    indices_books = list(top_3.keys())
    
    image_link = get_image_link(book_titles[indices_books[0]])
    image_link2 = get_image_link(book_titles[indices_books[1]])
    image_link3 = get_image_link(book_titles[indices_books[2]])
    
    return {"author1": book_authors[indices_books[0]].strip().lstrip('0123456789'), "title1": book_titles[indices_books[0]].strip().lstrip('0123456789'), "summary1": book_descriptions[indices_books[0]].strip(), "image1": image_link,
            "author2": book_authors[indices_books[1]].strip().lstrip('0123456789'), "title2": book_titles[indices_books[1]].strip().lstrip('0123456789'), "summary2": book_descriptions[indices_books[1]].strip(), "image2": image_link2,
            "author3": book_authors[indices_books[2]].strip().lstrip('0123456789'), "title3": book_titles[indices_books[2]].strip().lstrip('0123456789'), "summary3": book_descriptions[indices_books[2]].strip(), "image3": image_link3}
     
 
def get_image_link(book_title):
    query = book_title + " goodreads"
    for j in search(query, tld="co.in", num=1, stop=1, pause=2):
        input_link = j
    options = webdriver.ChromeOptions()
    options.add_argument('--ignore-certificate-errors')
    options.add_argument('--incognito')
    options.add_argument('--headless')
    driver = webdriver.Chrome("/usr/lib/chromium-browser/chromedriver", chrome_options=options)
    
    page_link = input_link
    driver.get(page_link)
    soup = BeautifulSoup(driver.page_source, 'html.parser')
    photo_link = soup.find(class_="ResponsiveImage")
    if photo_link != None:
        photo_link = photo_link.get('src')
    else:
        photo_link = soup.find(id="coverImage")
        if photo_link != None:
            photo_link = photo_link.get('src')
        else:
            photo_link = "None"
    print('this is the photo link: ', photo_link)
    return photo_link
 
def genre_cosine_similarity(predict_proba):
    genre_cosine_similarities = {}
    proba = np.array(predict_proba[0].toarray()[0]).reshape(1, -1)
    y_data_categories =  pickle.load(open('y_data[categories].pkl', 'rb'))
    ydata_2 = y_data_categories.to_numpy()
    genres0 = np.array(ydata_2[0]).reshape(1, -1)
    prediction = np.array(proba).reshape(1, -1)

    for i in range(len(ydata_2)):
        genre_i = np.array(ydata_2[i]).reshape(1, -1)
        sg = cosine_similarity(prediction, genre_i)
        genre_cosine_similarities[i] = sg[0][0]

    # print(cosine_similarities)
    genre_cosine_similarities = dict(sorted(genre_cosine_similarities.items(), key=lambda item: item[1], reverse=True))  
    return genre_cosine_similarities

def text_cosine_similarity(description_vectorizer, genre_cosine_similarities, x_input, book_descriptions):
    cosine_similarities_books = {}
    top_55 = dict(islice(genre_cosine_similarities.items(), 55))
    indices = list(top_55.keys())
    input_cosine_similarities = np.array(x_input).reshape(1, -1)
    cosine_similarities_books = {}

    # need input text and get description of top 20 books
    for i in range(55):
        idx = indices[i]
        book_text = book_descriptions[idx]
        
        book_text_list = []
        book_text_list.append(preprocessing_input_text(book_text))
        
        vectors = description_vectorizer.transform(book_text_list)
        feature_names = description_vectorizer.get_feature_names_out()
        dense = vectors.todense()
        denselist = dense.tolist()
        book_i = pd.DataFrame(denselist, columns=feature_names)
        book_i = np.array(book_i).reshape(1, -1)
        sg = cosine_similarity(input_cosine_similarities, book_i)
        cosine_similarities_books[idx] = sg[0][0]
   
    cosine_similarities_books = dict(sorted(cosine_similarities_books.items(), key=lambda item: item[1], reverse=True))
    return cosine_similarities_books

def get_model():
    pickle_model_chain = pickle.load(open("logreg_chain_classifier.pkl", "rb"))
    prediction_chain = pickle_model_chain.predict(x_test)
 
def stop_words_input(input_text):
    
    stop_words = set(stopwords.words('english'))

    filtered_sentence = []
    for w in input_text: 
        w = w.strip()
        if w not in stop_words and w != "s":
            filtered_sentence.append(w)
    return filtered_sentence
    
def clean_text(text):
    punct = '“’'
    # remove numbers
    text_nonum = re.sub(r'\d+', '', text)
    # remove punctuations and convert characters to lower case
    text_nopunct = ""
    for char in text_nonum:
        if char not in string.punctuation and char not in punct:
            text_nopunct += char.lower()
        else:    
            text_nopunct += " "
    # substitute multiple whitespace with single whitespace
    # Also, removes leading and trailing whitespaces
    text_no_doublespace = re.sub('\s+', ' ', text_nopunct).strip()
    return text_no_doublespace

def lemmatize_input(text_array):
    lemma = []
    lemmatizer = WordNetLemmatizer()
    for w in text_array:
        #this is so jank
        #ideally we would have to do POS tagging and then pass the actual tag to the function
        w = lemmatizer.lemmatize(w,  'v')
        w = lemmatizer.lemmatize(w,  'a')
        w = lemmatizer.lemmatize(w,  'r')
        w = lemmatizer.lemmatize(w,  's')
        lemma.append(lemmatizer.lemmatize(w,  'n'))
    return lemma

def array_to_string(input_array):
    words = set(nltk.corpus.words.words())

    book_descrip = ""
    for w in input_array:
        #english language !
        if(w in words):
            book_descrip += w + " "
    
    return book_descrip
    
def tokenize_input(input_text):
    input_text = contractions.fix(input_text)
    input_text = clean_text(input_text)
    tokens = word_tokenize(input_text)
    return tokens

def preprocessing_input_text(input_text):
    tokenized = tokenize_input(input_text)
    remove_stop_words = stop_words_input(tokenized)
    lemmatized = lemmatize_input(remove_stop_words)
    result_string = array_to_string(lemmatized)
    return result_string
