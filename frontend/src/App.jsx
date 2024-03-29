import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ExploreProducts from './components/ExploreProducts'
import FeedbackForm from './components/FeedbackForm'
import ContactForm from './components/ContactForm'


const App = () => {
  return (
    <div className='flex flex-col  '>
        <Navbar/>
        <Hero/>
        <ExploreProducts/>
        <FeedbackForm/>
        <ContactForm/>

    </div>
  )
}

export default App