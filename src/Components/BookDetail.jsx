import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";

function BookDetail() {
    const [book, setBook] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:4000/books/${id}`)
            .then(res => res.json())
            .then(data => setBook(data))
    }, [id]);

    return (
        <>
            <NavBar />
            <main className="full-page">
                <div className="book-detail">
                    <img src={book.imageURL} alt={book.title} className="book-image" />
                    <div className="book-info">
                        <h1>{book.title}</h1>
                        <p><strong>Author:</strong> {book.author}</p>
                        <p><strong>Genre:</strong> {book.genre}</p>
                        <p><strong>Rating:</strong> {book.rating}</p>
                        <p><strong>Recommendations:</strong> {book.recommendations}</p>
                        <p><strong>Description:</strong> {book.description}</p>
                    </div>
                </div>
            </main>
        </>
    );
}

export default BookDetail;