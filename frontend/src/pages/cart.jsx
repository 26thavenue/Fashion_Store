import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useCartStore } from '../store/cart';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cart, count } = useCartStore();
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    navigate('/order')
    
  };

  return (
    <div className='container mx-auto py-6 px-12 '>
      <h1 className='text-2xl font-bold mb-4'>Your Cart</h1>
      {cart.length > 0 ? (
        <>
          <ul className='divide-y divide-gray-200'>
            {cart.map((item, index) => (
              <li key={index} className='py-4 flex items-center justify-between'>
                <div>
                
                  <h2 className='text-lg font-semibold'>{item.name}</h2>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <p className='text-lg font-semibold'>${item.price * item.quantity}</p>
              </li>
            ))}
          </ul>
          <div className='flex justify-end mt-4'>
            <button
              className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded'
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
          </div>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
      <div className='mt-8 hover:underline transition'>
        <Link to='/'>Continue Shopping</Link>
      </div>
    </div>
  );
};

export default CartPage;
