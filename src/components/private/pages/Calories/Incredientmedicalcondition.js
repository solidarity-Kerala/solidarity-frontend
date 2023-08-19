import React, { useEffect, useState } from "react";
//
import Layout from "../../common/layout";
import ListTable from "../../../elements/list/list";
import { Container } from "../../common/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file

const IncredientMedicalConnection = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `Incredient Medical Connection - Diet Food Management Portal`;
  }, []);

  const [attributes] = useState([
    {
      type: "select",
      apiType: "API",
      selectApi: "ingredient/select",
      placeholder: "Ingredient",
      name: "ingredient",
      validation: "",
      showItem: "ingredientsName",
      default: "name",
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
      selectApi: "medical-conditions/select",
      placeholder: "Medical Condition",
      name: "medicalCondition",
      validation: "",
      showItem: "medicalConditionsName",
      default: "name",
      tag: true,
      label: "Medical Condition",
      required: true,
      view: true,
      add: true,
      update: true,
      filter: false,
    },
    {
      type: "select",
      apiType: "API",
      selectApi: "foodlike-lists/select",
      placeholder: "Food Like List",
      name: "foodLikeListName",
      validation: "",
      showItem: "foodLikeListName",
      default: "",
      tag: true,
      label: "Food Like List",
      required: true,
      view: true,
      add: true,
      update: true,
      filter: false,
    },
    {
      type: "select",
      apiType: "API",
      selectApi: "fooddislike-lists/select",
      placeholder: "Food DisLike List",
      name: "foodDisLikeList",
      validation: "",
      showItem: "foodDislikeListName",
      default: "",
      tag: true,
      label: "Food DisLike List",
      required: true,
      view: true,
      add: true,
      update: true,
      filter: false,
    },
  ]);

  return (
    <Container className="noshadow">
      <ListTable
        // actions={actions}
        api={`incredient-medical-connection`}
        displayColumn="double"
        // itemTitle={`userDisplayName`}
        itemTitle={{ name: "ingredient", type: "text", collection: "" }}
        shortName={`Incredient Medical Connection`}
        // parentReference={"userType"}
        // referenceId={"64815bde89e0a44fc31c53b0"}
        // formMode={`single`}
        formMode={`double`}
        {...props}
        attributes={attributes}
      ></ListTable>
    </Container>
  );
};
export default Layout(IncredientMedicalConnection);
