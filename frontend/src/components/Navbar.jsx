import React, { useState, useEffect } from 'react';
import { ShoppingCart, User, CircleX } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cart';
import QuantityButton from './QuantityButton';

const Navbar = () => {

  const [open, setOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const { cart, count,get, clear } = useCartStore();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); 
    get()
  }, []);

  const toggleOpen = () => {
    setOpen(!open);
    
  };

  const toggleUserOpen = () => {
    setUserOpen(!userOpen);  
  };

  const Close = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setIsLoggedIn(false); 
    clear()
  };

  return (
    <div className='flex justify-between w-full px-12 py-6 shadow-sm mx-auto'>
      <p className='font-light'>
        <Link to='/men'>MEN</Link> | <Link to='/women'>WOMEN</Link>
      </p>
      <h3 className='font-bold'>Cynthia's Fashion Store</h3>
      <div className='items-center flex gap-3 justify-center relative'>
        <div>

          <div className='relative'>
            <ShoppingCart onClick={toggleOpen} />
            {cart && cart?.length > 0 && (
              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-blue-500 text-[8px] text-white rounded-full w-4 h-4 flex items-center justify-center">
                <span>{count()}</span>
              </div>
            )}
          </div>
           

          
         
          {open && (
            <div className='absolute flex flex-col gap-3 justify-between top-full right-0 bg-white shadow-md rounded-lg p-4 w-[500px] z-10'>
              <CircleX onClick={Close} className='justify-self-end w-4' />
              <div className='h-[50vh]  p-6 overflow-y-auto'>
                {cart && cart.length > 0 ? (
                  <div className='flex flex-col gap-3  items-center justify-center'>
                    {cart.map((item, index) => (
                      <div key={index} className='flex gap-8 items-center justify-center mb-3'>
                        <img src={item?.product?.imageUrl} alt='product-image' className='h-[100px] w-[100px] rounded-md' />
                        <div className='flex flex-col items-center justify-center gap-1'>
                          <p className='font-bold'>{item?.product?.name}</p>
                          <p className='text-xs'>Quantity: {item?.quantity}</p>
                          <p className='text-xs'>Price: {item?.product?.price}</p>
                        </div>
                        <QuantityButton item={item}  />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>Your cart is empty.</p>
                )}
              </div>

              <div className="flex flex-col mt-2 mb-3 ">
                <Link to='/cart'>
                  <button className='bg-black w-full text-white px-6 text-sm py-3 rounded-md mb-1'>View Cart</button>
                </Link>

                <Link to='/order'>
                  <button className='bg-yellow-400 w-full text-black text-sm px-6 rounded-md py-3 mb-1'>Place Order</button>
                </Link>
              </div>
            </div>
          )}
        </div>
        <h4>
          {isLoggedIn ? (
            <div className="flex gap-3 items-center ml-3">
              <button className='bg-black hover:bg-black/90 text-white px-4 py-2 rounded-md' onClick={handleLogout}>Logout</button>
              <User onClick={toggleUserOpen} className='cursor-pointer' />

                {userOpen && (
                    <div className='absolute flex flex-col gap-3 justify-between top-full right-0 bg-white shadow-md rounded-lg p-4 w-[200px] z-10'>

                      <Link to='/change-password'>
                        <button className='hover:bg-slate-100 cursor-pointer p-2 rounded-md transition duration-300 ease-in-out'>Change Password</button>
                      </Link>                   
                    </div>
                  )}
            </div>
            
          ) : (
            <>
              <Link to='/login' className='mr-2'>
                <button className='bg-[#f6f6f6] hover:bg-[#f6f6f6]/70 text-black px-4 py-2'>Login</button>
              </Link>
              <Link to='/register'>
                <button className='bg-black hover:bg-black/90 text-white px-4 py-2 rounded-md'>Signup</button>
              </Link>
            </>
          )}
        </h4>
        
        
      </div>
    </div>
  );
};

export default Navbar;
