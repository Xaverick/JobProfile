import React from 'react'
import "./Footer.scss"
import  {motion} from "framer-motion"
import { Link } from 'react-router-dom';
import { useState } from 'react';
import PhoneComponent from '../../../../components/PhoneComponent/Phonecomponent2.jsx';
import axios from 'axios';
import { FaFacebook,FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import logo from '../../../../assets/logo.webp';
import { toast } from 'react-toastify';
import { BsGithub,BsLinkedin, BsTwitter, BsInstagram } from 'react-icons/bs';
import { FaXTwitter } from "react-icons/fa6";
import {AppWrap,MotionWrap} from '../../../../Wrapper'


const Footer = () => {

    const [isSubmitted, setIsSubmitted] = useState(false);


    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phoneNumber: '',
      message: '',
    });
  
    const [errors, setErrors] = useState({
      name: '',
      email: '',
      phoneNumber: '',
      message: '',
    });
  
    const validateForm = () => {
      const newErrors = {};
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }
      if (!formData.email) {
        newErrors.email = 'Email is required';
      }
      if (!formData.phoneNumber || formData.phoneNumber.length < 10) {
        newErrors.phoneNumber = 'Phone Number is required';
      }
      if (!formData.message) {
        newErrors.message = 'Message is required';
      }
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit =  async(e) => {
      e.preventDefault();
      if (!validateForm()) return;
      console.log(formData);
      try {
        const response = await axios.post('/user/contact', formData);
        setIsSubmitted(true);
        toast.success('Message sent successfully', {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: true,
        });

      } catch (error) {
        toast.error('Error sending message', {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: true,
        })
        console.log(error);
      }
      setFormData({
        name: '',
        email: '',
        phoneNumber: '',
        message: '',
      });
      setErrors({});
    };
    const SocialMedia = () => (
      
      <div className="app__social flex flex-row justify-start gap-3 p-0 lg:hidden">
        <a target="_blank" rel="noreferrer" href='https://x.com/Pinnaclesol'>
          <FaXTwitter />
        </a>
        <a href='https://www.linkedin.com/company/getpinnacle/mycompany/verification/' target="_blank" rel="noreferrer">
          <BsLinkedin />
        </a>
        <a href = 'https://www.instagram.com/pinnaclebiz_everythingpeople/' target="_blank" rel="noreferrer">
          <BsInstagram />
        </a>
      </div>
    );


  return (
    <>
    <section className="footer" id='contact'>
    <motion.div className="container"
      whileInView={{ y: [100, 0], opacity: [0, 1] }}
      transition={{ duration: 0.5, delayChildren: 0.5 }}
    >


        <div className="left">
        <img src={logo} alt="Pinnacle Logo" />
        <div className="flex">             
            <div className='section'>
              <h1>Quick Links</h1>
              <ul>
                <li><Link>Home</Link></li>
                <li><Link>About Us</Link></li>
                <li><Link>Blog</Link></li>
                <li><Link>Contact Us</Link></li>
              </ul>

            </div>

            <div className='section'>
              <h1>Our Services</h1>
              <ul>
                <li><Link>Recruiting and More</Link></li>
                <li><Link>Premium Job Search Assistance</Link></li>
                <li><Link>Business Advisory</Link></li>
                <li><Link>Business Solutions</Link></li>
              </ul>

            </div>
          </div>

          <div className="pt-4">
            
            <p>
              If you have any questions or inquiries, feel free to reach out to us!
            </p>
            <p>Email: contact@pinnacle.biz</p>
            <p>Phone: +1 123 456 7890</p>
            <SocialMedia />

          </div>


        </div>

        <div className="right">
        {isSubmitted ? 
        <p className="successMessage">
          Thank you for contacting us! <br />We will get back to you shortly.
        </p> 
          : (
          <div className="contact-form">
            <h2 className="text-2xl font-bold mb-4">Get In Touch </h2>
            <form className="form">
              <div className='mb-4'>
                <input type="text" name='name' value={formData.name} placeholder="Your Name" className="form-input w-full px-4 py-2 rounded-lg" onChange={handleChange}/>
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              <div className="mb-4">
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" className="form-input w-full px-4 py-2 rounded-lg" />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              <div className="form-input mb-4 w-full rounded-lg">
                <PhoneComponent value={formData.phoneNumber} onChange={(phone) => setFormData({...formData, phoneNumber: phone})} />
                {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
              </div>
              <div className='mb-4'>
                <textarea placeholder="Your Message" name='message' value={formData.message} onChange={handleChange} className="form-textarea w-full px-4 py-2 rounded-lg h-32"></textarea>
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>
              <button type="submit" onClick={handleSubmit} className="btn btn-primary w-full px-4 py-2 rounded-lg bg-[#b0c036] text-white hover:bg-[#9bb133]">Submit Response</button>
            </form>
          </div>
          )}

        </div>

   </motion.div>
  </section>
   <p>© 2024 Pinnacle.biz. All rights reserved.</p>

</>
  )
}

export default AppWrap(
  MotionWrap(Footer, 'app__footer'),
  'contact',
  "app__whitebg"
);
