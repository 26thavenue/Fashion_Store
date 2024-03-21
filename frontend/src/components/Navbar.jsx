import React from 'react'
import {ShoppingCart, User } from 'lucide-react'
const Navbar = () => {
  return (
    <div className='flex justify-between w-full px-12 py-6 shadow-sm mx-auto '>
        <p className='font-light '>MEN  |  WOMEN </p>
        <h3 className='font-bold '> Cynthia's Fashion Store</h3>
        <div className='items-center flex gap-3 justify-center '>
            <h3><ShoppingCart /></h3>
            <h4><User /></h4>
        </div>
        
    </div>
  ) 
}

export default Navbar