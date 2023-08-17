import React, { useEffect, useState } from "react";
import Layout from "../../common/layout";
import ListTable from "../../../elements/list/list";
import { Container } from "../../common/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const Menu = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `Menu - Diet Food Management Portal`;
  }, []);

  const [attributes] = useState([
    {
      // Type of input, in this case, a text input
      type: "text",
      // Placeholder text for the input field
      placeholder: "Label",
      // Name of the input field
      name: "label",
      // Validation rules for the input
      validation: "",
      // Default value for the input field
      default: "",
      // Label text for the input field
      label: "Label",
      // Indicates if the input field is required
      required: true,
      // Indicates if the input field should be displayed in the view mode
      view: true,
      // Indicates if the input field should be displayed in the add mode
      add: true,
      // Indicates if the input field should be displayed in the update mode
      update: true,
    },
    {
      type: "number",
      placeholder: "Sequence",
      name: "sequence",
      validation: "",
      default: "",
      tag: true, // when its true this field show as items in view
      label: "Sequence",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "Icon",
      name: "icon",
      validation: "",
      default: "",
      label: "Icon",
      required: true,
      tag: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "Path",
      name: "path",
      validation: "",
      default: "",
      tag: true, // when its true this field show as items in view
      label: "Path",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "Element Name",
      name: "element",
      validation: "",
      tag: true, // when its true this field show as items in view
      default: "",
      label: "Element Name",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "checkbox",
      placeholder: "Status",
      name: "status",
      validation: "",
      default: "true",
      tag: true, // when its true this field show as items in view
      label: "Status",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "checkbox",
      placeholder: "Is Link",
      name: "isLink",
      validation: "",
      default: "false",
      label: "Is Link",
      required: true,
      view: true,
      add: true,
      update: true,
    },
  ]);

  const [timingAttributes] = useState([
    {
      type: "text",
      placeholder: "Label",
      name: "label",
      validation: "",
      default: "",
      label: "Label",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "Sequence 01",
      name: "sequence",
      validation: "",
      default: "",
      tag: true, // when its true this field show as items in view
      label: "Sequence 01",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "Icon",
      name: "icon",
      validation: "",
      default: "",
      label: "Icon",
      tag: true,
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "Path",
      name: "path",
      validation: "",
      default: "",
      label: "Path",
      tag: true, // when its true this field show as items in view
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "Element Name",
      name: "element",
      validation: "",
      default: "",
      tag: true, // when its true this field show as items in view
      label: "Element Name",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "checkbox",
      placeholder: "Status",
      name: "status",
      validation: "",
      default: "true",
      tag: true, // when its true this field show as items in view
      label: "Status",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "checkbox",
      placeholder: "Is Link",
      name: "isLink",
      validation: "",
      default: "false",
      label: "Is Link",
      required: true,
      view: true,
      add: true,
      update: true,
    },
  ]);
  const [menuRole] = useState([
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
      view: false,
      add: true,
      update: true,
      filter: false,
    },
    {
      type: "checkbox",
      placeholder: "Add Permission",
      name: "add",
      validation: "",
      default: "false",
      label: "Add Permission",
      tag: true,
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "checkbox",
      placeholder: "Edit Permission",
      name: "update",
      validation: "",
      default: "false",
      label: "Edit Permission",
      tag: true,
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "checkbox",
      placeholder: "Delete Permission",
      name: "delete",
      validation: "",
      default: "false",
      label: "Delete Permission",
      tag: true,
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "checkbox",
      placeholder: "Export Permission",
      name: "export",
      validation: "",
      default: "false",
      label: "Export Permission",
      tag: true,
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "checkbox",
      placeholder: "Status",
      name: "status",
      validation: "",
      default: "false",
      label: "Status",
      tag: true,
      required: true,
      view: true,
      add: true,
      update: true,
    },
  ]);
  const [actions] = useState([
    {
      // Element type for rendering
      element: "button",
      // Type of action, in this case a sublist
      type: "subList",
      // Unique identifier for the submenu
      id: "sub-menu",
      // Title of the submenu
      title: "Sub Menu",
      // Additional attributes for timing
      attributes: timingAttributes,
      // Parameters for API and submenu configuration
      params: {
        // API endpoint for submenu data
        api: `sub-menu`,
        // Parent reference for the submenu
        parentReference: "menu",
        // Property name for the submenu item title
        itemTitle: { name: "label", type: "text", collection: "" },
        // Short name for the submenu
        shortName: "Sub Menu",
        // Privileges for adding submenu items
        addPrivilege: true,
        // Privileges for deleting submenu items
        delPrivilege: true,
        // Privileges for updating submenu items
        updatePrivilege: true,
        // Custom CSS class for styling
        customClass: "medium",
        actions: [
          {
            // Element type for rendering
            element: "button",
            // Type of action, in this case a sublist
            type: "subList",
            // Unique identifier for the submenu
            id: "submenu-role",
            // Title of the submenu
            title: "Sub Menu Role",
            // Additional attributes for timing
            attributes: menuRole,
            // Parameters for API and submenu configuration
            params: {
              // API endpoint for submenu data
              api: `submenu-role`,
              // Parent reference for the submenu
              parentReference: "subMenu",
              // Property name for the submenu item title
              itemTitle: { name: "roleDisplayName", type: "text", collection: "userType" },
              // Short name for the submenu
              shortName: "Sub Menu Role",
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
        ],
      },
    },
    {
      // Element type for rendering
      element: "button",
      // Type of action, in this case a sublist
      type: "subList",
      // Unique identifier for the submenu
      id: "menu-role",
      // Title of the submenu
      title: "Menu Role",
      // Additional attributes for timing
      attributes: menuRole,
      // Parameters for API and submenu configuration
      params: {
        // API endpoint for submenu data
        api: `menu-role`,
        // Parent reference for the submenu
        parentReference: "menu",
        // Property name for the submenu item title
        itemTitle: { name: "roleDisplayName", type: "text", collection: "userType" },
        // Short name for the submenu
        shortName: "Menu Role",
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
        api={`menu`}
        // Property name for the title of each menu item
        itemTitle={{ name: "label", type: "text", collection: "" }}
        // Short name or label for the menu
        shortName={`Menu`}
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
export default Layout(Menu);
