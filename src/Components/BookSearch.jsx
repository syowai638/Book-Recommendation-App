import React, { useState, useEffect } from "react";

const BookSearch = ({ setBooks }) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (searchTerm.trim() === "") {
      fetchBooks(); // Reset to all books when search is cleared
    } else {
      fetchFilteredBooks();
    }
  }, [searchTerm]);

  const fetchBooks = () => {
    fetch("http://localhost:3001/books")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  };

  const fetchFilteredBooks = () => {
    fetch(`http://localhost:3001/books?q=${searchTerm}`)
  
      .then((res) => res.json())
      .then((data) => setBooks(data));
  };

  return (
    <div>
      <label htmlFor="search">Search Books:</label>
      <input
        type="text"
        id="search"
        name="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by title or genre"
        aria-label="Search for books by title or genre"
      />
    </div>
  );
};

export default BookSearch;
