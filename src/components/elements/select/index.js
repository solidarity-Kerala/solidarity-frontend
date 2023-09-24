import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../../backend/api";
import { Button, ImgBox, Label, SelectBox, TagBox, TagData, TagItem, TagTitle } from "./styles";
import { DownIcon, TickIcon } from "../../../icons";
import { useTranslation } from "react-i18next";
import { addSelectObject } from "../../../store/actions/select";
import { ErrorMessage } from "../form/styles";
import Search from "../search";
import { getValue } from "../list/functions";
// import { Variants, Variant } from "../../private/pages/recipe/styles";

function CustomSelect(props) {
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [updateValue, setUpdateValue] = useState({});
  const [defaultValue] = useState(props.default);
  const [selectedId, setSelectedId] = useState(props.value);
  const [initialized, setInitialized] = useState(false);
  const [selectedValue, setSelectedValue] = useState(props.label);
  const [options, setOptions] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const selectData = useSelector((state) => state.select[props.selectApi]);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const toggleOptions = () => {
    setOptionsVisible(!optionsVisible);
  };
  const [searchValue, setSearchValue] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const handleChange = (event) => {
    if (props.apiSearch) {
      fetchData(props.updateValue, true, "", event.target.value.toString());
      setSearchKey(event.target.value);
    } else {
      setSearchValue(event.target.value);
      const filteredOptions = options.filter((option) => option.value?.toLowerCase().includes(event.target.value.toString().toLowerCase()));
      setFilteredOptions(filteredOptions);
      if (event.target.value.toString() === "") {
        setFilteredOptions([]);
      }
    }
    // clearTimeout(searchTimeoutRef.current);
  };

  const fetchData = useCallback(
    async (item = {}, force = false, name = "", searchKey = "", params = {}) => {
      if (force && props.apiType === "API") {
        const optionHandler = (data) => {
          setOptions(data);
          setInitialized(true);
          try {
            const selected = data.filter((itemValue) => itemValue.id === selectedId)[0].value;
            setSelectedValue(selected ? selected : props.placeHolder);
          } catch {}
        };
        await getData({ ...item, searchKey, limit: props.apiSearch ? 20 : 0, ...params }, `${props.selectApi}`)
          .then((response) => {
            if (response.status === 200) {
              optionHandler(response.data);
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
        const optionHandler = (data) => {
          setOptions(data);
          setInitialized(true);
          try {
            const selected = data.filter((itemValue) => itemValue.id === selectedId)[0].value;
            setSelectedValue(selected ? selected : props.placeHolder);
          } catch {}
        };
        if (selectData) {
          optionHandler(selectData);
        } else {
          if (initialized) {
          } else {
            await getData({ ...item }, `${props.selectApi}`)
              .then((response) => {
                if (response.status === 200) {
                  optionHandler(props.selectApi);
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
          }
        }
      } else if (props.apiType === "CSV") {
        const options = props.selectApi.split(",").map((item) => {
          return {
            id: item.trim(),
            value: item.trim().charAt(0).toUpperCase() + item.trim().slice(1),
          };
        });
        setOptions(options);
        setInitialized(true);
        try {
          const selected = options.filter((item) => item.id === selectedId)[0].value;
          setSelectedValue(selected ? selected : props.placeHolder);
        } catch {}
      } else if (props.apiType === "JSON") {
        const options = props.selectApi;
        setOptions(options);
        setInitialized(true);
        try {
          const selected = options.filter((item) => item.id === selectedId)[0].value;
          setSelectedValue(selected ? selected : props.placeHolder);
        } catch {}
      }
    },
    [props.apiType, props.selectApi, props.placeHolder, props.apiSearch, initialized, selectedId, selectData, dispatch]
  );

  useEffect(() => {
    fetchData();
  }, [props.selectApi, fetchData]);
  
  const selectRef = useRef(null);
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
    function handleClick(event) {
      if (!selectRef.current.contains(event.target)) {
        const listBox = props.listBox ?? false;
        if (!listBox) {
          setOptionsVisible(false);
        }
        if (listBox) {
          setOptionsVisible(true);
          setInitialized(true);
        }
      }
    }
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [props.listBox]);
  return (
    <SelectBox key={props.key} theme={props.theme} className={`custom-select ${props.listBox ? "list-box" : ""} ${optionsVisible ? "open" : "close"} ${props.customClass} ${props.dynamicClass}`} ref={selectRef}>
      <button className={`${selectedId !== null && selectedId?.length !== 0 ? "has" : ""}`} onClick={toggleOptions}>
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

      <ul className="options">
        {props.search && options.length > 8 && <Search key={`search-inside${props.key}`} className="select" title="Search" theme={props.theme} placeholder="Search" value={searchValue} onChange={handleChange} />}
        {props.apiSearch && <Search key="search-api-2" className="select" title="Search" theme={props.theme} placeholder="Search" value={searchKey} onChange={handleChange} />}
        {optionsVisible && initialized && (
          <>
            {options.length > 0 &&
              (searchValue.length > 0 ? filteredOptions : options).map((option) => (
                <li
                  value={option.id === selectedId}
                  className={option.id === selectedId ? "selected" : ""}
                  key={option.id}
                  onClick={() => {
                    const listBox = props.listBox ?? false;
                    if (!listBox) {
                      toggleOptions();
                      if (selectedId === option.id) {
                        props.onSelect({ id: defaultValue, value: props.label }, props.id, props.type);
                        setSelectedValue(props.label);
                        setSelectedId(defaultValue);
                      } else {
                        props.onSelect(option, props.id, props.type);
                        setSelectedValue(option.value);
                        setSelectedId(option.id);
                      }
                    } else {
                      props.onSelect(option, props.id, props.type);
                      setSelectedValue(option.value);
                      setSelectedId(option.id);
                    }
                  }}
                >
                  {props.displayValue ? option[props.displayValue] : option.value}
                  {props.tags && (
                    <TagBox>
                      {props.iconImage && <ImgBox src={process.env.REACT_APP_CDN + (props.iconImage.collection.length > 0 ? option[props.iconImage.collection]?.[props.iconImage.item] ?? "" : option[props.iconImage.item])} />}
                      <TagData>
                        {props.tags.map((tag) => (
                          <React.Fragment key={tag.item}>
                            <TagTitle>{`${tag.title}`}</TagTitle>
                            <TagItem className={tag.type}>{getValue(tag, tag.collection.length > 0 ? option[tag.collection]?.[tag.item] ?? "" : option[tag.item])}</TagItem>
                          </React.Fragment>
                        ))}
                      </TagData>
                    </TagBox>
                  )}
                  {/* {option.recipeVariants && (
                    <TagBox key={option._id}>
                      {props.iconImage && <ImgBox src={process.env.REACT_APP_CDN + (props.iconImage.collection.length > 0 ? option[props.iconImage.collection]?.[props.iconImage.item] ?? "" : option[props.iconImage.item])} />}
                      <Variants className="noMargin">
                        {option.recipeVariants.map((variant) => (
                          <Variant
                            key={variant._id}
                            onClick={() => {
                              props.selectVariant({ ...variant, recipe: option });
                            }}
                          >
                            <span>
                              <span>BHD</span>
                              <span className="price">{variant.price}</span>
                              <span className="offer">{variant.offerPrice}</span>
                            </span>
                            <span className="variant">{`${variant.variant} / ${variant.calories ?? 0} calories`}</span>
                          </Variant>
                        ))}
                      </Variants>
                    </TagBox>
                  )} */}

                  {props.viewButton && (
                    <Button
                      onClick={() => {
                        props.viewButton?.callback(option);
                      }}
                    >
                      View Menu
                    </Button>
                  )}
                </li>
              ))}
            {initialized && options.length === 0 && (
              <li
                onClick={() => {
                  fetchData(props.updateValue, true, props.updateOn);
                }}
              >
                Refresh
              </li>
            )}
          </>
        )}
      </ul>

      {props.error?.length > 0 && <ErrorMessage dangerouslySetInnerHTML={{ __html: props.error }}></ErrorMessage>}
    </SelectBox>
  );
}

export default CustomSelect;
