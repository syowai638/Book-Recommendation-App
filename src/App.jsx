import React, { useState, useEffect } from "react";
import BookList from './Components/BookList';
import NavBar from "./Components/NavBar";
import Footer from './Components/Footer';
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch('http://localhost:4000/books')
      .then(res => res.json())
      .then(data => setBooks(data))
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <NavBar searchTerm={searchTerm} onSearch={handleSearch} />
      <BookList books={filteredBooks} />
      <Footer />
    </>
  );
}

export default App;

