import React, { useState } from "react";
import Navbar from "./NavBar";

const RatingForm = ({ bookId, books, setBooks }) => {
  const [rating, setRating] = useState(0);
  const [isRecommended, setIsRecommended] = useState(false);

  const handleRate = () => {
    if (rating > 0) {
      const bookToUpdate = books.find((book) => book.id === bookId);
      const updatedRating = (bookToUpdate.rating + rating) / 2; // Averaging ratings

      fetch(`http://localhost:3001/books/${bookId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating: updatedRating }),
      })
        .then((res) => res.json())
        .then((updatedBook) => {
          setBooks((prevBooks) =>
            prevBooks.map((book) => (book.id === bookId ? updatedBook : book))
          );
          alert(`You rated this book ${rating} stars!`);
        });
    }
  };

  const handleRecommend = () => {
    const bookToUpdate = books.find((book) => book.id === bookId);
    const updatedRecommendations = bookToUpdate.recommendations + 1;

    fetch(`http://localhost:3001/books/${bookId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recommendations: updatedRecommendations }),
    })
      .then((res) => res.json())
      .then((updatedBook) => {
        setBooks((prevBooks) =>
          prevBooks.map((book) => (book.id === bookId ? updatedBook : book))
        );
        setIsRecommended(true);
      });
  };

  return (
    <>
      <Navbar />
      <main className="rating-form">
        <h1>Rate and Recommend</h1>
        <div className="rating-section">
          <label htmlFor="rating" className="rating-title">Rating:</label>
          <select
            id="rating"
            name="rating"
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
          >
            <option value="0">Select a rating</option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <button type="button" onClick={handleRate} disabled={rating === 0}>
            Rate Book
          </button>
        </div>
        <button type="button" onClick={handleRecommend} disabled={isRecommended}>
          {isRecommended ? "Recommended ✔" : "Recommend Book"}
        </button>
      </main>
    </>
  );
};

export default RatingForm;
