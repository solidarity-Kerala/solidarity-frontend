import React, { useEffect, useState } from "react";
import Layout from "../../common/layout";
import ListTable from "../../../elements/list/list";
import { Container } from "../../common/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const Inventory = (props) => {
    //to update the page title
    useEffect(() => {
        document.title = `Inventory - DataHex Site Builder Portal`;
    }, []);

    const [attributes] = useState([
        {
            type: "date",
            placeholder: "Purchase Date",
            name: "purchaseDate",
            validation: "",
            default: "",
            tag: true,
            label: "Purchase Date",
            required: false,
            view: true,
            add: true,
            update: true,
        },
        {
            type: "select",
            apiType: "API",
            selectApi: "ingredient/select",
            placeholder: "Ingredient",
            name: "ingredient",
            validation: "",
            showItem: "ingredientsName",
            default: "name",
            tag: true,
            label: "Ingredient",
            required: true,
            view: true,
            add: true,
            update: true,
            filter: false,
        },
        {
            type: "number",
            placeholder: "Quantity",
            name: "quantity",
            validation: "",
            default: "",
            tag: true,
            label: "Quantity",
            required: false,
            view: true,
            add: true,
            update: true,
        },
        {
            type: "number",
            placeholder: "Price",
            name: "price",
            validation: "",
            default: "",
            tag: true,
            label: "Price",
            required: false,
            view: true,
            add: true,
            update: true,
        },
    ]);

    return (
        <Container className="noshadow">
            <ListTable
                api={`inventory`}
                itemTitle={{ name: "ingredientsName", type: "text", collection: "ingredient" }}
                shortName={`Inventory`}
                formMode={`single`}
                viewMode="table"
                datefilter={true}
                {...props}
                attributes={attributes}
            ></ListTable>
        </Container>
    );
};
// exporting the page with parent container layout..
export default Layout(Inventory);
