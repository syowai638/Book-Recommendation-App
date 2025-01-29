import React, { useState } from 'react';

const RatingForm = ({ bookId, onRate, onRecommend }) => {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value));
  };

  const handleRate = () => {
    onRate(bookId, rating);
  };

  const handleRecommend = () => {
    onRecommend(bookId);
  };

  return (
    <div>
      <h2>Rate and Recommend</h2>
      <label htmlFor="rating">Rating:</label>
      <select id="rating" name="rating" value={rating} onChange={handleRatingChange}>
        <option value="0">Select a rating</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <button type="button" onClick={handleRate} disabled={rating === 0}>
        Rate Book
      </button>
      <button type="button" onClick={handleRecommend}>Recommend Book</button>
    </div>
  );
};

export default RatingForm;