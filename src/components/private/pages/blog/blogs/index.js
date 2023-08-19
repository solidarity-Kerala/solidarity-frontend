import React, { useEffect, useState } from "react";
import Layout from "../../../common/layout";
import ListTable from "../../../../elements/list/list";
import { Container } from "../../../common/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const Blog = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `Blog - Diet Food Management Portal`;
  }, []);

  const [attributes] = useState([
    {
      type: "text",
      placeholder: "Title",
      name: "title",
      validation: "",
      default: "",
      label: "Title",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "Author",
      name: "author",
      validation: "",
      default: "",
      label: "Author",
      tag: true,
      required: true,
      view: true,
      add: true,
      update: true,
    },

    {
      type: "date",
      placeholder: "Date",
      name: "date",
      validation: "",
      default: "",
      tag: true,
      label: "Date",
      required: false,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "image",
      placeholder: "Featured Image",
      name: "featuredImage",
      validation: "",
      default: "",
      tag: true,
      label: "Featured Image",
      required: false,
      view: true,
      add: true,
      update: false,
    },
    {
      type: "select",
      apiType: "API",
      selectApi: "post-category/select",
      placeholder: "category",
      name: "category",
      showItem: "name",
      validation: "",
      default: "",
      label: "category",
      required: true,
      view: true,
      add: true,
      update: true,
      filter: true,
    },
    {
      type: "select",
      apiType: "API",
      selectApi: "franchise/select",
      placeholder: "Franchise",
      name: "franchise",
      showItem: "name",
      validation: "",
      default: "",
      label: "Franchise",
      required: true,
      view: true,
      add: true,
      update: true,
      filter: false,
    },
    {
      type: "textarea",
      placeholder: "Content",
      name: "content",
      validation: "",
      default: "",
      tag: true,
      label: "Content",
      required: true,
      view: true,
      add: true,
      update: true,
    },
  ]);

  // Use the useTranslation hook from react-i18next to handle translations
  // const parkingDuration = totalDuration > 120 ? (days > 0 ? days + `d, ` : ``) + (hours > 0 ? hours + `h, ` : ``) + (minutes + t("m")) : totalDuration.toFixed(0) + ` ` + t("minutes");
  return (
    <Container className="noshadow">
      {/* Render a ListTable component */}
      <ListTable
        // Actions to be displayed in the ListTable
        // actions={actions}
        // API endpoint for fetching menu data
        api={`post-management`}
        // Property name for the title of each menu item
        // itemTitle={`label`}
        // Short name or label for the menu
        itemTitle={{
          name: "title",
          type: "text",
          collection: "",
        }}
        shortName={`Blog`}
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
export default Layout(Blog);
