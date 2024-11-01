import React from 'react';
import './Categories.css';
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import ChairOutlinedIcon from '@mui/icons-material/ChairOutlined';
import DeckOutlinedIcon from '@mui/icons-material/DeckOutlined';
import DiningOutlinedIcon from '@mui/icons-material/DiningOutlined';
import BabyChangingStationOutlinedIcon from '@mui/icons-material/BabyChangingStationOutlined';

export default function Categories() {
  return (
    <div>
        <div className="container">
            <div className="item">
              <BedOutlinedIcon sx={{ width: '90px', height: '70px' , color:'#375367'}}/>
              <p>BedRooms</p>
            </div>
            <div className="item">
              <ChairOutlinedIcon sx={{ width: '90px', height: '70px', color:'#375367' }}/>
              <p>Living Room</p>
            </div>
            <div className="item">
              <DeckOutlinedIcon sx={{ width: '90px', height: '70px' , color:'#375367'}}/>
              <p>Out Door</p>
            </div>
            <div className="item">
              <DiningOutlinedIcon sx={{ width: '90px', height: '70px', color:'#375367' }}/>
              <p>Dining Room</p>
            </div>
            <div className="item">
              <BabyChangingStationOutlinedIcon  sx={{ width: '90px', height: '70px', color:'#375367' }}/>
              <p>Nurssary</p>
            </div>
        </div>
    </div>
  )
}
