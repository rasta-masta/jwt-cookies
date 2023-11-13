import { Box, Heading, Button } from '@chakra-ui/react';
import { useEffect } from 'react';
import LoginUser from './components/login';
import { Routes, Route } from 'react-router-dom';
import Register from './components/register';
import Dashboard from './pages/dashboard';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Navbar from './components/navbar';

function App() {
  const dispatch = useDispatch()
  const token = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  
  const keepLogin = async (data) => {
    try {
      const response = await axios.get('http://localhost:2000/users/keeplogin', {
        headers : {
          Authorization : `Bearer ${accessToken}`
        }
      })
      console.log(response.data);
      console.log('hey: ', dispatch(setData(response.data.result)))
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=> {
    keepLogin()
  }, [dispatch])
  
  return (
   <>
    <Navbar/>

    <Routes>
      <Route path='/' element={<LoginUser />} />
      <Route path='/register' element={<Register />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
   </>
  )
}

export default App
