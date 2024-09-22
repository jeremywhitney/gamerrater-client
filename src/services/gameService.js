export const fetchAllGames = async (searchQuery = "", sortOption = "") => {
  try {
    let url = `http://localhost:8000/games?`;
    if (searchQuery) {
      url += `q=${encodeURIComponent(searchQuery)}&`;
    }
    if (sortOption) {
      url += `orderby=${encodeURIComponent(sortOption)}`;
    }
    const response = await fetch(url, {
      headers: {
        Authorization: `Token ${JSON.parse(
          localStorage.getItem("gamer_token")
        )}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching games:", error);
  }
};

export const fetchSingleGame = async (gameId) => {
  try {
    const response = await fetch(`http://localhost:8000/games/${gameId}`, {
      headers: {
        Authorization: `Token ${JSON.parse(
          localStorage.getItem("gamer_token")
        )}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching game:", error);
  }
};

export const createGame = async (gameData) => {
  try {
    const response = await fetch("http://localhost:8000/games", {
      method: "POST",
      headers: {
        Authorization: `Token ${JSON.parse(
          localStorage.getItem("gamer_token")
        )}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gameData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating game:", error);
  }
};

export const updateGame = async (gameId, gameData) => {
  try {
    const response = await fetch(`http://localhost:8000/games/${gameId}`, {
      method: "PUT",
      headers: {
        Authorization: `Token ${JSON.parse(
          localStorage.getItem("gamer_token")
        )}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gameData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating game:", error);
  }
};
