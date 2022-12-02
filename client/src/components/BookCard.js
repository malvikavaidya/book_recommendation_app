import { Image } from '@chakra-ui/react'
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Input,
  useColorModeValue,
  Button,
  Flex,
  Grid,
  GridItem,
  Link,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons'

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,

} from '@chakra-ui/react'




const BookCard = (props) => {
    
    return ( 
        <Center py={6} >
        <Box
          maxW={'250px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow={'2xl'}
          rounded={'md'}
          p={6}
          overflow={'hidden'}>
          <Box
            h={'253px'}
            bg={'gray.100'}
            mt={-6}
            mx={-6}
            mb={6}
            pos={'relative'}>
            <Image
              src={props.photolink}
              layout={'fill'}
              h={'253px'}
              w={'280px'}
              pos={'relative'}
             
            />
          </Box>
          <Stack >
            <Text 
              color={'gray.400'}
              textTransform={'uppercase'}
              fontWeight={800}
              fontSize={'sm'}
              letterSpacing={1.1}>
              {props.author}
            </Text>
            <Heading
              color={useColorModeValue('gray.700', 'white')}
              fontSize={'2xl'}
              fontFamily={'body'}>
               {props.bookTitle} 
            </Heading>
           
            </Stack>
            <Stack  justifyContent = 'center' mt={1} direction={'row'} spacing={4} align={'right'}>  
            <Accordion  allowMultiple>
                <AccordionItem>
                  <AccordionButton>
                   <Box flex='1' textAlign='left'>
                        book summary
                  </Box>
                  <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4} fontSize={'xs'}>
                      {props.summary}
                </AccordionPanel>
              </AccordionItem>
              </Accordion>
          </Stack>
         
        
          </Box>
          </Center>

       
      
    )
  }
  
  export default BookCard