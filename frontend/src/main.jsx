import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.jsx'
import Cart from './pages/cart.jsx'
import Order from './pages/order.jsx'
import Login from './pages/Login.jsx';
import Signup from './pages/SignUp.jsx';
import ErrorPage from './pages/Error.jsx';
import Product from './pages/Product.js';
import Products from './pages/Products.js';
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/cart",
    element: <Cart />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/order",
    element: <Order />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <Signup />,
    errorElement: <ErrorPage />,
  },
  {
    path: "product/:productId",
    element: <Product />,
    errorElement: <ErrorPage />,
  },
  {
    path: "product/",
    element: <Products />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
       <RouterProvider router={router} />
    
  </React.StrictMode>,
)
