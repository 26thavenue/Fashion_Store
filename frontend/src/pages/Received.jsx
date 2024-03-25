import React from 'react';
import {Link } from 'react-router-dom'

const Received = () => {
  return (
    <div className='container mx-auto py-8 flex flex-col gap-8 text-center'>
      <h1 className='text-2xl font-bold mb-4'>Congratulations!</h1>
      <p className='text-lg mb-4'>Your order has been successfully placed.</p>
      <p>Thank you for shopping with us!</p>
      <Link to='/' className='underline p-1 '>
        Go back home
      </Link>
    </div>
  );
};

export default Received;
