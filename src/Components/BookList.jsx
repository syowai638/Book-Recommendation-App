import { Link } from 'react-router-dom';

function BookList({ books }) {
    return (
        <div>
            <h1>Book List</h1>
            {books.map(book => (
                <div key={book.id}>
                    <Link to={`/books/${book.id}`}>
                        <h2>{book.title}</h2>
                    </Link>
                </div>
            ))}
        </div>
    );
}


export default BookList;