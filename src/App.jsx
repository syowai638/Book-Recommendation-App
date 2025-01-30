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
      .then(response => {
        if (!response.ok) throw new Error("Failed to fetch books");
        return response.json();
      })
      .then(data => {
        setBooks(data);
        setSearchResults(data);
      })
      .catch(error => console.error("Error loading books:", error));
  }, []);

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setSearchResults(books);
      return;
    }
    const filteredBooks = books.filter(book => 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      book.genre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredBooks);
  };

  const handleBookSelect = (bookId) => {
    const selected = books.find(book => book.id === bookId);
    setSelectedBook(selected);
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
        if (selectedBook && selectedBook.id === bookId) {
          setSelectedBook(updatedBook);
        }
      })
      .catch(error => console.error('Error updating rating:', error));
  };

  const handleRecommend = (bookId) => {
    const bookToUpdate = books.find(book => book.id === bookId);
    if (!bookToUpdate) return;

    fetch(`http://localhost:3001/books/${bookId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recommendations: bookToUpdate.recommendations + 1 })
    })
      .then(response => response.json())
      .then(updatedBook => {
        setBooks(prevBooks => 
          prevBooks.map(book => (book.id === updatedBook.id ? updatedBook : book))
        );
        setSelectedBook(updatedBook);
      })
      .catch(error => console.error('Error updating recommendations:', error));
  };

  return (
    <div>
      <h1>Book Recommendation App</h1>
      <BookSearch onSearch={handleSearch} />
      <BookList books={searchResults} onBookSelect={handleBookSelect} />

      {selectedBook && (
        <div>
          <h2>{selectedBook.title}</h2>
          <img 
            src={selectedBook.imageURL} 
            alt={selectedBook.title} 
            style={{ width: '150px', height: '200px' }} 
          />
          <p>{selectedBook.description}</p>
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
