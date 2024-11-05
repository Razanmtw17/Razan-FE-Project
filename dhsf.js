{relatedProducts.length > 0 ? (
  <div className="products">
    {relatedProducts.map((relatedProduct) => (
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
              {/* Assuming FavoriteBorderIcon2 is your wishlist icon */}
            </div>
            <div className="icon-circle">
              <RemoveRedEyeIcon />{" "}
              {/* Assuming RemoveRedEyeIcon is your view details icon */}
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
) : (
  <p>No related products found.</p>
);}