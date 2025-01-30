import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import BookList from './BookList';
import BookSearch from './BookSearch';
import RatingForm from './RatingForm';
import BookDetail from './BookDetail'; // Make sure to create this component for displaying book details.

function App() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/books')
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch books');
        return response.json();
      })
      .then(data => setBooks(data))
      .catch(error => console.error('Error loading books:', error));
  }, []);

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) return;
    const filteredBooks = books.filter(book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.genre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setBooks(filteredBooks);
  };

  const handleRate = (bookId, rating) => {
    const bookToUpdate = books.find(book => book.id === bookId);
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
    <Router>
      <div>
        <h1>Book Recommendation App</h1>
        <nav>
          <Link to="/books">Browse Books</Link> | <Link to="/search">Search Books</Link>
        </nav>
        <BookSearch onSearch={handleSearch} />

        <Switch>
          <Route exact path="/books">
            <BookList books={books} />
          </Route>

          <Route
            path="/books/:id"
            render={({ match }) => {
              const bookId = parseInt(match.params.id);
              const book = books.find(b => b.id === bookId);
              setSelectedBook(book);
              return (
                <div>
                  <BookDetail book={book} />
                  <RatingForm
                    bookId={book.id}
                    onRate={handleRate}
                    onRecommend={handleRecommend}
                  />
                </div>
              );
            }}
          />

          <Route path="/search">
            <BookList books={books} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
