import { useState, useEffect } from "react";
import { createRating, updateRating } from "../../services/ratingService";

export const RatingSection = ({ gameId, ratings, onRatingSubmit }) => {
  const [userRating, setUserRating] = useState(null);
  const [existingRating, setExistingRating] = useState(null);
  const userId = JSON.parse(localStorage.getItem("user_id"));

  useEffect(() => {
    const userRating = ratings.find((rating) => rating.player === userId);
    setExistingRating(userRating || null);
    setUserRating(userRating ? userRating.rating : null);
  }, [ratings, userId]);

  const handleRatingChange = (event) => setUserRating(event.target.value);

  const handleSubmitRating = async () => {
    const ratingData = { game: gameId, rating: userRating };

    try {
      if (existingRating) {
        await updateRating(existingRating.id, ratingData);
      } else {
        await createRating(ratingData);
      }
      onRatingSubmit();
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  return (
    <div className="game-info">
      Your Rating:
      <div className="rating-group">
        {[...Array(10)].map((_, i) => (
          <label key={i + 1}>
            <input
              type="radio"
              value={i + 1}
              checked={userRating == i + 1}
              onChange={handleRatingChange}
            />
            {i + 1}
          </label>
        ))}
      </div>
      <button onClick={handleSubmitRating}>Submit Rating</button>
    </div>
  );
};
