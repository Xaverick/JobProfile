import React, {useEffect, useState} from 'react'
import {AiFillEye, AiFillGithub} from 'react-icons/ai'
import {motion} from 'framer-motion'
import "./Work.scss"
import {images} from "../../../../constants"
import {AppWrap,MotionWrap} from '../../../../Wrapper'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import resumeReview from '../../../../assets/resumeReview.png'
import resumeMakeover from '../../../../assets/resumeMakeover.png'
import jobCouncelling from '../../../../assets/jobCouncelling.png'
import jobSearch from '../../../../assets/jobSearch.png'
import { Link } from 'react-router-dom';


const data = [
      {
        title: 'Recruiting and More',
        description: "At Pinnacle, we excel in Executive Search and Contingency Hiring, offering tailored solutions to meet your leadership needs. Our expert team rigorously identifies top talent, ensuring the perfect fit for your organization. From strategic leadership to project-specific hires, we deliver efficient recruitment solutions to propel your business forward.",
        imgUrl : resumeReview,
        tags: ['Recruiting and More'],
      },

      {
        title: 'Premium Job Search Assistance',
        description: 'At Pinnacle, we offer personalized job search assistance tailored to your career goals. Our expert team provides resume optimization, interview coaching, and strategic support, helping you navigate the job market confidently and discover the best opportunities for your professional journey.',
        imgUrl : [resumeMakeover],
        tags: ['Premium Job Search Assistance']
      },

      {
        title: 'Business Solutions',
        description: "At Pinnacle Solutions, we help startups turn dreams into reality by finding like-minded professionals. Employees are your greatest assets, driving success. Over the past decade, we've partnered with passionate entrepreneurs and helped 50+ companies build dream teams, earning a reputation for excellence.",
        imgUrl : [jobCouncelling], 
        tags: ['Business Solutions']
      },

      {
        title: 'Advisory Services',
        description: "At Pinnacle Solutions, we recognize that dynamic environments make forward-thinking essential. Succession planning is crucial for future preparedness. Our advisory services include organizational vision assessment, skills analysis, talent mapping, and retention programs. We offer these and more to ensure you stay ahead and achieve long-term success.",
        imgUrl : [jobSearch],
        tags: ['Advisory Services']
      },


]


const Work = () => {
  const [works, setWorks] = useState([]);
  const [filterWork, setFilterWork] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All')
  const [animateCard, setAnimateCard] = useState({y: 0, opacity: 1})
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageCurrentIndex, setImageCurrentIndex] = useState(0)

  const [position, setPosition] = useState(0);
  const [startX, setStartX] = useState(0);



  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };
  
  const handleTouchMove = (e) => {
    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;
    setPosition(-diff);
  };
  
  const handleTouchEnd = () => {
    setImageCurrentIndex(0);
    currentIndex === filterWork.length - 1 ? setCurrentIndex(0) : setCurrentIndex(currentIndex + 1)


  };

  useEffect(() => {
    setWorks(data)
    setFilterWork(data)
  },[])


  const handleClick = () =>{
    setImageCurrentIndex(0);
    currentIndex === 0 ? setCurrentIndex(works.length - 1) : setCurrentIndex(currentIndex - 1)
    let item = works[currentIndex-1].tags[0]
    setActiveFilter(item)
  }

  const handleClickAfter = () =>{
    setImageCurrentIndex(0);
    currentIndex === works.length - 1 ? setCurrentIndex(0) : setCurrentIndex(currentIndex + 1)
    let item = works[currentIndex + 1].tags[0]
    setActiveFilter(item)
  }


  const HandletworlFilter = (item) => {

    setActiveFilter(item)
    setAnimateCard({y: 100, opacity: 0})
    setTimeout(() => {
      setAnimateCard({y: 0, opacity: 1})
    }, 500)

    // setCurrentIndex(0);
    // setImageCurrentIndex(0)
 
    // if(item === 'All') return setFilterWork(works)
    // else return setFilterWork(works.filter(work => work.tags[0] === item))
    let index = works.findIndex((work) => work.tags[0] === item);
    setCurrentIndex(index);

  }

  const work = filterWork[currentIndex]
  
  return (
    <>

      <h2 className='head-text' style={{marginTop:"0.75rem"}}>Transform Your<span> Business </span>With Our <span>Services</span> </h2>
    
      <div className='app__work-filter'>
        {['Recruiting and More', 'Premium Job Search Assistance', 'Business Solutions', 'Advisory Services'].map((item, index) => (
          <div
            key={index}
            onClick={() => HandletworlFilter(item)}
            className={`app__work-filter-item app__flex p-text ${activeFilter === item ? 'item-active' : ''}`}
          >
            {item}
          </div>
          
        ))}

      </div>

      <div className='app__work-portfolioArea'>

        <div className='app__work-portfolioArea-left'>
          <div className='icon'
            onClick={handleClick}
          > 
            <ArrowBackIosIcon />
          </div>
          
        </div>

        <motion.div
          animate={animateCard}
          transition={{duration: 0.5, delayChildren: 0.5}}
          className='app__work-portfolio'
          style={{ transform: `translateX(${position}px)` }}

        >


          {filterWork.length && (            
            <div className='app__work-item  app__flex'>   

              <div className='app__work-image app__flex'>
                {work.imgUrl && (                
                    <img src={work.imgUrl} alt={work.title}  />
                )}
              </div>          
              

              <div className="app__work-content app__flex">
                <h4 className="bold-text">{work.title}</h4>
                <p className="p-text" style={{ marginTop: 10 }}>{work.description}</p>

                <>
                  {work.tags[0] === "Premium Job Search Assistance" ? 
                    <Link to='/home' className='cta__button'>
                      Know More             
                    </Link>
                  :                
                     <a href='#contact' className='cta__button'>
                      Know More             
                    </a>
                  }
                </>


                {/* <div className="app__work-tag app__flex">
                  <p className="p-text"> <Link to="/signup">Learn More </Link></p>
                </div> */}
              </div> 

            </div>
            
           )} 

 



        </motion.div> 
        

        <div className='app__work-portfolioArea-right'>
          <div className='icon'
            onClick={handleClickAfter}
          >
            
            <ArrowForwardIosIcon />
          </div>
          

        </div>

        <div className='app__work-mobileNav'>


          <div className='app__work-mobileNav-left'>
            <div className='icon'
              onClick={handleClick}
            > 
              <ArrowBackIosIcon />
            </div>
          </div>            

          <div className='icon'
            onClick={handleClickAfter}
          >
              
            <ArrowForwardIosIcon />
          </div>

        </div>

      </div>


 


      <div className='app__work-indicator app__flex'>
          {filterWork.map((work,index) => (
            <div className='app__work-indiviual-indicator ' 
                  key={index} 
                  style={currentIndex ===  index ? { backgroundColor: '#B1C000' } : {}}
            >
              
            </div>

          ))}


      </div>  
    
    </>
  )
}

export default AppWrap(
  MotionWrap(Work, 'app__works'),
  'work',
  "app__primarybg"
);

