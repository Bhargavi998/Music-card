import React, { useState } from "react";
import styles from "./ImageCarousel.module.css"; // Your CSS module

const ImageCarousel = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <div className={styles.galleryContainer}>
      <div className={styles.largeBox}>
        {selectedImage && <img src={selectedImage} alt="Enlarged Image" />}
      </div>
      <div className={styles.smallBoxes}>
        {images.map((image, index) => (
          <div className={styles.imageContainer}>
            <img
              key={index}
              src={image}
              alt={`Image ${index + 1}`}
              onClick={() => handleImageClick(image)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
