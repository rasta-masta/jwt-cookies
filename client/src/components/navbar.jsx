import { 
  Box,
  Heading,
  Button
} from "@chakra-ui/react";


const Navbar= () =>  {
  return (
    <Box bg={'purple.500'}>
    <Heading>Welcome</Heading>
    <Button colorScheme='lightblue'>ADD</Button>
    </Box>   
  )
}

export default Navbar;


