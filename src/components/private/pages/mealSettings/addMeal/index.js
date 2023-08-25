import React, { useEffect, useState } from "react";
import Layout from "../../../common/layout";
import ListTable from "../../../../elements/list/list";
import { Container } from "../../../common/layout/styels";
import PopupView from "../../../../elements/popupview";
import { useSelector } from "react-redux";
import SetupMeal from "./setupMeal";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const AddMeal = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `Recipe - Diet Food Management Portal`;
  }, []);
  // Get the theme colors from the Redux store
  const themeColors = useSelector((state) => state.themeColors);
  const [attributes] = useState([
    {
      type: "text",
      placeholder: "Meal",
      name: "title",
      validation: "",
      default: "",
      label: "Meal",
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
      tag: false,
      label: "Offer Price",
      required: false,
      view: false,
      add: true,
      update: false,
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
      required: true,
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
        // Set the data for the clicked item and open the SetupMenu popup
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
      title: "Meal Setup",
      params: {
        api: `food-group-item`,
        parentReference: "",
        // itemTitle: "username",
        itemTitle: {
          name: "mealName",
          type: "text",
          collection: "meal",
        },
        shortName: "Recipe Items",
        addPrivilege: true,
        delPrivilege: true,
        updatePrivilege: true,
        customClass: "medium",
        // formMode: "double",
      },
    },
    // More actions...
  ]);

  // State to control the display of the SetupMenu popup
  const [openMenuSetup, setOpenMenuSetup] = useState(false);

  // State to store the data for the item that was clicked on in the ListTable
  const [openItemData, setOpenItemData] = useState(null);

  // Function to close the SetupMenu popup
  const closeModal = () => {
    setOpenMenuSetup(false);
    setOpenItemData(null);
  };
  // Use the useTranslation hook from react-i18next to handle translations
  // const parkingDuration = totalDuration > 120 ? (days > 0 ? days + `d, ` : ``) + (hours > 0 ? hours + `h, ` : ``) + (minutes + t("m")) : totalDuration.toFixed(0) + ` ` + t("minutes");
  return (
    <Container className="noshadow">
      {/* Render a ListTable component */}
      <ListTable
        actions={actions}
        api={`meal`}
        profileImage={'photo'}
        // itemTitle={`Recipe`}
        itemTitle={{ name: "title", type: "text", collection: "" }}
        shortName={`Meal`}
        // formMode={`single`}
        formMode={`double`}
        //
        {...props}
        attributes={attributes}
      ></ListTable>
      {openMenuSetup && openItemData && (
        <PopupView
          // Popup data is a JSX element which is binding to the Popup Data Area like HOC
          popupData={
            <SetupMeal
              key={openItemData.data._id}
              openData={openItemData}
              setMessage={props.setMessage}
              // Pass selected item data (Menu Title) to the popup for setting the time
            ></SetupMeal>
          }
          themeColors={themeColors}
          closeModal={closeModal}
          itemTitle={{ name: "title", type: "text", collection: "" }}
          openData={openItemData} // Pass selected item data to the popup for setting the time and taking menu id and other required data from the list item
          customClass={"medium"}
        ></PopupView>
      )}
    </Container>
  );
};
// exporting the page with parent container layout..
export default Layout(AddMeal);
