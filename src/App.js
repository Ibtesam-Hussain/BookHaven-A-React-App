import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from './pngwing.com.png';
import './App.css';
import { HomePageDisplay } from './HomePageDisplay';
import { BookDetails } from "./BookDetails";  
import { SignUpDiv } from "./SignUp";  
import { LoginDiv } from "./login";  
import { AddBookForm } from "./AddBook";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  // Check if the user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  useEffect(() => {
    if (!isAuthenticated && window.location.pathname !== "/SignUp") {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  

  // Logout function
  const handleLogout = () => {
    localStorage.setItem("isAuthenticated", "false");
    setIsAuthenticated(false);
  };

  return (
    <div>
      {isAuthenticated ? (
        <>
          <header className="header">
            <div className="logo-container">
                <img src={logo} alt="BookHaven Logo" className="logo" />
                <h1 className="brand-name">BOOKHAVEN</h1>
            </div>

            <div className="search-container">
              <input
                type="text"
                placeholder="Search books..."
                className="search-bar"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <button onClick={handleLogout} className="logout-button">Logout</button>
          </header>

          <Routes>
            <Route path="/" element={<HomePageDisplay searchQuery={searchQuery}/>} />
            <Route path="/book/:id" element={<BookDetails />} />
            <Route path="/AddBook" element={<AddBookForm />} />
            
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<LoginDiv setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/SignUp" element={<SignUpDiv />} />

        </Routes>
      )}
    </div>
  );
}

export { App };
