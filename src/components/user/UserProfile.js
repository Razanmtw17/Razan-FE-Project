import React, { useState } from "react";

import DatePicker from "react-datepicker";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { CloudDone } from "@mui/icons-material";

const validateField = (name, value, userInfo, setUserInfo, setError) => {
  let errorMessage = ""; // Initialize error message

  if (name === "firstName" || name === "lastName") {
    // Validate name: Only letters allowed

    if (!/^[a-zA-Z]+$/.test(value)) {
      errorMessage = "Invalid name: Only letters allowed";
    }
  } else if (name === "phoneNumber") {
    // Validate phone number: Only digits allowed (consider extensions)

    if (!/^\d+(-\d+)*$/.test(value)) {
      errorMessage =
        "Invalid phone number: Only digits and hyphens allowed (-)";
    }
  } else if (name === "email") {
    // Basic email validation regex (consider stricter validation if needed)

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(value)) {
      errorMessage = "Invalid email address";
    }
  } else if (name === "birthDate") {
    // Validate date: Not more than 90 years in the past, not a future date

    const today = new Date();

    const ninetyYearsAgo = new Date(
      today.getFullYear() - 90,

      today.getMonth(),

      today.getDate()
    );

    const parsedDate = new Date(value);

    if (
      isNaN(parsedDate.getTime()) ||
      parsedDate > today ||
      parsedDate < ninetyYearsAgo
    ) {
      errorMessage =
        "Invalid date: Enter a valid date within the past 90 years";
    }
  }

  if (errorMessage) {
    // Handle error: Display error message, prevent state update

    setError(errorMessage);

    return;
  } // Update userInfo state only if all validations pass

  setUserInfo({ ...userInfo, [name]: value });

  setError(""); // Clear error message after successful validation
};
function validateBirthDate(date) {
  const today = new Date();
  const eighteenYearsAgo = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );

  if (isNaN(date.getTime())) {
    return "Invalid date format";
  } else if (date > today) {
    return "Date cannot be in the future";
  } else if (date > eighteenYearsAgo) {
    return "You must be at least 18 years old to create an account";
  }

  return null; // Valid date
}
export default function UserProfile({ userDate }) {
  const [selectedOption, setSelectedOption] = useState("option1");

  const [isEditing, setIsEditing] = useState(false);

  const [updatedUserData, setUpdatedUserData] = useState(userDate);

  const [error, setError] = useState(""); // State for error message

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };
  const [birthDateError, setBirthDateError] = useState(null);
const handleChangeBirthDate = (date) => {
  const error = validateBirthDate(date);

  if (error) {
    setBirthDateError(error);
  } else {
    setUpdatedUserData({ ...updatedUserData, birthDate: date });
    setBirthDateError(null);
  }
};
  const handleChange = (e) => {
    validateField(
      e.target.name,
      e.target.value,
      updatedUserData,
      setUpdatedUserData,
      setError
    );

    // Check for birthDate validation error and display it inline
    if (e.target.name === "birthDate" && error) {
      console.error("Birthdate Error:", error); // Log the error for debugging
      // Display error message below the DatePicker
      // You can use a separate state variable to control error display
    }
  };

const handleSave = async () => {
  try {
    const response = await axios.put(
      `http://localhost:5125/api/v1/Users/${userDate.userId}`,
      updatedUserData
    );
    const updatedUser = response.data;
    setUpdatedUserData(updatedUser); // Update the state with the updated user data
    setIsEditing(false); // Close the editing mode
    setOpen(true); // Show success Snackbar
  } catch (error) {
    
    setOpen(true);
    // Handle errors (optional: show an error message)
  }
};
const navigate = useNavigate(); // Initialize useNavigate

const handleDeleteClick = async () => {
  try {
    await axios.delete(`http://localhost:5125/api/v1/Users/${userDate.userId}`);
    console.log("User deleted successfully");
    navigate("/"); // Redirect to homepage
  } catch (error) {
    console.error("Error deleting user:", error);
    // Handle error, e.g., show an error message
  }
};
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDiscard = () => {
    setUpdatedUserData(userDate); // Reset to original user data

    setIsEditing(false); // Set editing mode to false after discarding
  };
 const [open, setOpen] = useState(false);
 const handleClick = () => {
   setOpen(true);
 };
 const handleClose = (event, reason) => {
   if (reason === "clickaway") {
     return;
   }

   setOpen(false);
 };
const [isEditingPassword, setIsEditingPassword] = useState(false);
 const [oldPassword, setOldPassword] = useState("");
 const [newPassword, setNewPassword] = useState("");
 const [confirmPassword, setConfirmPassword] = useState("");
 const [passwordError, setPasswordError] = useState("");
 console.log("from profiel",userDate);
