import React, { useEffect, useState } from "react";
import Layout from "../../common/layout";
import ListTable from "../../../elements/list/list";
import { Container } from "../../common/layout/styels";

const RecipeMealTimeCategroy = (props) => {
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
      required: true,
      view: true,
      add: true,
      update: true,
      filter: true,
    },
    {
      type: "text",
      placeholder: "Delivery Date",
      name: "deliveryDate",
      collection: "",
      showItem: " ",
      validation: "",
      default: "",
      tag: true,
      label: "Delivery Date",
      required: true,
      view: true,
      add: true,
      update: true,
    },
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
        api={`recipe-schedule/recipe-mealtimecategory`}
        itemTitle={{ name: "title", type: "text", collection: "recipe" }}
        // profileImage="photo"
        shortName={`Recipe Item`}
        formMode={`double`}
        {...props}
        attributes={attributes}
        datefilter={true}
      ></ListTable>
    </Container>
  );
};

export default Layout(RecipeMealTimeCategroy);
