import { useEffect, useState } from "react";
import { fetchAllGames } from "../../services/gameService";
import { NavLink } from "react-router-dom";
import { CreateGameModal } from "./CreateGameModal";

export const Games = () => {
  const [games, setGames] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleCreateGame = async () => {
    // Refresh the list of games after a new game is created
    const gamesArray = await fetchAllGames();
    setGames(gamesArray);
  };

  return (
    <>
      <h1>Games</h1>
      <button onClick={() => setIsModalOpen(true)}>Register New Game</button>
      {isModalOpen && (
        <CreateGameModal
          onClose={() => setIsModalOpen(false)}
          onGameCreated={handleCreateGame}
        />
      )}
      <div>{displayGames()}</div>
    </>
  );
};
