import './App.scss'
import { Routes, Route, useLocation } from 'react-router-dom'
import PrivateRoutes from './utils/PrivateRoutes'
import Subscription from './utils/Subscription'
import NonSubscription from './utils/NonSubscription'
import HaveProfile from './utils/HaveProfile'
import Navbar from './components/Navbar/Navbar'
import Login from './Pages/Auth/Login/Login'
import Signup from './Pages/Auth/Signup/Signup'
import Profile from './Pages/Profile/Profile'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashBoard from './Pages/DashBoard/DashBoard'
import MakeProfile from './Pages/MakeProfile/MakeProfile'
import Plans from './Pages/Plans/Plans'
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton'
import EditProfile from './Pages/EditProfile/EditProfile'
import OrderHistory from './Pages/DashBoard/OrderHistory'
import ForgotPassword from './Pages/Auth/ForgotPassword/ForgotPassword'
import NewHome from './Pages/Home/NewHome'

function App() {
 
  return (
    <>
    <ToastContainer />
    <Navbar />
    <WhatsAppButton />



    <div className='mt-[67px] lg:mt-[60.8px] '>
      <Routes>
  
        <Route path="/" element={<NewHome />} />
        <Route path="/plans" element={<Plans />} />

        <Route element={<PrivateRoutes />} >

          <Route element={<HaveProfile />} >
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/orderhistory" element={<OrderHistory />} />
          </Route>

          {/* <Route element={<NonSubscription />} > */}
            <Route path="/createprofile" element={<MakeProfile />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/editprofile/:userId" element={<EditProfile />} />
          {/* </Route>   */}
          
          {/* <Route element={<Subscription />} >
            <Route path="/dashboard" element={<DashBoard />} />
          </Route> */}

        </Route>
              


        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes> 
      </div>

    </>
  )
}


export default App
