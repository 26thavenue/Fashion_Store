import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'


const App = () => {
  return (
    <div className='flex flex-col  '>
        <Navbar/>
        <Hero/>
    </div>
  )
}

export default App