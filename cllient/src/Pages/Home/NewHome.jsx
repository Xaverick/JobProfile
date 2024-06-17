import React from 'react'
import "./NewHome.scss"
// import {About, Footer,Skills, Work, Header} from '../../container/index'
import {Header, About, Work} from '../../container/index'
import Footer from '../../components/Footer/Footer'

const App = () => {
  return (
    <div className = "app">
      <Header />
      <About />
      <Work />
      <Footer />  
    </div>
  )
}

export default App