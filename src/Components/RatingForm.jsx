import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

function RatingForm() {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [selectedBookId, setSelectedBookId] = useState("");
    const [rating, setRating] = useState("");

    useEffect(() => {
        fetch("http://localhost:4000/books")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch books");
                }
                return response.json();
            })
            .then((data) => setBooks(data))
            .catch((error) => {
                console.error("Error fetching books:", error);
            });
    }, []);

    const handleBookChange = (e) => {
        setSelectedBookId(e.target.value);
    };

    const handleRatingChange = (e) => {
        setRating(e.target.value);
    };

    const handleRecommendationClick = () => {
        if (!selectedBookId || !rating) {
            alert("Please select a book and a rating.");
            return;
        }

        fetch(`http://localhost:4000/books/${selectedBookId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch book data");
                }
                return response.json();
            })
            .then((book) => {
                const recommendations = Number(book.recommendations)

                const currentRating = book.rating || 0;
                const newRating = parseFloat(rating);
                const averageRating = Number(((currentRating + newRating) / 2).toFixed(1));

                const updatedRecommendations = recommendations + 1;

                const updatedBook = {
                    ...book,
                    rating: averageRating,
                    recommendations: updatedRecommendations,
                };


                return fetch(`http://localhost:4000/books/${selectedBookId}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedBook),
                });
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to update book");
                }
                navigate(`/books/${selectedBookId}`);
            })
            .catch((error) => {
                console.error("Error updating book:", error);
            });
    };

    return (
        <>
            <NavBar />
            <main className="full-page">
                <div className="form-area">
                    <h1>Rate and Recommend</h1>
                    <div className="select-options">
                        <div>
                            <label htmlFor="book-select">Select a Book:</label>
                            <select
                                id="book-select"
                                name="book-select"
                                value={selectedBookId}
                                onChange={handleBookChange}
                                required
                            >
                                <option value="">Select a book</option>
                                {books.map((book) => (
                                    <option key={book.id} value={book.id}>
                                        {book.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="rating">Rating:</label>
                            <select
                                id="rating"
                                name="rating"
                                value={rating}
                                onChange={handleRatingChange}
                                required
                            >
                                <option value="">Select a rating</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                        <div>
                            <button type="button" className="button" onClick={handleRecommendationClick}>
                                Recommend Book
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default RatingForm;