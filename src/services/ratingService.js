export const fetchAllRatings = async () => {
  try {
    const response = await fetch("http://localhost:8000/ratings", {
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
    console.error("Error fetching ratings:", error);
  }
};

export const createRating = async (ratingData) => {
  try {
    const response = await fetch("http://localhost:8000/ratings", {
      method: "POST",
      headers: {
        Authorization: `Token ${JSON.parse(
          localStorage.getItem("gamer_token")
        )}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ratingData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating rating:", error);
  }
};

export const updateRating = async (ratingId, ratingData) => {
  try {
    const response = await fetch(`http://localhost:8000/ratings/${ratingId}`, {
      method: "PUT",
      headers: {
        Authorization: `Token ${JSON.parse(
          localStorage.getItem("gamer_token")
        )}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ratingData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating rating:", error);
  }
};
