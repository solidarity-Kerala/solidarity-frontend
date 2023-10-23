import React, { useEffect, useState } from "react";
import Layout from "../../../common/layout";
import ListTable from "../../../../elements/list/list";
import { Container } from "../../../common/layout/styels";
import PopupView from "../../../../elements/popupview";
import SetupRecipe from "./setupRecipe";
import { useSelector } from "react-redux";

const Resicpes = (props) => {
  useEffect(() => {
    document.title = `Recipe - Diet Food Management Portal`;
  }, []);

  const themeColors = useSelector((state) => state.themeColors);
  const [attributes] = useState([
    {
      type: "text",
      placeholder: "Recipe",
      name: "title",
      validation: "",
      default: "",
      label: "Recipe",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "Preparation Time (Minutes)",
      name: "preparationTime",
      validation: "",
      default: "",
      tag: false,
      label: "Preparation Time (Minutes)",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "textarea",
      placeholder: "Description",
      name: "description",
      validation: "",
      default: "",
      tag: false,
      label: "Description",
      required: true,
      view: true,
      add: true,
      update: true,
    },

    {
      type: "number",
      placeholder: "Price",
      name: "price",
      validation: "",
      default: "",
      tag: true,
      label: "Price",
      required: true,
      view: false,
      add: true,
      update: false,
    },
    {
      type: "number",
      placeholder: "Offer Price",
      name: "offerPrice",
      validation: "",
      default: "",
      tag: true,
      label: "Offer Price",
      required: false,
      view: false,
      add: true,
      update: false,
    },
    {
      type: "text",
      placeholder: "Allergy",
      name: "allergy",
      validation: "",
      default: "",
      tag: true,
      label: "Allergy",
      required: false,
      view: false,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "Storage",
      name: "storage",
      validation: "",
      default: "",
      tag: true,
      label: "Storage",
      required: false,
      view: false,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "Validity",
      name: "validity",
      validation: "",
      default: "",
      tag: true,
      label: "Validity",
      required: false,
      view: false,
      add: true,
      update: true,
    },
    {
      type: "select",
      apiType: "API",
      selectApi: "protein-categories/select",
      placeholder: "Protein Category",
      name: "proteinCategory",
      validation: "",
      showItem: "proteinCategoriesName",
      default: "",
      tag: true,
      label: "Protein Category",
      required: true,
      view: true,
      add: true,
      update: true,
      filter: false,
    },
    {
      type: "select",
      apiType: "API",
      selectApi: "cuisine-category/select",
      placeholder: "Cuisine Category",
      name: "cuisineCategory",
      validation: "",
      showItem: "cuisineCategoriesName",
      default: "",
      tag: true,
      label: "Cuisine Category",
      required: true,
      view: true,
      add: true,
      update: true,
      filter: false,
    },

    {
      type: "image",
      placeholder: "Recipe",
      name: "photo",
      validation: "",
      default: "",
      tag: true,
      label: "Recipe",
      required: false,
      view: true,
      add: true,
      update: true,
    },
  ]);
  const [actions] = useState([
    {
      element: "button",
      type: "callback",
      callback: (item, data) => {
        console.log(item, data);
        setOpenItemData({ item, data });
        setOpenMenuSetup(true);
      },
      itemTitle: {
        name: "mealName",
        type: "text",
        collection: "meal",
      },
      icon: "menu",
      title: "Print Label",
      params: {
        api: `food-group-item`,
        parentReference: "",
        itemTitle: {
          name: "mealName",
          type: "text",
          collection: "meal",
        },
        shortName: "Print Label",
        addPrivilege: true,
        delPrivilege: true,
        updatePrivilege: true,
        customClass: "medium",
      },
    },
  ]);

  const [openMenuSetup, setOpenMenuSetup] = useState(false);

  const [openItemData, setOpenItemData] = useState(null);

  const closeModal = () => {
    setOpenMenuSetup(false);
    setOpenItemData(null);
  };

  return (
    <Container className="noshadow">
      {/* Render a ListTable component */}
      <ListTable
        actions={actions}
        api={`recipe-item`}
        itemTitle={{ name: "title", type: "text", collection: "" }}
        profileImage="photo"
        shortName={`Recipe Item`}
        formMode={`double`}
        {...props}
        attributes={attributes}
      ></ListTable>
      {openMenuSetup && openItemData && (
        <PopupView
          customClass={"print"}
          popupData={
            <SetupRecipe
              customClass={"print"}
              openData={openItemData}
              setMessage={props.setMessage}
              closeModal={closeModal}
            ></SetupRecipe>
          }
          themeColors={themeColors}
          closeModal={closeModal}
          itemTitle={{ name: "title", type: "text", collection: "" }}
          openData={openItemData}
        ></PopupView>
      )}
    </Container>
  );
};

export default Layout(Resicpes);
