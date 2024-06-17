import "./Header.scss"
import {AppWrap} from '../../Wrapper'
import  {motion} from "framer-motion"
import {images} from "../../constants"
import Typewriter from "typewriter-effect";
import { Link } from 'react-router-dom';
import Rocket from "../../assets/rocket.png"
import handshake from "../../assets/handshake.png"
import trophy from "../../assets/trophy.webp"

const scalevarients = {
  whileInView: {
    scale: [0, 1],
    opacity: [0, 1],
    transition: {
      duration: 1,
      ease: 'easeInOut',
    },
  },
}

const Header = () => {
  return (
    <div className='app__header app__flex' id="home">
      <motion.div 
          whileInView={{x: [-100,0], opacity: [0,1]}}
          className='app__header-info'
          transition={{duration: 0.5, delayChildren: 0.5}}
      >       

          <header className="header">
                        
            <h1 className="headline head-text">
              Get Noticed,
              <span>
                <Typewriter
      
                  options={{
                    strings: ['Get Hired'],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </span>
            
            </h1>

            <p className="subheadline">

              Set Yourself Apart and Achieve Your Career Goals with Our Support
            </p>
            <p className='header-content'>
            At Pinnacle, we provide a wide range of job assistance services aimed at boosting your career.
            From revamping your resume professionally to offering personalised job counselling, our team is dedicated to helping you shine in a competitive job landscape and reach your career aspirations.
            Whether you're aiming for your dream job, transitioning careers or seeking to refine your job search strategy, our customised services are geared towards ensuring your success.
            </p>


            <div className='header-buttons'>
              <Link to='/signup'
                rel="noreferrer"              
                className="cta-button">
                Get Started</Link>
            </div>
       
          </header>
          
          <motion.img
           whileInView={{scale: [0,1]}}
           transition={{duration: 1, ease: "easeInOut"}}
           src={images.circle}
           alt="profile_circle"
           className="overlay_circle"
        />



      
      </motion.div>
      
      
      <motion.div
        variant={scalevarients}
        whileInView={scalevarients.whileInView}
        className="app__header-circles"
      >
        {[Rocket,handshake, trophy].map((circle, index) => (
            <div className="circle-cmp app__flex" key={`circle-${index}`}>
              <img src={circle} alt="profile_bg" />
            </div>
        ))}

      </motion.div>
    </div>
  )
}

// export default Header;

export default AppWrap(Header, 'home')