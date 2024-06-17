import React, { useState, useEffect } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import './Testimonial.scss';
import {images} from "../../constants"
import { AppWrap, MotionWrap } from '../../Wrapper';

const testimonialData = [
  {
    name: 'John Doe',
    img: images.person1,
    company: 'Google',
    feedback: 'good boy keep it up jhfiosdf fj weopfk jwepfjopwefj weofjweopjfweopjfwe rojfwropj'
  },
  {
    name: 'John Doe',
    img: images.html,
    company: 'Google',
    feedback: 'good boy keep it up'
  },
];


const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [brands, setBrands] = useState([]);

  const handleClick = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    setTestimonials(testimonialData);
    // setBrands(brandData);
    
  }, []);

  const test = testimonials[currentIndex];

  return (
    <>
      {testimonials.length && (
        <>

          <div className='app__testimonial-btns app__flex laptop'>
            
            <div className='app__flex'
              onClick={() => (currentIndex === 0 ? setCurrentIndex(testimonials.length - 1) : setCurrentIndex(currentIndex - 1))}
            >
              <HiChevronLeft />
            </div>
    
          </div>  

          <div className="app__testimonial-item app__flex">
            <img src={test.img} alt="" />
            <div className="app__testimonial-content">
              <p className="p-text">{test.feedback}</p>
              <div>
                <h4 className='bold-text'>{test.name}</h4>
                <h5 className='p-text'>{test.company}</h5>
              </div>
            
            </div>        

            <div className='app__testimonial-btns app__flex mobile'>
            
              <div className='app__flex'
                onClick={() => (currentIndex === 0 ? setCurrentIndex(testimonials.length - 1) : setCurrentIndex(currentIndex - 1))}
              >
                <HiChevronLeft />
              </div>

              <div className='app__flex'
                onClick={() => (currentIndex === testimonials.length - 1 ? setCurrentIndex(0) : setCurrentIndex(currentIndex + 1))}
              >
                <HiChevronRight />
              </div>    
            </div> 


          </div>   

          <div className='app__testimonial-btns app__flex laptop'>
            
            <div className='app__flex'
              onClick={() => (currentIndex === testimonials.length - 1 ? setCurrentIndex(0) : setCurrentIndex(currentIndex + 1))}
            >
              <HiChevronRight />
            </div>
    
          </div>  

        
     
        </>
      )}
      

      

    </>
  )
}

export default AppWrap(
  MotionWrap(Testimonials, 'app__Testimonials'),
  'testimonials',
  "app__primarybg"
);