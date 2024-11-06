import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import LayOut from "./components/layout/LayOut";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import UserPage from "./pages/UserPage";
import UserRegister from './components/user/UserRegister';
import UserLogin from './components/user/UserLogin';
function App() {
  const url="http://localhost:5125/";
  const productUrl = "http://localhost:5125/api/v1/products";
  const [respone, setResponse] = useState("");
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishList, setWishList] = useState([]);
  const [cart, setCart] = useState([]);
    const [cartItemsCount, setCartItemsCount] = useState(0);

  function getData() {
    axios
      .get(productUrl)
      .then((response) => {
        setProductList(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }
  function getDatafromServer() {
    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
        setResponse(response.data);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }
  
  useEffect(() => {
    getDatafromServer()
    getData()
    
  }, []);
   
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayOut cartItemsCount={cartItemsCount} />,
      children: [
        {
          path: "/",
          element: (
            <HomePage
              productList={productList.slice(0, 8)}
              cart={cart}
              setCart={setCart}
            />
          ),
        },
        {
          path: "/products",
          element: (
            <ProductPage
              productList={productList}
              cart={cart}
              setCart={setCart}
            />
          ),
        },
        {
          path: "/products/:productId",
          element: <ProductDetailsPage />,
        },
        {
          path: "/cart",
          element: <CartPage cart={cart} setCart={setCart} />,
        },
        {
          path: "/register",
          element: <UserRegister />,
        },
        {
          path: "/login",
          element: <UserLogin />,
        },
      ],
    },
  ]);
  return (
  <div>
   <RouterProvider router={router} />
  </div>
  );
}

export default App;
