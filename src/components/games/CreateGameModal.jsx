import { useEffect, useState } from "react";
import { createGame } from "../../services/gameService";
import { fetchCategories } from "../../services/categoryService";
import "./Games.css";

export const CreateGameModal = ({ onClose, onGameCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("")
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

    const newGame = {
      title: title,
      description: description,
      designer: designer,
      year_released: yearReleased,
      number_of_players: numPlayers,
      estimated_time_to_play: playTime,
      age_recommendation: ageRec,
      categories: selectedCategory,
    };

    await createGame(newGame);

    if (onGameCreated) {
      onGameCreated();
    }

    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Register New Game</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Designer:</label>
            <input
              type="text"
              value={designer}
              onChange={(e) => setDesigner(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Year Released:</label>
            <input
              type="text"
              value={yearReleased}
              onChange={(e) => setYearReleased(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Number of Players:</label>
            <input
              type="text"
              value={numPlayers}
              onChange={(e) => setNumPlayers(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Estimated Time to Play:</label>
            <input
              type="text"
              value={playTime}
              onChange={(e) => setPlayTime(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Age Recommendation:</label>
            <input
              type="text"
              value={ageRec}
              onChange={(e) => setAgeRec(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
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
          <button type="submit" className="submit-button">
            Save
          </button>
        </form>
        <button onClick={onClose} type="cancel" className="cancel-button">
          Cancel
        </button>
      </div>
    </div>
  );
};
