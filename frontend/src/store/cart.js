import axios from 'axios';
import toast from 'react-hot-toast';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create((
  persist(
    (set, get) => ({
      cart: [],
      count: () => {
        const {cart} = get()
        return  cart.reduce((totalCount, currentItem) => totalCount + currentItem.quantity, 0);
      },
      add: async (product) => {
        try {
          const { cart } = get();
          console.log(cart)
          const token = localStorage.getItem('token');
          const updatedCart = await updateCart(product,token,cart);
          set({ cart: updatedCart, isLoading: false });
          toast.success('Product added to cart');
        } catch (error) {
          console.log(error);
          toast.error('You need to be logged in to save items to  cart');
        }
      },
      increaseQuantity: async (quantity, cartId) => {
        try {
          const { cart } = get();
          const token = localStorage.getItem('token');
          const updatedCart = await increaseQuantity(product,token,quantity, cart );
          set({ cart: updatedCart });
          toast.success('Product quantity increased');
        } catch (error) {
          console.log(error);
          toast.error('Error increasing product quantity');
        }
      },
      get: async () => {
        try {
          const token = localStorage.getItem('token');
          const updatedCart = await getCart(token);
          set({ cart: updatedCart });
        } catch (error) {
          console.log(error);
          toast.error('Error increasing product quantity');
        }
      },

      remove: async (cartId) => {
        try {
          const { cart } = get();
          const token = localStorage.getItem('token');
          if (!token) {
            // If no token, just remove from cart locally
            const updatedCart = removeFromLocalCart(cartId, cart);
            set({ cart: updatedCart });
            toast.success('Product removed from cart');
            return;
          }
          const updatedCart = await removeCart(cartId, token);
          set({ cart: updatedCart });
          toast.success('Product removed from cart');
        } catch (error) {
          console.log(error);
          toast.error('Error removing product from cart');
        }
      },
      // Implement other functions similarly
    }),
    {
      name: 'cart-storage',
    }
  )
)
);

async function updateCart(product,token, cart ) {
    
    try {
        if (token) {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            // console.log(token)
            const quantity = 1;
            const productId = product.id;
            const res = await axios.post(
                `http://localhost:6300/api/cart`,
                { productId, quantity },
                config
            );
            console.log(res)
            res.data;
        }
    } catch (error) {
        console.error("Error on  cart:", error);
        // Handle error appropriately
        return cart;
    }
    
    const productOnCart = cart?.find(item => item.id === product.id);


    if (!productOnCart) {
        const cartItem = { ...product, quantity: 1 };
        return [...cart, cartItem];
    } else {
        return cart.map(item => {
            if (item.id === product.id) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
    }
   
    

    
}

async function increaseQuantity(product,token,quantity, cart ){
  const newQuantity = quantity + 1
  const cartItem = { ...product, newQuantity };
        return [...cart, cartItem];
}

async function decreaseQuantity(product,token,quantity, cart ){
  const newQuantity = quantity - 1
 
  const cartItem = { ...product, newQuantity };
        return [...cart, cartItem];
}

async function removeCart(cartId, token) {


  // const config = {
  //   headers: {
  //     Authorization: token,
  //   },
  // };

  // // Make your Axios request here, for example:
  // const res = await axios.delete(
  //   `http://localhost:6300/api/cart/${cartId}`,
  //   config
  // );
  // return res.data;
}


async function getCart(token) {
  try {
      // console.log(token)
        if (token) {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const res = await axios.get(
                `http://localhost:6300/api/cart`,
                config
            );
            console.log(res)
            return res.data;
   }
  } catch (error) {
      console.log(error)
  }
   
}

