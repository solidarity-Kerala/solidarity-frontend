import React, { useEffect, useState } from "react";
import Layout from "../../../core/layout";
import ListTable from "../../../core/list/list";
import { Container } from "../../../core/layout/styels";
import PopupView from "../../../core/popupview";
import SetupRecipe from "./setupRecipe";
import { useSelector } from "react-redux";


const RestorePatient = (props) => {
  useEffect(() => {
    document.title = `Recipe - Diet Food Management Portal`;
  }, []);
  const { setMessage } = props;
  const themeColors = useSelector((state) => state.themeColors);
  const [attributes] = useState([
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
        setMessage({
          type: 2,
          content: "Are you sure you want to restore?",
          proceed: "Yes",
          okay: "No",
          onClose: async () => {
            try {
              setMessage({
                type: 1,
              });
              //return false if this second message to show..
              return false;
            } catch (error) {}
          },
          onProceed: async () => {
            try {
              setMessage({
                type: 1,
               
            });
            setOpenItemData({ item, data }); // This line is incorrect
            setOpenMenuSetup(true);
            window.location.reload();
              //return false if this second message to show..
              return false;
            } catch (error) {}
          },
          data: { id: 1 },
        });
        // Display a confirmation dialog
        
       
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
