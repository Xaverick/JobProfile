import React, {useState, useEffect} from 'react'
import {motion} from 'framer-motion'
import "./About.scss"
import {images} from '../../../../constants'
import {AppWrap,MotionWrap} from '../../../../Wrapper'
import expertGuiadance from '../../../../assets/expertGuidance.png'


const abouts = [
  {title: "Expertise & Insight", description: "With over a decade of experience, we deeply understand diverse industries and market dynamics, ensuring optimal talent acquisition and strategic business advice.", imgUrl: expertGuiadance},
  {title: "Tailored Solutions", description: "Recognizing each business’s uniqueness, we provide customized services to meet specific objectives—from executive search to strategic advisory, ensuring tailored solutions that drive success.", imgUrl: images.about04},
  {title: "Proven Success", description: "Having assisted 50+ companies in building exceptional teams and placing over 100+ leaders, our track record underscores our ability to consistently deliver impactful results and foster growth for businesses and professionals alike.", imgUrl: images.about02}
 
]

const About = () => {
  return (
    <>
      <h2 className='head-text'> <span>Partner</span> With Us:  Unmatched <br /> <span>Expertise</span> and <span>Success</span></h2>  
      <div className='app__profiles'>
        {/* <p className='intro'>We specialize in executive searches, succession planning, startup support, and board advisory, offering futuristic HR solutions to build your dream team. From C-suite recruitment to background verification, count on us for comprehensive, innovative services tailored to your evolving business needs.</p> */}
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