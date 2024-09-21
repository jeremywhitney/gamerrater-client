import { useState } from "react";
import { createPicture } from "../../services/pictureService";

export const ImageUploadSection = ({ gameId }) => {
  const [base64Image, setBase64Image] = useState(null);
  const [showUploadForm, setShowUploadForm] = useState(false);

  const getBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(file);
  };

  const createGameImageString = (event) => {
    const file = event.target.files[0];
    getBase64(file, (base64ImageString) => {
      setBase64Image(base64ImageString);
    });
  };

  const handleUploadPicture = async () => {
    if (!base64Image) {
      alert("No image selected");
      return;
    }

    const pictureData = {
      game_id: gameId,
      game_image: base64Image,
    };

    try {
      await createPicture(pictureData);
      alert("Picture uploaded successfully");
    } catch (error) {
      console.error("Error uploading picture:", error);
      alert("Failed to upload picture");
    }
  };

  return (
    <>
      <button onClick={() => setShowUploadForm((prev) => !prev)}>
        {showUploadForm ? "Cancel Upload" : "Upload Action Picture"}
      </button>

      {showUploadForm && (
        <div className="upload-picture">
          <input type="file" id="game_image" onChange={createGameImageString} />
          <button onClick={handleUploadPicture}>Upload</button>
        </div>
      )}
    </>
  );
};
