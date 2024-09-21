export const ReviewSection = ({ reviews, onReviewClick }) => (
  <>
    <h2 className="reviews-header">Reviews</h2>
    <button className="review-game-button" onClick={onReviewClick}>
      Review Game
    </button>
    {reviews
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
      ))}
  </>
);
