import SimpleImageSlider from "react-simple-image-slider";

export default function Slider({ images, status }) {
  let allImages = images?.map((image) => {
    return image && { url: URL.createObjectURL(image) };
  });
 
  if (!allImages) allImages = [{}];
  return (
    <div style={{ position: "relative" }}>
      {Object.keys(allImages[0]).length !== 0 ? (
        <SimpleImageSlider
          width={status ? 600 : 250}
          height={status ? 400 : 154}
          images={allImages}
        />
      ) : (
        <div className="homeLeftText">no status to show</div>
      )}
    </div>
  );
}
