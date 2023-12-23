import React, { useEffect, useState } from "react";
import moment from "moment";
//
import Layout from "../../../../core/layout";
import ListTable from "../../../../core/list/list";
import { Container } from "../../../../core/layout/styels";
import { useSelector } from "react-redux";
import PopupView from "../../../../core/popupview";
import DietMenu from "./dietMenu";
import SetupMenu from "../../mealSettings/foodMenu/setupMenu";
import AppointmentMenu from "./appointment";
// import SetupRecipe from "./setupRecipe";
import SelfOrder from "./selfOrder";
import axios from "axios";
import { checkprivilege, privileges } from "../../../../core/functions/previliage";
import InvoicePDF from "./invoicePDF";

//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const Patient = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `Patient List - Diet Food Management Portal`;
  }, []);
  console.log("userType", props.userType);
  const themeColors = useSelector((state) => state.themeColors);
  // State to control the display of the SetupMenu popup
  const [openMenuSetup, setOpenMenuSetup] = useState(false);
  const [openedMenu, setOpenedMenu] = useState("");
  // State to store the data for the item that was clicked on in the ListTable
  const [openItemData, setOpenItemData] = useState(null);
  // const [openSelftOrderSetup, setSelfOrderSetup] = useState("");
  //const [openSelfItemData, setSelfItemData] = useState(null);

  // Function to close the SetupMenu popup
  const closeModal = () => {
    setOpenMenuSetup(false);
    setOpenItemData(null);
  };

  const [attributes] = useState([
    {
      type: "text",
      placeholder: "CPR Number",
      name: "cprNumber",
      validation: "",
      default: "",
      tag: true,
      label: "CPR Number",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "Mobile Number",
      name: "mobile",
      validation: "number",
      default: "",
      tag: true,
      label: "Mobile Number",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "First Name",
      name: "username",
      showItem: "",
      tag: false,
      validation: "",
      default: "",
      label: "First Name",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "Middle Name",
      name: "middleName",
      showItem: "",
      tag: false,
      validation: "",
      default: "",
      label: "Middle Name",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "Last Name",
      name: "lastName",
      showItem: "",
      tag: false,
      validation: "",
      default: "",
      label: "Last Name",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "email",
      placeholder: "E-Mail",
      name: "email",
      validation: "",
      default: "",
      tag: true,
      label: "E-Mail",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    // {
    //   type: "password",
    //   placeholder: "Password",
    //   name: "password",
    //   validation: "",
    //   default: "",
    //   // tag: true,
    //   label: "Password",
    //   required: true,
    //   view: false,
    //   add: true,
    //   update: false,
    // },
    {
      type: "text",
      placeholder: "Father Name",
      name: "fathername",
      validation: "",
      default: "",
      tag: true,
      label: "Father Name",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "Mother Name",
      name: "mothername",
      validation: "",
      default: "",
      tag: true,
      label: "Mother Name",
      required: false,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "select",
      apiType: "API",
      selectApi: "nationality/select",
      placeholder: "Nationality",
      name: "nationality",
      showItem: "nationality",
      validation: "",
      default: "",
      tag: true,
      label: "Nationality",
      required: true,
      view: true,
      add: true,
      update: true,
      filter: false,
    },
    {
      type: "text",
      placeholder: "Occupation",
      name: "occupation",
      validation: "",
      default: "",
      tag: true,
      label: "Occupation",
      required: false,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "title",
      title: "For user login, the email address will serve as the username, and the CPR number will be used as the password",
      name: "bmr",
      add: true,
      update: true,
    },
    {
      type: "image",
      placeholder: "Image",
      name: "userImage",
      validation: "",
      default: "",
      tag: true,
      label: "Image",
      required: false,
      view: true,
      add: true,
      update: true,
    },
  ]);

  const [medicalRecord] = useState([
    {
      type: "date",
      apiType: "API",
      selectApi: "",
      placeholder: "DOB",
      collection: "subscriber",
      name: "dateOfBirth",
      showItem: "",
      tag: true,
      validation: "",
      minDate: moment().add(-70, "years").toDate(),
      default: moment().toDate(),
      label: "DOB",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    // {
    //   type: "date",
    //   placeholder: "",
    //   name: "dob",
    //   showItem: "dateOfBirth",
    //   collection: "subscriber",
    //   validation: "",
    //   minDate: moment().add(-70, "years").toDate(),
    //   default: moment().toDate(),
    //   tag: true,
    //   label: "DOB",
    //   required: true,
    //   view: true,
    //   add: true,
    //   update: true,
    // },
    {
      type: "select",
      placeholder: "Gender",
      name: "gender",
      validation: "",
      default: "",
      tag: true,
      label: "Gender",
      showItem: "Gender",
      required: false,
      view: true,
      filter: false,
      add: true,
      update: true,
      apiType: "CSV",
      selectApi: "Male,Female",
    },
    {
      type: "number",
      placeholder: "Height(cm)",
      name: "height",
      validation: "",
      default: "",
      // minimum: 20,
      // maximum: 150,
      label: "Height(cm)",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "Present Weight(kg)",
      name: "presentWeight",
      validation: "",
      default: "",
      // minimum: 10,
      // maximum: 150,
      tag: true,
      label: "Present Weight(kg)",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "Target Weight(kg)",
      name: "targetWeight",
      validation: "",
      default: "",
      // minimum: 10,
      // maximum: 150,
      tag: true,
      label: "Target Weight(kg)",
      required: false,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "select",
      apiType: "JSON",
      selectApi: [
        { id: "sedentary", value: "Sedentary" },
        { id: "lightlyactive", value: "Lightly Active" },
        { id: "moderatelyactive", value: "Moderately Active" },
        { id: "veryactive", value: "Very Active" },
        { id: "superactive", value: "Super Active" },
      ],
      placeholder: "User Activeness Status",
      name: "userActivenessStatus",
      showItem: "activenessStatusName",
      validation: "",
      default: "",
      tag: true,
      label: "User Activeness Status",
      required: false,
      view: true,
      add: true,
      update: true,
      filter: false,
    },
    {
      type: "title",
      title: "Body Composition and Energy",
      name: "bmr",
      add: true,
      update: true,
    },
    {
      selectApi: "diet-plan/get-typeofdiet-dietplan",
      updateOn: "userActivenessStatus",
      type: "text",
      placeholder: "BMI",
      disabled: true,
      name: "bmi",
      validation: "",
      default: "",
      tag: true,
      label: "BMI",
      required: false,
      view: true,
      add: true,
      update: true,
    },
    // {
    //   selectApi: "diet-plan/get-typeofdiet-dietplan",
    //   updateOn: "userActivenessStatus",
    //   type: "text",
    //   placeholder: "BMI",
    //   disabled: true,
    //   name: "bmi",
    //   validation: "",
    //   default: "",
    //   tag: true,
    //   label: "BMI",
    //   required: false,
    //   view: true,
    //   add: true,
    //   update: true,
    // },
    {
      type: "number",
      placeholder: "BMR",
      name: "bmr",
      disabled: true,
      validation: "",
      default: "",
      tag: true,
      label: "BMR",
      required: false,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "IBW",
      name: "ibw",
      // disabled: true,
      validation: "",
      default: "0",
      tag: true,
      label: "IBW",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "Calories",
      name: "calories",
      disabled: true,
      showItem: "",
      validation: "",
      default: "",
      tag: true,
      label: "Calories",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "select",
      apiType: "JSON",
      // selectApi: "For Maintaining, Mild Weight Loss, Weight Loss, Extreme Weight Loss",
      selectApi: [
        { id: "formaintaining", value: "For Maintaining (95%)" },
        { id: "mildweightloss", value: "Mild Weight Loss (86%)" },
        { id: "weightloss", value: "Weight Loss (74%)" },
        { id: "extremeweightloss", value: "Extreme Weight Loss 50-60%" },
      ],
      placeholder: "Proposed Calorie",
      name: "proposedCalorie",
      validation: "",
      showItem: "proposedCalorie",
      default: "",
      tag: true,
      label: "Proposed Calorie",
      required: true,
      view: true,
      add: true,
      update: true,
      filter: false,
    },
    {
      type: "number",
      placeholder: "Daily caloric intake",
      updateOn: "proposedCalorie",

      name: "dailyCalorie",
      showItem: "",
      disabled: true,
      validation: "",
      default: "",
      tag: true,
      label: "Daily caloric intake",
      required: false,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "Carbs",
      name: "percentageOfCarbs",
      showItem: "",
      disabled: true,
      validation: "",
      default: "",
      tag: true,
      label: "Carbs",
      required: false,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "Protein",
      name: "percentageOfProtein",
      showItem: "",
      disabled: true,
      validation: "",
      default: "",
      tag: true,
      label: "Protein",
      required: false,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "Fat",
      name: "percentageOfFat",
      showItem: "",
      disabled: true,
      validation: "",
      default: "",
      tag: true,
      label: "Fat",
      required: false,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "info",
      content: "All the above fields are auto calculated.",
      name: "bmr",
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "EER",
      name: "eer",
      validation: "",
      default: "",
      tag: true,
      label: "EER",
      required: false,
      view: true,
      add: false,
      update: true,
    },
    {
      type: "text",
      placeholder: "RDA",
      name: "rda",
      validation: "",
      default: "",
      tag: true,
      label: "RDA",
      required: false,
      view: true,
      add: false,
      update: true,
    },
    {
      type: "multiSelect",
      apiType: "API",
      selectApi: "aimof-programs/select",
      placeholder: "Aim of Programs",
      name: "aimOfProgram",
      showItem: "aimofProgramName",
      validation: "",
      default: "",
      tag: true,
      label: "Aim of Programs",
      required: false,
      view: true,
      add: true,
      update: true,
      filter: false,
      search: true,
    },
    {
      type: "multiSelect",
      apiType: "API",
      selectApi: "medical-conditions/select",
      placeholder: "Medical Condition",
      name: "medicalCondition",
      showItem: "medicalConditionsName",
      validation: "",
      default: "",
      tag: true,
      label: "Medical Condition",
      required: false,
      view: true,
      add: true,
      update: true,
      filter: false,
      search: true,
    },
    {
      type: "text",
      placeholder: "Other",
      name: "other",
      condition: {
        item: "materialType",
        if: "Other",
        then: "enabled",
        else: "disabled",
      },
      validation: "",
      default: "",
      label: "Other",
      tag: true,
      required: false,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "multiSelect",
      apiType: "API",
      selectApi: "allergy/select",
      placeholder: "Allergy",
      name: "allergyList",
      showItem: "title",
      validation: "",
      default: "",
      tag: true,
      label: "Allergy",
      required: false,
      view: true,
      add: true,
      update: true,
      filter: false,
      search: true,
    },
    {
      type: "multiSelect",
      apiType: "API",
      selectApi: "foodlike-lists/select",
      placeholder: "Food Like List",
      name: "foodLikeList",
      validation: "",
      showItem: "foodLikeListName",
      default: "",
      tag: true,
      label: "Food Like List",
      required: false,
      view: true,
      add: true,
      update: true,
      filter: false,
      search: true,
    },
    {
      type: "multiSelect",
      apiType: "API",
      selectApi: "protein-categories/select",
      placeholder: "Food Dislike List",
      name: "foodDisLikeList",
      validation: "",
      showItem: "proteinCategoriesName",
      default: "",
      tag: true,
      label: "Food Dislike List",
      required: false,
      view: true,
      add: true,
      update: true,
      filter: false,
      search: true,
    },
    {
      type: "multiSelect",
      apiType: "API",
      selectApi: "addiction-lists/select",
      placeholder: "Addiction List",
      name: "addictionList",
      validation: "",
      showItem: "addictionListName",
      default: "",
      tag: true,
      label: "Addiction List",
      required: false,
      view: true,
      add: true,
      update: true,
      filter: false,
      search: true,
    },
    {
      type: "multiSelect",
      apiType: "API",
      selectApi: "using-any-supplement/select",
      placeholder: "Supplement List",
      name: "usingAnySupplement",
      validation: "",
      showItem: "usingAnySupplementName",
      default: "",
      tag: true,
      label: "Supplement List",
      required: false,
      view: true,
      add: true,
      update: true,
      filter: false,
      search: true,
    },
    {
      type: "multiSelect",
      apiType: "API",
      selectApi: "under-any-medication/select",
      placeholder: "Medication",
      name: "underAnyMedication",
      validation: "",
      showItem: "underAnyMedicationName",
      default: "",
      tag: true,
      label: "Medication",
      required: false,
      view: true,
      add: true,
      update: true,
      filter: false,
    },
    {
      type: "checkbox",
      placeholder: "Marital Status",
      name: "maritalStatus",
      validation: "",
      default: "false",
      tag: true,
      label: "Marital Status",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "Number of Children",
      name: "numberOfChildren",
      condition: {
        item: "maritalStatus",
        if: true,
        then: "enabled",
        else: "disabled",
      },
      showItem: "",
      validation: "",
      default: "",
      tag: true,
      label: "Number of Children",
      required: false,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "date",
      placeholder: "Wedding Day",
      name: "weddingDay",
      minDate: moment().add(-50, "years").toDate(),
      default: moment().toDate(),
      condition: {
        item: "maritalStatus",
        if: true,
        then: "enabled",
        else: "disabled",
      },
      showItem: "",
      validation: "",
      tag: true,
      label: "Wedding Day",
      required: false,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "checkbox",
      placeholder: "Pregnant",
      name: "isPregnant",
      condition: {
        item: "maritalStatus",
        if: true,
        then: "enabled",
        else: "disabled",
      },
      validation: "",
      default: "false",
      tag: true,
      label: "Pregnant",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "select",
      placeholder: "Trimester",
      name: "trimester",
      condition: {
        item: "isPregnant",
        if: true,
        then: "enabled",
        else: "disabled",
      },
      validation: "",
      default: "IN",
      tag: true,
      editable: true,
      label: "Trimester",
      showItem: "",
      required: false,
      view: true,
      filter: false,
      add: true,
      update: true,
      apiType: "CSV",
      selectApi: "1st Trimester, 2nd Trimester, 3rd Trimester",
    },
  ]);

  const [deliveryAddress] = useState([
    // TYPE OF DIET IS A DIET //
    {
      type: "select",
      placeholder: "Address Type",
      name: "title",
      showItem: "",
      validation: "",
      default: "",
      tag: true,
      label: "Address Type",
      required: true,
      view: true,
      add: true,
      update: true,
      selectApi: "Home,Office",
      apiType: "CSV",
    },
    {
      type: "text",
      placeholder: "Flat",
      name: "flat",
      showItem: "",
      validation: "",
      default: "",
      tag: true,
      label: "Flat",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "Block",
      name: "block",
      showItem: "",
      validation: "",
      default: "",
      tag: true,
      label: "Block",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "Road",
      name: "road",
      showItem: "",
      validation: "",
      default: "",
      tag: true,
      label: "Road",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "Area",
      name: "area",
      showItem: "",
      validation: "",
      default: "",
      tag: true,
      label: "Area",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "Floor",
      name: "floor",
      showItem: "",
      validation: "",
      default: "",
      tag: true,
      label: "Floor",
      required: false,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "textarea",
      placeholder: "Delivery Note",
      name: "deliveryNote",
      showItem: "",
      validation: "",
      default: "",
      tag: true,
      label: "Delivery Note",
      required: true,
      view: true,
      add: true,
      update: true,
    },

    {
      type: "select",
      apiType: "API",
      selectApi: "delivery-slot/select",
      placeholder: "Delivery Slot",
      name: "deliverySlot",
      validation: "",
      collection: "deliverySlot",
      showItem: "slot",
      default: "",
      tag: true,
      label: "Delivery Slot",
      required: true,
      view: true,
      add: true,
      update: true,
      filter: false,
    },
    {
      type: "select",
      apiType: "API",
      selectApi: "delivery-location/select",
      placeholder: "Location",
      name: "deliveryLocation",
      collection: "deliveryLocation",
      validation: "",
      showItem: "deliveryLocation",
      default: "",
      tag: true,
      label: "Location",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "checkbox",
      placeholder: "Default Address",
      name: "isDefault",
      validation: "",
      default: "false",
      tag: true,
      label: "Default Address",
      required: false,
      view: true,
      add: false,
      update: false,
    },
    {
      type: "select",
      placeholder: "Contact Person for Delivery",
      name: "contactPerson",
      validation: "",
      default: "false",
      tag: true,
      label: "Contact Person for Delivery",
      required: true,
      view: true,
      add: true,
      update: true,
      selectApi: "Self,Other",
      apiType: "CSV",
    },
    {
      type: "text",
      placeholder: "Delivery Contact Name",
      name: "deliveryContactName",
      condition: {
        item: "contactPerson",
        if: "Other",
        then: "enabled",
        else: "disabled",
      },
      showItem: "",
      validation: "",
      default: "",
      tag: true,
      label: "Delivery Contact Name",
      required: false,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "Delivery Contact Number",
      name: "deliverycontactNumber",
      condition: {
        item: "contactPerson",
        if: "Other",
        then: "enabled",
        else: "disabled",
      },
      showItem: "",
      validation: "",
      default: "",
      tag: true,
      label: "Delivery Contact Number",
      required: false,
      view: true,
      add: true,
      update: true,
    },
  ]);

  const [admissionHistory] = useState([
    {
      type: "select",
      placeholder: "Admission Type",
      name: "admissionType",
      validation: "",
      default: "IN",
      tag: true,
      editable: true,
      label: "Admission Type",
      showItem: "Admission Type",
      required: false,
      view: false,
      filter: false,
      add: false,
      update: false,
      apiType: "CSV",
      selectApi: "IN,OUT",
    },
    {
      type: "text",
      placeholder: "Room Number",
      name: "roomNumber",
      validation: "",
      default: "",
      tag: true,
      label: "Room Number",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "datetime",
      placeholder: "Admission Date",
      name: "admissionDate",
      showItem: "",
      validation: "",
      default: "",
      tag: true,
      label: "Admission Date",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "datetime",
      placeholder: "Discharge",
      name: "dischargeDate",
      showItem: "",
      validation: "",
      default: "",
      tag: true,
      label: "Discharge Date",
      required: false,
      view: true,
      add: false,
      update: true,
    },
    {
      type: "text",
      placeholder: "Diagnose Report",
      name: "diagnoseNote",
      showItem: "",
      validation: "",
      default: "",
      label: "Diagnose Report",
      required: true,
      view: true,
      add: false,
      update: true,
    },
  ]);

  const [patientDiet] = useState([
    {
      type: "select",
      apiType: "API",
      selectApi: "package/select",
      placeholder: "Package",
      name: "package",
      validation: "",
      collection: "package",
      showItem: "title",
      default: "",
      tag: true,
      label: "Package",
      required: true,
      view: true,
      add: true,
      update: true,
      filter: false,
    },
    {
      type: "select",
      apiType: "API",
      selectApi: "package/food-menu",
      updateOn: "package",
      // updateFields: [{ id: "foodMenu", value: "_id", collection: "foodMenu" }],
      placeholder: "Menu",
      tags: [
        {
          type: "text",
          item: "menuType",
          title: "Menu Type",
          collection: "",
        },
      ],
      viewButton: {
        title: "View Menu",
        callback: (item, data) => {
          console.log("popup item", item);
          setOpenedMenu("menu");
          // Set the data for the clicked item and open the SetupMenu popup
          setOpenItemData({
            data: { ...item },
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
      showItem: "value",
      collection: "foodMenu",
      params: [{ name: "package" }],
      default: "",
      tag: true,
      label: "Menu",
      required: false,
      view: true,
      add: true,
      update: true,
      filter: false,
    },
    {
      type: "title",
      title: "Menu Settings",
      name: "menuSettings",
      add: true,
      update: true,
    },
    {
      type: "select",
      selectApi: "package/calories",
      updateOn: "package",
      apiType: "API",
      placeholder: "Calories",
      name: "calories",
      showItem: "",
      validation: "",
      default: "",
      tag: true,
      label: "Calories",
      filter: false,
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "multiSelect",
      placeholder: "Select Days of Week",
      listView: true,
      name: "eligibleDays",
      validation: "",
      default: [0, 1, 2, 3, 4, 5, 6],
      label: "Select Days of Week",
      required: true,
      view: true,
      customClass: "list",
      add: true,
      update: true,
      apiType: "JSON",
      search: false,
      selectApi: [
        { value: "Sunday", id: 0 },
        { value: "Monday", id: 1 },
        { value: "Tuesday", id: 2 },
        { value: "Wednesday", id: 3 },
        { value: "Thursday", id: 4 },
        { value: "Friday", id: 5 },
        { value: "Saturday", id: 6 },
      ],
    },
    {
      type: "multiSelect",
      placeholder: "Select Meal Times",
      name: "mealTimeCategory",
      updateOn: "foodMenu",
      label: "Select Meal Times",
      required: true,
      view: true,
      default: "",
      add: true,
      update: true,
      apiType: "API",
      search: false,
      selectApi: "mealtime-category/select-by-menu",
    },
    {
      type: "title",
      title: "Time & Duration",
      name: "menuSettings",
      add: true,
      update: true,
    },
    {
      type: "date",
      placeholder: "Start Date & Time",
      name: "startDate",
      showItem: "",
      validation: "",
      default: "",
      tag: true,
      label: "Start Date",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "Number of Days",
      name: "numberofDays",
      showItem: "",
      validation: "",
      default: "",
      tag: true,
      label: "Number of Days",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "textarea",
      placeholder: "Remarks",
      name: "remarks",
      showItem: "",
      validation: "",
      default: "",
      tag: true,
      label: "Remarks",
      required: false,
      view: true,
      add: true,
      update: true,
    },
  ]);

  const [appointment] = useState([
    {
      type: "text",
      apiType: "API",
      selectApi: "",
      placeholder: "Booking ID",
      name: "bookingId",
      validation: "",
      showItem: "day",
      default: "",
      tag: true,
      label: "Booking ID",
      required: false,
      view: true,
      add: false,
      update: false,
      filter: false,
    },
    {
      type: "checkbox",
      placeholder: "Physical Consultation",
      name: "physical",
      validation: "",
      default: "false",
      tag: true,
      label: "Physical Consultation",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "select",
      apiType: "API",
      selectApi: "diet-centre-branch/select",
      placeholder: "Center",
      name: "center",
      condition: {
        item: "physical",
        if: true,
        then: "enabled",
        else: "disabled",
      },
      showItem: "name",
      validation: "",
      default: "",
      label: "Center",
      required: true,
      view: true,
      add: true,
      update: true,
      filter: false,
    },
    {
      type: "select",
      apiType: "API",
      updateOn: "center",
      selectApi: "user/branch-dietitian?userType=6471b34d9fb2b29fe0458878",
      placeholder: "Dietician",
      name: "dietician",
      validation: "",
      showItem: "userDisplayName",
      default: "",
      tag: true,
      label: "Dietician",
      required: true,
      view: true,
      add: true,
      update: true,
      filter: true,
    },

    {
      type: "date",
      placeholder: "Start Date & Time",
      name: "bookingDate",
      showItem: "",
      validation: "",
      default: "",
      tag: true,
      label: "Start Date",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "select",
      apiType: "API",
      updateOn: ["bookingDate", "dietician", "physical"],
      selectApi: "day-slot/avail-slot",
      placeholder: "Time Slot",
      params: [{ name: "center" }, { name: "bookingDate" }, { name: "dietician" }, { name: "physical" }],
      name: "bookingSlot",
      showItem: "availableSlots",
      validation: "",
      default: "",
      tag: true,
      label: "Time Slot",
      required: true,
      view: true,
      add: true,
      update: true,
      filter: false,
    },
    {
      type: "text",
      apiType: "API",
      updateOn: "",
      selectApi: "",
      placeholder: "Status",
      name: "appointmentStatus",
      showItem: "",
      validation: "",
      default: "",
      tag: true,
      label: "Status",
      required: false,
      view: true,
      add: false,
      update: false,
      filter: false,
    },
  ]);

  const [deliveryAddressActions] = useState([
    {
      element: "button",
      type: "callback",
      callback: (item, data) => {
        setDefault(data);
        // Write code to set default..
      },

      icon: "default",
      title: "Set Default",
      condition: {
        item: "isDefault",
        if: "true",
        then: false,
        else: false,
      },
      params: {
        api: ``,
        parentReference: "",
        // itemTitle: "username",
        addPrivilege: true,
        delPrivilege: true,
        updatePrivilege: true,
        customClass: "medium",
      },
    },
  ]);
  const [invoice] = useState([
    {
      element: "button",
      type: "callback",
      callback: (item, data) => {
        // Write code to set default..
        setOpenedMenu("invoice");
        setOpenItemData({ item, data });
        setOpenMenuSetup(true);
      },

      icon: "menu",
      title: "Invoice",
      itemTitle: { name: "username", type: "text", collection: "user" },
      params: {
        api: ``,
        parentReference: "",
        // itemTitle: "username",
        addPrivilege: true,
        delPrivilege: true,
        updatePrivilege: true,
        customClass: "medium",
      },
    },
  ]);
  const setDefault = async (data) => {
    props.setLoaderBox(true);
    await axios
      .put(`${process.env.REACT_APP_API}delivery-address/default`, data)
      .then((response) => {
        props.setLoaderBox(false);
        console.log(response);
        if (response.data) {
          props.setMessage({ content: response.data.message });
          // refreshView();
        } else {
          // Handle the case where response.data is undefined
          console.error("Response data is undefined.");
        }
      })
      .catch((error) => {
        props.setLoaderBox(false);
        // Handle any errors that occur during the API request
        console.error("API request error:", error);
      });
  };

  const [actions] = useState([
    ...((checkprivilege([privileges.doctor]) ? false : true)
      ? [
          {
            element: "button",
            type: "subItem",
            id: "user/subscriber/web",
            itemTitle: {
              name: "username",
              type: "text",
              collection: "user",
            },
            title: "Medical Record",
            attributes: medicalRecord,
            params: {
              api: `user/subscriber/web`,
              parentReference: "user",
              itemTitle: {
                name: "username",
                type: "text",
                collection: "user",
              },
              shortName: "Medical Record",
              addPrivilege: true,
              delPrivilege: true,
              updatePrivilege: checkprivilege([privileges.doctor]) ? false : true,
              //if you want to show edit button for passed previlges then make value for condtion is 'true' or you dont want to give edit option for the pased previlges then 'false'
              customClass: "medium",
              formMode: "double",
            },
          },
        ]
      : []),
    ...((checkprivilege([privileges.doctor]) ? false : true)
      ? [
          {
            element: "button",
            type: "subList",
            id: "delivery-address",
            parentReference: "user",
            itemTitle: {
              name: "username",
              type: "text",
              collection: "user",
            },
            title: "Delivery Address",
            attributes: deliveryAddress,
            params: {
              api: `delivery-address`,
              parentReference: "user",
              itemTitle: {
                name: "username",
                type: "text",
                collection: "user",
              },
              actions: deliveryAddressActions,
              shortName: "Delivery Address",
              addPrivilege: true,
              delPrivilege: true,
              updatePrivilege: true,
              customClass: "medium",
              formMode: "double",
            },
          },
        ]
      : []),
    {
      element: "button",
      type: "subList",
      id: "patient-history",
      itemTitle: { name: "admissionDate", type: "text", collection: "" },
      title: "Admission History",
      attributes: admissionHistory,
      params: {
        api: `appointment/admission-history`,
        parentReference: "user",
        itemTitle: {
          name: "admissionDate",
          type: "text",
          collection: "",
        },
        shortName: "Admission History",
        addPrivilege: true,
        delPrivilege: true,
        updatePrivilege: true,
        customClass: "medium",
        formMode: "double",
      },
    },
    // TYPE OF DIET IS A DIET //
    {
      element: "button",
      type: "subList",
      id: "patient-package",
      itemTitle: {
        name: "title",
        type: "text",
        collection: "diet",
      },
      // itemTitle: "username",
      title: "Diet Package",
      attributes: patientDiet,
      params: {
        api: `patient-diet`,
        parentReference: "user",
        itemTitle: {
          name: "title",
          type: "text",
          collection: "diet",
        },
        // itemTitle: "username",
        shortName: "Diet Package",
        actions: invoice,
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
      id: "appointment",
      // itemTitle: "username",
      itemTitle: {
        name: "userDisplayName",
        type: "text",
        collection: "dietician",
      },
      exportPrivilege: true,
      title: "Appointment",
      attributes: appointment,
      params: {
        api: `appointment`,
        parentReference: "user",
        // itemTitle: "userDisplayName",
        itemTitle: {
          name: "userDisplayName",
          type: "text",
          collection: "dietician",
        },
        shortName: "Appointment",
        addPrivilege: true,
        delPrivilege: true,
        updatePrivilege: true,
        customClass: "medium",
        formMode: "double",
        exportPrivilege: true,
      },
    },
    {
      element: "button",
      type: "callback",
      callback: (item, data) => {
        // Set the data for the clicked item and open the SetupMenu popup
        console.log(data);
        setOpenedMenu("diet");
        setOpenItemData({ item, data });
        setOpenMenuSetup(true);
      },
      itemTitle: { name: "username", type: "text", collection: "" },
      icon: "menu",
      title: "Diet Menu",
      params: {
        api: `food-group-item`,
        parentReference: "",
        itemTitle: { name: "username", type: "text", collection: "" },
        shortName: "Recipe Items",
        addPrivilege: true,
        delPrivilege: true,
        updatePrivilege: true,
        customClass: "medium",
      },
    },
    {
      element: "button",
      type: "callback",
      // id: "selfOrder",
      callback: (item, data) => {
        // Set the data for the clicked item and open the SetupMenu popup
        setOpenedMenu("selfOrders");
        console.log("adfadfadfadfadf fadsfadsf 111", item, data);
        // setSelfItemData({ item, data });
        // setSelfOrderSetup(true);
        setOpenItemData({ item, data });
        setOpenMenuSetup(true);
      },
      itemTitle: {
        name: "mealName",
        type: "text",
        collection: "meal",
      },
      icon: "menu",
      title: "Self Order",
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
  ]);
  return (
    <Container className="noshadow">
      <ListTable actions={actions} api={`user`} itemTitle={{ name: "fullName", type: "text", collection: "" }} shortName={`Patient`} parentReference={"userType"} referenceId={"6471b3849fb2b29fe045887b"} formMode={`double`} {...props} attributes={attributes}></ListTable>
      {openedMenu === "menu" && openMenuSetup && openItemData && (
        <PopupView
          // Popup data is a JSX element which is binding to the Popup Data Area like HOC
          popupData={
            <SetupMenu
              openData={openItemData}
              setMessage={props.setMessage}
              {...props}
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
      {openedMenu === "diet" && openMenuSetup && openItemData && (
        <PopupView
          // Popup data is a JSX element which is binding to the Popup Data Area like HOC
          popupData={<DietMenu openData={openItemData} setMessage={props.setMessage} {...props} themeColors={themeColors} key={"patient-diet"}></DietMenu>}
          themeColors={themeColors}
          closeModal={closeModal}
          itemTitle={{ name: "fullName", type: "text", collection: "" }}
          openData={openItemData} // Pass selected item data to the popup for setting the time and taking menu id and other required data from the list item
          customClass={"full-page"}
        ></PopupView>
      )}
      {openedMenu === "appointment" && openMenuSetup && openItemData && (
        <PopupView
          // Popup data is a JSX element which is binding to the Popup Data Area like HOC
          popupData={
            <AppointmentMenu
              openData={openItemData}
              setMessage={props.setMessage}
              // Pass selected item data (Menu Title) to the popup for setting the time
            ></AppointmentMenu>
          }
          themeColors={themeColors}
          closeModal={closeModal}
          itemTitle={{ name: "username", type: "text", collection: "" }}
          openData={openItemData} // Pass selected item data to the popup for setting the time and taking menu id and other required data from the list item
          customClass={"medium"}
        ></PopupView>
      )}
      {openedMenu === "invoice" && openMenuSetup && openItemData && (
        <PopupView
          // Popup data is a JSX element which is binding to the Popup Data Area like HOC
          popupData={
            <InvoicePDF
              openData={openItemData}
              setMessage={props.setMessage}
              // Pass selected item data (Menu Title) to the popup for setting the time
            ></InvoicePDF>
          }
          themeColors={themeColors}
          closeModal={closeModal}
          itemTitle={{ name: "username", type: "text", collection: "" }}
          openData={openItemData} // Pass selected item data to the popup for setting the time and taking menu id and other required data from the list item
          customClass={"medium"}
        ></PopupView>
      )}
      {/* {openMenuSetup && openItemData && (
        <PopupView
          // Popup data is a JSX element which is binding to the Popup Data Area like HOC
          popupData={
            <SetupRecipe
              openData={openItemData}
              setMessage={props.setMessage}
              // Pass selected item data (Menu Title) to the popup for setting the time
            ></SetupRecipe>
          }
          themeColors={themeColors}
          closeModal={closeModal}
          itemTitle={{ name: "title", type: "text", collection: "" }}
          openData={openItemData} // Pass selected item data to the popup for setting the time and taking menu id and other required data from the list item
          customClass={"full-page"}
        ></PopupView>
      )} */}
      {openedMenu === "selfOrders" && openMenuSetup && openItemData && (
        <PopupView
          // Popup data is a JSX element which is binding to the Popup Data Area like HOC
          popupData={
            <SelfOrder
              openData={openItemData}
              setMessage={props.setMessage}
              // Pass selected item data (Menu Title) to the popup for setting the time
              closeModal={closeModal}
            ></SelfOrder>
          }
          themeColors={themeColors}
          closeModal={closeModal}
          itemTitle={{ name: "title", type: "text", collection: "recipe" }}
          openData={openItemData} // Pass selected item data to the popup for setting the time and taking menu id and other required data from the list item
          customClass={"full-page"}
        ></PopupView>
      )}
    </Container>
  );
};
export default Layout(Patient);
