import React, { useEffect, useState } from "react";
import Layout from "../../../core/layout";
import ListTable from "../../../core/list/list";
import { Container } from "../../../core/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const FixedReplacableRecipe = (props) => {
    //to update the page title
    useEffect(() => {
        document.title = `Fixed Replacable Recipe - Diet Food Management Portal`;
    }, []);

    const [attributes] = useState([
        {
            type: "select",
            apiType: "CSV",
            selectApi: "Meat, Bread, Fruit, Dessert, Soup, Salad,Fat,Snacking, Other",
            placeholder: "Type Of Recipe",
            name: "typeOfRecipe",
            validation: "",
            showItem: "title",
            default: "",
            tag: true,
            label: "Type of Recipe",
            required: true,
            view: true,
            add: true,
            update: true,
            filter: false,
        },
        {
            type: "select",
            apiType: "API",
            selectApi: "mealtime-category/select",
            placeholder: "Mealtime Category",
            name: "mealTimeCategory",
            validation: "",
            showItem: "mealtimeCategoriesName",
            default: "",
            tag: true,
            label: "Mealtime Category",
            required: true,
            view: true,
            add: true,
            update: true,
            filter: false,
          },
        {
            type: "select",
            apiType: "API",
            selectApi: "recipe/select",
            placeholder: "Recipes",
            apiSearch: true,
            iconImage: {
                type: "img",
                item: "photo",
                title: "photo",
                collection: "",
            },
            tags: [
                {
                    type: "number",
                    item: "calories",
                    title: "Calories",
                    collection: "",
                },
                {
                    type: "number",
                    item: "protein",
                    title: "Protein",
                    collection: "",
                },
                {
                    type: "number",
                    item: "totalFat",
                    title: "Fat",
                    collection: "",
                },
                {
                    type: "number",
                    item: "carbohydrate",
                    title: "Carbs",
                    collection: "",
                },
            ],
            displayValue: "title",
            name: "recipe",
            collection: "",
            validation: "",
            showItem: "title",
            default: "",
            tag: true,
            label: "Recipes",
            required: true,
            view: true,
            add: true,
            update: true,
            filter: false,
        },
    ]);

    return (
        <Container className="noshadow">
            <ListTable
                api={`fixed-replacable-recipe`}
                itemTitle={{ name: "title", type: "text", collection: "recipe" }}
                shortName={`Fixed Replacable Recipe`}
                displayColumn="single"
                {...props}
                attributes={attributes}
            ></ListTable>
        </Container>
    );
};
// exporting the page with parent container layout..
export default Layout(FixedReplacableRecipe);
