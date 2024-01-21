import { useEffect, useState } from "react";
import { Tab, TabContainer, TabHeader, TabLink } from "./styles";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { GetIcon } from "../../../icons";

const Tabs = ({ tabs = [], className = "" }) => {
  const [t] = useTranslation();
  const themeColors = useSelector((state) => state.themeColors);
  const [activeTab, setActiveTab] = useState(tabs[0]?.name);
  const [openedTab, setOpenedTab] = useState({});
  useEffect(() => {
    console.log(activeTab);
    if (activeTab === null) {
      setActiveTab(tabs[0]?.name);
    }
  }, [tabs, activeTab]);
  return (
    <TabContainer>
      <TabHeader className={className}>
        {tabs.map((tab) => {
          return (
            <TabLink
              key={`${tab.name}-tab-item`}
              theme={themeColors}
              className={activeTab === tab.name && "active"}
              onClick={() => {
                setActiveTab(tab.name);
                setOpenedTab((prev) => ({ ...prev, [tab.name]: true }));
              }}
            >
              {tab.icon && <GetIcon icon={tab.icon}></GetIcon>}
              {t(tab.title)}
            </TabLink>
          );
        })}
      </TabHeader>
      {/* tab for parking process */}
      {tabs.map((tab, index) => {
        return (
          <Tab className={className} theme={themeColors} key={`${tab.name}-tab-content`} active={activeTab === tab.name}>
            {(openedTab[tab.name] === true || index === 0) && tab.element}
          </Tab>
        );
      })}
    </TabContainer>
  );
};
export default Tabs;
