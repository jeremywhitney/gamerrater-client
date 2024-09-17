export const fetchAllReviews = async (gameId) => {
  try {
    const response = await fetch(`http://localhost:8000/reviews?gameId=${gameId}`, {
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
    console.error("Error fetching reviews:", error);
  }
};

export const fetchSingleReview = async (reviewId) => {
  try {
    const response = await fetch(`http://localhost:8000/reviews/${reviewId}`, {
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
    console.error("Error fetching review:", error);
  }
};

export const createReview = async (reviewData) => {
  try {
    const response = await fetch("http://localhost:8000/reviews", {
      method: "POST",
      headers: {
        Authorization: `Token ${JSON.parse(
          localStorage.getItem("gamer_token")
        )}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating review:", error);
  }
};
