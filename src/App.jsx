import React from 'react';
import { useEffect, useState } from 'react';
import BookList from './Components/BookList';
import "./App.css"

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/books')
      .then(res => res.json())
      .then(data => setBooks(data))
  })

  return (
    <>
      <BookList books={books} />
    </>
  )
}

export default App;