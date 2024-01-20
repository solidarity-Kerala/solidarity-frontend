import styled from "styled-components";
import FormInput from "../input";
import { Filter } from "../list/styles";
import { useSelector } from "react-redux";
import { GetIcon } from "../../../icons";
import Tabs from "../tab";
import { SwitchButton, TabButton, TabContainer } from "./styles";
import { useState } from "react";
export const ElementContainer = styled.div`
  display: flex;
  width: -webkit-fill-available;
  gap: 10px;
  padding: 0;
  margin-bottom: auto;
  &.column {
    flex-direction: column;
  }
  &.row {
    flex-direction: row;
  }
  &.left {
    justify-content: flex-start;
  }
  &.right {
    justify-content: flex-end;
  }
  &.center {
    justify-content: center;
  }
`;
export const ElementParentContainer = styled.div`
  display: flex;
  width: -webkit-fill-available;
  &.column {
    flex-direction: column;
  }
  &.row {
    flex-direction: row;
  }
  gap: 15px;
  padding: 1em 2em 0.5em;
  margin-bottom: auto;
  &.left {
    justify-content: flex-start;
  }
  &.right {
    justify-content: flex-end;
  }
  &.center {
    justify-content: center;
  }
`;
export const Button = ({ icon = null, align = "", isDisabled = false, value = "Button", ClickEvent, type = "primary" }) => {
  return <FormInput icon={icon} customClass={`custom ${type} ${align}`} disabled={isDisabled} type="button" name="submit" value={value} onChange={ClickEvent} />;
};
export const Select = ({ error,defaultValue = "", align = "", apiType = "JSON", selectApi = [{ id: "1", value: "No Item Added" }], isDisabled = false, value = "", label = "Select", onSelect = () => {} }) => {
  return <FormInput default={defaultValue} apiType={apiType} selectApi={selectApi} customClass={`custom ${align}`} disabled={isDisabled} type="select" error={error} label={label} name="submit" value={value} onChange={onSelect} />;
};
export const IconButton = ({ align = "", icon = `filter`, ClickEvent }) => {
  const themeColors = useSelector((state) => state.themeColors);
  return (
    <Filter className={`align custom ${align}`} theme={themeColors} onClick={ClickEvent}>
      <GetIcon icon={icon} />
    </Filter>
  );
};

export const MultiTabs = ({ tabs }) => {
  const [tabsTemp] = useState(tabs);
  return <Tabs className="custom" tabs={tabsTemp} />;
};
export const TabButtons = ({ tabs, selectedTab, selectedChange = () => {} }) => {
  const [tabsTemp] = useState(tabs);
  const themeColors = useSelector((state) => state.themeColors);
  return (
    tabsTemp?.length > 1 && (
      <TabContainer className="custom">
        {tabsTemp?.map((tab, index) => (
          <TabButton theme={themeColors} key={index} className={selectedTab === tab.key} onClick={() => selectedChange(tab.key)}>
            {tab.icon ? <GetIcon icon={tab.icon} /> : ""}
            {tab.title}
          </TabButton>
        ))}
      </TabContainer>
    )
  );
};
export const Switch = ({ align, title, switchValue, switchChange = () => {}, icon = "open-book" }) => {
  const themeColors = useSelector((state) => state.themeColors);
  return (
    <SwitchButton className={`custom ${align}`} enableBg={themeColors.theme} enableColor={themeColors.theneForeground} active={switchValue} onClick={() => switchChange(!switchValue)}>
      <GetIcon icon={icon} />
      {title ? <div>{title}</div> : ""}
    </SwitchButton>
  );
};

export const TextBox = ({ error, icon = null, align = "", isDisabled = false, value = "", onChange = () => {}, label = "primary" }) => {
  return <FormInput error={error} label={label} placeholder={label} icon={icon} customClass={`custom ${align}`} disabled={isDisabled} type="text" name="submit" value={value} onChange={(e) => onChange(e.target.value)} />;
};
export const TextArea = ({ error, icon = null, align = "", isDisabled = false, value = "", onChange = () => {}, label = "primary" }) => {
  return <FormInput error={error} label={label} placeholder={label} icon={icon} customClass={`custom ${align}`} disabled={isDisabled} type="textarea" name="submit" value={value} onChange={(e) => onChange(e.target.value)} />;
};
export const DateTime = ({ error, icon = null, align = "", isDisabled = false, value = "", onChange = () => {}, label = "primary" }) => {
  return <FormInput error={error} label={label} placeholder={label} icon={icon} customClass={`custom ${align}`} disabled={isDisabled} type="datetime" name="submit" value={value} onChange={(e) => onChange(e.toISOString())} />;
};
export const Date = ({ error, icon = null, align = "", isDisabled = false, value = "", onChange = () => {}, label = "primary" }) => {
  return <FormInput error={error} label={label} placeholder={label} icon={icon} customClass={`custom ${align}`} disabled={isDisabled} type="date" name="submit" value={value} onChange={(e) => onChange(e.toISOString())} />;
};
export const Time = ({ error, icon = null, align = "", isDisabled = false, value = "", onChange = () => {}, label = "primary" }) => {
  return <FormInput error={error} label={label} placeholder={label} icon={icon} customClass={`custom ${align}`} disabled={isDisabled} type="time" name="submit" value={value} onChange={(e) => onChange(e.toISOString())} />;
};
