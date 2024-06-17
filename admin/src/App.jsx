import './App.css'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar/Navbar'
import Login from './Pages/Auth/Login/Login'
import Category from './Pages/Category/Category';
import PrivateRoutes from './utils/PrivateRoutes';
import Home from './Pages/Home/Home';
import CreatePlan from './Pages/CreatePlan/CreatePlan';
import PlanStatus from './Pages/PlanStatus/PlanStatus';

function App() {


  return (
    <>
      <ToastContainer />
      <Navbar />

      <Routes>
        <Route path="/login" element={<Login />} /> 

        <Route element={<PrivateRoutes />} >
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Category />} />
          <Route path="/createplan" element={<CreatePlan />} /> 
          <Route path="/planstatus/:userId" element={<PlanStatus />} />
        </Route> 
      </Routes> 



    </>
  )
}

export default App
