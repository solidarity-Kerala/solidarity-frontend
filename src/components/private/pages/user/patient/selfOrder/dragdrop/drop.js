import React from "react";
import { useDrop } from "react-dnd";
import styled from "styled-components";

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
const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  flex-direction: column;
  padding: 10px 10px;
  padding: 5px 5px;
  width: calc(100% - 10px);

  &.hover {
    border: 1px dashed rgb(204, 204, 204);
  }
`;
export default DropTarget;
