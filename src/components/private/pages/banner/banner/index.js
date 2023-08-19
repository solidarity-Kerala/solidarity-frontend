import React, { useEffect, useState } from "react";
import Layout from "../../../common/layout";
import ListTable from "../../../../elements/list/list";
import { Container } from "../../../common/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const Banner = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `Banner - Diet Food Management Portal`;
  }, []);

  const [attributes] = useState([
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
      type: "select",
      apiType: "API",
      selectApi: "banner-type/select",
      placeholder: "Banner Type",
      name: "bannerType",
      showItem: "bannerTypesName",
      validation: "",
      default: "",
      label: "Banner Type",
      tag: true,
      required: true,
      view: true,
      add: true,
      update: true,
      filter: false,
    },
    {
      type: "text",
      placeholder: "Video URL",
      name: "videoUrl",
      validation: "",
      default: "",
      label: "Video URL",
      required: false,
      view: true,
      add: true,
      update: false,
    },
    {
      type: "image",
      placeholder: "Banner Image",
      name: "bannerImage",
      validation: "",
      default: "",
      tag: true,
      label: "Banner Image",
      required: false,
      view: true,
      add: true,
      update: false,
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

  return (
    <Container className="noshadow">
      <ListTable
        // actions={actions}
        api={`banner`}
        itemTitle={{ name: "title", type: "text", collection: "", }}
        shortName={`Banner`}
        // formMode={`single`}
        formMode={`double`}
        //
        {...props}
        attributes={attributes}
      />
    </Container>
  );
};
// exporting the page with parent container layout..
export default Layout(Banner);
