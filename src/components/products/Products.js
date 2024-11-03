import React, { useState, useEffect } from "react";
import { Pagination } from "@mui/material";
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
export default function Products({productList}) {
  const [sort, setSort] = React.useState("");
  const handleChange = (event) => {
    setSort(event.target.value);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(12);
  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth >= 1587) {
  //       setProductsPerPage(4);
  //     } else if (window.innerWidth >= 1461) {
  //       setProductsPerPage(3);
  //     } else if (window.innerWidth >= 1157) {
  //       setProductsPerPage(2);
  //     } else {
  //       setProductsPerPage(1);
  //     }
  //   };

  //   handleResize(); // Initial check
  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);
  const totalPages = Math.ceil(productList.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = productList.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  console.log("products:", productList);
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
                <p>The highest price to lowest price</p>
                $ <input className="priceRange" type="text" />{" "}
                <input className="priceRange" type="text" />
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
        <div className="product-grid">
          <div className="two-sections">
            <div className="product-grid-head">
              <p>
                Showing {indexOfFirstProduct+1} - {indexOfLastProduct} of{" "}
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
                    label="Chair"
                    variant="standard"
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
                      label="Age"
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
              <div className="products">
                {currentProducts.map((product) => (
                  <div key={product.id} className="cards">
                    <Link to={`products/${product.productId}`}>
                      <br /> <br />
                      <img src={product.productImage} alt="cart" />
                    </Link>
                    <br />
                    <div className="contairr">
                      <div className="priceTag">
                        <p>{product.productName}</p>
                        <p>Price: {product.productPrice} SAR</p>
                      </div>

                      <button className="cartbutton">
                        ADD&nbsp;TO&nbsp;CART
                      </button>
                      <div className="subicon">
                        <div className="icon-circle">
                          <FavoriteIcon2 />
                        </div>
                        <div className="icon-circle">
                          <RemoveRedEyeIcon />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {totalPages > 1 && ( // Conditionally render Pagination if needed
                <div className="pagination-container">
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
