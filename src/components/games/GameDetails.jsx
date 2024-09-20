import { useEffect, useState } from "react";
import { fetchSingleGame } from "../../services/gameService";
import { useParams, useNavigate } from "react-router-dom";
import { fetchAllReviews } from "../../services/reviewService";
import { EditGameModal } from "./EditGameModal";
import "../reviews/Reviews.css";
import "./Games.css";
import {
  createRating,
  fetchAllRatings,
  updateRating,
} from "../../services/ratingService";
import { createPicture } from "../../services/pictureService";

export const GameDetails = () => {
  const [game, setGame] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRatings] = useState([]);
  const [userRating, setUserRating] = useState([]);
  const [existingRating, setExistingRating] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [refreshData, setRefreshData] = useState(false);
  const { gameId } = useParams();
  const userId = JSON.parse(localStorage.getItem("user_id"));
  const baseURL = "http://localhost:8000";
  const navigate = useNavigate();

  useEffect(() => {
    const getGame = async () => {
      if (gameId) {
        const fetchedGame = await fetchSingleGame(gameId);
        if (fetchedGame) {
          setGame(fetchedGame);
        }
      }
    };

    getGame();
  }, [gameId, refreshData]);

  const handleGameUpdate = () => {
    setRefreshData((prev) => !prev);
  };

  useEffect(() => {
    const getReviews = async () => {
      if (gameId) {
        const fetchedReviews = await fetchAllReviews(gameId);
        setReviews(fetchedReviews);
      }
    };

    getReviews();
  }, [gameId]);

  useEffect(() => {
    const getRatings = async () => {
      const allRatings = await fetchAllRatings();

      const gameRatings = allRatings.filter(
        (rating) => rating.game.toString() === gameId.toString()
      );
      setRatings(gameRatings);

      // Check if the user has already rated this game
      const userRating = gameRatings.find((rating) => rating.player === userId);
      setExistingRating(userRating || null);
      setUserRating(userRating ? userRating.rating : null);
    };

    if (gameId) {
      getRatings();
    }
  }, [gameId]);

  const handleRatingChange = (event) => {
    setUserRating(event.target.value);
  };

  const handleSubmitRating = async () => {
    const ratingData = {
      game: game.id,
      rating: userRating,
    };

    try {
      let updatedRating;

      if (existingRating) {
        // Update the existing rating
        updatedRating = await updateRating(existingRating.id, ratingData);
      } else {
        // Create a new rating
        updatedRating = await createRating(ratingData);
      }

      // Update the state after successfully submitting
      setExistingRating(updatedRating); // Update the existing rating state
      setUserRating(updatedRating.rating); // Update the user rating state to reflect the new one
      setRefreshData((prev) => !prev); // Trigger a re-fetch of data to reflect any changes
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  const displayGame = () => {
    if (game) {
      return (
        <div className="game-details">
          <h1 className="game-details-title">{game.title}</h1>
          {game.image_url && (
            <img
              src={getFullImageURL(game.image_url)}
              alt={game.title}
              className="game-image"
            />
          )}

          <p className="game-info">Rating: {game.average_rating} out of 10</p>
          <div className="game-info">
            Your Rating:
            <div className="rating-group">
              {[...Array(10)].map((_, i) => (
                <label key={i + 1}>
                  <input
                    type="radio"
                    value={i + 1}
                    checked={
                      userRating == i + 1 ||
                      (existingRating && existingRating.rating == i + 1)
                    }
                    onChange={handleRatingChange}
                  />
                  {i + 1}
                </label>
              ))}
            </div>
            <button onClick={handleSubmitRating}>Submit Rating</button>
          </div>
          <p className="game-info">Designer: {game.designer}</p>
          <p className="game-info">Description: {game.description}</p>
          <p className="game-info">Year Released: {game.year_released}</p>
          <p className="game-info">
            Number of Players: {game.number_of_players}
          </p>
          <p className="game-info">
            Estimated Time to Play: {game.estimated_time_to_play}
          </p>
          <p className="game-info">
            Age Recommendation: {game.age_recommendation}
          </p>
          <p className="game-info">
            Categories:{" "}
            {game.categories_detail.map((category) => category.name).join(", ")}
          </p>
          <button
            className="edit-game-button"
            onClick={() => setShowEditModal(true)}
          >
            Edit Game
          </button>
        </div>
      );
    }
    return <p className="no-game">Game not available</p>;
  };

  const displayReviews = () => {
    return reviews
      .slice()
      .reverse()
      .map((review) => (
        <div key={review.id} className="review-container">
          <p>
            <strong>
              {review.player.first_name} {review.player.last_name}
            </strong>
          </p>
          <p>{review.review_text}</p>
        </div>
      ));
  };

  const handleReviewClick = () => {
    navigate(`/games/${gameId}/review`);
  };

  const getBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(file);
  };

  const createGameImageString = (event) => {
    const file = event.target.files[0];
    getBase64(file, (base64ImageString) => {
      setBase64Image(base64ImageString);
      setImageFile(file);
    });
  };

  const handleUploadPicture = async () => {
    if (!base64Image) {
      alert("No image selected");
      return;
    }

    const pictureData = {
      game_id: game.id,
      game_image: base64Image,
    };

    try {
      await createPicture(pictureData);
      alert("Picture uploaded successfully");
    } catch (error) {
      console.error("Error uploading picture:", error);
      alert("Failed to upload picture");
    }
  };

  const getFullImageURL = (relativeURL) => {
    return relativeURL.startsWith("http")
      ? relativeURL
      : `${baseURL}${relativeURL}`;
  };

  return (
    <>
      <div className="game-details-container">{displayGame()}</div>

      {showEditModal && (
        <EditGameModal
          gameId={gameId}
          onUpdate={handleGameUpdate}
          onClose={() => setShowEditModal(false)}
        />
      )}

      <button onClick={() => setShowUploadForm((prev) => !prev)}>
        {showUploadForm ? "Cancel Upload" : "Upload Action Picture"}
      </button>

      {showUploadForm && (
        <div className="upload-picture">
          <input type="file" id="game_image" onChange={createGameImageString} />
          <button onClick={handleUploadPicture}>Upload</button>
        </div>
      )}

      <h2 className="reviews-header">Reviews</h2>
      <button className="review-game-button" onClick={handleReviewClick}>
        Review Game
      </button>
      {displayReviews()}
    </>
  );
};
