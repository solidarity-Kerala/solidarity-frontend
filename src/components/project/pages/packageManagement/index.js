import React, { useEffect, useState } from "react";
import Layout from "../../../core/layout";
import ListTable from "../../../core/list/list";
import { Container } from "../../../core/layout/styels";
import PopupView from "../../../core/popupview";
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
      default: [800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200],
      label: "Calories",
      required: true,
      view: true,
      add: true,
      tag: true,
      update: true,
      apiType: "JSON",
      search: false,
      selectApi: [
        { value: "800", id: 800 },
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
      ],
    },
    {
      type: "multiSelect",
      apiType: "API",
      selectApi: "food-menu/select",
      placeholder: "Food Menu",
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
      search: true,
    },
    {
      type: "number",
      placeholder: "Discount For Week",
      name: "discountforWeek",
      validation: "",
      showItem: "",
      default: "",
      tag: true,
      label: "Discount For Week",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "Discount For Month",
      name: "discountforMonth",
      validation: "",
      showItem: "",
      default: "",
      tag: true,
      label: "Discount For Month",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "Discount For 3 Month",
      name: "discountfor3Month",
      validation: "",
      showItem: "",
      default: "",
      tag: true,
      label: "Discount For 3 Month",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "Discount For 6 Month",
      name: "discountfor6Month",
      validation: "",
      showItem: "",
      default: "",
      tag: true,
      label: "Discount For 6 Month",
      required: true,
      view: true,
      add: true,
      update: true,
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

  const [foodMenu] = useState([
    {
      type: "text",
      placeholder: "Title",
      name: "title",
      validation: "",
      default: "",
      tag: true,
      label: "Title",
      required: true,
      view: false,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "Arabic Name",
      name: "arabicName",
      validation: "",
      showItem: "",
      default: "",
      tag: true,
      label: "Arabic Name",
      required: false,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "select",
      apiType: "API",
      selectApi: "diet/select",
      placeholder: "Diet",
      name: "diet",
      validation: "",
      showItem: "title",
      default: "",
      tag: true,
      label: "Diet",
      required: true,
      view: true,
      add: true,
      update: true,
      filter: true,
    },
    // TYPE OF DIET IS A DIET //
    // DIET PLAN IS A SUB DIET //
    {
      type: "select",
      apiType: "API",
      selectApi: "sub-diet/get-sub-diet-by-diet",
      updateOn: "diet",
      placeholder: "Sub Diet",
      name: "subDiet",
      validation: "",
      showItem: "title",
      collection: "subDiet",
      default: "",
      tag: true,
      label: "Sub Diet",
      required: true,
      view: true,
      add: true,
      update: true,
      filter: false,
    },
    {
      type: "select",
      placeholder: "Menu Type",
      name: "menuType",
      validation: "",
      default: "",
      tag: false,
      label: "Menu Type",
      required: true,
      view: true,
      add: true,
      update: true,
      apiType: "CSV",
      selectApi: "Fixed,Dynamic",
    },
    {
      type: "checkbox",
      placeholder: "Enable",
      name: "enable",
      validation: "",
      default: "",
      tag: false,
      label: "Enable",
      required: true,
      view: true,
      add: true,
      update: true,
    },
  ]);

  const [packagePrice] = useState([
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
      view: false,
      add: true,
      update: true,
      filter: true,
    },
    {
      type: "number",
      placeholder: "Price",
      name: "price",
      validation: "",
      showItem: "",
      default: "",
      tag: true,
      label: "Price",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "Upto 1000",
      name: "upto1000",
      validation: "",
      showItem: "",
      default: "",
      tag: true,
      label: "Upto 1000",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "Upto 1500",
      name: "upto1500",
      validation: "",
      showItem: "",
      default: "",
      tag: true,
      label: "Upto 1500",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "Upto 2000",
      name: "upto2000",
      validation: "",
      showItem: "",
      default: "",
      tag: true,
      label: "Upto 2000",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "Upto 2500",
      name: "upto2500",
      validation: "",
      showItem: "",
      default: "",
      tag: true,
      label: "Upto 2500",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "Upto 3000",
      name: "upto3000",
      validation: "",
      showItem: "",
      default: "",
      tag: true,
      label: "Upto 3000",
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
          name: "mealtimeCategoriesName",
          type: "text",
          collection: "mealTimeCategory",
        },
        shortName: "Package Price",
        addPrivilege: true,
        delPrivilege: true,
        updatePrivilege: true,
        customClass: "medium",
        formMode: "double",
      },
    },
    {
      element: "button",
      type: "subList",
      id: "food-menu",
      itemTitle: {
        name: "title",
        type: "text",
        collection: "",
      },
      exportPrivilege: true,
      title: "Week Menu",
      attributes: foodMenu,

      params: {
        api: `package/foodMenu`,
        parentReference: "package",
        itemTitle: {
          name: "title",
          type: "text",
          collection: "",
        },
        shortName: "Week Menu",
        addPrivilege: false,
        delPrivilege: false,
        updatePrivilege: false,
        customClass: "medium",
        formMode: "double",
        exportPrivilege: true,
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
