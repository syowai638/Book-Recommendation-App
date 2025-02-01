import React from "react";
import { NavLink } from "react-router-dom";
import BookSearch from "./BookSearch";


function Navbar({ searchTerm, onSearch }) {


   return (
       <div>
           <nav id='navbar'>
               <h1 id='title'>Book Recommendation App</h1>
               <div className="navbar-menu">
                   <NavLink to='/home' className='nav-link'>Home</NavLink>
                   <NavLink to='/ratingform' className='nav-link'>Rating</NavLink>
               </div>
               <BookSearch searchTerm={searchTerm} onSearch={onSearch} />
           </nav>


       </div>
   )
}


export default Navbar;
