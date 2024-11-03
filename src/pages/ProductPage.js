import React from 'react'
import Products from '../components/products/Products';
export default function ProductPage({ productList, wishList, userInput, setWishList }) {
  return (
    <div>
      <Products
        productList={productList}
      />
    </div>
  );
}
