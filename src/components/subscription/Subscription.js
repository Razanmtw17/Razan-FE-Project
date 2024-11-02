import React , {useState} from 'react';
import './Subscription.css';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
export default function Subscription() {
    const [open, setOpen] = useState(false);  
    const handleClick = () => {
        setOpen(true);
      };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
      
        setOpen(false);
    };
  return (
    <div className="sub">
        <div className='Title'>
            <p>YOUR FAVORITE STORE</p>
            <h2>Join Our List</h2>
            <span>Join our newsletter to stay up to date with our <br/>latest products and offers.</span>
            <form className='subscription'>
                <input type="text" placeholder='Enter Your Email'/>
                <input type="button" onClick={handleClick} value="SUBMIT NOW"/>
                <Snackbar open={open} autoHideDuration={10000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">  
                        Subscription successful!
                    </Alert>
                </Snackbar>
            </form>
        </div>
    </div>
  )
}
