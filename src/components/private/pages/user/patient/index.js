import React, { useEffect, useState } from "react";
import moment from "moment";
//
import Layout from "../../../common/layout";
import ListTable from "../../../../elements/list/list";
import { Container } from "../../../common/layout/styels";
import { useSelector } from "react-redux";
import PopupView from "../../../../elements/popupview";
import DietMenu from "./dietMenu";
import SetupMenu from "../../mealSettings/foodMenu/setupMenu";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const Patient = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `Patient List - Diet Food Management Portal`;
  }, []);
  const themeColors = useSelector((state) => state.themeColors);
  // State to control the display of the SetupMenu popup
  const [openMenuSetup, setOpenMenuSetup] = useState(false);
  const [openedMenu, setOpenedMenu] = useState("");
  // State to store the data for the item that was clicked on in the ListTable
  const [openItemData, setOpenItemData] = useState(null);

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
      placeholder: "Name",
      name: "username",
      showItem: "",
      tag: false,
      validation: "",
      default: "",
      label: "Name",
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
      required: false,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "password",
      placeholder: "Password",
      name: "password",
      validation: "",
      default: "",
      // tag: true,
      label: "Password",
      required: false,
      view: false,
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

  const [details] = useState([
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
      type: "textarea",
      apiType: "API",
      selectApi: "",
      placeholder: "Address",
      name: "address",
      validation: "",
      showItem: "address",
      default: "",
      tag: true,
      label: "Address",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "textarea",
      placeholder: "Office Address",
      name: "officeAddress",
      validation: "",
      default: "",
      tag: true,
      label: "Office Address",
      required: false,
      view: true,
      add: true,
      update: true,
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
      type: "text",
      placeholder: "Landmark",
      name: "landmark",
      validation: "",
      default: "",
      tag: true,
      label: "Landmark",
      required: false,
      view: true,
      add: true,
      update: true,
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
      label: "Wedding Day",
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
      placeholder: "Height",
      name: "height",
      validation: "",
      default: "",
      // minimum: 20,
      // maximum: 150,
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
      // minimum: 10,
      // maximum: 150,
      tag: true,
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
      // minimum: 10,
      // maximum: 150,
      tag: true,
      label: "Target Weight",
      required: true,
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
      type: "number",
      placeholder: "% Of Carbs",
      name: "percentageOfCarbs",
      showItem: "",
      disabled: true,
      validation: "",
      default: "",
      tag: true,
      label: "% Of Carbs",
      required: false,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "% Of Protein",
      name: "percentageOfProtein",
      showItem: "",
      disabled: true,
      validation: "",
      default: "",
      tag: true,
      label: "% Of Protein",
      required: false,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "% Of Fat",
      name: "percentageOfFat",
      showItem: "",
      disabled: true,
      validation: "",
      default: "",
      tag: true,
      label: "% Of Fat",
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
    },
    {
      type: "multiSelect",
      apiType: "API",
      selectApi: "fooddislike-lists/select",
      placeholder: "Food Dislike Like",
      name: "foodDisLikeList",
      validation: "",
      showItem: "foodDislikeListName",
      default: "",
      tag: true,
      label: "Food Dislike Like",
      required: false,
      view: true,
      add: true,
      update: true,
      filter: false,
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
      placeholder: "Remarks",
      name: "remarks",
      showItem: "",
      validation: "",
      default: "",
      // tag: true,
      label: "Remarks",
      required: true,
      view: true,
      add: false,
      update: true,
    },
  ]);

  const [patientDiet] = useState([
    // TYPE OF DIET IS A DIET //
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
      filter: false,
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
      collection: "subDiet",
      showItem: "title",
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
      apiType: "API",
      selectApi: "package/select",
      updateOn: "subDiet",
      updateFields: [{ id: "foodMenu", value: "_id", collection: "foodMenu" }],
      placeholder: "Package",
      tags: [
        {
          type: "text",
          item: "calories",
          title: "Calories",
          collection: "",
        },
      ],
      viewButton: {
        title: "View Menu",
        callback: (item, data) => {
          console.log(item);
          setOpenedMenu("menu");
          // Set the data for the clicked item and open the SetupMenu popup
          setOpenItemData({
            data: { ...item, _id: item.foodMenu._id },
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
      name: "package",
      validation: "",
      showItem: "value",
      collection: "diet",
      default: "",
      tag: true,
      label: "Package",
      required: false,
      view: true,
      add: true,
      update: true,
      filter: false,
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
      type: "select",
      selectApi: "900,1000,1100,1200,1300,1400,1500,1600,1700,1800,1900,2000",
      apiType: "CSV",
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
    // {
    //   type: "checkbox",
    //   placeholder: "Dietician Visit",
    //   name: "dieticianVisit",
    //   validation: "",
    //   default: "false",
    //   tag: true,
    //   label: "Dietician Visit",
    //   required: true,
    //   view: true,
    //   add: true,
    //   update: true,
    // },
    // {
    //   type: "date",
    //   placeholder: "Visit Shedule",
    //   name: "visitShedule",
    //   condition: {
    //     item: "dieticianVisit",
    //     if: true,
    //     then: "enabled",
    //     else: "disabled",
    //   },
    //   showItem: "",
    //   validation: "",
    //   default: "",
    //   tag: true,
    //   label: "Visit Shedule",
    //   required: false,
    //   view: true,
    //   add: true,
    //   update: true,
    // },
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
      type: "select",
      apiType: "API",
      selectApi: "user/select?userType=6471b34d9fb2b29fe0458878",
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
      placeholder: "Booking Date",
      name: "bookingDate",
      validation: "",
      default: "",
      tag: true,
      label: "Booking Date",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "select",
      apiType: "API",
      updateOn: "bookingDate",
      selectApi: "day-slot/avail-slot",
      placeholder: "Time Slot",
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
    // {
    //   type: "select",
    //   apiType: "API",
    //   selectApi: "user-type/select",
    //   placeholder: "User Type",
    //   name: "userType",
    //   validation: "",
    //   showItem: "role",
    //   default: "",
    //   label: "User Type",
    //   required: true,
    //   view: true,
    //   add: true,
    //   update: true,
    // },
  ]);

  const [actions] = useState([
    {
      element: "button",
      type: "subItem",
      id: "patient-details",
      itemTitle: "username",
      title: "Details",
      attributes: details,
      params: {
        api: `user/subscriber`,
        parentReference: "user",
        itemTitle: {
          name: "mobileNumber",
          type: "text",
          collection: "",
        },
        shortName: "Patient Details",
        addPrivilege: true,
        delPrivilege: true,
        updatePrivilege: true,
        customClass: "medium",
        formMode: `double`,
      },
    },
    {
      element: "button",
      type: "subItem",
      id: "user/subscriber",
      itemTitle: {
        name: "username",
        type: "text",
        collection: "user",
      },
      title: "Medical Record",
      attributes: medicalRecord,
      params: {
        api: `user/subscriber`,
        parentReference: "user",
        itemTitle: {
          name: "username",
          type: "text",
          collection: "user",
        },
        shortName: "Medical Record",
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
      id: "patient-diet",
      itemTitle: {
        name: "title",
        type: "text",
        collection: "diet",
      },
      // itemTitle: "username",
      title: "Diet",
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
        shortName: "Diet",
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
        name: "username",
        type: "text",
        collection: "dietician",
      },
      title: "Appointment",
      attributes: appointment,
      params: {
        api: `appointment`,
        parentReference: "user",
        // itemTitle: "username",
        itemTitle: {
          name: "username",
          type: "text",
          collection: "dietician",
        },
        shortName: "Appointment",
        addPrivilege: true,
        delPrivilege: true,
        updatePrivilege: true,
        customClass: "medium",
        formMode: "double",
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
  ]);

  return (
    <Container className="noshadow">
      <ListTable actions={actions} api={`user`} itemTitle={{ name: "username", type: "text", collection: "" }} shortName={`Patient`} parentReference={"userType"} referenceId={"6471b3849fb2b29fe045887b"} formMode={`double`} {...props} attributes={attributes}></ListTable>
      {openedMenu === "menu" && openMenuSetup && openItemData && (
        <PopupView
          // Popup data is a JSX element which is binding to the Popup Data Area like HOC
          popupData={
            <SetupMenu
              openData={openItemData}
              setMessage={props.setMessage}
              // Pass selected item data (Menu Title) to the popup for setting the time
            ></SetupMenu>
          }
          themeColors={themeColors}
          closeModal={closeModal}
          itemTitle={{ name: "title", type: "text", collection: "foodMenu" }}
          openData={openItemData} // Pass selected item data to the popup for setting the time and taking menu id and other required data from the list item
          customClass={"full-page"}
        ></PopupView>
      )}
      {openedMenu === "diet" && openMenuSetup && openItemData && (
        <PopupView
          // Popup data is a JSX element which is binding to the Popup Data Area like HOC
          popupData={
            <DietMenu
              openData={openItemData}
              setMessage={props.setMessage}
              // Pass selected item data (Menu Title) to the popup for setting the time
            ></DietMenu>
          }
          themeColors={themeColors}
          closeModal={closeModal}
          itemTitle={{ name: "username", type: "text", collection: "" }}
          openData={openItemData} // Pass selected item data to the popup for setting the time and taking menu id and other required data from the list item
          customClass={"full-page"}
        ></PopupView>
      )}
    </Container>
  );
};
export default Layout(Patient);
