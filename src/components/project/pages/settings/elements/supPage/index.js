import { useState } from "react";
import { ElementContainer, Switch, TabButtons } from "../../../../../core/elements";
export const Tab1 = () => {
  const [tabs] = useState([
    { key: 1, title: "Tab Button 1" },
    { key: 2, title: "Tab Button 2" },
  ]);
  const [selectedTab, setSelectedTab] = useState(1);
  const [switchStatus, setSwitchStatus] = useState(false);
  return (
    <ElementContainer className="column">
      <ElementContainer>
        <TabButtons
          selectedTab={selectedTab}
          selectedChange={(value) => {
            console.log("Cliked Tab", value);
            setSelectedTab(value);
          }}
          tabs={tabs}
        ></TabButtons>
        <Switch title="Expand" switchChange={(value) => setSwitchStatus(value)} switchValue={switchStatus}></Switch>
      </ElementContainer>
      <div>Tab button {selectedTab} selected</div>
    </ElementContainer>
  );
};
