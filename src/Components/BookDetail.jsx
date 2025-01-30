import React from 'react';
import { useParams } from 'react-router-dom';
// import RatingForm from './RatingForm'

const BookDetails = ({books}) => {
  const { id } = useParams();
  const book = BookDetails[id];

  return (
    <div className="book-details">
      <h2>{book.title}</h2>
      <img
           src={book.imageUrl}
           alt={book.title}
           />
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>Description:</strong> {book.description}</p>
      <p><strong>Rating:</strong>{book.rating}</p>

    </div>
  );
};

export default BookDetails;




