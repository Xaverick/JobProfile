import React, {useEffect, useState} from 'react'
import {AiFillEye, AiFillGithub} from 'react-icons/ai'
import {motion} from 'framer-motion'
import "./Work.scss"
import {images} from "../../constants"
import {AppWrap,MotionWrap} from '../../Wrapper'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import resumeReview from '../../assets/resumeReview.png'
import resumeMakeover from '../../assets/resumeMakeover.png'
import jobCouncelling from '../../assets/jobCouncelling.png'
import jobSearch from '../../assets/jobSearch.png'
import { Link } from 'react-router-dom';


const data = [
      {
        title: 'Resume Review',
        description: "Our Resume Review Service offers expert feedback and insights to enhance your resume. A 30-minute call to review your resume will increase the chances of getting it shortlisted by recruiters and hiring managers.",
        imgUrl : [resumeReview],
        tags: ['Resume Review'],
      },

      {
        title: 'Resume And Linkedin Makeover',
        description: 'Our team will craft a compelling and SEO-friendly resume that showcases your strengths and gets you past applicant tracking systems (ATS). Whether you’re looking to land your dream job,career transition, or stand out in a crowded field, our resume writing service is here to help you succeed.',
        imgUrl : [resumeMakeover],
        tags: ['Resume & Linkedin Makeover']
      },

      {
        title: 'Discovery Call - 1:1 Discussion',
        description: 'Our expert consultants will thoroughly understand your needs, goals, and challenges to provide insights and offer a solution. A 30-minute call to provide personalised guidance and actionable insights for navigating the job market.',
        imgUrl : [jobCouncelling], 
        tags: ['Discover Call']
      },

      {
        title: 'Premium Job search Assistant',
        description: 'We’ll work with you to define your career goals and identify the perfect job opportunities aligned with your skills and experience. Leveraging our expertise and network, to discover the best fitting opportunities in today’s job market, giving you a competitive edge.',
        imgUrl : [jobSearch],
        tags: ['Premium Job Search']
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
      <h2 className='head-text' style={{marginTop:"0.75rem"}}> Boost Your<span> Career </span>With Our <span>Services</span> </h2>
    
      <div className='app__work-filter'>
        {['Resume Review', 'Resume & Linkedin Makeover', 'Discover Call', 'Premium Job Search'].map((item, index) => (
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

                <Link to='/signup' className='cta__button'>
                  Learn More                
                </Link>

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

