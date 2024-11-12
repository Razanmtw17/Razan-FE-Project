
import React from "react";
import { Link } from "react-router-dom";
import './NotFound.css';
export default function NotFoundPage() {
   return (
     <div className="not-found-page">
       <h1 className="not-found-title">404</h1>
       <p className="not-found-message">
         Sorry, the page you are looking for could not be found.
       </p>
       <Link to="/" className="not-found-button">
         Go back to homepage
       </Link>
     </div>
   );
}
