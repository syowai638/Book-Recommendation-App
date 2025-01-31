import React, { useState, useEffect } from "react";
import BookSearch from "./Components/BookSearch";
import RatingForm from "./Components/RatingForm";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch all books initially when the app loads
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    fetch("http://localhost:3001/books")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  };

  const handleRatingSubmit = (bookId, rating) => {
    // Handle rating submission (updating state or sending it to the server)
    // This can also send the rating back to the server if necessary
  };

  return (
    <div className="App">
      <h1>Book Recommendation App</h1>
      
      <BookSearch setBooks={setBooks} /> {/* Pass setBooks to BookSearch */}

      <h2>Books List</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <h3>{book.title}</h3>
            <p>{book.genre}</p>
            <p>Rating: {book.rating || "No rating yet"}</p>
          </li>
        ))}
      </ul>

      {books.length > 0 && (
        <div>
          <h2>Rate a Book</h2>
          <RatingForm books={books} onRatingSubmit={handleRatingSubmit} />
        </div>
      )}
    </div>
  );
}

export default App;
