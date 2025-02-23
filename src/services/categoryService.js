export const fetchCategories = async () => {
  try {
    const response = await fetch("http://localhost:8000/categories", {
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
    console.error("Error fetching categories:", error);
  }
};
