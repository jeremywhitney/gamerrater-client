import { useEffect, useState } from "react";
import { createGame } from "../../services/gameService";
import { fetchCategories } from "../../services/categoryService";
import { GameForm } from "./GameForm";
import "./Games.css";

export const CreateGameModal = ({ onClose, onGameCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
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
      categories: [parseInt(selectedCategory)],
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
        <GameForm
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          designer={designer}
          setDesigner={setDesigner}
          yearReleased={yearReleased}
          setYearReleased={setYearReleased}
          numPlayers={numPlayers}
          setNumPlayers={setNumPlayers}
          playTime={playTime}
          setPlayTime={setPlayTime}
          ageRec={ageRec}
          setAgeRec={setAgeRec}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
          handleSubmit={handleSubmit}
          formTitle="Register New Game"
          submitButtonText="Save"
        />
        <button onClick={onClose} type="cancel" className="cancel-button">
          Cancel
        </button>
      </div>
    </div>
  );
};
