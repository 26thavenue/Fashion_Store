import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { useEffect,useState } from 'react';
import toast,{Toaster} from 'react-hot-toast'
import axios from 'axios'
import { useCartStore } from '../store/cart';


const Order = () => {
  const navigate = useNavigate(); 
  const [address, setAddress] = useState('');

   const { cart, totalPrice } = useCartStore();

  const handleSubmit = async(e) => {
      e.preventDefault();
      try {

        const token = localStorage.getItem('token')
        const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
        const data ={address}
       const response = await axios.post('http://localhost:6300/api/order', data, config);
        if(response.status == 200){
          navigate('/received')
        }
        console.log(response)

        
      } catch (error) {
        console.error('Error submitting order:', error);
        // Handle error (e.g., show toast)
        toast.error('Failed to place order. Please try again.');
      }
      

  };

  

    useEffect( () => {
      const token = window.localStorage.getItem('token');
  

      if (!token) {
        toast.error('You need to be logged in to perform this action')
        setTimeout(() => {
          navigate('/');
        }, 2000)
        
      
      }
    }, [])
  

  return (
    <div className='container mx-auto py-8'>
      <h1 className='text-2xl text-center font-bold mb-4'>Place Order</h1>
      <div>
        {/* <p className='my-10 font-bold text-center'>Products Ordered </p> */}
        <div className='bg-red-100 w-full shadow-md flex flex-col justify-center items-center mx-auto '>

          { cart && cart.length> 0 ? null : <p> Your Cart is Empty</p>} 
        </div>
         

            <p className='text-center text-xl font-bold my-10'>Total : ${totalPrice()}</p>
      </div>
      <form onSubmit={handleSubmit} className='max-w-md mx-auto'>
      <div className='mb-4'>
        <label htmlFor='address' className='block text-sm font-medium text-gray-700'>
          Address
        </label>
        <input
          type='text'
          id='address'
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className='mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
          placeholder='Enter your address'
          required
        />
      </div>
      <div className='mt-4'>
        <button
          type='submit'
          className='w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
        >
          Place Order
        </button>
      </div>
    </form>
      <Toaster/>
    </div>
  );
};

export default Order;
