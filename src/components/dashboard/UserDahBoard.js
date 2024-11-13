import React, { useState, useEffect } from "react";
import "./dashboard.css";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function UserDahBoard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Adjust as needed
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const now = new Date();
  const userUrl =
    "https://sda-3-online-backend-teamwork-1xdo.onrender.com/api/v1/users";
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const getData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(userUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserList(response.data);
    } catch (error) {
      console.error(error);
      // Handle error, e.g., show an error message to the user
    }
  };

  useEffect(() => {
    getData();
  }, []);
   


 
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayedUsers(userList.slice(startIndex, endIndex)); // Update displayedUsers state
  }, [currentPage, itemsPerPage, userList]);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const totalPages = Math.ceil(userList.length / itemsPerPage);
  const handleDeleteClick = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const url = `https://sda-3-online-backend-teamwork-1xdo.onrender.com/api/v1/users/${userId}`;
      await axios.delete(url);
      setOpen(true);
       const response = await axios.get(userUrl, {
         // Refetch the user list
         headers: {
           Authorization: `Bearer ${token}`,
         },
       });
       setUserList(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <table className="producttable">
        <thead className="theadproduct">
          <tr>
            <th className="trproduct">User Name</th>
            <th className="trproduct">First Name</th>
            <th className="trproduct">Last Name</th>
            <th className="trproduct">Email</th>
            <th className="trproduct">Phone Number</th>
            <th className="trproduct">Birth Date</th>
            <th className="trproduct"></th>
            <th className="trproduct"></th>
          </tr>
        </thead>
        <tbody className="tbodyproducts">
          {displayedUsers.map((row) => (
            <tr key={row.userId}>
              <td className="trproduct">{row.username}</td>
              <td className="trproduct">{row.firstName}</td>
              <td className="trproduct">{row.lastName}</td>
              <td className="trproduct">{row.email}</td>
              <td className="trproduct">{row.phoneNumber}</td>
              <td className="trproduct">{row.birthDate}</td>
              <td className="trproduct">
                <button onClick={() => handleDeleteClick(row.userId)}>
                  DELETE
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous Page
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next Page
        </button>

        {/* Optionally, add a dropdown for items per page: */}
        <select
          value={itemsPerPage}
          onChange={(event) => handleItemsPerPageChange(event.target.value)}
        >
          <option value="5">5 per page</option>
          <option value="10">10 per page</option>
          <option value="20">20 per page</option>
        </select>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            
            User deleted successfully!
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}
