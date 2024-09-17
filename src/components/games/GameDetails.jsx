import { useEffect, useState } from "react";
import { fetchSingleGame } from "../../services/gameService";
import { useParams } from "react-router-dom";
import "./Games.css";

export const GameDetails = () => {
  const [game, setGame] = useState(null);
  const { gameId } = useParams();

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
  }, [gameId]);

  const displayGame = () => {
    if (game) {
      return (
        <div className="game-details">
          <h2 className="game-title">{game.title}</h2>
          <p className="game-info">Designer: {game.designer}</p>
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
            {game.categories.map((category) => category.name).join(", ")}
          </p>
        </div>
      );
    }
    return <p className="no-game">Game not available</p>;
  };

  return (
    <>
      <h1 className="details-header">Game Details</h1>
      {displayGame()}
    </>
  );
};
