import React, { useEffect, useState } from "react";
import Layout from "../../../common/layout";
import ListTable from "../../../../elements/list/list";
import { Container } from "../../../common/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const MedicalRecord = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `Medical Record List - Diet Food Management Portal`;
  }, []);

  const [attributes] = useState([
    {
      type: "text",
      placeholder: "MR Number",
      name: "mrNumber",
      validation: "",
      default: "",
      label: "MR Number",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "Admission Type",
      name: "admissionType",
      validation: "",
      default: "",
      label: "Admission Type",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    // TYPE OF DIET IS A DIET //
    {
      type: "text",
      placeholder: "Diet",
      name: "typeOfDiet",
      showItem: "typeOfDietName",
      validation: "",
      default: "",
      label: "Diet",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "Diagnosis",
      name: "diagnosis",
      validation: "",
      default: "",
      label: "Diagnosis",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "textarea",
      placeholder: "Remarks",
      name: "remarks",
      validation: "",
      default: "",
      label: "Remarks",
      required: false,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "date",
      placeholder: "Admission Date",
      name: "admissionDate",
      validation: "",
      default: "",
      label: "Admission Date",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "date",
      placeholder: "Discharge Date",
      name: "dischargeDate",
      validation: "",
      default: "",
      label: "Discharge Date",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "Room Number",
      name: "roomNumber",
      validation: "",
      default: "",
      label: "Room Number",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "boolean",
      placeholder: "Is Active",
      name: "isActive",
      validation: "",
      default: "",
      label: "Is Active",
      required: true,
      view: true,
      add: true,
      update: true,
    },
  ]);
  const [subscriberProfile] = useState([
    {
      type: "number",
      placeholder: "Height",
      name: "height",
      validation: "",
      default: "",
      label: "Height",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "Present Weight",
      name: "presentWeight",
      validation: "",
      default: "",
      label: "Present Weight",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "Target Weight",
      name: "targetWeight",
      validation: "",
      default: "",
      label: "Target Weight",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "BMI",
      name: "bmi",
      validation: "",
      default: "",
      label: "BMI",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "BMR",
      name: "bmr",
      validation: "",
      default: "",
      label: "BMR",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "select",
      apiType: "API",
      selectApi: "activeness-status/select",
      placeholder: "Activeness Status",
      name: "userActivenessStatus",
      validation: "",
      showItem: "",
      default: "",
      label: "Activeness Status",
      required: true,
      view: false,
      add: true,
      update: true,
      filter: false,
    },
    {
      type: "select",
      apiType: "API",
      selectApi: "aimof-programs/select",
      placeholder: "Aim of Programs",
      name: "aimOfProgram",
      validation: "",
      // showItem: "role",
      default: "",
      label: "Aim of Programs",
      required: true,
      view: false,
      add: true,
      update: true,
      filter: false,
    },
    {
      type: "select",
      apiType: "API",
      selectApi: "medical-conditions/select",
      placeholder: "Medical Condition",
      name: "foodLikeList",
      validation: "",
      // showItem: "role",
      default: "",
      label: "Medical Condition",
      required: true,
      view: false,
      add: true,
      update: true,
      filter: false,
    },
    {
      type: "select",
      apiType: "API",
      selectApi: "foodlike-lists/select",
      placeholder: "Food Like List",
      name: "foodLikeList",
      validation: "",
      // showItem: "role",
      default: "",
      label: "Food Like List",
      required: true,
      view: false,
      add: true,
      update: true,
      filter: false,
    },
    {
      type: "select",
      apiType: "API",
      selectApi: "fooddislike-lists/select",
      placeholder: "Food Dislike Like",
      name: "foodDislikeList",
      validation: "",
      // showItem: "role",
      default: "",
      label: "Food Dislike Like",
      required: true,
      view: false,
      add: true,
      update: true,
      filter: false,
    },
    {
      type: "select",
      apiType: "API",
      selectApi: "addiction-lists/select",
      placeholder: "Addiction List",
      name: "addictionList",
      validation: "",
      // showItem: "role",
      default: "",
      label: "Addiction List",
      required: true,
      view: false,
      add: true,
      update: true,
      filter: false,
    },
    {
      type: "select",
      apiType: "API",
      selectApi: "using-any-supplement/select",
      placeholder: "Supplement List",
      name: "supplement",
      validation: "",
      // showItem: "role",
      default: "",
      label: "Supplement List",
      required: true,
      view: false,
      add: true,
      update: true,
      filter: false,
    },
    {
      type: "select",
      apiType: "API",
      selectApi: "under-any-medication/select",
      placeholder: "Medication",
      name: "medication",
      validation: "",
      // showItem: "role",
      default: "",
      label: "Medication",
      required: true,
      view: false,
      add: true,
      update: true,
      filter: false,
    },
  ]);

  const [actions] = useState([
    {
      // Element type for rendering
      element: "button",
      // Type of action, in this case a sublist
      type: "subItem",
      // Unique identifier for the submenu
      id: "patient-details",
      // Displayed item title
      itemTitle: "mrNumber",
      // Title of the submenu
      title: "Details",
      // Additional attributes for timing
      attributes: subscriberProfile,
      // Parameters for API and submenu configuration
      params: {
        // API endpoint for submenu data
        api: `user/subscriber`,
        // Parent reference for the submenu
        parentReference: "user",
        // Property name for the submenu item title
        itemTitle: "mrNumber",
        // Short name for the submenu
        shortName: "Patient Details",
        // Privileges for adding submenu items
        addPrivilege: true,
        // Privileges for deleting submenu items
        delPrivilege: true,
        // Privileges for updating submenu items
        updatePrivilege: true,
        // Custom CSS class for styling
        customClass: "medium",
      },
    },
  ]);
  // Use the useTranslation hook from react-i18next to handle translations
  // const parkingDuration = totalDuration > 120 ? (days > 0 ? days + `d, ` : ``) + (hours > 0 ? hours + `h, ` : ``) + (minutes + t("m")) : totalDuration.toFixed(0) + ` ` + t("minutes");
  return (
    <Container className="noshadow">
      {/* Render a ListTable component */}
      <ListTable
        // Actions to be displayed in the ListTable
        actions={actions}
        // API endpoint for fetching menu data
        api={`patient-history`}
        // Property name for the title of each menu item
        itemTitle={`username`}
        // Short name or label for the menu
        shortName={`User`}
        // Privilege flag indicating whether the user can add menu items
        // formMode={`single`}
        formMode={`double`}
        //
        {...props}
        // Additional attributes related to the menu
        attributes={attributes}
      ></ListTable>
    </Container>
  );
};
// exporting the page with parent container layout..
export default Layout(MedicalRecord);
