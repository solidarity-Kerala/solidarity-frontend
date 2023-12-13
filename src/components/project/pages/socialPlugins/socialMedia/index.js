import React, { useEffect, useState } from "react";
import Layout from "../../../../core/layout";
import ListTable from "../../../../core/list/list";
import { Container } from "../../../../core/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const SocialMedia = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `Social Media - Diet Food Management Portal`;
  }, []);

  const [attributes] = useState([
    {
      type: "text",
      placeholder: "instaId",
      name: "instaId",
      validation: "",
      default: "",
      label: "instaId",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "facebookId",
      name: "facebookId",
      validation: "",
      default: "",
      tag: true,
      label: "facebookId",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "twitterId",
      name: "twitterId",
      validation: "",
      default: "",
      tag: true,
      label: "twitterId",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "linkedinId",
      name: "linkedinId",
      validation: "",
      default: "",
      tag: true,
      label: "linkedinId",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "pinterestId",
      name: "pinterestId",
      validation: "",
      default: "",
      tag: true,
      label: "pinterestId",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "youtubeId",
      name: "youtubeId",
      validation: "",
      default: "",
      tag: true,
      label: "youtubeId",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "whatsapp",
      name: "whatsapp",
      validation: "",
      default: "",
      tag: true,
      label: "whatsapp",
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
        api={`social-media`}
        // Property name for the title of each menu item
        // itemTitle={`label`}
        // Short name or label for the menu
        itemTitle={{
          name: "instaId",
          type: "text",
          collection: "",
        }}
        shortName={`Social Media`}
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
export default Layout(SocialMedia);
