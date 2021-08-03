import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

export default function Slideshow({ images }) {
  const allImages = images
    ? images.map((image) => {
        return URL.createObjectURL(image);
      })
    : "";

  return allImages.length > 0 ? (
    <div className="slide-container" style={{ width: "250px" }}>
      <Slide>
        {allImages
          ? allImages.map((image, i) => (
              <div className="each-slide" key={i}>
                <div
                  style={{
                    backgroundImage: `url(${image})`,
                    height: "150px",
                    objectFit: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <span>Slide {i}</span>
                </div>
              </div>
            ))
          : "Upload image"}
      </Slide>
    </div>
  ) : (
    "Upload image"
  );
}
