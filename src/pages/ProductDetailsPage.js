import React from 'react'
import ProductDetails from '../components/productdetails/ProductDetails'
export default function ProductDetailsPage({cart , setCart}) {
  return (
    <div>
      <ProductDetails cart={cart} setCart={setCart} />
    </div>
  );
}
