import './AddBook.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddBookForm (){

    const [bookID, setbookId] = useState("");
    const [bookName, setbookName] = useState("");
    const [bookAuth, setbookAuth] = useState("");
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const handleImageChange = (event) => {
        const file = event.target.files[0]; 
        if (file) {
            setImage(URL.createObjectURL(file)); 
        }
    };

    const formSubmission = (e) => {
        e.preventDefault(); 

        if (!bookID || !bookName || !bookAuth){
            alert('Please provide necessary info other than cover picture');
            return;
        }
        else{

            const newBook = {
                id: bookID,
                title: bookName,
                author: bookAuth,
                img: image || "https://via.placeholder.com/150" // Default placeholder image
            };
    
            // Get existing books from localStorage
            const storedBooks = JSON.parse(localStorage.getItem("books")) || [];
    
            // Update localStorage with new book
            localStorage.setItem("books", JSON.stringify([...storedBooks, newBook]));
            alert('Book submitted successfully!');
            navigate('/');
        }
    }


    return (
        <div>
            <div className='Bookform'>
                <h2>Add a New Book</h2>
                <form autoComplete='off' id='inputForm' onSubmit={formSubmission}>
                    <input type='number' placeholder='Book ID' id='bookid' value={bookID} onChange={(e) => setbookId(e.target.value)} required/>
                    <input type='text' placeholder='Book Name' id='bookname' value={bookName} onChange={(e) => setbookName(e.target.value)} required/>
                    <input type='text' placeholder='Author Name' id='Authorname' value={bookAuth} onChange={(e) => setbookAuth(e.target.value)} required/>
                    <label id='labelPic'>Add Cover pic of Book</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {image && <img src={image} alt="Uploaded Preview" className="preview-image" />}

                    <button type="submit" id="subBtn">Submit Book</button>
                </form>
            </div>
            <p className='cred'>Created by Ibtesam Hussain 😊</p>
        </div>
    );
}

export {AddBookForm};