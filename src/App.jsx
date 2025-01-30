import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookList from './Components/BookList';
import BookDetail from './Components/BookDetail';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/books" element={<BookList />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/" element={<BookList />} /> // Default route
        </Routes>
      </Router>
      <BookDetail />
    </div>
  );
}

export default App;