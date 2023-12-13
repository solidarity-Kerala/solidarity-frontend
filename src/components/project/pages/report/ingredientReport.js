import React, { useEffect, useState } from "react";
import Layout from "../../../core/layout";
import ListTable from "../../../core/list/list";
import { Container } from "../../../core/layout/styels";

const IngredientReport = (props) => {
  useEffect(() => {
    document.title = `Recipe - Diet Food Management Portal`;
  }, []);

  // const themeColors = useSelector((state) => state.themeColors);

  const [attributes] = useState([
    {
      type: "text",
      placeholder: "Ingredient",
      name: "name",
      collection: "",
      showItem: "",
      validation: "",
      default: "",
      label: "Ingredient",
      tag: false,
      required: true,
      view: true,
      add: true,
      update: true,
    },
    // {
    //   type: "text",
    //   placeholder: "Type Of Recipe",
    //   name: "typeOfRecipe",
    //   collection: "",
    //   showItem: "",
    //   validation: "",
    //   default: "",
    //   label: "Type Of Recipe",
    //   tag: false,
    //   required: true,
    //   view: true,
    //   add: true,
    //   update: true,
    // },
    {
      type: "text",
      placeholder: "Count",
      name: "quantity",
      collection: "",
      showItem: "",
      validation: "",
      default: "",
      tag: true,
      label: "Count",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    // {
    //   type: "select",
    //   apiType: "API",
    //   selectApi: "mealtime-category/select",
    //   placeholder: "Mealtime Category",
    //   name: "mealTimeCategory",
    //   validation: "",
    //   showItem: "mealtimeCategoriesName",
    //   default: "",
    //   tag: true,
    //   label: "Mealtime Category",
    //   required: false,
    //   view: false,
    //   add: false,
    //   update: false,
    //   filter: true,
    // },
  ]);

  return (
    <Container className="noshadow">
      {/* Render a ListTable component */}
      <ListTable
        // actions={actions}
        api={`recipe-schedule/total-recipe-ingredients`}
        itemTitle={{ name: "name", type: "text", collection: "" }}
        // profileImage="photo"
        shortName={`Recipe Item`}
        formMode={`double`}
        viewMode="table"
        {...props}
        attributes={attributes}
        datefilter={true}
      ></ListTable>
    </Container>
  );
};

export default Layout(IngredientReport);
