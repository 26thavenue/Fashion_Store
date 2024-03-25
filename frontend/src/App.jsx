import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ExploreProducts from './components/ExploreProducts'
import FeedbackForm from './components/FeedbackForm'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'

const App = () => {
  return (
    <div className='flex flex-col  '>
        <Navbar/>
        <Hero/>
        <ExploreProducts/>
        <FeedbackForm/>
        <ContactForm/>
        <Footer/>

    </div>
  )
}

export default App