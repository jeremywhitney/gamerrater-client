import { useEffect, useState } from "react";
import { fetchSingleGame } from "../../services/gameService";
import { useParams } from "react-router-dom";

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
        <div>
          <h2>{game.title}</h2>
          <p>Designer: {game.designer}</p>
          <p>Year Released: {game.year_released}</p>
          <p>Number of Players: {game.number_of_players}</p>
          <p>Estimated Time to Play: {game.estimated_time_to_play}</p>
          <p>Age Recommendation: {game.age_recommendation}</p>
          <p>Categories: {game.categories.map(category => category.name).join(', ')}</p>
        </div>
      );
    }
    return <p>Game not available</p>;
  };

  return (
    <>
      <h1>Game Details</h1>
      {displayGame()}
    </>
  );
};
