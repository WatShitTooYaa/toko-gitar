import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './route/home'
import Tes from './route/tes'
import Products from './route/products'
import Navbar from './route/navbar'
import Footer from './route/footer'
import List from './route/list-toko'
import Category from './route/category'
import DetailToko from './route/toko'
import Recommendation from './route/rekomendasi'
import About from './route/about'
import Login from './route/login'
import Register from './route/register'
import {Route,Routes,BrowserRouter } from "react-router-dom"

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/"  element={<Home/>} />
          <Route path="/products"  element={<Products />}/>
          <Route path="/category"  element={<Category />}/>
          <Route path="/detail-toko/:id"  element={<DetailToko />}/>
          <Route path="/recommendation"  element={<Recommendation />}/>       
          <Route path="/list-toko"  element={<List />}/>
          <Route path="/about"  element={<About />}/>
          <Route path="/tes"  element={<Tes />}/>
        </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App
