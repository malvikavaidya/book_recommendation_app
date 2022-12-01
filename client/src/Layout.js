import { useState } from 'react'
import {
  useColorMode,
  Switch,
  Flex,
  Button,
  IconButton,
  Text,
  Box,
  Input
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { Link } from '@chakra-ui/react'
import logo from './images/logo.png'


function Layout() {
  return ( 
    <div>
   
 <Flex position="fixed" w='100%' top="1rem" right="1rem" justifyContent='right' bg='white' opacity= '0.68'>
    <Box flexGrow={1} justifyContent="left" pl={20}  margin-left= '30px'>
        <Text aria-label="malvika's book reviews" my={5}  fontSize='3xl' >
            book recommendation system
        </Text>
    </Box>  
    
  </Flex >

   <Flex justifyContent= 'left' marginTop='210px' marginLeft = '20px'>
    <Input variant='filled' value=""  placeholder='text input box' width='30%' length= '50%'/>
    </Flex>

    <Flex justifyContent= 'left' marginTop='30px' marginLeft = '20px'>
    <Input value="" variant='filled' placeholder='title input box' width='30%' length= '50%'/>
    </Flex>
  
      {/* <Button variant="ghost" aria-label="home" my={5} onClick={(e) => {
      e.preventDefault();
      window.location.href='/';
      }}>
        home
      </Button>
      <Button variant="ghost" aria-label="about" my={5} onClick={(e) => {
      e.preventDefault();
      window.location.href='/about';
      }}>
        about
      </Button>
      <Button variant="ghost" aria-label="books" my={5} onClick={(e) => {
      e.preventDefault();
      window.location.href='/books';
      }}>
        books
      </Button> */}
 
  </div>
  )
}

export default Layout