import React, { useState } from 'react';
import { useCartStore } from '../store/cart';
const QuantityButton = ({item,onValueChange}) => {
  const [quantity, setQuantity] = useState( 1);
  const {increaseQuantity,decreaseQuantity} = useCartStore()
    // console.log(item)
//   console.log(item.quantity,item.id)
  const handleIncrement = () => {
    increaseQuantity(item.quantity,item.id);
    setQuantity(prevQuantity => prevQuantity + 1);
    if (onValueChange) {
      onValueChange(quantity + 1);
    }
  };

  const handleDecrement = () => {
    decreaseQuantity(item.quantity,item.id);
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
      if (onValueChange) {
        onValueChange(quantity - 1);
      }
    }
  };

  return (
    <div className="quantity-button">
      <button className='bg-slate-100 hover:bg-slate-200 transition px-3 py-2 mr-3 rounded-md' onClick={handleDecrement}>-</button>
      <span>{quantity}</span>
      <button className='bg-slate-100 hover:bg-slate-200 transition px-3 py-2 ml-3 rounded-md' onClick={handleIncrement}>+</button>
    </div>
  );
};

export default QuantityButton;
