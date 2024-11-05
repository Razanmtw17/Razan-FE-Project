import React from 'react'
import NavBar from '../navbar/NavBar';
import Footer from '../footer/Footer';
import {Outlet} from 'react-router-dom';
export default function LayOut({ cartItemsCount }) {
  return (
    <div>
      <NavBar cartItemsCount={cartItemsCount} />
      <Outlet />
      <Footer />
    </div>
  );
}
