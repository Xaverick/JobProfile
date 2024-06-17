import React, {useState, useEffect} from 'react'
import {motion} from 'framer-motion'
import "./About.scss"
import {images} from '../../constants'
import {AppWrap,MotionWrap} from '../../Wrapper'
import expertGuiadance from '../../assets/expertGuidance.png'
import exp from 'constants'

const abouts = [
  {title: "Expert Guidance", description: "We'll work with you to define your career goals and identify the perfect job opportunities aligned with your skills and experience.", imgUrl: expertGuiadance},
  {title: "Market Insights", description: " Leverage our expertise to discover the best fitting opportunities in today's job market, giving you a competitive edge.", imgUrl: images.about04},
  {title: "Stay Afloat", description: "We will equip you with the tools and strategies to stay relevant and competitive in your field, ensuring you are always prepared for the next steps.", imgUrl: images.about02}
 
]

const About = () => {
  return (
    <>
  
      <h2 className='head-text'>Boost <span>Visibility,</span> Land <br />Your 
      job <span>Choose Us</span></h2>
  
      <div className='app__profiles'>
        {abouts.map((about, index) => (
          <motion.div
            whileInView={{opacity:1}}
            whileHover={{scale:1.1}}
            transition={{duration:0.65, type: 'tween'}}
            className='app__profile-item'
            key={about.title + index}
          >
            <img src={about.imgUrl} alt={about.title} />
            <h2 className="bold-text" style={{ marginTop: 20 }}>{about.title}</h2>
            <p className="p-text" style={{ marginTop: 10 }}>{about.description}</p>



          </motion.div>
        ))}
      </div>

    </>
  )
}

export default AppWrap(
  MotionWrap(About, 'app__about'),
  'about',
  "app__whitebg"
);