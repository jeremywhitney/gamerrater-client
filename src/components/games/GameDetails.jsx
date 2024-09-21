import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchSingleGame } from "../../services/gameService";
import { fetchAllReviews } from "../../services/reviewService";
import { fetchAllRatings } from "../../services/ratingService";
import { GameInfo } from "./GameInfo";
import { RatingSection } from "../ratings/RatingSection.jsx";
import { ReviewSection } from "../reviews/ReviewSection";
import { ImageUploadSection } from "../images/ImageUploadSection";
import { EditGameModal } from "./EditGameModal.jsx";
import "../reviews/Reviews.css";
import "./Games.css";

export const GameDetails = () => {
  const [game, setGame] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [refreshData, setRefreshData] = useState(false);
  const { gameId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (gameId) {
        const [fetchedGame, fetchedReviews, allRatings] = await Promise.all([
          fetchSingleGame(gameId),
          fetchAllReviews(gameId),
          fetchAllRatings(),
        ]);

        setGame(fetchedGame);
        setReviews(fetchedReviews);
        setRatings(
          allRatings.filter(
            (rating) => rating.game.toString() === gameId.toString()
          )
        );
      }
    };

    fetchData();
  }, [gameId, refreshData]);

  const handleGameUpdate = () => setRefreshData((prev) => !prev);

  const handleReviewClick = () => navigate(`/games/${gameId}/review`);

  if (!game) return <p className="no-game">Game not available</p>;

  return (
    <>
      <div className="game-details-container">
        <GameInfo game={game} onEditClick={() => setShowEditModal(true)} />
        <RatingSection
          gameId={gameId}
          ratings={ratings}
          onRatingSubmit={handleGameUpdate}
        />
        <ImageUploadSection gameId={game.id} />
      </div>

      {showEditModal && (
        <EditGameModal
          gameId={gameId}
          onUpdate={handleGameUpdate}
          onClose={() => setShowEditModal(false)}
        />
      )}

      <ReviewSection reviews={reviews} onReviewClick={handleReviewClick} />
    </>
  );
};
