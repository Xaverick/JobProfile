import React from 'react';
import { BsGithub,BsLinkedin, BsTwitter, BsInstagram } from 'react-icons/bs';
import { FaXTwitter } from "react-icons/fa6";
const SocialMedia = () => (
  
  <div className="app__social">
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

export default SocialMedia;