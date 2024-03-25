import React from 'react'
import { useCartStore } from '../store/cart'
import { useNavigate ,Link} from 'react-router-dom'


const ProductCard = ({id,name,price,imageUrl,product}) => {
  const {add:handleAddToCart} = useCartStore()
  

 
  return (
    <>
       <div key={id} className='flex-col flex justify-center gap-3 cursor-pointer   mt-3'>
        <Link to= {`/product/${id}`}>
          <img src={imageUrl} alt={name} className = 'w-[323px] h-[336px] object-cover rounded-md hover:scale-105 transistion'/>
          
        </Link>
        <h1 className='font-bold text-sm mt-3'>{name}</h1>
        <p className='font-bold text-xs'>{price}</p>
        <button 
        onClick={() => handleAddToCart(product)}
        className='bg-black hover:bg-black/70 px-6 py-3 text-white rounded-md text-xs '>Add to Cart</button>
    </div>
    </>

   
  )
}

export default ProductCard