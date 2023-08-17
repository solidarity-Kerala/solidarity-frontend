import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../../backend/api";
import { Label, SelectBox } from "./styles";
import { DownIcon, TickIcon } from "../../../icons";
import { useTranslation } from "react-i18next";
import { addSelectObject } from "../../../store/actions/select";
import { ErrorMessage } from "../form/styles";
import Search from "../search";

function MultiSelect(props) {
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [selectedId, setSelectedId] = useState([]);
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
  const fetchData = useCallback(async () => {
    const handleOptions = (data) => {
      const selectedData = (props.value || [])
        .map((item) => {
          const foundItem = data.find((dataItem) => dataItem.id === item);
          return foundItem ? { id: foundItem.id, value: foundItem.value } : null;
        })
        .filter(Boolean);
      setSelectedId(selectedData);
      setOptions(data);
      setInitialized(true);
    };

    if (props.apiType === "API") {
      if (selectData) {
        handleOptions(selectData);
      } else if (!initialized) {
        try {
          const response = await getData({}, props.selectApi);
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
      const options = props.selectApi.split(",").map((item) => ({
        id: item.trim(),
        value: item.trim().charAt(0).toUpperCase() + item.trim().slice(1),
      }));
      setOptions(options);
      setInitialized(true);
    } else if (props.apiType === "JSON") {
      setOptions(props.selectApi);
      setInitialized(true);
    }
  }, [props.apiType, props.value, props.selectApi, initialized, selectData, dispatch]);

  useEffect(() => {
    try {
      setSelectedValue(selectedId.length > 0 ? `${selectedId[0].value}${selectedId.length > 1 ? " (" + (selectedId.length - 1) + " more)" : ""}` : props.label);
    } catch (error) {
      setSelectedValue(props.label);
    }
  }, [selectedId, props.label]);

  useEffect(() => {
    fetchData();
  }, [props.selectApi, fetchData]);

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
          {(props.search ?? true) && <Search className={"select"} title={"Search"} theme={props.theme} placeholder="Search" value={searchValue} onChange={handleChange}></Search>}
          {options.length &&
            (searchValue.length > 0 ? filteredOptions : options).map((option) => {
              const selectedIndex = selectedId.findIndex((item) => item.id === option.id);
              return (
                <li
                  value={selectedIndex > -1}
                  className={`${selectedIndex > -1}`}
                  key={option.id}
                  onClick={() => {
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
                  {option.value}
                </li>
              );
            })}
        </ul>
      )}
      {initialized && options.length === 0 && (
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
