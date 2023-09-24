import React, { useEffect, useState } from "react";
import Layout from "../../../common/layout";
import ListTable from "../../../../elements/list/list";
import { Container } from "../../../common/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const FoodExchangeCategory = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `Food Exchange Category - Diet Food Management Portal`;
  }, []);

  const [attributes] = useState([
    {
      type: "text",
      placeholder: "Food Exchange Category",
      name: "foodExchangeCategoryName",
      validation: "",
      default: "",
      tag: false,
      label: "Food Exchange Category",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "Calori",
      name: "calori",
      validation: "",
      default: "",
      tag: true,
      label: "Calori",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    
    {
      type: "number",
      placeholder: "sequence",
      name: "sequence",
      validation: "",
      default: "",
      tag: true,
      label: "sequence",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    
  ]);

  // Use the useTranslation hook from react-i18next to handle translations
  // const parkingDuration = totalDuration > 120 ? (days > 0 ? days + `d, ` : ``) + (hours > 0 ? hours + `h, ` : ``) + (minutes + t("m")) : totalDuration.toFixed(0) + ` ` + t("minutes");
  return (
    <Container className="noshadow">
      {/* Render a ListTable component */}
      <ListTable
        api={`food-exchange-category`}
        displayColumn="double"
        itemTitle={{
          name: "foodExchangeCategoryName",
          type: "text",
          collection: "",
        }}
        shortName={`Food Exchange Category`}
        {...props}
        attributes={attributes}
      ></ListTable>
    </Container>
  );
};
// exporting the page with parent container layout..
export default Layout(FoodExchangeCategory);
