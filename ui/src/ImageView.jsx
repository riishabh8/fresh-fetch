import React, { useEffect, useState } from "react";
import axios from "axios";

const ImageView = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7046/api/Products/img"
        );
        setImages(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      {/* <ImageUploadForm /> */}
      <h2>All Images</h2>
      {images.map((image, index) => (
        <div>
          <img src={image.imageUrl} alt="" />
          <h1>{image.fullName}</h1>
        </div>
      ))}
    </div>
  );
};

export default ImageView;
