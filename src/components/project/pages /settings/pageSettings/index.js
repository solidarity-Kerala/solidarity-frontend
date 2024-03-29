import React, { useEffect, useState } from "react";
import Layout from "../../../../core/layout";
import ListTable from "../../../../core/list/list";
import { Container } from "../../../../core/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const PageSettings = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `Page Settings - Diet Food Management Portal`;
  }, []);

  const [attributes] = useState([
    {
      type: "text",
      placeholder: "Page Title",
      name: "pageTitle",
      validation: "",
      default: "",
      tag: true,
      label: "Page Title",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "Meta",
      name: "meta",
      validation: "",
      default: "",
      tag: true,
      label: "Meta",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "textarea",
      placeholder: "Page Content",
      name: "pageContent",
      validation: "",
      default: "",
      tag: true,
      label: "Page Content",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "Slug",
      name: "slug",
      validation: "",
      default: "",
      tag: true,
      label: "Slug",
      required: true,
      view: true,
      add: true,
      update: true,
    },
  ]);
  // const [timingAttributes] = useState([
  //   {
  //     type: "text",
  //     placeholder: "Label",
  //     name: "label",
  //     validation: "",
  //     default: "",
  //     label: "Label",
  //     required: true,
  //     view: true,
  //     add: true,
  //     update: true,
  //   },
  //   {
  //     type: "number",
  //     placeholder: "Sequence",
  //     name: "sequence",
  //     validation: "",
  //     default: "",
  //     label: "Sequence",
  //     required: true,
  //     view: true,
  //     add: true,
  //     update: true,
  //   },
  //   {
  //     type: "text",
  //     placeholder: "Icon",
  //     name: "icon",
  //     validation: "",
  //     default: "",
  //     label: "Icon",
  //     required: true,
  //     view: true,
  //     add: true,
  //     update: true,
  //   },
  //   {
  //     type: "text",
  //     placeholder: "Path",
  //     name: "path",
  //     validation: "",
  //     default: "",
  //     label: "Path",
  //     required: true,
  //     view: true,
  //     add: true,
  //     update: true,
  //   },
  //   {
  //     type: "text",
  //     placeholder: "Element Name",
  //     name: "element",
  //     validation: "",
  //     default: "",
  //     label: "Element Name",
  //     required: true,
  //     view: true,
  //     add: true,
  //     update: true,
  //   },
  //   {
  //     type: "checkbox",
  //     placeholder: "Status",
  //     name: "status",
  //     validation: "",
  //     default: "true",
  //     label: "Status",
  //     required: true,
  //     view: true,
  //     add: true,
  //     update: true,
  //   },
  //   {
  //     type: "checkbox",
  //     placeholder: "Is Link",
  //     name: "isLink",
  //     validation: "",
  //     default: "false",
  //     label: "Is Link",
  //     required: true,
  //     view: true,
  //     add: true,
  //     update: true,
  //   },
  // ]);

  // const [actions] = useState([
  //   {
  //     // Element type for rendering
  //     element: "button",
  //     // Type of action, in this case a sublist
  //     type: "subList",
  //     // Unique identifier for the submenu
  //     id: "sub-menu",
  //     // Displayed item title
  //     itemTitle: "title",
  //     // Title of the submenu
  //     title: "Sub Menu",
  //     // Additional attributes for timing
  //     attributes: timingAttributes,
  //     // Parameters for API and submenu configuration
  //     params: {
  //       // API endpoint for submenu data
  //       api: `sub-menu`,
  //       // Parent reference for the submenu
  //       parentReference: "menu",
  //       // Property name for the submenu item title
  //       itemTitle: "label",
  //       // Short name for the submenu
  //       shortName: "Sub Menu",
  //       // Privileges for adding submenu items
  //       addPrivilege: true,
  //       // Privileges for deleting submenu items
  //       delPrivilege: true,
  //       // Privileges for updating submenu items
  //       updatePrivilege: true,
  //       // Custom CSS class for styling
  //       customClass: "medium",
  //     },
  //   },
  // ]);
  // Use the useTranslation hook from react-i18next to handle translations
  // const parkingDuration = totalDuration > 120 ? (days > 0 ? days + `d, ` : ``) + (hours > 0 ? hours + `h, ` : ``) + (minutes + t("m")) : totalDuration.toFixed(0) + ` ` + t("minutes");
  return (
    <Container className="noshadow">
      {/* Render a ListTable component */}
      <ListTable
        // Actions to be displayed in the ListTable
        // actions={actions}
        // API endpoint for fetching menu data
        api={`page`}
        // Property name for the title of each menu item
        // itemTitle={`label`}
        // Short name or label for the menu
        itemTitle={{
          name: "pageTitle",
          type: "text",
          collection: "",
        }}
        shortName={`Page Settings`}
        formMode={`double`}
        // Privilege flag indicating whether the user can add menu items
        {...props}
        // Additional attributes related to the menu
        attributes={attributes}
      ></ListTable>
    </Container>
  );
};
// exporting the page with parent container layout..
export default Layout(PageSettings);
