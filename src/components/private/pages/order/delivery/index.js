import React, { useEffect } from "react";
import Layout from "../../../common/layout";
import { Container } from "../../../common/layout/styels";
import { ColumnContainer } from "../../../../styles/containers/styles";

const Delivery = (props) => {
  useEffect(() => {
    document.title = `Today Order - Diet Food Management Portal`;
  }, []);

  return (
    <Container className="noshadow">
      <ColumnContainer>
        <ColumnContainer style={{ backgroundColor: "#ffecec" }}></ColumnContainer>
      </ColumnContainer>
    </Container>
  );
};
export default Layout(Delivery);
