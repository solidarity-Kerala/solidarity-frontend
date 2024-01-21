import { useState } from "react";
import { ElementContainer } from "../../../../../core/elements";
import ListTable from "../../../../../core/list/list";
export const Tab4 = (props) => {
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
  return (
    <ElementContainer className="column">
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
        viewMode="single"
        // Privilege flag indicating whether the user can add menu items
        {...props}
        // Additional attributes related to the menu
        attributes={attributes}
      ></ListTable>
    </ElementContainer>
  );
};
