import axios from 'axios';
import toast from 'react-hot-toast';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create((
  persist(
    (set, get) => ({
      cart: [],
      count: () => {
        try {
            const {cart} = get()
            return  cart.reduce((totalCount, currentItem) => totalCount + currentItem.quantity, 0)    
        } catch (error) {
          return 0
        }
        
      },
      totalPrice : () => {
        const {cart} = get()
        return cart ? cart.reduce((totalPrice, currentItem) => totalPrice + (currentItem.quantity * currentItem.product.price), 0) : 0;
      },
      clear : () => {
        const {cart} = get()
        const updatedCart = clearCart(cart)
        set({ cart: updatedCart, isLoading: false });
        
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
      increaseQuantity: async ( itemQty,cartId) => {
        try {
          const { cart } = get();
          const token = localStorage.getItem('token');
          const updatedCart = await increaseQuantity(cart,token,itemQty,cartId);
          set({ cart: updatedCart });
          toast.success('Product quantity increased');
        } catch (error) {
          console.log(error);
          toast.error('Error increasing product quantity');
        }
      },
      decreaseQuantity: async (itemQty,cartId) => {
        try {
          const { cart } = get();
          const token = localStorage.getItem('token');
          const updatedCart = await decreaseQuantity(cart,token,itemQty,cartId);
          set({ cart: updatedCart });;
          set({ cart: updatedCart });
          toast.success('Product quantity decreased');
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
          const updatedCart =  await removeCart(cartId, cart,token);
          set({ cart: updatedCart });
          toast.success('Product removed from cart');
        } catch (error) {
          console.log(error);
          toast.error('Error removing product from cart');
        }
      },
      removeAll: async () => {
        try {
          const token = localStorage.getItem('token');
          const updatedCart =  await removeAll(token);
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

async function removeAll(token){
  try {
    if (token) {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const res = await axios.delete(
            `http://localhost:6300/api/cart`,
            config
        );
        console.log(res)
        res.data;
        return []
    }
    return []
  } catch (error) {
    console.error("Error on  cart:", error);
        // Handle error appropriately
    return [];
  }

}

async function removeCart(cartId, cart, token) {
  try {
    if (token) {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const res = await axios.delete(
            `http://localhost:6300/api/cart/${cartId}`,
            config
        );
        console.log(res)
        res.data;
        const updatedCart = cart.filter(item => item.id !== cartId);
        return updatedCart;
    }
    return cart
    
  } catch (error) {
    console.error("Error on  cart:", error);
        // Handle error appropriately
    return cart;
  }
}

async function updateCart(product, token, cart) {
    console.log({ cart, product });
    
    try {
        if (!token) {
            throw new Error("Token is missing");
        }
        
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        
        const quantity = 1;
        const productId = product.id;
        
        // Make a POST request to add the product to the cart
        const res = await axios.post(
            `http://localhost:6300/api/cart`,
            { productId, quantity },
            config
        );
        
        console.log(res);

        // Check if the product is already in the cart
        const productOnCartIndex = cart.findIndex(item => item.product.id === product.id);
        
        if (productOnCartIndex === -1) {
            // If the product is not in the cart, add it with a quantity of 1
            const cartItem = { product, quantity: 1 };
            return [...cart, cartItem];
        } else {
            // If the product is already in the cart, update its quantity
            const updatedCart = [...cart];
            updatedCart[productOnCartIndex].quantity += 1;
            return updatedCart;
        }
    } catch (error) {
        console.error("Error updating cart:", error);
        // Handle error appropriately
        return cart;
    }
}


async function decreaseQuantity(cart,token,itemQty,cartId ){
  try {
    if (token) {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const isThere = cart.find(item => item.id === cartId);
        if(!isThere) {
          throw new Error('No such cart item')
        }

        let quantity = itemQty - 1;
        console.log(quantity);
        
        const res = await axios.put(
            `http://localhost:6300/api/cart/${cartId}`,
            { quantity },
            config
        );
        console.log(res)
        res.data;

        const updatedCart = cart.map(item =>
        item.id === cartId ? { ...item, quantity } : item
         );

        return updatedCart;
    }
    
  } catch (error) {
    console.error("Error on  cart:", error);
        // Handle error appropriately
        return cart;
  }
}


async function increaseQuantity(cart,token,itemQty,cartId ){
  try {
    if (token) {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        let quantity = itemQty + 1;
        console.log(quantity);
        
        const res = await axios.put(
            `http://localhost:6300/api/cart/${cartId}`,
            { quantity },
            config
        );
        console.log(res)
        res.data;

        const updatedCart = cart.map(item =>
        item.id === cartId ? { ...item, quantity } : item
         );

        return updatedCart;
    }
    
  } catch (error) {
    console.error("Error on  cart:", error);
        // Handle error appropriately
        return cart;
  }
}

async function clearCart(cart) {
 return [];

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
            
            return res.data;
   }
  } catch (error) {
      console.log(error)
  }
   
}

