import React from 'react'
import NavBar from '../navbar/NavBar';
import Footer from '../footer/Footer';
import {Outlet} from 'react-router-dom';
export default function LayOut({ cartItemsCount, isAuthenticated, userDate, cart }) {
  return (
    <div>
      <NavBar
        cartItemsCount={cartItemsCount}
        isAuthenticated={isAuthenticated}
        userDate={userDate}
        cart={cart}
      />
      <Outlet />
      <Footer />
    </div>
  );
}
