return (
  <div>
    <div className="HeadTitle">
      <img className="hh" src={image} alt="head title" />
      <h1>CART</h1>
    </div>
    {cart.length === 0 ? (
      <p className="empty-cart-message">Your cart is currently empty.</p>
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
  </div>
);
