import React, { useState } from 'react';

const BookSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="search">Search Books:</label>
      <input
        type="text"
        id="search"
        name="search"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search by title or genre"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default BookSearch;