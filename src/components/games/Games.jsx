import { useEffect, useState } from "react";
import { fetchAllGames } from "../../services/gameService";
import { NavLink } from "react-router-dom";
import { CreateGameModal } from "./CreateGameModal";
import "./Games.css";

export const Games = () => {
  const [games, setGames] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const getGames = async () => {
    const gamesArray = await fetchAllGames(searchQuery);
    if (gamesArray) {
      setGames(gamesArray);
    }
  };

  useEffect(() => {
    getGames();
  }, []); 

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    getGames(); 
  };

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
    await getGames();
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
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search games..."
        />
        <button type="submit">Search</button>
      </form>
      <div className="games-list">{displayGames()}</div>
    </>
  );
};
