import React from 'react'
import Products from '../components/products/Products';
export default function ProductPage({ productList, cart, setCart }) {
  return (
    <div>
      <Products productList={productList} cart ={cart} setCart={setCart} />
    </div>
  );
}
