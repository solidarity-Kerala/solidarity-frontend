import React, { useEffect, useState } from "react";
import Layout from "../../common/layout";
import ListTable from "../../../elements/list/list";
import { Container } from "../../common/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const OrderList = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `Order List - Diet Food Management Portal`;
  }, []);

  const [attributes] = useState([
    {
      type: "select",
      apiType: "API",
      selectApi: "user/select?userType=6471b3849fb2b29fe045887b",
      placeholder: "User",
      name: "user",
      validation: "",
      tag: true,
      showItem: "username",
      default: "",
      label: "User",
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
      label: "Order Date",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "select",
      apiType: "API",
      selectApi: "dayof-week/select",
      placeholder: "Day of week",
      name: "dayOfWeek",
      validation: "",
      showItem: "day",
      default: "",
      tag: true,
      label: "Day of week",
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
      validation: "",
      showItem: "mealtimeCategoriesName",
      default: "",
      tag: true,
      label: "Meal Time Category",
      required: true,
      view: true,
      add: true,
      update: true,
      filter: true,
    },
    //MEAL IS A RECIPE//
    {
      type: "select",
      apiType: "API",
      selectApi: "meal/select",
      updateOn: "mealTimeCategory",
      iconImage: { collection: "", item: "mealPhoto" },
      tags: [
        {
          type: "text",
          item: "proteinCategoriesName",
          title: "Protein Category",
          collection: "proteinCategory",
        },
        {
          type: "text",
          item: "mealDescription",
          title: "Description",
          collection: "",
        },
      ],
      placeholder: "Recipe",
      name: "meal",
      validation: "",
      showItem: "mealName",
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
      selectApi: "meal-ingredients/meal-related-ingredients",
      updateOn: "meal",
      // iconImage: { collection: "", item: "mealPhoto" },
      tags: [
        {
          type: "text",
          item: "ingredientsName",
          title: "Ingredient",
          collection: "ingredient",
        },
        {
          type: "text",
          item: "quantity",
          title: "Quantity",
          collection: "",
        },
      ],
      placeholder: "Ingredient",
      name: "ingredient",
      collection: "ingredient",
      validation: "",
      showItem: "quantity",
      default: "",
      tag: true,
      label: "Ingredient",
      required: true,
      view: true,
      add: true,
      update: true,
      filter: false,
    },
    {
      type: "select",
      apiType: "API",
      selectApi: "order-statuses/select",
      placeholder: "Order Status",
      name: "orderStatus",
      showItem: "orderStatus",
      collection: "orderStatus",
      color: "color",
      validation: "",
      default: "",
      tag: true,
      label: "Order Status",
      required: true,
      view: true,
      add: true,
      update: true,
      filter: true,
    },
  ]);

  const [dispatch] = useState([
    {
      type: "select",
      apiType: "API",
      selectApi: "user/select",
      placeholder: "Delivery Men",
      name: "deliveryMen",
      showItem: "username",
      validation: "",
      default: "",
      tag: true,
      label: "Delivery Men",
      required: true,
      view: true,
      add: true,
      update: true,
      filter: false,
    },
    {
      type: "select",
      apiType: "API",
      selectApi: "delivery-instruction/select",
      placeholder: "Delivery Instruction",
      name: "deliveryInstruction",
      showItem: "deliveryInstructionName",
      validation: "",
      default: "",
      tag: true,
      label: "Delivery Instruction",
      required: true,
      view: true,
      add: true,
      update: true,
      filter: false,
    },
  ]);

  const [actions] = useState([
    {
      element: "button",
      type: "subList",
      id: "dispatch",
      itemTitle: {
        name: "userDisplayName",
        type: "text",
        collection: "user",
      },
      title: "Dispatch",
      attributes: dispatch,
      params: {
        api: `dispatch`,
        parentReference: "weeklyMealPlanEntry",
        itemTitle: {
          name: "userDisplayName",
          type: "text",
          collection: "user",
        },
        shortName: "Dispatch",
        addPrivilege: true,
        delPrivilege: true,
        updatePrivilege: true,
        customClass: "medium",
        formMode: "double",
      },
    },
  ]);

  return (
    <Container className="noshadow">
      <ListTable
        actions={actions}
        api={`weekly-meal-plan-entry`}
        // itemTitle={`Weekly Meal Plan Entry`}
        itemTitle={{
          name: "userDisplayName",
          type: "text",
          collection: "user",
        }}
        shortName={`Order`}
        // formMode={`single`}
        formMode={`double`}
        datefilter={true}
        //
        {...props}
        attributes={attributes}
      ></ListTable>
    </Container>
  );
};
export default Layout(OrderList);
