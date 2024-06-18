import {Navbar, Header, About, Work, Footer} from './Components/index'
// import Footer from '../../components/Footer/Footer'
import "../../App.scss"

const LandingPage = () => {
  return (
    <div className = "app mt-[67px] lg:mt-[60.8px]">
      <Navbar />
      <Header />
      <About />
      <Work />
      <Footer />
    </div>
  )
}

export default LandingPage


