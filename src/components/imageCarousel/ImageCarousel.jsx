import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; // Import Slick CSS
import "slick-carousel/slick/slick-theme.css"; // Import Slick theme CSS
import styles from "./ImageCarousel.module.css"; // Import your custom CSS file
import LeftPolygon from "../../assets/LeftPolygon.svg";
import RightPolygon from "../../assets/RightPolygon.svg";

const ImageCarousel = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  // Custom arrow components using polygon images
  const CustomPrevArrow = ({ onClick }) => (
    <div className={`${styles.customArrow} ${styles.prev}`} onClick={onClick}>
      <img src={LeftPolygon} alt="Previous" />
    </div>
  );

  const CustomNextArrow = ({ onClick }) => (
    <div className={`${styles.customArrow} ${styles.next}`} onClick={onClick}>
      <img src={RightPolygon} alt="Next" />
    </div>
  );
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />, // Custom previous arrow component
    nextArrow: <CustomNextArrow />,
    customPaging: (i) => (
      // Custom pagination dots
      <div className={styles.customDotContainer}>
        {selectedImage === images[i] ? (
          // If the image is selected, display a filled circle
          <div
            className={`${styles.customDot} ${styles.selected}`}
            onClick={() => handleImageClick(images[i])}
          ></div>
        ) : (
          // If the image is not selected, display a hollow circle
          <div
            className={`${styles.customDot} ${styles.unselected}`}
            onClick={() => handleImageClick(images[i])}
          ></div>
        )}
      </div>
    ),
  };
  return (
    <div>
      <div className={styles.galleryContainer}>
        <div className={styles.largeBox}>
          {selectedImage && <img src={selectedImage} alt="Enlarged Image" />}
        </div>
        <div className={styles.smallBoxes}>
          {images.map((image, index) => (
            <div className={styles.imageContainer} key={index}>
              <img
                src={image}
                alt={`Image ${index + 1}`}
                onClick={() => handleImageClick(image)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.carouselContainer}>
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index} className={styles.carouselSlide}>
              <img src={image} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ImageCarousel;
