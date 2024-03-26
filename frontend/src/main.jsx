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
import Product from './pages/Product.jsx';
import Products from './pages/Products.jsx';
import Men from './pages/Men.jsx'
import Women from './pages/Women.jsx'
import Received from './pages/Received.jsx'
import ChangePassword from './pages/ChangePassword.jsx'
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
    path: "/change-password",
    element: <ChangePassword />,
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
    path: "product/:id",
    element: <Product />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/received",
    element: <Received />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/products",
    element: <Products />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/men",
    element: <Men />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/women",
    element: <Women />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
       <RouterProvider router={router} />
    
  </React.StrictMode>,
)
