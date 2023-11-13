
import { 
  Heading
 } from "@chakra-ui/react";
// import { jwtDecode }  from 'jwt-decode'
import { useState, useEffect  } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setTokens } from "../redux/userSlice";

const Dashboard = () => {
 
  const dispatch = useDispatch()
  const navigate = useNavigate();


  useEffect(() => {
    refreshTokenRequest()
    // getUsers()
  }, [dispatch])

  const refreshTokenRequest = async(token) => {
    
    try {
       const response = await axios.get('http://localhost:2000/token', {
        headers: {
           Authorization: `Bearer ${token}`
        }
       });
       console.log(response)
        
    } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate('/');
        } else {
          console.log('Error refreshToken: ', error)
        }
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
  
  const user = useSelector((state) => state.user.value)
  return (  
   <Heading textAlign={"center"} mt={"30"}>Welcome:{user.userName}</Heading>
  );
}
 
export default Dashboard;