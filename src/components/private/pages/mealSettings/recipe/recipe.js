import React, { useEffect, useState } from "react";
import Layout from "../../../common/layout";
import ListTable from "../../../../elements/list/list";
import { Container } from "../../../common/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const Recipe = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `Recipe - Diet Food Management Portal`;
  }, []);

  const [attributes] = useState([
    {
      type: "text",
      placeholder: "Recipe",
      name: "recipe",
      validation: "",
      default: "",
      label: "Recipe",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "textarea",
      placeholder: "Description",
      name: "description",
      validation: "",
      default: "",
      tag: true,
      label: "Description",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "image",
      placeholder: "Recipe",
      name: "photo",
      validation: "",
      default: "",
      tag: true,
      label: "Recipe",
      required: false,
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
      label: "Status",
      required: true,
      view: true,
      add: true,
      update: true,
    },
  ]);

  // const [addVariant] = useState([
  //   // {
  //   //   type: "select",
  //   //   apiType: "API",
  //   //   selectApi: "meal/select",
  //   //   placeholder: "Recipe",
  //   //   name: "mealName",
  //   //   validation: "",
  //   //   showItem: "mealName",
  //   //   default: "",
  //   //   tag: true,
  //   //   label: "Recipe",
  //   //   required: true,
  //   //   view: true,
  //   //   add: false,
  //   //   update: false,
  //   //   filter: false,
  //   // },
  //   {
  //     type: "select",
  //     apiType: "API",
  //     selectApi: "variant-group/select",
  //     showItem: "variantGroupName",
  //     placeholder: "Variant Group",
  //     name: "variantGroup",
  //     validation: "",
  //     default: "",
  //     tag: true,
  //     label: "variant Group",
  //     required: true,
  //     view: true,
  //     add: true,
  //     update: true,
  //     filter: false,
  //   },
  //   {
  //     type: "select",
  //     apiType: "API",
  //     selectApi: "variant-level/select",
  //     placeholder: "Variant Level",
  //     name: "variantLevel",
  //     validation: "",
  //     showItem: "variantLevelName",
  //     default: "",
  //     tag: true,
  //     label: "variant Level",
  //     required: true,
  //     view: true,
  //     add: true,
  //     update: true,
  //     filter: false,
  //   },
  //   {
  //     type: "text",
  //     placeholder: "Recipe Price",
  //     name: "mealPrice",
  //     validation: "",
  //     default: "",
  //     tag: true,
  //     label: "Recipe Price",
  //     required: true,
  //     view: true,
  //     add: true,
  //     update: true,
  //   },
  //   {
  //     type: "text",
  //     placeholder: "Recipe OfferPrice",
  //     name: "mealOfferPrice",
  //     validation: "",
  //     default: "",
  //     tag: true,
  //     label: "Recipe OfferPrice",
  //     required: true,
  //     view: true,
  //     add: true,
  //     update: true,
  //   },
  //   {
  //     type: "number",
  //     placeholder: "Number of Persons",
  //     name: "numberOfPersons",
  //     validation: "",
  //     default: "",
  //     tag: true,
  //     label: "Number of Persons",
  //     required: true,
  //     view: true,
  //     add: true,
  //     update: true,
  //   },
  // ]);

  // const [mealIngredient] = useState([
  //   {
  //     type: "select",
  //     apiType: "API",
  //     selectApi: "meal/select",
  //     placeholder: "Recipe",
  //     name: "meal",
  //     validation: "",
  //     showItem: "mealName",
  //     default: "",
  //     tag: true,
  //     label: "Recipe",
  //     required: true,
  //     view: false,
  //     add: false,
  //     update: false,
  //     filter: false,
  //   },
  //   {
  //     type: "select",
  //     apiType: "API",
  //     selectApi: "ingredient/select",
  //     placeholder: "Ingredient",
  //     name: "ingredient",
  //     collection: "ingredient",
  //     validation: "",
  //     showItem: "ingredientsName",
  //     default: "",
  //     tag: true,
  //     label: "Ingredient",
  //     required: true,
  //     view: true,
  //     add: true,
  //     update: true,
  //     filter: false,
  //   },
  //   {
  //     type: "number",
  //     placeholder: "Quantity",
  //     name: "ingredientQuantity",
  //     validation: "",
  //     default: "",
  //     tag: true,
  //     label: "Quantity",
  //     required: true,
  //     view: true,
  //     add: true,
  //     update: true,
  //   },
  // ]);

  // const [actions] = useState([
  //   {
  //     element: "button",
  //     type: "subList",
  //     id: "meal-variant",
  //     itemTitle: { name: "mealName", type: "text", collection: "meal" },
  //     title: "Recipe Variant",
  //     attributes: addVariant,
  //     params: {
  //       api: `meal-variant`,
  //       parentReference: "meal",
  //       itemTitle: { name: "mealName", type: "text", collection: "meal" },
  //       shortName: "Recipe Variant",
  //       addPrivilege: true,
  //       delPrivilege: true,
  //       updatePrivilege: true,
  //       customClass: "medium",
  //       formMode: "double",
  //     },
  //   },
  //   {
  //     element: "button",
  //     type: "subList",
  //     id: "meal-ingredients",
  //     itemTitle: { name: "mealName", type: "text", collection: "meal" },
  //     title: "Recipe Ingredient",
  //     attributes: mealIngredient,
  //     params: {
  //       api: `meal-ingredients`,
  //       parentReference: "meal",
  //       itemTitle: { name: "mealName", type: "text", collection: "meal" },
  //       shortName: "Recipe Ingredient",
  //       addPrivilege: true,
  //       delPrivilege: true,
  //       updatePrivilege: true,
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
        // actions={actions}
        api={`recipe`}
        // itemTitle={`Recipe`}
        itemTitle={{ name: "recipe", type: "text", collection: "" }}
        shortName={`Recipe`}
        // formMode={`single`}
        formMode={`double`}
        //
        {...props}
        attributes={attributes}
      ></ListTable>
    </Container>
  );
};
// exporting the page with parent container layout..
export default Layout(Recipe);
