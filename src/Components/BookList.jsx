import { Link } from 'react-router-dom';


function BookList({ books }) {
    return (
        <main>
            <h1>Book List</h1>
            <div className='book-list'>
                {books.map(book => (
                    <div key={book.id} className='book-card'>
                        <Link to={`/books/${book.id}`} className='book-link'>
                            <div className='badges'>
                                {book.recommendations > 10 ? <p className='book-tag recommended'>Recommended</p> : null}
                                {book.rating > 4.5 ? <p className='book-tag rated'>Highly Rated</p> : null}
                            </div>
                            <div className='image-section'>
                                <img src={book.imageURL} alt={book.title} className='book-thumbnail' />
                            </div>
                            <div className='info-section'>
                                <h2 className='book-title'>{book.title}</h2>
                                <p className='book-rating'>{book.rating}</p>
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

