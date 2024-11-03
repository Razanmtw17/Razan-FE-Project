import React, { useState, useEffect } from 'react';
import { Pagination } from '@mui/material';
import './HomeProduct.css';
import FavoriteIcon2 from '@mui/icons-material/Favorite';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Link } from "react-router-dom";

export default function HomeProduct({ productList, wishList, setWishList }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(12);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1587) {
        setProductsPerPage(4);
      } else if (window.innerWidth >= 1461) {
        setProductsPerPage(3);
      } else if (window.innerWidth >= 1157) {
        setProductsPerPage(2);
      } else {
        setProductsPerPage(1);
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);

    };
  }, []);


  const totalPages = Math.ceil(productList.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage; 

  const currentProducts = productList.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };



  console.log('products:', productList);
  function addToFav(product) {
    const isAlreadyInWishlist = wishList.some(item => item.id === product.id);
    if (!isAlreadyInWishlist) {
      setWishList([...wishList, product]);
    }
  }

  return (
    <div className="productcontainer">
      <div className='Title'>
        <p>HOT SALES</p>
        <h2>Check The Hit Products</h2>
      </div>
      <br/>
      <br/>
      <br/>

      <div className="products">
          {currentProducts.map((product) => (
            <div key={product.id} className="cards">
              <Link to={`products/${product.productId}`}>
                <br /> <br />
                <img src={product.productImage} alt="cart" />
              </Link>
              <br /> 
              <div className="contairr">
                <div className="priceTag">
                  <p>{product.productName}</p>
                  <p>Price: {product.productPrice} SAR</p>
                </div>

                <button className="cartbutton">ADD&nbsp;TO&nbsp;CART</button>
              <div className='subicon'>
              <div className="icon-circle">
                <FavoriteIcon2 />
              </div>
              <div className="icon-circle">
                <RemoveRedEyeIcon />
              </div>
              </div>
            </div>
          </div>
        ))}
        
      </div>
      {totalPages > 1 && ( // Conditionally render Pagination if needed
        <div className="pagination-container">
          <Pagination
            shape="rounded"
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange} // Use handlePageChange for Material UI integration
          />
        </div>
      )}
    </div>
  );
}