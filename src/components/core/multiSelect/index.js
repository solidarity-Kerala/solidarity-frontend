import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../../backend/api";
import { ItemBox, Label, SelectBox } from "./styles";
import { DownIcon, GetIcon, TickIcon } from "../../../icons";
import { useTranslation } from "react-i18next";
import { addSelectObject } from "../../../store/actions/select";
import { ErrorMessage } from "../form/styles";
import Search from "../search";
import { Button, ImgBox, TagBox, TagData, TagItem, TagTitle } from "../select/styles";
import { getValue } from "../list/functions";

function MultiSelect(props) {
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [updateValue, setUpdateValue] = useState("_");
  const [initialized, setInitialized] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [options, setOptions] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const selectData = useSelector((state) => state.select[props.selectApi]);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const toggleOptions = () => {
    setOptionsVisible(!optionsVisible);
  };
  const [searchValue, setSearchValue] = useState("");
  const handleChange = (event) => {
    // clearTimeout(searchTimeoutRef.current);
    setSearchValue(event.target.value);
    const filteredOptions = options.filter((option) => option.value.toLowerCase().includes(event.target.value.toString().toLowerCase()));
    setFilteredOptions(filteredOptions);
    if (event.target.value.toString() === "") {
      setFilteredOptions([]);
    }
  };
  const fetchData = useCallback(
    async (item = {}, force = false, name = "", searchKey = "", params = {}) => {
      const handleOptions = (data) => {
        if (!selectedId) {
          const selectedData = (props.value || [])
            .map((itemValue) => {
              const foundItem = data.find((dataItem) => dataItem.id.toString() === itemValue?.toString());
              return foundItem ? { id: foundItem.id ?? "", value: foundItem.value } : itemValue ? { id: itemValue ?? "", value: "Other" } : null;
            })
            .filter(Boolean);
          setSelectedId(selectedData);
        }
        setOptions(data);
        setInitialized(true);
      };
      if (force && props.apiType === "API") {
        const optionHandler = (data) => {
          setOptions(data);
          setInitialized(true);
          try {
            const selected = data.filter((itemValue) => itemValue.id === selectedId)[0]?.value;
            setSelectedValue(selected ? selected : props.placeHolder);
          } catch (error) {
            console.log(error);
          }
        };
        await getData({ ...item, searchKey, limit: props.apiSearch ? 20 : 0, ...params }, `${props.selectApi}`)
          .then((response) => {
            if (response.status === 200) {
              optionHandler(response.data);
              const selectedData = (props.value || [])
                .map((itemValue) => {
                  const foundItem = response.data.find((dataItem) => dataItem.id.toString() === itemValue?.toString());
                  return foundItem ? { id: foundItem.id ?? "", value: foundItem.value } : itemValue ? { id: itemValue ?? "", value: "Other" } : null;
                })
                .filter(Boolean);
              setSelectedId(selectedData);
              dispatch(addSelectObject(response.data, props.selectApi));
            } else if (response.status === 404) {
              setInitialized(false);
            } else {
              setInitialized(false);
            }
          })
          .catch((error) => {
            setInitialized(false);
          });
      } else if (props.apiType === "API") {
        if (selectData) {
          handleOptions(selectData);
        } else if (!initialized) {
          try {
            const response = await getData({ ...item }, props.selectApi);
            if (response.status === 200) {
              handleOptions(response.data);
              dispatch(addSelectObject(response.data, props.selectApi));
            } else {
              setInitialized(false);
            }
          } catch (error) {
            setInitialized(false);
          }
        }
      } else if (props.apiType === "CSV") {
        const options = props.selectApi.split(",").map((itemValue) => ({
          id: itemValue.trim(),
          value: itemValue.trim().charAt(0).toUpperCase() + itemValue.trim().slice(1),
        }));
        setOptions(options);
        setInitialized(true);
      } else if (props.apiType === "JSON") {
        handleOptions(props.selectApi);
        setOptions(props.selectApi);
        setInitialized(true);
      }
    },
    [props.apiType, props.apiSearch, props.placeHolder, props.selectApi, selectedId, props.value, initialized, selectData, dispatch]
  );
  // useEffect(() => {
  //   if (props.updateOn) {
  //     if (updateValue !== props.updateValue) {
  //       setUpdateValue(props.updateValue);
  //       fetchData(props.updateValue, true, props.updateOn);
  //     }
  //   }
  // }, [props.updateValue, updateValue, fetchData, props.updateOn]);
  useEffect(() => {
    if (props.updateOn) {
      const isObjectEqual = (obj1, obj2) => {
        const keys1 = Object.keys(obj1 ?? {});
        const keys2 = Object.keys(obj2 ?? {});
        // console.log("Keys:",keys1, keys2);
        if (keys1.length !== keys2.length) {
          return false;
        }

        for (let key of keys1) {
          if (obj1[key] !== obj2[key]) {
            return false;
          }
        }

        return true;
      };
      const equal = isObjectEqual(updateValue, props.updateValue);
      if (!equal) {
        setUpdateValue(props.updateValue);
        let values = {};
        props.params?.forEach((item) => {
          if (!item.value) {
            item.value = props.formValues?.[item.name] ?? "";
          }
          values[item.name] = item.value;
        });
        fetchData(props.updateValue, true, props.updateOn, "", values);
      }
    }
  }, [props.updateValue, updateValue, fetchData, props.updateOn, props.params, props.formValues]);
  useEffect(() => {
    try {
      setSelectedValue(selectedId.length > 0 ? `${selectedId[0].value}${selectedId.length > 1 ? " (" + (selectedId.length - 1) + " more)" : ""}` : props.label);
    } catch (error) {
      setSelectedValue(props.label);
    }
  }, [selectedId, props.label]);

  useEffect(() => {
    let values = {};
    props.params?.forEach((item) => {
      values[item.name] = item.value;
    });
    fetchData(values);
  }, [props.selectApi, props.params, fetchData]);

  const selectRef = useRef(null);

  useEffect(() => {
    function handleClick(event) {
      if (!selectRef.current.contains(event.target)) {
        setOptionsVisible(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
  return (
    <SelectBox theme={props.theme} className={`custom-select ${optionsVisible ? "open" : "close"} ${props.customClass}  ${props.dynamicClass}`} ref={selectRef}>
      <button className={`${selectedId !== null && selectedId.length !== 0 ? "has" : ""}`} onClick={toggleOptions}>
        {props.error?.length ? (
          <>
            <Label theme={props.theme} className={`${!props.value.length > 0 ? "shrink error" : "error"}`}>
              {`${t(props.label)}${props.required ? " *" : ""}`}
            </Label>
          </>
        ) : (
          <>
            <Label theme={props.theme} className={`${!props.value.length > 0 ? "shrink" : ""}`}>
              <TickIcon />
              {`${t(props.label)}${props.required ? " *" : ""}`}
            </Label>
          </>
        )}
        {`${props.value.length === 0 ? `${t(props.label)}${props.required ? " *" : ""}` : `${selectedValue}`}`}
        <DownIcon className="down" />
      </button>
      {optionsVisible && initialized && (
        <ul className="options">
          {(props.search ?? true) && <Search active={true} className={"select"} title={"Search"} theme={props.theme} placeholder="Search" value={searchValue} onChange={handleChange}></Search>}

          {selectedId.length > 0 ? (
            <ItemBox>
              {selectedId.map((option) => {
                const selectedIndex = selectedId.findIndex((item) => item.id === option.id);
                return (
                  <li
                    value={selectedIndex > -1}
                    className={`${selectedIndex > -1}`}
                    key={option.id}
                    onClick={(event) => {
                      event.stopPropagation();
                      props.onSelect(option, props.id, props.type);
                      // setSelectedValue(option.value);
                      // setSelectedId(option.id);

                      const items = selectedId;
                      const index = items.findIndex((item) => item.id === option.id);

                      if (index === -1) {
                        // If event._id doesn't exist, push it to the items array
                        items.push(option);
                      } else {
                        // If event._id already exists, remove it from the items array
                        items.splice(index, 1);
                      }
                      setSelectedId(items);

                      setSelectedValue(items.length > 0 ? `${items[0].value} ${items.length > 1 ? " (" + (items.length - 1) + " more)" : ""}` : props.label);
                      // toggleOptions();
                    }}
                  >
                    {props.displayValue ? option[props.displayValue] : option.value} <GetIcon icon="Close" />
                  </li>
                );
              })}
            </ItemBox>
          ) : null}
          <ItemBox>
            {options.length > 0
              ? (searchValue.length > 0 ? filteredOptions : options).map((option) => {
                  const selectedIndex = selectedId.findIndex((item) => item.id === option.id);
                  return (
                    selectedIndex === -1 && (
                      <li
                        value={selectedIndex > -1}
                        className={`${selectedIndex > -1}`}
                        key={option.id}
                        onClick={(event) => {
                          
                          event.stopPropagation();
                          props.onSelect(option, props.id, props.type);
                          // setSelectedValue(option.value);
                          // setSelectedId(option.id);

                          const items = selectedId;
                          const index = items.findIndex((item) => item.id === option.id);

                          if (index === -1) {
                            // If event._id doesn't exist, push it to the items array
                            items.push(option);
                          } else {
                            // If event._id already exists, remove it from the items array
                            items.splice(index, 1);
                          }
                          setSelectedId(items);

                          setSelectedValue(items.length > 0 ? `${items[0].value} ${items.length > 1 ? " (" + (items.length - 1) + " more)" : ""}` : props.label);
                          // toggleOptions();
                        }}
                      >
                        {props.displayValue ? option[props.displayValue] : option.value}
                        {props.tags && (
                          <TagBox>
                            {props.iconImage && <ImgBox src={process.env.REACT_APP_CDN + (props.iconImage.collection.length > 0 ? option[props.iconImage.collection]?.[props.iconImage.item] ?? "" : option[props.iconImage.item])} />}
                            <TagData>
                              {props.tags.map((tag) => (
                                <React.Fragment key={tag.item}>
                                  {tag.title.length > 0 && <TagTitle>{`${tag.title}`}</TagTitle>}
                                  <TagItem className={tag.type}>{getValue(tag, tag.collection.length > 0 ? option[tag.collection]?.[tag.item] ?? "" : option[tag.item])}</TagItem>
                                </React.Fragment>
                              ))}
                            </TagData>
                          </TagBox>
                        )}
                        {props.viewButton && (
                          <Button
                            onClick={(event) => {
                              
                              props.viewButton?.callback(option);
                              event.stopPropagation();
                            }}
                          >
                            View Menu
                          </Button>
                        )}
                      </li>
                    )
                  );
                })
              : null}
          </ItemBox>
        </ul>
      )}
      {optionsVisible && initialized && (selectedId.length === 0 && options.length) === 0 && (
        <ul key={0} className="options">
          <li
            onClick={() => {
              fetchData();
            }}
          >
            Refresh
          </li>
        </ul>
      )}
      {props.error?.length > 0 && <ErrorMessage dangerouslySetInnerHTML={{ __html: props.error }}></ErrorMessage>}
    </SelectBox>
  );
}

export default MultiSelect;
