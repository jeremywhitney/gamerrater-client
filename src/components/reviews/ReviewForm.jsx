import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createReview } from "../../services/reviewService";

export const ReviewForm = () => {
  const [reviewText, setReviewText] = useState("");
  const { gameId } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const reviewData = {
      game: gameId,
      review_text: reviewText
    };

    try {
      await createReview(reviewData);
      navigate(`/games/${gameId}`);
    } catch (error) {
      console.error("Error creating review:", error);
    }
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h2 className="review-form-title">Review Game</h2>
      <textarea
        className="review-form-textarea"
        value={reviewText}
        onChange={(evt) => setReviewText(evt.target.value)}
        placeholder="Write your review here"
        required
      />
      <button className="review-form-button" type="submit">
        Save Review
      </button>
    </form>
  );
};
