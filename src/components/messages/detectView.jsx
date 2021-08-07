import handleViewport from "react-in-viewport";



const Component = (props) => {
  const Block = (props) => {
    const { inViewport, forwardedRef } = props;
    // const color = inViewport ? "#217ac0" : "#ff9800";
    // console.log(props, " out");// const text = inViewport ? "In viewport" : "Not in viewport";
    return <div ref={forwardedRef}>{`hello ${inViewport}`}</div>;
  };
  const ViewportBlock = handleViewport(Block /** options: {}, config: {} **/);
  console.log(props, " in");
  return (
    <>
      <ViewportBlock
        onEnterViewport={() => console.log("enter")}
        onLeaveViewport={() => console.log("leave")}
      />
    </>
  );
};

export default Component;
