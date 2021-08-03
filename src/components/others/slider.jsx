import SimpleImageSlider from "react-simple-image-slider";

const image = [
  { url: "images/1.jpg" },
  { url: "images/2.jpg" },
  { url: "images/3.jpg" },
  { url: "images/4.jpg" },
  { url: "images/5.jpg" },
  { url: "images/6.jpg" },
  { url: "images/7.jpg" },
];

export default function App({ images }) {
  const allImages = images.map((image) => {
    return { url: URL.createObjectURL(image) };
  });
  console.log(allImages);
  console.log(image);
  return (
    <div>
      <SimpleImageSlider width={250} height={154} images={allImages} />
    </div>
  );
}
