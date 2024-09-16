import { useEffect, useState } from "react";
import { createGame } from "../../services/gameService";
import { fetchCategories } from "../../services/categoryService";
import "./Games.css";

export const CreateGameModal = ({ onClose, onGameCreated }) => {
  const [title, setTitle] = useState("");
  const [designer, setDesigner] = useState("");
  const [yearReleased, setYearReleased] = useState("");
  const [numPlayers, setNumPlayers] = useState("");
  const [playTime, setPlayTime] = useState("");
  const [ageRec, setAgeRec] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const categoriesArray = await fetchCategories();
      setCategories(categoriesArray);
    };

    getCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the new game data
    const newGame = {
      title,
      description: "",
      designer,
      year_released: yearReleased,
      number_of_players: numPlayers,
      estimated_time_to_play: playTime,
      age_recommendation: ageRec,
      category_id: selectedCategory, // This assumes the backend accepts category by ID
    };

    // Call the service to create a new game
    await createGame(newGame);

    // Notify parent component of the new game creation (if necessary)
    if (onGameCreated) {
      onGameCreated();
    }

    // Close the modal
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Register New Game</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Designer:</label>
            <input
              type="text"
              value={designer}
              onChange={(e) => setDesigner(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Year Released:</label>
            <input
              type="text"
              value={yearReleased}
              onChange={(e) => setYearReleased(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Number of Players:</label>
            <input
              type="text"
              value={numPlayers}
              onChange={(e) => setNumPlayers(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Estimated Time to Play:</label>
            <input
              type="text"
              value={playTime}
              onChange={(e) => setPlayTime(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Age Recommendation:</label>
            <input
              type="text"
              value={ageRec}
              onChange={(e) => setAgeRec(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Category:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">Save</button>
        </form>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};