const handleUpdatePassword = async () => {
  // Validate old password

  if (oldPassword !== userDate.password) {
    setPasswordError("Incorrect old password");

    console.log("not match pass");

    return;
  } // Validate new password (consider minimum length and complexity)

  if (
    !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\da-zA-Z])([^\s]){8,}$/.test(
      newPassword
    )
  ) {
    setPasswordError(
      "Password must be at least 8 characters and include uppercase, lowercase, numbers, and special characters"
    );

    console.log(
      "Password must be at least 8 characters and include uppercase, lowercase, numbers, and special characters"
    );

    return;
  } // Validate new password matches confirm password

  if (newPassword !== confirmPassword) {
    setPasswordError("Passwords do not match");

    return;
  }

  try {
    // Send API request to update password

    const response = await axios.put(
      `http://localhost:5125/api/v1/Users/${userDate.userId}`,
      {
        newPassword,
      }
    ); // Password updated successfully, handle success

    setPasswordError("");

    setOldPassword("");

    setNewPassword("");

    setConfirmPassword("");

    setIsEditingPassword(false); // Show success message

    setOpen(true);
  } catch (error) {
    // Handle API errors more specifically (e.g., network error, server error)

    console.error("Error updating password:", error);

    setPasswordError("An error occurred while updating password");
  }
};
const handlePasswordChange = (e) => {
  switch (e.target.name) {
    case "oldpassword":
      setOldPassword(e.target.value);
      break;
    case "newpassword":
      setNewPassword(e.target.value);
      break;
    case "confirmpassword":
      setConfirmPassword(e.target.value);
      break;
  }
};
  return (
    <div>
      <div className="userprofilecontainer">
        <br /> <h2>Welcome {userDate.firstName}</h2>
        <div className="userprofileinfo">
          <div className="left-side">
            <button
              className={`option ${
                selectedOption === "option1" ? "active" : ""
              }`}
              onClick={() => handleOptionClick("option1")}
            >
              Information
            </button>

            <button
              className={`option ${
                selectedOption === "option2" ? "active" : ""
              }`}
              onClick={() => handleOptionClick("option2")}
            >
              Change Password
            </button>
          </div>

          <div className="right-side">
            {selectedOption === "option1" ? (
              <div className="option1div">
                <div className="input-container">
                  <label>UserName : </label>

                  <input
                    type="text"
                    name="username"
                    value={updatedUserData.username}
                    onChange={(e) => {
                      handleChange(e);
                      // Check for error and display it inline (optional)
                      if (error) {
                        <p className="error-message">{error}</p>; // Inline error display
                      }
                    }}
                    disabled={!isEditing}
                    placeholder="Username"
                  />
                  <br />
                  <label>First Name: </label>

                  <input
                    type="text"
                    name="firstName"
                    value={updatedUserData.firstName}
                    disabled={!isEditing}
                    onChange={(e) => {
                      handleChange(e);
                      // Check for error and display it inline (optional)
                      if (error) {
                        <p className="error-message">{error}</p>; // Inline error display
                      }
                    }}
                    placeholder="First Name"
                  />

                  <br />
                  <label>Last Name: </label>

                  <input
                    type="text"
                    name="lastName"
                    value={updatedUserData.lastName}
                    disabled={!isEditing}
                    onChange={handleChange}
                    placeholder="Last Name"
                  />
                  <br />
                  <label>Birth Date : </label>

                  <DatePicker
                    selected={updatedUserData.birthDate}
                    onChange={handleChangeBirthDate}
                    disabled={!isEditing}
                    placeholderText="Birth Date"
                  />

                  <br />
                  <label>Phone No : </label>

                  <input
                    type="tel"
                    name="phoneNumber"
                    value={updatedUserData.phoneNumber}
                    onChange={handleChange}
                    disabled={!isEditing} // Only disable when not editing
                    placeholder="Phone Number"
                  />
                  <br />
                  <label>
                    Email
                    <span className="dot">........</span> :
                  </label>

                  <input
                    type="email"
                    value={updatedUserData.email}
                    disabled={!isEditing}
                    name="email"
                    onChange={handleChange}
                    placeholder="Email"
                  />
                  <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                  >
                    <Alert onClose={handleClose} severity="error">
                      User updated failed!
                    </Alert>
                  </Snackbar>
                  <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                  >
                    <Alert onClose={handleClose} severity="success">
                      User updated successfully!
                    </Alert>
                  </Snackbar>
                  <Snackbar
                    open={Boolean(birthDateError)}
                    autoHideDuration={6000}
                    onClose={() => setBirthDateError(null)}
                  >
                    <Alert
                      onClose={() => setBirthDateError(null)}
                      severity="error"
                    >
                      {birthDateError}
                    </Alert>
                  </Snackbar>
                  <Snackbar
                    open={Boolean(error)}
                    autoHideDuration={6000}
                    onClose={handleClose}
                  >
                    <Alert onClose={handleClose} severity="error">
                      {error}
                    </Alert>
                  </Snackbar>
                </div>

                <div className="button-container">
                  {!isEditing && (
                    <div className="button-container">
                      <button
                        className="btn btn-primary"
                        onClick={handleEditClick}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={handleDeleteClick}
                      >
                        Delete
                      </button>
                    </div>
                  )}

                  {isEditing && (
                    <>
                      <button className="btn btn-primary" onClick={handleSave}>
                        Save Changes
                      </button>

                      <button
                        className="btn btn-secondary"
                        onClick={handleDiscard}
                      >
                        Discard Changes
                      </button>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="option1div">
                <div className="input-container">
                  <label>Old Password : </label>
                  <br />
                  <input
                    type="password"
                    name="oldpassword"
                    disabled={!isEditing}
                    placeholder="old password"
                    onChange={handlePasswordChange}
                  />
                  <br />
                  <label>New Password: </label>
                  <br />
                  <input
                    type="password"
                    name="newpassword"
                    disabled={!isEditing}
                    placeholder="new password"
                    onChange={handlePasswordChange}
                  />

                  <br />
                  <label>Confirm Password: </label>
                  <br />
                  <input
                    type="password"
                    name="confirmpassword"
                    disabled={!isEditing}
                    onChange={handlePasswordChange}
                    placeholder="Confirm password"
                  />
                </div>

                <div className="button-container">
                  {!isEditing && (
                    <div className="button-container">
                      <button
                        className="btn btn-primary"
                        onClick={handleEditClick}
                      >
                        Update Password
                      </button>
                    </div>
                  )}

                  {isEditing && (
                    <>
                      <button
                        className="btn btn-primary"
                        onClick={handleUpdatePassword}
                      >
                        Save Changes
                      </button>

                      <button
                        className="btn btn-secondary"
                        onClick={handleDiscard}
                      >
                        Discard Changes
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
