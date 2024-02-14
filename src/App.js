import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [catImages, setCatImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.thecatapi.com/v1/images/search?limit=10&b reed_ids=beng&api_key=YOUR_API_KEY_HERE"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setCatImages(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLike = (index) => {
    // Placeholder function for handling likes
    console.log(`Liked cat at index ${index}`);
  };

  const handleComment = (index) => {
    // Placeholder function for handling comments
    console.log(`Commented on cat at index ${index}`);
  };

  const handleShare = (index) => {
    // Placeholder function for handling shares
    console.log(`Shared cat at index ${index}`);
  };

  return (
    <div className="phone-frame">
      <h1>Catstagram</h1>
      <div className="phone-screen">
        <div className="cat-container">
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          {catImages.map((cat, index) => (
            <div className="cat-card" key={index}>
              <div className="user-info">
                <img
                  className="profile-pic"
                  src="https://via.placeholder.com/50"
                  alt="User Profile"
                />
                <span className="username">Cat Lover</span>
              </div>
              <img className="cat-img" src={cat.url} alt={`Cat ${index}`} />
              <div className="actions">
                <button className="like-btn" onClick={() => handleLike(index)}>
                  Like
                </button>
                <button
                  className="comment-btn"
                  onClick={() => handleComment(index)}
                >
                  Comment
                </button>
                <button
                  className="share-btn"
                  onClick={() => handleShare(index)}
                >
                  Share
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
