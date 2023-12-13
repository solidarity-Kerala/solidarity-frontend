import React from "react";
import { useDrag } from "react-dnd";

const DraggableItem = ({ item, element }) => {
  const [, drag] = useDrag({
    type: "DATA", // Specify the type of the draggable item
    item: item, // Pass additional data (color and name) as the item to be dropped
  });

  return <div ref={drag}>{element}</div>;
};

export default DraggableItem;
