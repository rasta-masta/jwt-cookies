import React, { useState } from 'react';
import {
  VStack,
  Heading,
  Text,
  Button,
  Input,
  FormControl,
  FormLabel,
  Flex,
  useToast
} from "@chakra-ui/react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:2000/users', {
        userName,  
        email,
        password
        }, {
          // 'Content-Type': 'application/json',
          // 'origin':'http://localhost:5173',
          // 'credential' : true
       });
        
      if (response.data.msg === 'REGISTERED..!!') {
          toast({
            title: "Success",
            description: "Your are Registered..!!",
            status: "success",
            duration:"5000",
            position:"top",
            isClosable: true, 
          })   
          navigate("/")  
       } else {
        setMsg(data.msg) 
       }

    } catch (error) {
      console.log(error)
        setMsg("Registration Failed");
      }
    }
  
  return (
    <VStack mt={"25vh"}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();      
        }}
      >
        <Heading>
          <Text>Register</Text>
        </Heading>
        <FormControl>
          <FormLabel>User Name</FormLabel>
          <Input
            type="text"
            name="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button type="submit">Register</Button>
      </form>
      <Flex>
        <Text>Already have an account?</Text>
        <Link to="/">login</Link>
      </Flex>
      {msg && <Text color="red">{msg}</Text>}
    </VStack>
  );
}

export default Register
