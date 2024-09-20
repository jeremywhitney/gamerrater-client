export const createPicture = async (pictureData) => {
  try {
    const response = await fetch("http://localhost:8000/pictures", {
      method: "POST",
      headers: {
        Authorization: `Token ${JSON.parse(
          localStorage.getItem("gamer_token")
        )}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pictureData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating picture:", error);
  }
};
