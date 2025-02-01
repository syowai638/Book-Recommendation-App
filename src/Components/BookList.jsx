import { Link } from 'react-router-dom';

function BookList({ books }) {
    return (
        <main>
            <h1>Book List</h1>
            <div className='book-list'>
                {books.map(book => (
                    <div key={book.id} className='book-card'>
                        <Link to={`/books/${book.id}`} className='book-link'>
                            <div className="book-tags">
                            </div>
                            <img src={book.imageURL} alt={book.title} className='book-thumbnail' />
                            <div className='info-section'>
                                <h2 className='book-title'>{book.title}</h2>
                                <p>{book.rating}</p>
                            </div>
                        </Link>
                    </div>
                ))
                }
            </div >
        </main >
    );
}

export default BookList;

