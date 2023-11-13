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
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { login, setTokens } from "../redux/userSlice";

const LoginUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async(data) => {
    
    try {
       const response = await axios.post('http://localhost:2000/users/login', {
          userName : data.userName,
          password : data.password
       }) 
        console.log(response.data)
        if(response.status === 200) {
            dispatch(login(response.data));
            dispatch(setTokens(response.data));
            toast({
            title: "Success",
            description: "LOGIN SUCCESFULLY..!!",
            status: "success",
            duration:"5000",
            position:"right",
            isClosable: true, 
          })
          console.log('navigating...')
          navigate("/dashboard")
        }else {
          alert('LOGIN FAILED, PLEASE CHECK YOUR CREDENTIALS..!!')
        } 
        //   'Content-Type': 'application/json',
        //   'origin':'http://localhost:5173',
        //   'credential' : true
        // });
        
        } catch (error) {
          console.log(error)
            alert('AN ERROR OCCURED DURING LOGIN..!!')
        }
    }

  const LoginSchema = Yup.object().shape({
    userName: Yup.string()
      .required("*Name is required")
      .min(2, "Minimum 2 charcter"),
    password: Yup.string()
      .matches(/^(?=.*[A-Z])/, "*Password must start with a capital letter")
      .min(6, "*Password must be in 6 characters at minimum")
      .required("*Password is required")
  })

  return (   
    <VStack>
      <Flex 
       maxW={"400px"} 
      mx={"auto"}
      my={"20vh"} 
      justifyContent={"center"}
      alignItems={"center"}
      borderRadius={"10px"}
      p={"15px"}
      boxShadow={"1px 1px 5px rgba(0, 0, 0, 0.5)"}
      >
     
     
      <Formik
        initialValues={{
          userName: "",
          password: "",
        }}
        validationSchema= {LoginSchema}
        onSubmit={(values, action)=> {
          console.log(values)
          handleSubmit(values)
        }}
      >
      {(formitProps) => {
        // console.log(formitProps)
    
        return(
        
          <Form>

            <Heading><Text textAlign={"center"} mb={"10px"}>Login</Text></Heading>
            <FormControl>
              <FormLabel>User Name</FormLabel>
              <Input as={Field} type='text' name='userName'/>
              <ErrorMessage
                component='div'
                name="userName"
                style= {{ color: "red"}} 
              />
            </FormControl>

            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input as={Field} type='password' name='password' autoComplete="off"/>
              <ErrorMessage
                component='div'
                name="password"
                style= {{ color: "red"}} 
              />
            </FormControl>

            <Button type="submit" mt={"5px"} ml={"60px"}>SUBMIT</Button>
            <Flex>
            <Text>Don't have account?</Text>        
            <Link to="/register">Register</Link>
            </Flex>
          </Form>
        )
      }}   
      </Formik>
      </Flex>
    </VStack>
  );
}
 
export default LoginUser;