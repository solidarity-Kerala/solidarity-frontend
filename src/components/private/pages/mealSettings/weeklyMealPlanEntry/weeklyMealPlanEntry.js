import React, { useEffect, useState } from "react";
import Layout from "../../../common/layout";
import ListTable from "../../../../elements/list/list";
import { Container } from "../../../common/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const WeeklyMealPlanEntry = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `Weekly Meal Plan Entry - Diet Food Management Portal`;
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
      type: "select",
      apiType: "API",
      selectApi: "weekly-meal-plan/select",
      placeholder: "Weekly Meal Plan",
      name: "weeklyMealPlanId",
      showItem: "weekStartDate",
      validation: "",
      default: "",
      tag: true,
      label: "Weekly Meal Plan",
      required: true,
      view: true,
      add: true,
      update: true,
      filter: false,
    },
    {
      type: "select",
      apiType: "API",
      selectApi: "dayof-week/select",
      placeholder: "Day Of Week",
      name: "dayOfWeek",
      showItem: "day",
      validation: "",
      default: "",
      tag: true,
      label: "Day Of Week",
      required: true,
      view: true,
      add: true,
      update: true,
      filter: false,
    },
    {
      type: "select",
      apiType: "API",
      selectApi: "mealtime-category/select",
      placeholder: "Meal Time Category",
      name: "mealTimeCategory",
      showItem: "mealtimeCategoriesName",
      validation: "",
      default: "",
      tag: true,
      label: "Meal Time Category",
      required: true,
      view: true,
      add: true,
      update: true,
      filter: false,
    },
    // MEAL IS A RECIPE //
    {
      type: "select",
      apiType: "API",
      selectApi: "meal/select",
      placeholder: "Recipe",
      name: "meal",
      showItem: "mealName",
      validation: "",
      default: "",
      tag: true,
      label: "Recipe",
      required: true,
      view: true,
      add: true,
      update: true,
      filter: false,
    },
    {
      type: "select",
      apiType: "API",
      selectApi: "preparation-instruction/select",
      placeholder: "Preparation Instruction",
      name: "preparationInstruction",
      showItem: "instruction",
      validation: "",
      default: "",
      tag: true,
      label: "Preparation Instruction",
      required: true,
      view: true,
      add: true,
      update: true,
      filter: false,
    },
    {
      type: "date",
      placeholder: "Order Date",
      name: "orderDate",
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
      type: "select",
      apiType: "API",
      selectApi: "order-statuses/select",
      placeholder: "Order Status",
      name: "orderStatus",
      showItem: "orderStatus",
      validation: "",
      default: "",
      tag: true,
      label: "Order Status",
      required: true,
      view: true,
      add: true,
      update: true,
      filter: false,
    },
    // {
    //   type: "checkbox",
    //   placeholder: "Order Date",
    //   name: "weekEndDate",
    //   validation: "",
    //   default: "",
    //   tag: true,
    //   label: "week End Date",
    //   required: true,
    //   view: true,
    //   add: true,
    //   update: true,
    // },
    {
      type: "checkbox",
      placeholder: "Is Selected",
      name: "isSelected",
      validation: "",
      default: "",
      label: "Is Selected",
      tag: true,
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
        api={`weekly-meal-plan-entry`}
        // displayColumn="double"
        // itemTitle={`label`}
        itemTitle={{
          name: "userDisplayName",
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

export default Layout(WeeklyMealPlanEntry);
