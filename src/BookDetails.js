import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './BookDetails.css';


const books = [
    { id: 1, title: "Brave New World", author: "Aldous Huxley", reviews: ["Mind-blowing!", "Scarily relevant."] },
    { id: 2, title: "The Catcher in the Rye", author: "J.D. Salinger", reviews: ["Relatable.", "A journey of self-discovery."] },
    { id: 3, title: "The Hobbit", author: "J.R.R. Tolkien", reviews: ["Magical!", "Adventure at its best."] },
    { id: 4, title: "Crime and Punishment", author: "Fyodor Dostoevsky", reviews: ["Deep psychological insights.", "A masterpiece."] },
    { id: 5, title: "Frankenstein", author: "Mary Shelley", reviews: ["The birth of sci-fi.", "A haunting tale."] },
    { id: 6, title: "War and Peace", author: "Leo Tolstoy", reviews: ["Epic and immersive.", "A historical masterpiece."] }
];

function BookDetails() {
    const { id } = useParams();
    const bookIndex = books.findIndex(b => b.id === parseInt(id));

    
    const book = books[bookIndex] || null;
    const [reviews, setReviews] = useState(book ? [...book.reviews] : []);
    const [newReview, setNewReview] = useState('');

    // If the book isn't found, show an error message
    if (!book) {
        return (
            <div className="book-details">
                <h2>Book Not Found</h2>
                <Link to="/">← Back to Home</Link>
            </div>
        );
    }

    const addReview = () => {
        if (newReview.trim()) {
            const updatedReviews = [...reviews, newReview];
            setReviews(updatedReviews);  // Update local state
            books[bookIndex].reviews = updatedReviews;  // Update global books array
            setNewReview('');
        }
    };

    return (
        <div className="book-details">
            <h1>{book.title}</h1>
            <h3>by {book.author}</h3>

            <h2>Reviews</h2>
            <ul>
                {reviews.length > 0 ? (
                    reviews.map((review, index) => <li key={index}>{review}</li>)
                ) : (
                    <p>No reviews yet. Be the first to review!</p>
                )}
            </ul>

            <input 
                type="text" 
                placeholder="Add a review..." 
                value={newReview} 
                onChange={(e) => setNewReview(e.target.value)} 
                id='inputReview'
            />
            <button onClick={addReview} id='submitBtn'>Submit Review</button>

            <br />
            <br />
            <Link to="/">← Back to Home</Link>
            <br />
            <br />
            <br />
            <p className='cred'>Created by Ibtesam Hussain 😊</p>
        </div>
    );
}

export  {BookDetails};
