import React, { useState, useEffect } from 'react';
import BookList from './BookList'; 
import BookSearch from './BookSearch'; 
import RatingForm from './RatingForm'; 

function App() {
  const [books, setBooks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/books') 
      .then(response => response.json())
      .then(data => {
        setBooks(data);
        setSearchResults(data); 
      });
  }, []);

  const handleSearch = (searchTerm) => {
    const filteredBooks = books.filter(book => {
      const lowerCaseTitle = book.title.toLowerCase();
      const lowerCaseGenre = book.genre.toLowerCase();
      const lowerCaseSearchTerm = searchTerm.toLowerCase();

      return (
        lowerCaseTitle.includes(lowerCaseSearchTerm) ||
        lowerCaseGenre.includes(lowerCaseSearchTerm)
      );
    });
    setSearchResults(filteredBooks);
  };

  const handleBookSelect = (bookId) => {
    const selectedBook = books.find(book => book.id === bookId);
    setSelectedBook(selectedBook);
  };

  const handleRate = (bookId, rating) => {
    fetch(`http://localhost:3001/books/${bookId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rating }) 
    })
      .then(response => response.json())
      .then(updatedBook => {
        setBooks(prevBooks => 
          prevBooks.map(book => (book.id === updatedBook.id ? updatedBook : book))
        );
      })
      .catch(error => {
        console.error('Error updating rating:', error);
        // Handle error gracefully (e.g., display an error message to the user)
      });
  };

  const handleRecommend = (bookId) => {
    fetch(`http://localhost:3001/books/${bookId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recommendations: selectedBook.recommendations + 1 }) 
    })
      .then(response => response.json())
      .then(updatedBook => {
        setBooks(prevBooks => 
          prevBooks.map(book => (book.id === updatedBook.id ? updatedBook : book))
        );
      })
      .catch(error => {
        console.error('Error updating recommendations:', error);
        // Handle error gracefully (e.g., display an error message to the user)
      });
  };

  return (
    <div>
      <h1>Book Recommendation App</h1>
      <BookSearch onSearch={handleSearch} /> 
      <BookList 
        books={searchResults} 
        onBookSelect={handleBookSelect} 
      /> 
      {selectedBook && (
        <div>
          <h2>{selectedBook.title}</h2> 
          {/* Display other book details here */}
          <RatingForm 
            bookId={selectedBook.id} 
            onRate={handleRate} 
            onRecommend={handleRecommend} 
          />
        </div>
      )}
    </div>
  );
}

export default App;