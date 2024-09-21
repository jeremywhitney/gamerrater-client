import { getFullImageURL } from "../utils/utils";

export const GameInfo = ({ game, onEditClick }) => (
  <div className="game-details">
    <h1 className="game-details-title">{game.title}</h1>
    {game.image_url && (
      <img
        src={getFullImageURL(game.image_url)}
        alt={game.title}
        className="game-image"
      />
    )}
    <p className="game-info">Rating: {game.average_rating} out of 10</p>
    <p className="game-info">Designer: {game.designer}</p>
    <p className="game-info">Description: {game.description}</p>
    <p className="game-info">Year Released: {game.year_released}</p>
    <p className="game-info">Number of Players: {game.number_of_players}</p>
    <p className="game-info">
      Estimated Time to Play: {game.estimated_time_to_play}
    </p>
    <p className="game-info">Age Recommendation: {game.age_recommendation}</p>
    <p className="game-info">
      Categories:{" "}
      {game.categories_detail.map((category) => category.name).join(", ")}
    </p>
    <button className="edit-game-button" onClick={onEditClick}>
      Edit Game
    </button>
  </div>
);
