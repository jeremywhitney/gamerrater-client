import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchSingleGame, updateGame } from "../../services/gameService";
import { fetchCategories } from "../../services/categoryService";
import { GameForm } from "./GameForm";
import "./Games.css";

export const EditGameModal = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [designer, setDesigner] = useState("");
  const [yearReleased, setYearReleased] = useState("");
  const [numPlayers, setNumPlayers] = useState("");
  const [playTime, setPlayTime] = useState("");
  const [ageRec, setAgeRec] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const { gameId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getGame = async () => {
      if (gameId) {
        const gameData = await fetchSingleGame(gameId);
        if (gameData) {
          setTitle(gameData.title);
          setDescription(gameData.description);
          setDesigner(gameData.designer);
          setYearReleased(gameData.year_released);
          setNumPlayers(gameData.number_of_players);
          setPlayTime(gameData.estimated_time_to_play);
          setAgeRec(gameData.age_recommendation);
          setSelectedCategory(gameData.categories ? gameData.categories.map((cat) => cat.id) : []);
        }
      }
    };

    const getCategories = async () => {
      const categoriesArray = await fetchCategories();
      setCategories(categoriesArray);
    };

    getGame();
    getCategories();
  }, [gameId]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const updatedGame = {
      title: title,
      description: description,
      designer: designer,
      year_released: yearReleased,
      number_of_players: numPlayers,
      estimated_time_to_play: playTime,
      age_recommendation: ageRec,
      categories: selectedCategory,
    };

    try {
      await updateGame(gameId, updatedGame);
      navigate(`/games/${gameId}`);
    } catch (error) {
      console.error("Error updating game:", error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Game</h2>
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
          formTitle="Edit Game"
          isEdit={true}
        />
      </div>
    </div>
  );
};
