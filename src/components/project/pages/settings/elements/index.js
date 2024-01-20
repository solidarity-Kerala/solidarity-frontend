import React, { useEffect, useState } from "react";
import Layout from "../../../../core/layout";
import { Button, ElementParentContainer, ElementContainer, IconButton, MultiTabs, Select, TabButtons, Switch } from "../../../../core/elements";
import { Tab1 } from "./supPage";
import { Tab2 } from "./customForm";

//if you want to write custom style wirte in above file

const Elements = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `Elements - Diet Food Management Portal`;
  }, []);
  const [select, setSelect] = useState("");
  const [selectedTab, setSelectedTab] = useState(1);
  const [switchStatus, setSwitchStatus] = useState(true);

  return (
    <ElementParentContainer className="column">
      <ElementContainer>
        <Button
          icon={"add"}
          ClickEvent={() => {
            console.log("Clicked Primary Button");
          }}
          value="Primary Button"
        ></Button>
        <Button
          icon={"add"}
          ClickEvent={() => {
            console.log("Clicked Secondary Button");
          }}
          value="Secondary Button"
          type="secondary"
        ></Button>
        <Select
          label="Select an Item"
          value={select}
          selectApi={[
            { id: "1", value: "Item 1" },
            { id: "2", value: "Item 2" },
            { id: "3", value: "Item 3" },
          ]}
          onSelect={(item) => {
            console.log("Selected Value", select, item);
            setSelect(item.id ?? null);
          }}
        ></Select>
        <TabButtons
          selectedTab={selectedTab}
          selectedChange={(value) => {
            console.log("Cliked Tab", value);
            setSelectedTab(value);
          }}
          tabs={[
            { key: 1, title: "Day" },
            { key: 2, title: "Week" },
          ]}
        ></TabButtons>
        <Switch title={'Show Tabs'} align="right" switchChange={(value) => setSwitchStatus(value)} switchValue={switchStatus}></Switch>
        <IconButton
          ClickEvent={() => {
            console.log("Cliked Icon Button");
          }}
        ></IconButton>
      </ElementContainer>
      {switchStatus && (
        <MultiTabs
          tabs={[
            {
              name: `a-unique-name-for-tab-1`,
              title: "Tab Button Examples",
              element: <Tab1 />,
            },
            {
              name: `a-unique-name-for-tab-2`,
              title: "Custom Form",
              element: <Tab2 />,
            },
          ]}
        ></MultiTabs>
      )}
    </ElementParentContainer>
  );
};

// exporting the page with parent container layout..
export default Layout(Elements);
