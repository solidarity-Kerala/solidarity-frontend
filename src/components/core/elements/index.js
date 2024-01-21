import styled from "styled-components";
import FormInput from "../input";
import { Filter } from "../list/styles";
import { useSelector } from "react-redux";
import { GetIcon } from "../../../icons";
import Tabs from "../tab";
import { SwitchButton, TabButton, TabContainer } from "./styles";
import { useCallback, useEffect, useState } from "react";
import ListTable from "../list/list";
export const ElementContainer = styled.div`
  display: flex;
  width: -webkit-fill-available;
  gap: 10px;
  padding: 0;
  margin-bottom: auto;
  &.column {
    flex-direction: column;
  }
  .title {
    font-size: 14px;
    font-weight: 700;
    svg {
      color: green;
      margin-right: 2px;
    }
  }
  .title.has {
    font-weight: normal;
    font-size: 10px;
  }
  &.box {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px 2px;
    padding: 0.5em 13px;
    border-radius: 10px;
    position: relative;
    div {
      flex-flow: wrap;
      row-gap: 5px;
    }
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
export const Select = ({ radioButton, error, defaultValue = "", align = "", apiType = "JSON", selectApi = [{ id: "1", value: "No Item Added" }], isDisabled = false, value = "", label = "Select", onSelect = () => {} }) => {
  return <FormInput radioButton={radioButton} default={defaultValue} apiType={apiType} selectApi={selectApi} customClass={`custom ${align}`} disabled={isDisabled} type="select" error={error} label={label} name="submit" value={value} onChange={onSelect} />;
};
export const MultiSelect = ({ checkBox, error, defaultValue = "", align = "", apiType = "JSON", selectApi = [{ id: "1", value: "No Item Added" }], isDisabled = false, value = [], label = "Select", onSelect = () => {} }) => {
  return (
    <FormInput
      default={defaultValue}
      apiType={apiType}
      selectApi={selectApi}
      customClass={`custom ${align}`}
      disabled={isDisabled}
      type="multiSelect"
      checkboxDesign={checkBox}
      error={error}
      label={label}
      name="submit"
      value={value}
      onChange={(event) => {
        const items = value;
        const index = items.findIndex((item) => item === event.id);
        if (index === -1) {
          // If event._id doesn't exist, push it to the items array
          items.push(event.id);
        } else {
          // If event._id already exists, remove it from the items array
          items.splice(index, 1);
        }
        onSelect(items);
      }}
    />
  );
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
export const Checkbox = ({ customClass, error, icon = null, align = "", isDisabled = false, value = false, onChange = () => {}, label = "primary" }) => {
  return <FormInput error={error} label={label} placeholder={label} icon={icon} customClass={`custom ${align} ${customClass}`} disabled={isDisabled} type="checkbox" name="submit" value={value} onChange={(e) => onChange(e)} />;
};
export const Title = ({ title = "primary" }) => {
  return <FormInput dynamicClass="custom" title={title} type="title" />;
};
export const Info = ({ content = "primary" }) => {
  return <FormInput dynamicClass="custom" content={content} type="info" />;
};
export const ListTabs = ({ actions, setMessage, setLoaderBox, titleValue }) => {
  const tabHandler = useCallback(() => {
    const tempTab = actions
      .filter((item) => item.type === "subList" || item.type === "subItem")
      .map((item, index) => ({
        name: `${item.id}-${index}`,
        title: item.title,
        element: <ListTable viewMode={item.type ?? "subList"} setMessage={setMessage} setLoaderBox={setLoaderBox} parentReference={item?.params?.parentReference} referenceId={0} attributes={item.attributes} {...item.params}></ListTable>,
      }));

    setTabs(tempTab);
  }, [setMessage, setLoaderBox, actions]);

  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    tabHandler();
  }, [tabHandler]);
  return tabs.length > 0 && <Tabs className="custom" tabs={tabs}></Tabs>;
};
