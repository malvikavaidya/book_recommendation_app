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

    const buttonClickTitle= () => {
        
        const headers = {
            'Content-Type': "application/json;charset=UTF-8",
        }
        axios.post("/stuff", {
            
        },{
            headers: headers
        })  
        .then((response) =>{
            console.log(response);
            setInputText("title button click works");
        })
        .catch((error)=>{
            console.log(error.response.data);
        })
    };

    const buttonClickInput= () => {
        
        const headers = {
            'Content-Type': "application/json;charset=UTF-8",
        }
        axios.post("/stuff", {
            
        },{
            headers: headers
        })  
        .then((response) =>{
            console.log(response);
            setInputText("");
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

     {/* <BookCard  
        /> */}
  <Stack justify='right' direction="row">
    <Grid templateColumns='repeat(3,1fr)' gap={100} marginTop='90px' justify="end" pr = "100px"> 
        
        <GridItem justifyContent='right'> 
        { <BookCard  
        />}
         </GridItem>

         <GridItem> 
        { <BookCard  
        />}
         </GridItem>

         <GridItem> 
        { <BookCard  
        />}
         </GridItem>
        
     </Grid>
     </Stack>
    
  </div>
  )
}

export default Layout