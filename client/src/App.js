import React, { useState, useEffect } from "react";
// import './App.css';
import Layout from './Layout.js';
import Home from './Home.js';
import axios from 'axios';
import { ChakraProvider } from '@chakra-ui/react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

function App() {

  const  [inputText, setInputText] = useState("");
  const [title, setTitle] = useState("");
 

  // useEffect(() => {
  //   // Using fetch to fetch the api from 
  //   // flask server it will be redirected to proxy
  //     fetch("/api/message").then((res) =>
  //         res.json().then((data) => {
  //           // Setting a data from api
  //             setInputText("Data from Flask Server: " + data.data);
  //       })
  //   );
  // }, []);

  return (
    // <ChakraProvider>
    // <BrowserRouter>
    <ChakraProvider>
      <BrowserRouter>
      <Layout/>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        
      </Routes>
      </BrowserRouter>
    </ChakraProvider>
    
    // {/* <Routes>
    //   <Route exact path="/" element={<Layout/>} />
      
    // </Routes> */}
  //   </BrowserRouter>
  // </ChakraProvider>
    // <div className="App">
    //   <header className="App-header">
    //     <img className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       {inputText}
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
