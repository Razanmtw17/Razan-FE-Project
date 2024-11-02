import React from 'react'
import HeroSection from '../components/hero/HeroSection';
import Categories from '../components/categories/Categories';
import SubCategories from '../components/subcategories/SubCategories';
import HomeProduct from '../components/homeproduct/HomeProduct';
import Offer from '../components/offer/Offer';
import Subscription from '../components/subscription/Subscription';
export default function HomePage({productList, wishList,setWishList }) {
  return (
    <div>
        <HeroSection/>
        <Categories/>
        <SubCategories/>
        <HomeProduct productList = {productList}/>
        <Offer/>
        <Subscription/>
    </div>
  )
}
