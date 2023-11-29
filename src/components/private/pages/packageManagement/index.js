import React, { useEffect, useState } from "react";
import Layout from "../../common/layout";
import ListTable from "../../../elements/list/list";
import { Container } from "../../common/layout/styels";
import PopupView from "../../../elements/popupview";
import SetupMenu from "../mealSettings/foodMenu/setupMenu";
import { useSelector } from "react-redux";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const PackageManagement = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `PackageManagement - Diet Food Management Portal`;
  }, []);
  // Get the theme colors from the Redux store

  const [attributes] = useState([
    {
      type: "text",
      placeholder: "Package Name",
      name: "packageName",
      validation: "",
      showItem: "",
      default: "",
      tag: true,
      label: "Package Name",
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
      tag: true,
      label: "Description",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "multiSelect",
      placeholder: "Calories",
      listView: true,
      name: "calories",
      validation: "",
      default: [
        900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000,
      ],
      label: "Calories",
      required: true,
      view: true,
      add: true,
      tag: true,
      update: true,
      apiType: "JSON",
      search: false,
      selectApi: [
        { value: "900", id: 900 },
        { value: "1000", id: 1000 },
        { value: "1100", id: 1100 },
        { value: "1200", id: 1200 },
        { value: "1300", id: 1300 },
        { value: "1400", id: 1400 },
        { value: "1500", id: 1500 },
        { value: "1600", id: 1600 },
        { value: "1700", id: 1700 },
        { value: "1800", id: 1800 },
        { value: "1900", id: 1900 },
        { value: "2000", id: 2000 },
        { value: "2100", id: 2100 },
        { value: "2200", id: 2200 },
        { value: "2300", id: 2300 },
        { value: "2400", id: 2400 },
        { value: "2500", id: 2500 },
        { value: "2600", id: 2600 },
        { value: "2700", id: 2700 },
        { value: "2800", id: 2800 },
        { value: "2900", id: 2900 },
        { value: "3000", id: 3000 },
      ],
    },
    {
      type: "multiSelect",
      apiType: "API",
      selectApi: "food-menu/select",
      placeholder: "Food Menu",
      search: false,
      tags: [
        {
          type: "text",
          item: "description",
          title: "",
          collection: "",
        },
      ],
      viewButton: {
        title: "View Menu",
        callback: (item, data) => {
          console.log(item, data);
          // Set the data for the clicked item and open the SetupMenu popup
          setOpenItemData({
            data: { ...item, _id: item.id },
            item: {
              viewOnly: true,
              itemTitle: {
                name: "value",
                type: "text",
                collection: "",
              },
              icon: "menu",
              title: "Setup Menu",
              params: {
                api: `food-group-item`,
                parentReference: "",
                // itemTitle: "username",
                itemTitle: {
                  name: "value",
                  type: "text",
                  collection: "",
                },
                shortName: "Recipe Items",
                addPrivilege: true,
                delPrivilege: true,
                updatePrivilege: true,
                customClass: "medium",
                // formMode: "double",
              },
            },
          });

          setOpenMenuSetup(true);
        },
      },
      name: "foodMenu",
      validation: "",
      showItem: "title",
      default: "",
      tag: true,
      label: "Food Menu",
      required: true,
      view: true,
      add: true,
      update: true,
      filter: false,
    },

    {
      type: "image",
      placeholder: "Image",
      name: "packageImage",
      validation: "",
      default: "",
      tag: true,
      label: "Image",
      required: false,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "checkbox",
      placeholder: "Is Active",
      name: "isActive",
      validation: "",
      showItem: "",
      default: "",
      tag: true,
      label: "Is Active",
      required: true,
      view: true,
      add: true,
      update: true,
    },
  ]);

  const [packagePrice] = useState([
    {
      type: "text",
      placeholder: "Title",
      name: "title",
      validation: "",
      showItem: "",
      default: "",
      tag: true,
      label: "Title",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "Days",
      name: "days",
      validation: "",
      showItem: "",
      default: "",
      tag: true,
      label: "Days",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "bonus Days",
      name: "bonusDays",
      validation: "",
      showItem: "",
      default: "",
      tag: true,
      label: "Bonus Days",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "Break Fast Price",
      name: "breakFastPrice",
      validation: "",
      showItem: "",
      default: "",
      tag: true,
      label: "Break Fast Price",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "Lunch Price",
      name: "lunchPrice",
      validation: "",
      showItem: "",
      default: "",
      tag: true,
      label: "Lunch Price",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "Dinner Price",
      name: "dinnerPrice",
      validation: "",
      showItem: "",
      default: "",
      tag: true,
      label: "Dinner Price",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "Discount",
      name: "discount",
      validation: "",
      showItem: "",
      default: "",
      tag: true,
      label: "Discount",
      required: true,
      view: true,
      add: true,
      update: true,
    },
  ]);

  const themeColors = useSelector((state) => state.themeColors);
  // State to control the display of the SetupMenu popup
  const [openMenuSetup, setOpenMenuSetup] = useState(false);

  // State to store the data for the item that was clicked on in the ListTable
  const [openItemData, setOpenItemData] = useState(null);

  // Function to close the SetupMenu popup
  const closeModal = () => {
    setOpenMenuSetup(false);
    setOpenItemData(null);
  };
  const [actions] = useState([
    {
      element: "button",
      type: "subList",
      id: "packagePrice",
      parentReference: "package",
      itemTitle: {
        name: "packageName",
        type: "text",
        collection: "package",
      },
      title: "Package Price",
      attributes: packagePrice,
      params: {
        api: `package-price`,
        parentReference: "package",
        itemTitle: {
          name: "packageName",
          type: "text",
          collection: "package",
        },
        shortName: "Package Price",
        addPrivilege: true,
        delPrivilege: true,
        updatePrivilege: true,
        customClass: "medium",
        formMode: "double",
      },
    },
  ]);
  // Use the useTranslation hook from react-i18next to handle translations
  // const parkingDuration = totalDuration > 120 ? (days > 0 ? days + `d, ` : ``) + (hours > 0 ? hours + `h, ` : ``) + (minutes + t("m")) : totalDuration.toFixed(0) + ` ` + t("minutes");
  return (
    <Container className="noshadow">
      {/* Render a ListTable component */}
      <ListTable
        actions={actions}
        api={`package`}
        // itemTitle={`label`}
        itemTitle={{ name: "packageName", type: "text", collection: "" }}
        shortName={`Package`}
        formMode={`double`}
        {...props}
        attributes={attributes}
      ></ListTable>
      {openMenuSetup && openItemData && (
        <PopupView
          // Popup data is a JSX element which is binding to the Popup Data Area like HOC
          popupData={
            <SetupMenu
              openData={openItemData}
              setMessage={props.setMessage}
              setLoaderBox={props.setLoaderBox}
              // Pass selected item data (Menu Title) to the popup for setting the time
            ></SetupMenu>
          }
          themeColors={themeColors}
          closeModal={closeModal}
          itemTitle={{ name: "value", type: "text", collection: "" }}
          openData={openItemData} // Pass selected item data to the popup for setting the time and taking menu id and other required data from the list item
          customClass={"full-page"}
        ></PopupView>
      )}
    </Container>
  );
};
// exporting the page with parent container layout..
export default Layout(PackageManagement);
