import React, { useState, useEffect } from "react";
import { colors, Pagination } from "@mui/material";
import FavoriteIcon2 from "@mui/icons-material/Favorite";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Link } from "react-router-dom";
import "./Product.css";
import image from "../../images/head title.jpeg";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import DeleteIcon from "@mui/icons-material/Delete";
export default function Products({ productList, cart, setCart }) {
  const [sort, setSort] = React.useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(12);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);

  const handleChange = (event) => {
    setSort(event.target.value);
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
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(productList.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const filteredProducts = productList
    .slice(indexOfFirstProduct, indexOfLastProduct)
    .filter((product) => {
      const productPrice = parseFloat(product.productPrice);
      if (minPrice && maxPrice) {
        return productPrice >= minPrice && productPrice <= maxPrice;
      } else if (minPrice) {
        return productPrice >= minPrice;
      } else if (maxPrice) {
        return productPrice <= maxPrice;
      } else {
        return product.productName
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      }
    });

  const currentProducts = sort
    ? filteredProducts.sort((a, b) => {
        if (sort === 1) {
          return a.productName.localeCompare(b.productName); // Alphabetically A-Z
        } else if (sort === 2) {
          return b.productName.localeCompare(a.productName); // Alphabetically Z-A
        } else if (sort === 3) {
          return a.productPrice - b.productPrice; // Price low to high
        } else if (sort === 4) {
          return b.productPrice - a.productPrice; // Price high to low
        } else {
          return 0; // No sorting or default sorting
        }
      })
    : filteredProducts;

  return (
    <div>
      <div className="HeadTitle">
        <img className="hh" src={image} alt="head title" />
        <h1>ALL COLLECTIONS</h1>
        <p className="hhp">HOME | ALL COLLECTIONS</p>
      </div>
      <div className="maincontent">
        <div className="filter-section">
          <h2>Filter:</h2> <br />
          <div>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                Availabaility
              </AccordionSummary>
              <AccordionDetails>
                <input type="checkbox" /> In Stock
                <br />
                <input type="checkbox" /> Out Of Stock
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                Price
              </AccordionSummary>
              <AccordionDetails>
                <p>The highest price to lowest price</p>${" "}
                <input
                  className="priceRange"
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
                {" - "}
                <input
                  className="priceRange"
                  type="number" // Restrict input to numbers
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <DeleteIcon
                  onClick={() => setMinPrice("") && setMaxPrice("")}
                  sx={{ color: "red" }}
                />
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
        <div className="product-grid">
          <div className="two-sections">
            <div className="product-grid-head">
              <p>
                Showing {indexOfFirstProduct + 1} - {indexOfLastProduct} of{" "}
                {productList.length} Results
              </p>
              <div className="searchandsort">
                <Box
                  component="form"
                  sx={{ "& > :not(style)": { m: 1, width: "170px" } }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="standard-basic"
                    label="Search Products"
                    variant="standard"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                </Box>
                <Box sx={{ minWidth: 170 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label"></InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={sort}
                      label="Sort"
                      onChange={handleChange}
                    >
                      <MenuItem
                        defaultValue={"Alphabetically, A - Z"}
                        value={1}
                      >
                        Alphabetically, A-Z
                      </MenuItem>
                      <MenuItem value={2}>Alphabetically, Z-A</MenuItem>
                      <MenuItem value={3}>Price, low to high</MenuItem>
                      <MenuItem value={4}>Price, high to low</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </div>
            </div>
            <div className="mapProducts">
              <div className="products2">
                {currentProducts
                  .filter((product) =>
                    product.productName
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  )
                  .map((product) => (
                    <div key={product.productId} className="cards2">
                      <br /> <br />
                      <img src={product.productImage} alt="cart" />
                      <br />
                      <div className="contairr2">
                        <div className="priceTag2">
                          <p>{product.productName}</p>
                          <p>Price: {product.productPrice} SAR</p>
                        </div>

                        <button
                          className="cartbutton2"
                          onClick={() => addToCart(product)}
                        >
                          ADD&nbsp;TO&nbsp;CART
                        </button>
                        <div className="subicon2">
                          <div className="icon-circle2">
                            <FavoriteIcon2 />
                          </div>
                          <Link to={`${product.productId}`}>
                            <div className="icon-circle2">
                              <RemoveRedEyeIcon sx={{ color: "black" }} />
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <br />
              <br />
              {totalPages > 1 && ( // Conditionally render Pagination if needed
                <div className="pagination-container2">
                  <Pagination
                    shape="rounded"
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange} // Use handlePageChange for Material UI integration
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
