import React, { useState, useEffect } from "react";
import BookSearch from "./Components/BookSearch";
import RatingForm from "./Components/RatingForm";
import BookList from './Components/BookList';
import Navbar from "./Components/Navbar";
import Footer from './Components/Footer';
import "./App.css

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
  fetch('http://localhost:4000/books')
      .then(res => res.json())
      .then(data => setBooks(data))
  }, []);

  return (
    <><Navbar /></>
    <><BookList books={books} /></>
    <><Footer /></>
  );
}

export default App;

