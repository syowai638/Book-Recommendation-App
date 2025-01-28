import React from "react";

function Navbar (){
      

    return (
        <div>
            <nav id='navbar'>
                <h1 id='title'>Book Recommendation App</h1>
                <ul className="navbar-menu">
                    <li><a href=''>Home</a></li>
                    <li><a href='#List'>List</a></li>
                    <li><a href ='#Details'>Details</a></li>
                    <li><a href ='#search'>Search</a></li>
                </ul>
            </nav>
        </div>
    )
}export default Navbar;