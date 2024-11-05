import React from 'react'
import Cart from '../components/cart/Cart'
export default function CartPage({ cart, setCart }) {
  return (
    <div>
      <Cart  cart={cart} setCart={setCart} />
    </div>
  );
}
