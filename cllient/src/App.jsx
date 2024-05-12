import './App.css'
import { Routes, Route } from 'react-router-dom'
import PrivateRoutes from './utils/PrivateRoutes'

import Home from './Pages/Home/Home'
import Navbar from './components/Navbar/Navbar'
import Login from './Pages/Auth/Login/Login'
import Signup from './Pages/Auth/Signup/Signup'
import Profile from './Pages/Profile/Profile'
import Job from './Pages/Job/Job'
import SearchJob from './Pages/SearchJob/SearchJob'
import MakeProfile from './Pages/MakeProfile/MakeProfile'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {


  return (
    <>
    <ToastContainer />
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      
      <Route element={<PrivateRoutes />} >
        <Route path="/searchJob" element={<SearchJob />} />
        <Route path="/yourProfile" element={<Profile />} />
        <Route path="/job/:id" element={<Job />} />
        <Route path="/makeProfile" element={<MakeProfile />} />
      </Route>
      
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes> 
    </>
  )
}


export default App
