import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Layout from "../../../core/layout";
import ListTable from "../../../core/list/list";
import { Container } from "../../../core/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file

const PlanCategory = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `Plan Category - Diet Food Management Portal`;
  }, []);

  const themeColors = useSelector((state) => state.themeColors);

  const [attributes] = useState([
    {
      type: "text",
      placeholder: "Plan Category",
      name: "title",
      validation: "",
      showItem: "",
      default: "",
      tag: true,
      label: "Plan Category",
      required: true,
      view: true,
      add: true,
      update: true,
    },
  ]);

  return (
    <Container className="noshadow">
      <ListTable
        // actions={actions}
        api={`plan-category`}
        displayColumn="double"
        // itemTitle={`userDisplayName`}
        itemTitle={{ name: "title", type: "text", collection: "" }}
        shortName={`Plan Category`}

        formMode={`double`}
        viewMode="table"
        // formMode={`double`}
        {...props}
        attributes={attributes}
      ></ListTable>
    </Container>
  );
};
export default Layout(PlanCategory);
