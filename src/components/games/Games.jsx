import { useEffect, useState } from "react";
import { fetchAllGames } from "../../services/gameService";
import { NavLink } from "react-router-dom";

export const Games = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const getGames = async () => {
      const gamesArray = await fetchAllGames();
      if (gamesArray) {
        setGames(gamesArray);
      }
    };

    getGames();
  }, []);

  const displayGames = () => {
    if (games.length) {
      return games.map((game) => (
        <div key={`key-${game.id}`}>
          <NavLink to={`/games/${game.id}`} className={"game-title"}>
            {game.title}
          </NavLink>
        </div>
      ));
    }
    return <p>No games available</p>;
  };

  return (
    <>
      <h1>Games</h1>
      {displayGames()}
    </>
  );
};
