import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../../backend/api";
import { ImgBox, Label, SelectBox, TagBox, TagData, TagItem, TagTitle } from "./styles";
import { DownIcon, TickIcon } from "../../../icons";
import { useTranslation } from "react-i18next";
import { addSelectObject } from "../../../store/actions/select";
import { ErrorMessage } from "../form/styles";
import Search from "../search";
import { getValue } from "../list/functions";

function CustomSelect(props) {
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [updateValue, setUpdateValue] = useState("_");
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
    async (item = "", force = false, name = "") => {
      if (force && props.apiType === "API") {
        const optionHandler = (data) => {
          setOptions(data);
          setInitialized(true);
          try {
            const selected = data.filter((item) => item.id === selectedId)[0].value;
            setSelectedValue(selected ? selected : props.placeHolder);
          } catch {}
        };
        await getData({ [name]: item }, `${props.selectApi}`)
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
            const selected = data.filter((item) => item.id === selectedId)[0].value;
            setSelectedValue(selected ? selected : props.placeHolder);
          } catch {}
        };
        if (selectData) {
          optionHandler(selectData);
        } else {
          if (initialized) {
          } else {
            await getData({ id: item }, `${props.selectApi + item}`)
              .then((response) => {
                if (response.status === 200) {
                  optionHandler(response.data);
                  dispatch(addSelectObject(response.data, props.selectApi + item));
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
    [props.apiType, props.selectApi, props.placeHolder, initialized, selectedId, selectData, dispatch]
  );

  useEffect(() => {
    fetchData();
  }, [props.selectApi, fetchData]);
  const selectRef = useRef(null);
  useEffect(() => {
    if (updateValue !== props.updateValue) {
      setUpdateValue(props.updateValue);
      fetchData(props.updateValue, true, props.updateOn);
    }
  }, [props.updateValue, updateValue, fetchData, props.updateOn]);
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
    <SelectBox theme={props.theme} className={`custom-select ${optionsVisible ? "open" : "close"} ${props.customClass} ${props.dynamicClass}`} ref={selectRef}>
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
          {props.search && (options.length ?? 0) > 10 && <Search className={"select"} title={"Search"} theme={props.theme} placeholder="Search" value={searchValue} onChange={handleChange} />}
          {options.length &&
            (searchValue.length > 0 ? filteredOptions : options)?.map((option) => {
              return (
                <li
                  value={option.id === selectedId}
                  className={`${option.id === selectedId}`}
                  key={option.id}
                  onClick={() => {
                    if (selectedId === option.id) {
                      props.onSelect({ id: defaultValue, value: props.label }, props.id, props.type);
                      setSelectedValue(props.label);
                      setSelectedId(defaultValue);
                    } else {
                      props.onSelect(option, props.id, props.type);
                      setSelectedValue(option.value);
                      setSelectedId(option.id);
                    }
                    toggleOptions();
                  }}
                >
                  {option.value}
                  {props.tags && (
                    <TagBox>
                      {props.iconImage && <ImgBox src={process.env.REACT_APP_CDN + (props.iconImage.collection.length > 0 ? option[props.iconImage.collection]?.[props.iconImage.item] ?? "" : option[props.iconImage.item])} />}
                      <TagData>
                        {props.tags.map((tag) => {
                          return (
                            <>
                              <TagTitle>{`${tag.title}`}</TagTitle>
                              <TagItem className={tag.type}>{getValue(tag, tag.collection.length > 0 ? option[tag.collection]?.[tag.item] ?? "" : option[tag.item])}</TagItem>
                            </>
                          );
                        })}
                      </TagData>
                    </TagBox>
                  )}
                </li>
              );
            })}
        </ul>
      )}
      {initialized && options.length === 0 && (
        <ul key={0} className="options">
          <li
            onClick={() => {
              fetchData(props.updateValue, true, props.updateOn);
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

export default CustomSelect;
