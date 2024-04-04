import './App.css';
import React, {useState, useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Home from './components/Home';
import Cart from './components/Cart';
import History from './components/History';
import Register from './components/Register';
import Checkout from './components/Checkout';

function App() {

  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true)
      await fetch('https://plushop-server.onrender.com/products')
        .then((products) => products.json())
        .then((products) => {
          setData(products)
          setLoading(false)
        })
    }
    getData();
  }, []);

  const removeProduct = (product) => {
    setData(() => {
      return data.filter(beforeProduct => beforeProduct._id !== product._id)
    })
  }

  const addToCart = (product) => {
    setCart(() => {
      let newCart = cart;
      newCart.push(product);
      return newCart;
    })
  }

  const addProduct = (product) => {
    setData(() => {
      let newData = data;
      newData.push(product);
      return newData;
    })
  }

  const removeFromCart = (product) => {
    setCart(() => {
        return cart.filter(beforeCart => beforeCart._id !== product._id)
    })
  }

  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Home data={data} loading={loading} setData={removeProduct} setCart={addToCart}/>}></Route>
        <Route path="/cart" element={<Cart cart={cart} setData={addProduct} setCart={removeFromCart} setTotal={setTotal}/>}></Route>
        <Route path="/history" element={<History/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/checkout" element={<Checkout total={total} cart={cart} setCart={setCart}/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
