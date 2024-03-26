import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useCartStore } from '../store/cart';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cart, totalPrice } = useCartStore();
  const navigate = useNavigate();

  

  const handlePlaceOrder = () => {
    navigate('/order')
    
  };

  return (
    <div className='container mx-auto py-6 px-12 '>
      <h1 className='text-2xl font-bold mb-4'>Your Cart</h1>
      {cart.length > 0 ? (
        <>
          <div className='flex font-bold justify-between'>
            <p className=''>Product </p>
            <p>Quantity</p>
            <p>Price</p>
          </div>
         
          <div className='  justify-between divide-y divide-gray-200'>

            {cart.map((item, index) => (
              <p key={index} className='py-4 flex items-center justify-between'>
                <div>
                  <img src={item.product.imageUrl} alt={item.product.name} className='w-16 h-16 object-cover' />  
                   <h2 className='text-sm gap-3 font-semibold'>{item.product.name}</h2>
                </div>
               
               
                <p className='text-xs'>{item.quantity}</p>
               
                <p className='text-lg font-semibold'>${item.product.price * item.quantity}</p>
              </p>
            ))}
          </div>
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
      <p className='font-bold text-xl'>Total Price : ${totalPrice()}</p>
      <div className='mt-8 hover:underline transition'>
        <Link to='/'>Continue Shopping</Link>
      </div>
    </div>
  );
};

export default CartPage;
