import React from "react";
import { useDrop } from "react-dnd";
import { Div } from "../styles";

const DropTarget = ({ element, data, onDrop }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "DATA", // Specify the type of the draggable item to accept
    drop: (item) => {
      // This function will be called when the drop occurs
      onDrop(item, data);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <Div ref={drop} className={isOver ? "hover" : ""}>
      {element}
    </Div>
  );
};

export default DropTarget;
