import React, { useEffect, useState } from "react";
import Layout from "../../../../core/layout";
import ListTable from "../../../../core/list/list";
import { Container } from "../../../../core/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const MealTimeCategory = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `Recipe Category - Diet Food Management Portal`;
  }, []);

  const [attributes] = useState([
    {
      type: "text",
      placeholder: "Recipe Category",
      name: "mealtimeCategoriesName",
      validation: "",
      default: "",
      tag: false,
      label: "Recipe Category",
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
    {
      type: "select",
      placeholder: "Delivery Day",
      name: "delivery",
      validation: "",
      default: "Same Day",
      tag: true,
      label: "Delivery Day",
      required: true,
      view: true,
      add: true,
      update: true,
      filter: false,
      selectApi: "Same Day, Previous Day",
      apiType: "CSV",
    },
    {
      type: "image",
      placeholder: "Image",
      name: "image",
      validation: "",
      default: "",
      tag: true,
      label: "Image",
      required: false,
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
        api={`mealtime-category`}
        displayColumn="double"
        itemTitle={{
          name: "mealtimeCategoriesName",
          type: "text",
          collection: "",
        }}
        shortName={`Recipe Category`}
        {...props}
        attributes={attributes}
      ></ListTable>
    </Container>
  );
};
// exporting the page with parent container layout..
export default Layout(MealTimeCategory);
