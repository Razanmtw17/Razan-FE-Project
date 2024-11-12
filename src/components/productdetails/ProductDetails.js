import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProductDetails.css";

import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove"; 
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import FavoriteIcon2 from "@mui/icons-material/Favorite";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Link } from "react-router-dom";
export default function ProductDetails({ cart, setCart }) {
  const params = useParams();
  let productId = params.productId;
  let reviewUrl = "http://localhost:5125/api/v1/Reviews/product/" + productId;
  const relatedProductsUrl = `http://localhost:5125/api/v1/Products/productsBySubcategory/`;
  const [product, setProduct] = useState(null);
  const [reviwe, setReviews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const url = "http://localhost:5125/api/v1/products/" + productId;
  const [quantity, setQuantity] = React.useState(1);
  const [value, setValue] = React.useState("1");
  const firstThreeProducts = relatedProducts.slice(0, 3);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function addToCart(product) {
    // Check if the product is already in the cart
    const isAlreadyInCart = cart.some(
      (item) => item.productId === product.productId
    );

    if (isAlreadyInCart) {
      // If already in cart, update the quantity
      setCart(
        cart.map((item) =>
          item.productId === product.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // If not in cart, add it with an initial quantity of 1
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  }
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    const totalProducts = localStorage.getItem("totalProducts");
    setCartItemsCount(parseInt(totalProducts) || 0);
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await axios.get(
          `http://localhost:5125/api/v1/products/${productId}`
        );
        setProduct(productResponse.data);

        const reviewsResponse = await axios.get(reviewUrl);
        setReviews(reviewsResponse.data);

        const relatedProductsResponse = await axios.get(
          relatedProductsUrl + productResponse.data.subCategoryName
        );
        setRelatedProducts(relatedProductsResponse.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId]);
  console.log(reviewUrl);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div>
      {loading && <p>Loading product details...</p>}
      {error && <p>Error: {error}</p>}
      {product && (
        <div className="pdmaincontent">
          <img src={product.productImage} alt="" className="pdimage" />
          <div className="pddetails">
            <h1 className="pddetailsh1">{product.productName}</h1>
            <Stack spacing={0} className="pdrating">
              <Rating
                name="half-rating-read"
                defaultValue={product.averageRating}
                precision={0.5}
                readOnly
              />
            </Stack>
            <p className="pdprice">Price $ {product.productPrice}</p>
            <hr className="pdhr" />
            <p className="pdtt">Grab the best quality with best price.</p>
            <h4 className="details">
              Weight: <span className="choises">{product.weight}</span>
            </h4>
            <h4 className="details">
              Color: <span className="choises2">{product.productColor}</span>
            </h4>
            <p className="pdtt">Category : {product.subCategoryName}</p>
            <IconButton onClick={handleDecrement}>
              <RemoveIcon />
            </IconButton>
            <TextField
              className="pdquantity"
              value={quantity}
              slotProps={{
                htmlInput: {
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                },
              }}
            />
            <IconButton onClick={handleIncrement}>
              <AddIcon />
            </IconButton>
            <button nClick={() => addToCart(product)} className="pdcartbutton">
              ADD&nbsp;TO&nbsp;CART
            </button>
            <button className="pdwishlist">
              <FavoriteBorderIcon fontSize="small" />
            </button>
          </div>
        </div>
      )}
      <div className="pddescription">
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Description" value="1" />
                <Tab label="Reviews" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <p className="pddesss">{product?.description}</p>
            </TabPanel>
            <TabPanel value="2">
              {reviwe && reviwe.length > 0 ? (
                <div className="pdreviews">
                  <h2>Reviews</h2>
                  <table>
                    <thead>
                      <tr>
                        <th>User</th>
                        <th>Comment</th>
                        <th>Rating</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reviwe.map((r) => (
                        <tr key={r.reviewId}>
                          <td>
                            <p>Anonymos</p>
                          </td>
                          <td>
                            <p>{r.comment}</p>
                          </td>
                          <td>
                            <Rating
                              name="read-only"
                              value={r.rating}
                              readOnly
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>No reviews yet.</p>
              )}
            </TabPanel>
          </TabContext>
        </Box>
        <div className="relatedproducts">
          <div className="relatiedtitle">
            <p>TOP RATED</p>
            <h2>Related Products</h2>
            {relatedProducts.length > 0 ? (
              <div className="products">
                {firstThreeProducts.map((relatedProduct) => (
                  <div key={relatedProduct.id} className="cards">
                    {/* Link to product details if needed (replace with your routing logic) */}
                    <Link to={`products/${relatedProduct.id}`}>
                      <br /> <br />
                      <img
                        src={relatedProduct.productImage}
                        alt={relatedProduct.productName}
                      />
                    </Link>
                    <br />
                    <div className="contairr">
                      <div className="priceTag">
                        <p>{relatedProduct.productName}</p>
                        <p>Price: ${relatedProduct.productPrice} SAR</p>
                      </div>
                      <button className="cartbutton">ADD&nbsp;TO&CART</button>
                      <div className="subicon">
                        <div className="icon-circle">
                          <FavoriteIcon2 />
                        </div>
                        <div className="icon-circle">
                          <RemoveRedEyeIcon />{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No related products found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
