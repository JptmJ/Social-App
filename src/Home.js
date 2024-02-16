import React, { useState, useEffect } from "react";
import "./App.css";
import userImage from "./images/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg";

function Home({ signOut }) {
  const [catImages, setCatImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploadedImage] = useState(null);
  const [visibleImages] = useState(
    Math.floor(Math.random() * (10 - 4 + 1)) + 4
  );

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:4000/metadata");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      const shuffledData = data.sort(() => Math.random() - 0.5);
      setCatImages(shuffledData.slice(0, visibleImages));
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const response = await fetch(`http://localhost:4000/image/${postId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete post");
      }
      setCatImages(catImages.filter((cat) => cat.id !== postId));
      alert(`Post deleted successfully : ${postId}`);
    } catch (error) {
      console.error("Error deleting post:", error, postId);
    }
  };

  const handleLike = (index) => {
    const likeButton = document.querySelector(`.like-btn-${index}`);

    if (likeButton.classList.contains("clicked")) {
      likeButton.classList.remove("clicked");
      console.log(`Disliked cat at index ${index}`);
    } else {
      likeButton.classList.add("clicked");
      console.log(`Liked cat at index ${index}`);
    }
  };

  const handleComment = (index) => {
    // Placeholder function for handling comments
    console.log(`Commented on cat at index ${index}`);
    const commentButton = document.querySelector(`.comment-btn-${index}`);
    commentButton.classList.add("clicked");
  };

  const handleShare = (index) => {
    // Placeholder function for handling shares
    console.log(`Shared cat at index ${index}`);
    const shareButton = document.querySelector(`.share-btn-${index}`);
    shareButton.classList.add("clicked");
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://localhost:4000/upload", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Failed to upload image");
      }
      console.log("Image uploaded successfully");
      alert("Image uploaded successfully", formData);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className="phone-frame">
      <div className="phone-screen">
        <div className="top-container">
          <h1>Duplistagram</h1>
          <div className="input-container">
            <label htmlFor="file" className="upload-button">
              +
            </label>
            <input
              type="file"
              id="file"
              className="file-input"
              onChange={handleImageUpload}
            />
            {uploadedImage && (
              <img
                src={uploadedImage}
                alt="Uploaded"
                className="uploaded-image"
              />
            )}
          </div>
          <button onClick={handleSignOut} className="sign-out-button">
            <i className="fa fa-lock"></i>
          </button>
        </div>
        <div className="cat-container">
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          {catImages.map((cat, index) => (
            <div className="cat-card" key={index}>
              <div className="user-info d-flex row">
                <img
                  className="profile-pic col-md-2"
                  src={userImage}
                  alt="User Profile"
                />
                <span className="username col-md-8">User</span>
                <button
                  className="delete-button col-md-2"
                  onClick={() => handleDeletePost(cat.id)}
                >
                  <i className="fa fa-trash"></i>
                </button>
              </div>
              <img
                className="cat-img"
                src={cat.animal_image}
                alt={`Cat ${index}`}
              />
              <div className="actions">
                <button
                  className={`like-btn like-btn-${index}`}
                  onClick={() => handleLike(index)}
                >
                  <i className="fa fa-heart"></i>
                </button>
                <button
                  className={`comment-btn comment-btn-${index}`}
                  onClick={() => handleComment(index)}
                >
                  <i className="fa fa-comment"></i>
                </button>
                <button
                  className={`share-btn share-btn-${index}`}
                  onClick={() => handleShare(index)}
                >
                  <i className="fa fa-share"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
