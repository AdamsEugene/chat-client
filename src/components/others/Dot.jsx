import "./dot.css";

export default function Dot({ group }) {
  return (
    <div className="bounceCont">
      <p className={`ball${group ? " group" : " "}one`}></p>
      <p className={`ball${group ? "dd" : " "}two`}></p>
      <p className={`ball${group ? "dd" : " "}three`}></p>
    </div>
  );
}
