import React, { useEffect } from "react";
import Layout from "../../common/layout";
import { Container } from "../../common/layout/styels";
import { ColumnContainer } from "../../../styles/containers/styles";

const TodayOrder = (props) => {
  useEffect(() => {
    document.title = `Today Order - Diet Food Management Portal`;
  }, []);

  
  return (
    <Container className="noshadow">
      {/* <ListTable
        actions={actions}
        api="weekly-meal-plan-entry"
        preFilter={{ startDate: startOfDay, endDate: endOfDay }}
        itemTitle={{
          name: "userDisplayName",
          type: "text",
          collection: "user",
        }}
        shortName="Order"
        formMode="double"
        {...props}
        attributes={attributes}
      /> */}
      <ColumnContainer>
        <ColumnContainer style={{ backgroundColor: "#ffecec" }}>1</ColumnContainer>
        <ColumnContainer style={{ backgroundColor: "#fffff8" }}>2</ColumnContainer>
        <ColumnContainer style={{ backgroundColor: "#e4ffe4" }}>3</ColumnContainer>
      </ColumnContainer>
    </Container>
  );
};
export default Layout(TodayOrder);
