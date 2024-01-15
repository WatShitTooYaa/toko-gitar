import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Home from './route/home'
import Products from './route/products'
import Navbar from './route/navbar'
import Footer from './route/footer'
import Category from './route/category'
import DetailToko from './route/toko'
import Login from './route/login'
import Register from './route/register'
import './index.css'
import List from './route/list-toko'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/products",
    element: <Products/>,
  },
  {
    path: "/list-toko",
    element: <List/>,
  },
  {
    path: "/category",
    element: <Category/>,
  },
  {
    path: "/detail-toko",
    element: <DetailToko/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Navbar/>
    <RouterProvider router={router} />
    <Footer/>
    {/* <App /> */}
  </React.StrictMode>,
)
