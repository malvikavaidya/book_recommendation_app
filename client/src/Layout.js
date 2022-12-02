import { useState } from 'react'
import {
  useColorMode,
  Switch,
  Flex,
  Button,
  IconButton,
  Text,
  Box,
  Input, Grid, GridItem, Stack
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { Link } from '@chakra-ui/react'
import logo from './images/logo.png'
import axios from 'axios';
import BookCard from './components/BookCard'


function Layout() {
    const  [inputText, setInputText] = useState("");
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const [bookTitle, setBookTitle] = useState("Book Rec #1");
    const [bookTitle2, setBookTitle2] = useState("Book Rec #2");
    const [bookTitle3, setBookTitle3] = useState("Book Rec #3");

    const [author, setAuthor] = useState("author #1");
    const [author2, setAuthor2] = useState("author #2");
    const [author3, setAuthor3] = useState("author #3");

    const [summary, setSummary] = useState("");
    const [summary2, setSummary2] = useState("");
    const [summary3, setSummary3] = useState("");

    const [image, setImage] = useState("");
    const [image2, setImage2] = useState("");
    const [image3, setImage3] = useState("");
    const buttonClickTitle= () => {
        
        const headers = {
            'Content-Type': "application/json;charset=UTF-8",
        }
        axios.post("/input_title", {
            user_input: title
        },{
            headers: headers
        })  
        .then((response) =>{
            console.log(response);
            console.log(response);
            setBookTitle(response.data.title1);
            setAuthor(response.data.author1);
            setSummary(response.data.summary1);
            setImage(response.data.image1);

            setBookTitle2(response.data.title2);
            setAuthor2(response.data.author2);
            setSummary2(response.data.summary2);
            setImage2(response.data.image2);

            setBookTitle3(response.data.title3);
            setAuthor3(response.data.author3);
            setSummary3(response.data.summary3);
            setImage3(response.data.image3); 
        })
        .catch((error)=>{
            console.log(error.response.data);
        })
    };

    const buttonClickInput= () => {
        
        const headers = {
            'Content-Type': "application/json;charset=UTF-8",
        }
        axios.post("/input_text", {
            user_input: inputText
        },{
            headers: headers
        })  
        .then((response) =>{
            console.log(response);
            setBookTitle(response.data.title1);
            setAuthor(response.data.author1);
            setSummary(response.data.summary1);
            setImage(response.data.image1);

            setBookTitle2(response.data.title2);
            setAuthor2(response.data.author2);
            setSummary2(response.data.summary2);
            setImage2(response.data.image2);

            setBookTitle3(response.data.title3);
            setAuthor3(response.data.author3);
            setSummary3(response.data.summary3);
            setImage3(response.data.image3);  
        })
        .catch((error)=>{
            console.log(error.response.data);
        })
    };
  return ( 
    <div>
   
 <Flex position="fixed" w='100%' top="1rem" right="1rem" justifyContent='right' bg='white' opacity= '0.68' padding-right = '10px'>
    <Box flexGrow={1} justifyContent="left" pl={20}  margin-left= '30px'>
        <Text aria-label="malvika's book reviews" my={5}  fontSize='3xl' >
            book recommendation system
        </Text>
    </Box>
    <Box  justifyContent="right" pr = {3} pt={3} >
        <img src={logo}  width = '60px' height= 'auto'/> 
    </Box>
    
  </Flex >

   <Flex justifyContent= 'left' marginTop='180px' marginLeft = '20px'>
        <Input variant='filled' value={inputText} placeholder='text input box' width='30%' length= '50%'
        onChangeCapture={(e)=>setInputText(e.target.value)} />
            <Button onClick={buttonClickInput} variant='outline' padding-left = '500px'>
                enter
            </Button> 
            
    </Flex>
   

    <Flex justifyContent= 'left' marginTop='20px' marginLeft = '20px'>
    <Input value={title} variant='filled' placeholder='title input box' width='30%' length= '50%'
    onChangeCapture={(e)=>setTitle(e.target.value)}/>
        <Button onClick={buttonClickTitle} variant='outline' padding-left = '500px'>
                enter
            </Button> 
    </Flex>

    
  <Stack justify='right' direction="row">
    <Grid templateColumns='repeat(3,1fr)' gap={100} marginTop='90px' justify="end" pr = "100px"> 
        
        <GridItem justifyContent='right'> 
        { <BookCard bookTitle={bookTitle} author = {author} photolink ={image}
        summary = {summary}/> }
        
         </GridItem>

         <GridItem> 
        { <BookCard bookTitle = {bookTitle2} author = {author2} photolink ={image2}
        summary = {summary2}/> } 
        
         </GridItem>

         <GridItem> 
        { <BookCard bookTitle = {bookTitle3} author = {author3} photolink ={image3}
        summary = {summary3}/> } 
       
         </GridItem>
        
     </Grid>
     </Stack>
    
  </div>
  )
}

export default Layout