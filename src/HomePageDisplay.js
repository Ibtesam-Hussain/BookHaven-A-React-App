import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './HomePageDisplay.css'
import { Link, useNavigate } from "react-router-dom";

const defaultBooks = [
    { id: 1, title: "The Catcher in the Rye", author: "J.D. Salinger", img: "https://m.media-amazon.com/images/I/91bYsX41DVL._AC_UF1000,1000_QL80_.jpg" },
    { id: 2, title: "Brave New World", author: "Aldous Huxley", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD2tl_v6-TVepJgFrB_tj0iAHU4V1hTaMJAQ&s" },
    { id: 3, title: "Fahrenheit 451", author: "Ray Bradbury", img: "https://m.media-amazon.com/images/I/71OFqSRFDgL._AC_UF1000,1000_QL80_.jpg" },
    { id: 4, title: "Crime and Punishment", author: "Fyodor Dostoevsky", img: "https://m.media-amazon.com/images/I/81GqtNbs+PL._AC_UF1000,1000_QL80_.jpg" },
    { id: 5, title: "The Hobbit", author: "J.R.R. Tolkien", img: "https://m.media-amazon.com/images/I/91b0C2YNSrL._AC_UF1000,1000_QL80_.jpg" },
    { id: 6, title: "The Alchemist", author: "Paulo Coelho", img: "https://m.media-amazon.com/images/I/71aFt4+OTOL._AC_UF1000,1000_QL80_.jpg" }
];

function HomePageDisplay({ searchQuery = "" }) {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [favorites, setFavorites] = useState(new Set());

    useEffect(() => {
        const storedBooks = JSON.parse(localStorage.getItem("books")) || [];
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        
        setBooks([...defaultBooks, ...storedBooks]);
        setFavorites(new Set(storedFavorites));
    }, []);

    const addBook = () => {
        navigate('/AddBook');
    };

    const toggleFavorite = (bookId) => {
        setFavorites((prevFavorites) => {
            const updatedFavorites = new Set(prevFavorites);
            if (updatedFavorites.has(bookId)) {
                updatedFavorites.delete(bookId);
            } else {
                updatedFavorites.add(bookId);
            }
            localStorage.setItem("favorites", JSON.stringify([...updatedFavorites]));
            return updatedFavorites;
        });
    };


    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,  
        slidesToScroll: 1,
        arrows: true,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1 } }
        ]
    };

    const filteredBooks = books.filter(
        (book) =>
            book.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.author?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <div className="slider-container">
                <div className="heading">
                    <h2>Featured Books</h2>
                </div>

                {filteredBooks.length > 0 ? (
                    <div className="slider-container2">
                        <Slider {...settings}>
                            {filteredBooks.map((book) => (
                                <div key={book.id} className="book-card">
                                    <Link to={`/book/${book.id}`}>
                                        <img src={book.img} alt={book.title} />
                                        <h3>{book.title}</h3>
                                        <p>{book.author}</p>
                                    </Link>
                                    <span>ID: {book.id}</span>
                                    <button className={`fav-btn ${favorites.has(book.id) ? "favorited" : ""}`}
                                        onClick={() => toggleFavorite(book.id)}>
                                        {favorites.has(book.id) ? "❤️" : "♡"}
                                    </button>
                                </div>
                            ))}
                        </Slider>
                    </div>
                ) : (
                    <p className="no-books">No books found</p>
                )}
            </div>
            <button id="addbookbutton" onClick={addBook}>Add Book</button>
            <p className='cred'>Created by Ibtesam Hussain 😊</p>
        </div>
    );
}

export { HomePageDisplay };
