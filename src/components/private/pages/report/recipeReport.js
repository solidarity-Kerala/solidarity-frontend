import React, { useEffect, useState } from "react";
import Layout from "../../common/layout";
import ListTable from "../../../elements/list/list";
import { Container } from "../../common/layout/styels";
// import PopupView from "../../../elements/popupview";
// import SetupRecipe from "./setupRecipe";
import { useSelector } from "react-redux";

const RecipeReport = (props) => {
  useEffect(() => {
    document.title = `Recipe - Diet Food Management Portal`;
  }, []);

  // const themeColors = useSelector((state) => state.themeColors);

  const [attributes] = useState([
    {
      type: "text",
      placeholder: "Recipe",
      name: "recipe",
      collection: "sum",
      showItem: "recipe",
      validation: "",
      default: "",
      label: "Recipe",
      tag: false,
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
    // {
    //   type: "text",
    //   placeholder: "Count",
    //   name: "recipe",
    //   collection: "sum",
    //   showItem: "name ",
    //   validation: "",
    //   default: "",
    //   tag: false,
    //   label: "Count",
    //   required: true,
    //   view: true,
    //   add: true,
    //   update: true,
    // },
    // {
    //   type: "textarea",
    //   placeholder: "Description",
    //   name: "description",
    //   validation: "",
    //   default: "",
    //   tag: false,
    //   label: "Description",
    //   required: true,
    //   view: true,
    //   add: true,
    //   update: true,
    // },
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
        {...props}
        attributes={attributes}
      ></ListTable>
    </Container>
  );
};

export default Layout(RecipeReport);
