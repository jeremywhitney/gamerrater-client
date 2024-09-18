export const GameForm = ({
  title,
  setTitle,
  description,
  setDescription,
  designer,
  setDesigner,
  yearReleased,
  setYearReleased,
  numPlayers,
  setNumPlayers,
  playTime,
  setPlayTime,
  ageRec,
  setAgeRec,
  selectedCategory,
  setSelectedCategory,
  categories,
  handleSubmit,
  formTitle,
  isEdit,
}) => {
  return (
    <form onSubmit={handleSubmit} className="modal-form">
      <h2>{formTitle}</h2>
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
          onChange={(e) =>
            setSelectedCategory(
              [...e.target.selectedOptions].map((option) => option.value)
            )
          }
          multiple
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
        {isEdit ? "Update Game" : "Create Game"}
      </button>
    </form>
  );
};
