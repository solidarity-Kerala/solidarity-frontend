import React, { useEffect, useState } from "react";
import Layout from "../../../../core/layout";
import ListTable from "../../../../core/list/list";
import { Container } from "../../../../core/layout/styels";
import PopupView from "../../../../core/popupview";
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
      type: "textarea",
      placeholder: "Description",
      name: "description",
      validation: "",
      default: "",
      tag: false,
      label: "Description",
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
