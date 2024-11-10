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
import UserProfile from "./components/user/UserProfile";
import ProtectedRout from "./components/user/ProtectedRout";
import DashBord from "./components/dashboard/DashBord";
function App() {
  const url="http://localhost:5125/";
  const productUrl = "http://localhost:5125/api/v1/products";
  const [respone, setResponse] = useState("");
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
   

  //user 
  const [userDate , setUserDate] = useState(null);
  const [isUserDataLoading , setIsUserDataLoading] = useState(true);
  function getUserDate(){
    const token = localStorage.getItem("token");
    axios.get("http://localhost:5125/api/v1/Users/auth", {
      headers : {
        Authorization: `Bearer ${token}`,
      }
    }).then((res) => {
      setUserDate(res.data);
      setIsUserDataLoading(false);
    }).catch((err) => {
      setIsUserDataLoading(false);
      console.log(err);
    });
  }
  useEffect(() => {
    getUserDate();
  }, []);
  let isAuthenticated = userDate ? true : false ;
  let shouldCheckAdmin = true;
  console.log(userDate,"from app");
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <LayOut
          cartItemsCount={cartItemsCount}
          isAuthenticated={isAuthenticated}
          shouldCheckAdmin={shouldCheckAdmin}
          userDate={userDate}
        />
      ),
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
          element: <UserLogin getUserData={getUserDate} />,
        },
        {
          path: "/profile",
          element: (
            <ProtectedRout
              isUserDataLoading={isUserDataLoading}
              isAuthenticated={isAuthenticated}
              element={
                <UserProfile userDate={userDate} setUserDate={setUserDate} />
              }
            />
          ),
        },
        {
          path: "/dashboard",
          element: (
            <ProtectedRout
              isUserDataLoading={isUserDataLoading}
              isAuthenticated={isAuthenticated}
              shouldCheckAdmin={shouldCheckAdmin}
              userDate={userDate}
              element={<DashBord productList={productList} />}
            />
          ),
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
