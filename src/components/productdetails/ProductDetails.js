import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProductDetails.css";
import image from '../../images/hero section 1.webp';
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove"; 
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from '@mui/material/Box';
export default function ProductDetails() {
    const params = useParams();
    let productId = params.productId;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const url = "http://localhost:5125/api/v1/products/" + productId;
    const [quantity, setQuantity] = React.useState(1);

    useEffect(() => {
      function fetchData() {
        axios
          .get(url)
          .then((response) => {
            setProduct(response.data);
            setLoading(false);
          })
          .catch((error) => {
            setError("Failed to fetch data");
            setLoading(false);
          });
      }
      fetchData();
    }, [url]);
    console.log(product);
  
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
      {/* <div className="pdmaincontent">
        <img src={product.productImage} alt="" className="pdimage" />
        <div className="pddetails">
          <h1 className="pddetailsh1">{product.productName}</h1>
          <Stack spacing={0} className="pdrating">
            <Rating
              name="half-rating-read"
              defaultValue={3}
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
          <button className="pdcartbutton">ADD&nbsp;TO&nbsp;CART</button>
          <button className="pdwishlist">
            <FavoriteBorderIcon fontSize="small" />
          </button>
        </div>
      </div>
      <div className="pddescription"></div> */}
      <h1>{product}</h1>
    </div>
  );
}
