
import { 
  Flex,
  Text,
  Avatar,
  MenuList,
  MenuItem,
  MenuButton,
  Menu,
  Button
 } from "@chakra-ui/react";
import { jwtDecode }  from 'jwt-decode'
import { useEffect, useState  } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { refreshToken } from "../../../server/controllers/tokenController";

const Dashboard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [name, setName] = useState([]);
  const[email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [users, setUsers] = useState([]);

  const handleLogout = async () => {
    try {
      await axios.delete('http://localhost:2000/users/logout')
      navigate('/')
    } catch (error) {
      console.log(err)
    }
  }
  
  useEffect(() => {
    refreshTokenRequest()
    getUsers()
  }, [dispatch])

  const refreshTokenRequest = async(token) => {
    try {
       const response = await axios.get('http://localhost:2000/token')
        setToken(response.data.accessToken)
        const decoded = jwtDecode(response.data.accessToken)
        console.log("decoded: ", decoded)
        setName(decoded.name)
        setEmail(decoded.email)
        } catch (error) {
          console.log(error)
        }       
      }

    const axiosJWT = axios.create();
    axiosJWT.interceptors.request.use(async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
          const response = await axios.get('http://localhost:2000/token', {
          headers :{
            Authorization : `Bearer ${response.data.refreshToken}`
          }
         })      
      }
      return config;
  }, (error) => {
    return Promise.reject(error);
  }, []);

  const getUsers = async() => {
    const response = await axios.get('http://localhost:2000/users', {
        headers : {
        Authorization: `Bearer ${token}`
        }  
      })
      console.log(response.data)
      setUsers(response.data)
    }
  
  const user = useSelector((state) => state.user.value)
  return (  
  <Flex 
    justifyItems={"center"}
    alignContent={"center"}
    justifyContent={"space-between"}
    p={"100px"}
    maxW={"1000px"} 
    mx={"auto"}
  >

  <Flex 
    p={"80px"} 
    alignItems={"center"} 
    gap={"10px"} 
    flexDir={'column'}>
   <Menu>
    <Avatar 
    size={"xl"}
    as={MenuButton}
    name = {`${name}`}
    cursor={"pointer"}
    />
    <MenuList>
      <MenuItem><Link to='/'>Back to home</Link></MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </MenuList>
    </Menu>
    <Text fontWeight={600}>{email}</Text> 
    <Button onClick={getUsers} colorScheme="facebook">Sedang Online</Button>
   </Flex>
    
    <Flex flexDir={"column"} gap={"25px"}>
    {users.map((user, index) => (
      <Flex flexDir={"column"} key={"user.id"}>
        <Avatar
        size={"md"}
        name={user.userName}
        />
        <Text>{user.userName}</Text>     
      </Flex>
    ))}
    </Flex>  
    </Flex>   
   
  )
}
 
export default Dashboard