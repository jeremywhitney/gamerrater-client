export const fetchAllGames = async () => {
  try {
    const response = await fetch("http://localhost:8000/games", {
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
