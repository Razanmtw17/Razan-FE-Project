import React from 'react';
import image from "../../images/head title.jpeg";
import './Cart.css';
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Link } from "react-router-dom";
import EditNoteIcon from "@mui/icons-material/EditNote";

export default function Cart({ cart, setCart }) {
    const [quantity, setQuantity] = React.useState(1);
    const [value, setValue] = React.useState("1");
    if (!cart) {
      console.error("Cart prop is undefined");
      return null; // Or display an error message
    }
  const handleQuantityChange = (productId, newQuantity) => {
    setCart(
      cart.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.max(1, parseInt(newQuantity)) }
          : item
      )
    );
  };
  let totalPrice = 0;
  const handleRemoveProduct = (productId) => {
    setCart(cart.filter((item) => item.productId !== productId));
  };
  return (
    <div>
      <div className="HeadTitle">
        <img className="hh" src={image} alt="head title" />
        <h1>CART</h1>
      </div>
      {cart.length === 0 ? (
        <div className="empty-cart-message">
          <h2>Your cart is currently empty.</h2>
          <Link to="/">
            <button className="pdcartbutton">CONTINUE&nbsp;SHOPPING</button>
          </Link>
        </div>
      ) : (
        <div className="cartContentheader">
          <div>
            <h4>Product</h4>
          </div>
          <div>
            <h4>Quantity</h4>
          </div>
          <div>
            <h4>Total</h4>
          </div>
        </div>
      )}
      {cart.map((item) => {
        return (
          <div className="cartcontent" key={item.productId}>
            <div className="cartproduct">
              <div className="cartproductdetails">
                <div>
                  <img
                    className="cartproductdetailsimage"
                    src={item.productImage}
                    alt={item.productName}
                  />
                </div>
                <div>
                  <p>Description</p>
                  <p>{item.productName}</p>
                  <p>Color:</p>
                  <p>{item.productColor}</p>
                </div>
              </div>
            </div>
            <div className="cartquantity">
              <IconButton
                onClick={() =>
                  handleQuantityChange(item.productId, item.quantity - 1)
                }
                disabled={item.quantity <= 1}
              >
                <RemoveIcon />
              </IconButton>
              <TextField
                className="pdquantity"
                value={item.quantity}
                onChange={(e) =>
                  handleQuantityChange(item.productId, parseInt(e.target.value))
                }
                inputProps={{
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                  min: 1,
                }}
              />
              <IconButton
                onClick={() =>
                  handleQuantityChange(item.productId, item.quantity + 1)
                }
              >
                <AddIcon />
              </IconButton>
              <IconButton onClick={() => handleRemoveProduct(item.productId)}>
                <DeleteForeverIcon sx={{ color: "red" }} />
              </IconButton>
            </div>
            <div className="cartproducttotal">
              <p>{item.productPrice * item.quantity}</p>
            </div>
          </div>
        );
      })}
      {cart.length > 0 && (
        <div>
          <Link to="/">
            <button className="pdcartbuttoncart">CONTINUE SHOPPING</button>
          </Link>
          <br />
          <br />
          <br />
          <div className="notestotall">
            <div className="notes">
              <span>
                <EditNoteIcon />
              </span>
              <span>Add note</span>
              <br />
              <div className="writehere">
                <TextField
                  id="outlined-multiline-static"
                  placeholder="Enter the text here..."
                  multiline
                  rows={3}
                />
              </div>
            </div>
            <div className="total">
              <div className="counthere">
                <h5>
                  Total :{" "}
                  {cart.reduce(
                    (acc, item) => acc + item.productPrice * item.quantity,
                    0
                  )}
                </h5>
                <p>Taxes and shipping calculated at the checkout</p>
                <button className="pdcartbuttoncartcount">CHECK OUT</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

}
