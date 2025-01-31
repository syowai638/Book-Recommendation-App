import { Link } from 'react-router-dom';

function BookList({books}) {
  return (
    <main>
     <hi>Book List</hi>
     <div className='book-list'>
      {books.map(book=>(
        <div key={book.id}className='book-card'>
       <Link to={`/books/${book.id}`} className='book-link'>
       <div>
       <p>Highly Rated</p>
       <p>Recommended</p>
       </div>
        <img src={book.imageURL} alt={book.title} className='book.thumbnail'/>
            <h2>book.title</h2>
            </Link>
        </div>
     ))
     }
      </div>  
    </main>
  );
};

export default BookList;
