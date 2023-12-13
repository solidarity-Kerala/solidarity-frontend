import React, { useEffect, useState } from "react";
import Layout from "../../../elements/layout";
import ListTable from "../../../elements/list/list";
import { Container } from "../../../elements/layout/styels";
import PopupView from "../../../elements/popupview";
import SetupRecipe from "./setupRecipe";
import { useSelector } from "react-redux";

const RestorePatient = (props) => {
  useEffect(() => {
    document.title = `Recipe - Diet Food Management Portal`;
  }, []);

  const themeColors = useSelector((state) => state.themeColors);
  const [attributes] = useState([
  
    {
      type: "text",
      placeholder: "Employee ID",
      name: "employeeID",
      validation: "",
      default: "",
      label: "Employee ID",
      required: false,
      view: true,
      add: false,
      update: false,
    },
    {
      type: "select",
      apiType: "API",
      selectApi: "user-type/select",
      placeholder: "User Type",
      name: "userType",
      validation: "",
      showItem: "role",
      tag: true,
      default: "",
      label: "User Type",
      required: true,
      view: true,
      add: true,
      update: false,
      filter: true,
    },
    {
      type: "text",
      placeholder: "Name",
      name: "userDisplayName",
      validation: "",
      default: "",
      label: "Name",
      required: true,
      view: true,
      add: true,
      update: false,
    },
    {
      type: "select",
      placeholder: "Gender",
      name: "gender",
      validation: "",
      default: "",
      tag: true,
      label: "Gender",
      showItem: "Gender",
      required: true,
      view: false,
      filter: false,
      add: true,
      update: false,
      apiType: "CSV",
      selectApi: "Male,Female",
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
      update: false,
    },
    {
      type: "select",
      placeholder: "Gender",
      name: "subscriber",
      validation: "",
      default: "",
      tag: true,
      label: "Gender",
      showItem: "gender",
      required: true,
      view: true,
      add: false,
      update: false,
      filter: false,
      // apiType: "CSV",
      // selectApi: "Male,Female",
    },
    {
      type: "password",
      placeholder: "password",
      name: "password",
      validation: "",
      default: "",
      // tag: true,
      label: "password",
      required: true,
      view: false,
      add: true,
      update: false,
    },
    {
      type: "textarea",
      apiType: "",
      selectApi: "",
      placeholder: "Address",
      name: "address",
      collection: "subscriber",
      validation: "",
      showItem: "address",
      default: "",
      tag: true,
      label: "Address",
      required: true,
      view: true,
      add: true,
      update: false,
    },
    {
      type: "image",
      placeholder: "Image",
      name: "userImage",
      validation: "",
      default: "",
      tag: true,
      label: "Image",
      required: true,
      view: true,
      add: true,
      update: false,
    },
    {
      type: "select",
      placeholder: "Identity Type",
      name: "identityType",
      validation: "",
      default: "",
      tag: false,
      label: "Identity Type",
      required: true,
      view: true,
      add: true,
      update: false,
      selectApi: "Passport, License",
      apiType: "CSV",
      filter: false,
    },
    {
      type: "image",
      placeholder: "Identity Doc",
      name: "identityDocument",
      validation: "",
      default: "",
      tag: true,
      label: "Identity Doc",
      required: true,
      view: true,
      add: true,
      update: false,
    },
    {
      type: "text",
      placeholder: "Identity Number",
      name: "identityNumber",
      validation: "",
      default: "",
      label: "Identity Number",
      required: true,
      view: true,
      add: true,
      update: false,
    },
    {
      type: "select",
      placeholder: "Delete",
      name: "delete",
      validation: "",
      default: "",
      tag: false,
      label: "Delete",
      required: false,
      view: false,
      add: false,
      update: true,
      selectApi: "True, False",
      apiType: "CSV",
      filter: false,
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
        name: "userDisplayName",
        type: "text",
        collection: "",
      },
      icon: "menu",
      title: "Restore",
      params: {
        api: `food-group-item`,
        parentReference: "",
        itemTitle: {
          name: "userDisplayName",
          type: "text",
          collection: "",
        },
        shortName: "Restore",
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
        api={`user/user-deletion`}
        itemTitle={{ name: "userDisplayName", type: "text", collection: "" }}
        // profileImage="photo"
        shortName={`Recipe Item`}
        formMode={`double`}
        {...props}
        attributes={attributes}
        parentReference={"userType"}
        referenceId={"6471b3849fb2b29fe045887b"}
      ></ListTable>
      {openMenuSetup && openItemData && (
        <PopupView
          popupData={
            <SetupRecipe
              openData={openItemData}
              setMessage={props.setMessage}
            ></SetupRecipe>
          }
          themeColors={themeColors}
          closeModal={closeModal}
          itemTitle={{ name: "userDisplayName", type: "text", collection: "" }}
          openData={openItemData}
          customClass={"full-page"}
        ></PopupView>
      )}
    </Container>
  );
};
export default Layout(RestorePatient);
