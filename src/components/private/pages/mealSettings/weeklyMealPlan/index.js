import React, { useEffect, useState } from "react";
import Layout from "../../../common/layout";
import ListTable from "../../../../elements/list/list";
import { Container } from "../../../common/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const WeeklyMealPlan = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `Weekly Meal Plan - Diet Food Management Portal`;
  }, []);

  const [attributes] = useState([
    {
      type: "select",
      apiType: "API",
      selectApi: "user/select?userType=6471b3849fb2b29fe045887b",
      placeholder: "User",
      name: "user",
      showItem: "userDisplayName",
      validation: "",
      default: "",
      // tag: true,
      label: "User",
      required: true,
      view: true,
      add: true,
      update: true,
      filter: false,
    },
    {
      type: "date",
      placeholder: "Weekly Meal Plan",
      name: "weekStartDate",
      validation: "",
      default: "",
      tag: true,
      label: "week Start Date",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "date",
      placeholder: "Weekly Meal Plan",
      name: "weekEndDate",
      validation: "",
      default: "",
      tag: true,
      label: "week End Date",
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
        api={`weekly-meal-plan`}
        displayColumn="double"
        // itemTitle={`label`}
        itemTitle={{
          name: "username",
          type: "text",
          collection: "user",
        }}
        shortName={`Weekly Meal Plan`}
        formMode={`double`}
        {...props}
        attributes={attributes}
      ></ListTable>
    </Container>
  );
};

export default Layout(WeeklyMealPlan);
