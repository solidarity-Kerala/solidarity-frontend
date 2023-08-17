import { useState } from "react";
import { Tab, TabContainer, TabHeader, TabLink } from "./styles";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const Tabs = ({ tabs = [] }) => {
  const [t] = useTranslation();
  const themeColors = useSelector((state) => state.themeColors);
  const [activeTab, setActiveTab] = useState(tabs[0]?.name);
  return (
    <TabContainer>
      <TabHeader>
        {tabs.map((tab) => {
          return (
            <TabLink key={`${tab.name}-tab-item`} theme={themeColors} className={activeTab === tab.name && "active"} onClick={() => setActiveTab(tab.name)}>
              {t(tab.title)}
            </TabLink>
          );
        })}
      </TabHeader>
      {/* tab for parking process */}
      {tabs.map((tab) => {
        return (
          <Tab theme={themeColors} key={`${tab.name}-tab-content`} active={activeTab === tab.name}>
            {tab.element}
          </Tab>
        );
      })}
    </TabContainer>
  );
};
export default Tabs;
