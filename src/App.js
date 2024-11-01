import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import LayOut from "./components/layout/LayOut";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
function App() {
  const url1="http://localhost:5125/";
  const productUrl = "http://localhost:5125/api/v1/products";
  const url= "https://fakestoreapi.com/products";
  const [respone, setResponse] = useState("");
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [userInput, setUserInput] = useState("");
  const [wishList, setWishList] = useState([]);
  function getData() {
    axios
      .get(url)
      .then((response) => {
        setProductList(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }
  useEffect(() => {
    getData()
  }, []);
  // function getDatafromServer() {
  //   axios
  //     .get(url)
  //     .then((response) => {
  //       console.log(response.data);
  //       setResponse(respone.data);
  //     })
  //     .catch((error) => {
  //       setError(error);
  //       setLoading(false);
  //     });
  // }
  // useEffect(() => {
  //   getDatafromServer()
  // }, []);
  const router = createBrowserRouter([
    {
      path:"/",
      element: <LayOut/>,
      children: [
        {
          path: "/",
          element: <HomePage productList={productList.slice(0, 8)} wishList={wishList}
          setWishList={setWishList}/>,
        }
      ]
    }
  ])
  return (
  <div>
   <RouterProvider router={router} />
  </div>
  );
}

export default App;
