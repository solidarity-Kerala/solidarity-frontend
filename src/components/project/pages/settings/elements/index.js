import React, { useEffect, useState } from "react";
import Layout from "../../../../core/layout";
import { Button, ElementParentContainer, ElementContainer, IconButton, MultiTabs, Select, TabButtons, Switch, Checkbox } from "../../../../core/elements";
import { Tab1 } from "./supPage";
import { Tab2 } from "./customForm";
import AutoForm from "../../../../core/autoform/AutoForm";
import { Tab3 } from "./list";
import { Tab4 } from "./listitem";
import { Tab5 } from "./tablist";

//if you want to write custom style wirte in above file

const Elements = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `Elements - Diet Food Management Portal`;
  }, []);
  const [select, setSelect] = useState("");
  const [selectedTab, setSelectedTab] = useState(1);
  const [switchStatus, setSwitchStatus] = useState(true);
  const [checked, setChecked] = useState(true);

  // form related
  const [parameters, setParameters] = useState(null);
  const [isOpen, setIsOpen] = useState(null);
  const closeEdit = () => {
    setIsOpen(null);
  };
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
        <Checkbox
          label="Check Box Sample"
          value={checked}
          onChange={(value) => {
            console.log("Text Changed", value);
            setChecked(value);
          }}
        ></Checkbox>
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
        <Switch title={"Show Tabs"} align="right" switchChange={(value) => setSwitchStatus(value)} switchValue={switchStatus}></Switch>
        <IconButton
          icon="add"
          ClickEvent={() => {
            const data = { _id: 1, title: "", description: "" };
            console.log("Cliked Icon Button");
            setParameters([
              {
                type: "text",
                placeholder: "Title",
                name: "title",
                showItem: "",
                validation: "",
                default: data.title ?? "", //add exisitng data if needed
                label: "title",
                required: true,
                view: true,
                add: true,
                update: true,
              },
              {
                type: "textarea",
                placeholder: "Description",
                name: "description",
                showItem: "",
                validation: "",
                default: data.description ?? "", //add exisitng data if needed
                label: "description",
                required: true,
                view: true,
                add: true,
                update: true,
              },
              {
                type: "multiSelect",
                placeholder: "Select Days of Week ",
                listView: true,
                name: "eligibleDays",
                validation: "",
                default: [0, 1, 2, 3, 4, 5, 6],
                label: "Select Days of Week ",
                required: true,
                view: true,
                customClass: "list",
                add: true,
                update: true,
                apiType: "JSON",
                search: false,
                selectApi: [
                  { value: "Sunday", id: 0 },
                  { value: "Monday", id: 1 },
                  { value: "Tuesday", id: 2 },
                  { value: "Wednesday", id: 3 },
                  { value: "Thursday", id: 4 },
                  { value: "Friday", id: 5 },
                  { value: "Saturday", id: 6 },
                ],
              },
              {
                type: "multiSelect",
                placeholder: "Select Days of Week ",
                listView: true,
                checkboxDesign: true,
                name: "eligibleDaysRadio",
                validation: "",
                default: [0, 1, 2, 3, 4, 5, 6],
                label: "Select Days of Week ",
                required: true,
                view: true,
                customClass: "list",
                add: true,
                update: true,
                apiType: "JSON",
                search: false,
                selectApi: [
                  { value: "Sunday", id: 0 },
                  { value: "Monday", id: 1 },
                  { value: "Tuesday", id: 2 },
                  { value: "Wednesday", id: 3 },
                  { value: "Thursday", id: 4 },
                  { value: "Friday", id: 5 },
                  { value: "Saturday", id: 6 },
                ],
              },
              {
                type: "select",
                placeholder: "Select Days of Week ",
                listView: true,
                radioButton: true,
                name: "eligibleDaysCheckbox",
                validation: "",
                default: "",
                label: "Select Days of Week ",
                required: true,
                view: true,
                customClass: "list",
                add: true,
                update: true,
                apiType: "JSON",
                search: false,
                selectApi: [
                  { value: "Sunday", id: 0 },
                  { value: "Monday", id: 1 },
                  { value: "Tuesday", id: 2 },
                  { value: "Wednesday", id: 3 },
                  { value: "Thursday", id: 4 },
                  { value: "Friday", id: 5 },
                  { value: "Saturday", id: 6 },
                ],
              },
              {
                type: "hidden",
                placeholder: "_id",
                name: "_id",
                showItem: "",
                validation: "",
                default: data._id, //add exisitng data if needed
                label: "_id",
                required: true,
                view: true,
                add: false,
                update: true,
              },
            ]);
            setIsOpen({
              submitHandler: (post) => {
                console.log(post);
              },
              submit: "Save Now",
              api: "mock/update",
              header: "Add Sample Data",
              description: "",
            });
          }}
        ></IconButton>
      </ElementContainer>
      {switchStatus && (
        <MultiTabs
          tabs={[
            {
              name: `a-unique-name-for-tab-1`,
              title: "Tab Button Examples",
              element: <Tab1 {...props} />,
              icon: "user",
            },
            {
              name: `a-unique-name-for-tab-2`,
              title: "Form Elements",
              element: <Tab2 {...props} />,
              icon: "user",
            },
            {
              name: `a-unique-name-for-tab-3`,
              title: "List Data",
              element: <Tab3 {...props} />,
              icon: "user",
            },
            {
              name: `a-unique-name-for-tab-4`,
              title: "List Item",
              element: <Tab4 {...props} />,
            },{
              name: `a-unique-name-for-tab-5`,
              title: "Tab List Automation",
              element: <Tab5 {...props} />,
            },
          ]}
        ></MultiTabs>
      )}
      {isOpen && (
        <AutoForm
          useCaptcha={isOpen.useCaptcha}
          useCheckbox={false}
          customClass={isOpen.customClass ?? ""}
          description={isOpen.description}
          formValues={{}}
          formMode={isOpen.customClass ?? "double"}
          key={isOpen.header}
          formType={"post"}
          header={isOpen.header}
          formInput={parameters}
          submitHandler={isOpen.submitHandler}
          button={isOpen.submit}
          isOpenHandler={(value) => {
            closeEdit(value);
          }}
          isOpen={true}
          plainForm={false}
        ></AutoForm>
      )}
    </ElementParentContainer>
  );
};

// exporting the page with parent container layout..
export default Layout(Elements);
