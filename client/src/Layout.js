import { useState } from 'react'
import {
  useColorMode,
  Switch,
  Flex,
  Button,
  IconButton,
  Text,
  Box,
  Input, Grid, GridItem
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { Link } from '@chakra-ui/react'
import logo from './images/logo.png'
import BookCard from './components/BookCard'


function Layout() {
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
    <Input variant='filled' value=""  placeholder='text input box' width='30%' length= '50%'/>
    </Flex>

    <Flex justifyContent= 'left' marginTop='20px' marginLeft = '20px'>
    <Input value="" variant='filled' placeholder='title input box' width='30%' length= '50%'/>
    </Flex>
  
    {/* <Grid templateColumns='repeat(3,1fr)' gap={4} marginTop='95px'> */}
        {/* <GridItem> */}
        {/* <BookCard key= "hey"
        title="hi"
        author="author ex"
        summary="gggg"
        rating="4"
        review="r"
        photolink="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.facebook.com%2Fauthorljshen%2F&psig=AOvVaw3RcsDVfE0WCpmFt5l3GYQk&ust=1669960957793000&source=images&cd=vfe&ved=0CA4QjRxqFwoTCMC_977f1_sCFQAAAAAdAAAAABAE"
        amazonlink="http.s"
        genre="fantasy" 
        /> */}
        {/* </GridItem> */}
    {/* </Grid> */}
    
  </div>
  )
}

export default Layout