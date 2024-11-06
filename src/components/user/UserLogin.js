import React from 'react'
import { Link } from "react-router-dom";

export default function UserLogin() {
   return (
     <div>
       <div className="signupdiv">
         <h3>Sign In</h3>
       
         <form className="registerform">
           <input type="text" placeholder="Email" required />
           <input type="password" placeholder="Password" required />
           <button className="createbutton">SIGN IN</button>
         </form>
         <hr className='signinhr'/>
         <div className='forgotandsing'>
          <Link ><p>Forgot Your Password?</p></Link>
          <Link to='/register'><p>Sign Up</p></Link>
         </div>
       </div>
     </div>
   ); 
}
