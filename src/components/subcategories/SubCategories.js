import React from 'react'
import './SubCategories.css';
export default function SubCategories() {
  return (
    <div>
        <div className="subcategorycontainer">
            <div className="subcategoryitem">
                <button>LIGHTNINGS</button>
            </div>
            <div className="subcategoryitem">
                <div className="subitem">
                    <p>TOP CATEGORIES</p>
                    <h2>Perfect For Your House</h2>
                    <button className='subitembutton'>SHOP NOW</button>
                </div>
                <div className="subitem">
                    <button className='subitembutton'>ROOM SET</button>
                </div>
            </div>
            <div className="subcategoryitem">
                <div className="subitem">
                    <button className='subitembutton'>SERVICE TABLE</button>
                </div>
                <div className="subitem">
                    <button className='subitembutton'>MODERN LOOK</button>
                </div>
            </div>
        </div>
    </div>
  )
}
