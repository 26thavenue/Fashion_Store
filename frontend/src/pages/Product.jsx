import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {useCartStore} from '../store/cart'
import Navbar from '../components/Navbar'
const Product = () => {
  const [loading, setLoading] = useState(true); // Set loading state to true initially
  const [product, setProduct] = useState(null); // Initialize product state to null
  const { id } = useParams();
  const {add:handleAddToCart} = useCartStore()

  console.log(id)

  useEffect(() => {
    const getProduct = async (id) => {
      try {
        const response = await fetch(`http://localhost:6300/api/products/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        setProduct(data); // Update product state with fetched data
        setLoading(false); // Set loading state to false once data is fetched
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false); // Set loading state to false in case of error
      }
    };

    getProduct(id); // Call getProduct function with the provided id

  }, [id]); // Add id to the dependency array to fetch new product when id changes

  return (
    <div className='w-[100vw] h-[100vh]'>
      <Navbar/>
      <>
          {loading ? (
        <p>Loading...</p>
      ) : product ? ( // Check if product is not null
        <div className="flex gap-12 items-center w-full h-full mx-auto  px-12 py-6 ">
          <img src={product.imageUrl} alt={product.name} className='w-[300px] h-[400px] object-cover'/>
          <div className="flex flex-col gap-3 justify-center w-[500px] items-start">
              <h1 className='text-3xl font-bold'>{product.name}</h1>
              <p className='text-2xl'>${product.price}</p>
              <p className='text-xl'>{product.description}</p>
              
              <button className=' hover:bg-black/90 py-3 px-6 text-sm bg-black text-white '> Add to Cart</button>
          </div>

         
          
        </div>
      ) : (
        <p>No product found</p>
      )}

      </>

    
    </div>
  );
};

export default Product;
