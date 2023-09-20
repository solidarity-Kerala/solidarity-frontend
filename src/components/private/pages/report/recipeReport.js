import React, { useEffect, useState } from "react";
import Layout from "../../common/layout";
import ListTable from "../../../elements/list/list";
import { Container } from "../../common/layout/styels";

const RecipeReport = (props) => {
  useEffect(() => {
    document.title = `Recipe - Diet Food Management Portal`;
  }, []);

  // const themeColors = useSelector((state) => state.themeColors);

  const [attributes] = useState([
    // {
    //   type: "text",
    //   placeholder: "Recipe",
    //   name: "recipe",
    //   validation: "",
    //   default: "",
    //   label: "Recipe",
    //   tag: false,
    //   required: true,
    //   view: true,
    //   add: true,
    //   update: true,
    // },
    {
      type: "text",
      placeholder: "Recipe",
      name: "recipe",
      collection: "sum",
      showItem: "name",
      validation: "",
      default: "",
      tag: true,
      label: "Recipe",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "Count",
      name: "recipe",
      collection: "sum",
      showItem: "recipe",
      validation: "",
      default: "",
      tag: true,
      label: "Count",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "select",
      apiType: "API",
      selectApi: "mealtime-category/select",
      placeholder: "Mealtime Category",
      name: "mealTimeCategory",
      validation: "",
      showItem: "mealtimeCategoriesName",
      default: "",
      tag: true,
      label: "Mealtime Category",
      required: false,
      view: false,
      add: false,
      update: false,
      filter: true,
    },
  ]);

  return (
    <Container className="noshadow">
      {/* Render a ListTable component */}
      <ListTable
        // actions={actions}
        api={`recipe/recipe-by-date`}
        itemTitle={{ name: "name", type: "text", collection: "sum" }}
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

export default Layout(RecipeReport);
