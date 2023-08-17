import { useEffect, useRef, useState } from "react";
import { Table, Button, Td, Tr, Count, ArrowButton, AddButton, ButtonPanel, Filter, Filters, ToggleContainer, ToggleInput, ToggleSlider, NoData, FilterBox, More, Actions, Title, DataItem, ToolTipContainer, Head, TrBody } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { RowContainer } from "../../styles/containers/styles";
import { AddIcon, GetIcon, NextIcon, PreviousIcon } from "../../../icons";
import { useNavigate } from "react-router-dom";
import { deleteData, getData, postData, putData } from "../../../backend/api";
import CrudForm from "./create";
import { useTranslation } from "react-i18next";
import { addPageObject } from "../../../store/actions/pages";
import FormInput from "../input";
import Manage from "./manage";
import Loader from "../loader";
import Search from "../search";
import SubPage from "./subPage";
import DateRangeSelector from "../daterange";
import * as xlsx from "xlsx";
import { ToolTip } from "../../styles/list/styles";
// import { convertMinutesToHHMM } from "../../functions/minuteToHour";
import { dateFormat, dateTimeFormat } from "../../functions/date";
import { convertMinutesToHHMM, getValue } from "./functions";
import Popup, { DisplayInformations } from "./popup";
import Print from "./print/print";
const ListTable = ({ displayColumn = "single", printPrivilege = true, formMode = "single", parentReference = "_id", referenceId = 0, actions = [], api, setMessage, attributes = [], exportPrivilege = false, addPrivilege = true, delPrivilege = true, updatePrivilege = true, shortName = "Item", itemTitle = { type: "text", name: "title" }, datefilter = false, preFilter = {}, viewMode = "list" }) => {
  const users = useSelector((state) =>
    state.pages[`${api}`]
      ? state.pages[`${api}`]
      : {
          data: null,
          isLoading: true,
          error: null,
        }
  );
  const [showSublist, setShowSubList] = useState(false);
  const [currentApi] = useState(`${api}`);
  const [subAttributes, setSubAttributes] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [count, setCount] = useState(0);
  const themeColors = useSelector((state) => state.themeColors);
  const selectedMenuItem = useSelector((state) => state.selectedMenu);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [t] = useTranslation();
  const [showLoader, setShowLoader] = useState(false);
  /**
   * Function to set the showLoader state.
   * @param {boolean} status The status of the loader.
   */
  const setLoaderBox = (status) => {
    setShowLoader(status);
  };
  // processing attributes
  const [initialized, setInitialized] = useState(false);
  const [prevCrud, setPrevCrud] = useState("");
  const [formInput, setFormInput] = useState([]);
  const [errroInput, setErrorInput] = useState([]);
  const [addValues, setAddValues] = useState({});
  const [updateId, setUpdateId] = useState("");
  const [updateValues, setUpdateValues] = useState({});
  const [udpateView, setUpdateView] = useState(() => {});
  const [filterView, setFilterView] = useState(referenceId !== 0 ? { [parentReference]: referenceId, ...preFilter } : { ...preFilter });
  useEffect(() => {
    const addValuesTemp = {
      addValues: {},
      updateValues: {},
      viewValues: {},
      errorValues: {},
      filterValues: {},
    };
    // let tempFilter = false;
    let date = new Date();
    attributes.forEach((item) => {
      if (item.type === "checkbox") {
        let bool = JSON.parse(item.default === "false" || item.default === "true" ? item.default : "false");
        if (item.add) {
          addValuesTemp.addValues[item.name] = bool;
        }
        addValuesTemp.updateValues[item.name] = bool;
      } else if (item.type === "datetime" || item.type === "date" || item.type === "time") {
        addValuesTemp.addValues[item.name] = date.toISOString();
        if (item.add) {
          addValuesTemp.updateValues[item.name] = date.toISOString();
        }
      } else if (item.type === "image" || item.type === "file") {
        if (item.add) {
          addValuesTemp.addValues[item.name] = [];
        }
        if (item.update) {
          addValuesTemp.updateValues[item.name] = [];
        }
      } else if (item.type === "multiSelect") {
        if (item.add) {
          addValuesTemp.addValues[item.name] = [];
        }
        if (item.update) {
          addValuesTemp.updateValues[item.name] = [];
        }
      } else {
        if (item.add) {
          addValuesTemp.addValues[item.name] = item.default;
        }
        addValuesTemp.updateValues[item.name] = item.default;
        if (item.type === "select") {
          addValuesTemp.filterValues[item.name] = "";
          // tempFilter = true;
        }
      }
      addValuesTemp.errorValues[item.name] = "";
      addValuesTemp.filterValues["searchkey"] = "";
    });
    if (referenceId !== 0) {
      addValuesTemp.filterValues[parentReference] = referenceId;
    }
    setFormInput(attributes);
    setAddValues(addValuesTemp.addValues);
    setErrorInput(addValuesTemp.errorValues);
    setUpdateValues(addValuesTemp.updateValues);
    setFilterView((prevFilterView) => {
      return { ...prevFilterView, ...addValuesTemp.filterValues };
    });

    // setFilter(tempFilter);
    setInitialized(true);
  }, [attributes, dispatch, setPrevCrud, prevCrud, setFormInput, setAddValues, setUpdateValues, setFilterView, parentReference, referenceId]);

  // end processing attributes
  useEffect(() => {
    setLoaderBox(users.isLoading);
    if (currentIndex === 0 && users.data?.count) {
      setCount(users.data.filterCount);
      // setTotalCount(users.data.totalCount);
    }
  }, [users, currentIndex]);

  useEffect(() => {
    if (initialized) {
      dispatch(addPageObject(currentApi, currentIndex, filterView));
    }
  }, [initialized, currentApi, currentIndex, dispatch, filterView]);
  const refreshView = (currentIndex) => {
    try {
      dispatch(addPageObject(currentApi, currentIndex, filterView));
    } catch {}
  };
  const [isOpen, setIsOpen] = useState(false);
  const [isPrint, setIsPrint] = useState(false);
  const [printData, setPrintData] = useState([]);
  const [openData, setOpenData] = useState({});
  //crud functions
  const [isCreating, setIsCreating] = useState(false);
  const isCreatingHandler = (value, callback) => {
    if (isCreating) {
      setUpdateView(() => callback);
      setIsCreating(false);
      navigate({}, "", window.location.pathname);
    } else {
      window.location.hash = "add";
      setIsCreating(true);
    }
  };
  const [isEditing, setIsEditing] = useState(false);
  const isEditingHandler = (value, callback) => {
    setLoaderBox(true);
    if (!isEditing) {
      setUpdateView(() => callback);
      const updateValues = {};
      setUpdateId(value._id);
      formInput.forEach((item) => {
        const itemValue = item.collection?.length > 0 && item.showItem?.length > 0 ? value[item.collection]?.[item.showItem] : value[item.name] ?? "";
        if (item.update) {
          if (item.type === "checkbox") {
            let bool = value[item.name]?.toString() === "true" ? true : false;
            updateValues[item.name] = bool;
          } else if (item.type === "number") {
            updateValues[item.name] = parseInt(value[item.name]);
          } else if (item.type === "select") {
            updateValues[item.name] = typeof value[item.name] === "undefined" ? "" : typeof value[item.name] === "string" || typeof value[item.name] === "number" ? value[item.name] : value[item.name]?._id ? value[item.name]._id : "";
          } else if (item.type === "multiSelect") {
            try {
              updateValues[item.name] = value[item.name].map((obj) => obj._id);
            } catch (error) {
              updateValues[item.name] = [];
            }
          } else if (item.type === "image") {
            updateValues["old_" + item.name] = value[item.name] ? value[item.name] : "";
            updateValues[item.name] = [];
          } else {
            updateValues[item.name] = itemValue ? itemValue : "";
          }
        }
      });

      updateValues["_id"] = value._id;
      setUpdateValues(updateValues);
      setIsEditing(true);
      window.location.hash = "edit";
    } else {
      setUpdateId("");
      navigate({}, "", window.location.pathname);
      setIsEditing(false);
    }
    setLoaderBox(false);
  };
  const deleteHandler = async (item, id = "") => {
    await deleteData({ id }, currentApi)
      .then((response) => {
        if (response.status === 200) {
          setMessage({
            type: 1,
            content: `The '${item.title ? item.title : shortName}' deleted successfully!`,
            proceed: t("okay"),
          });
          setCount((count) => count - 1);
          setIsCreating(false);
          refreshView();
          // udpateView(0);
        } else if (response.status === 404) {
          setMessage({ type: 1, content: "User not found!", proceed: "Okay" });
        } else {
          setMessage({
            type: 1,
            content: "Something went wrong!",
            proceed: "Okay",
          });
        }
        setLoaderBox(false);
      })
      .catch((error) => {
        setMessage({
          type: 1,
          content: error.message + "Something went wrong!",
          proceed: "Okay",
        });
        setLoaderBox(false);
      });
  };
  const [action, setActions] = useState([]);
  const openAction = (item, data) => {
    // Actions Window
    setActions({ item, data });
    // setMessage({ type: 1, content: item.title + " / " + data._id, proceed: "Okay" });
  };
  const submitHandler = async (data) => {
    setLoaderBox(true);
    const saveData = referenceId === 0 ? { ...data } : { ...data, [parentReference]: referenceId };
    await postData(saveData, currentApi)
      .then((response) => {
        if (response.status === 200) {
          setMessage({
            type: 1,
            content: `The '${shortName}' saved successfully!`,
            proceed: "Okay",
          });
          setIsCreating(false);
          refreshView();
          // udpateView(0);
        } else if (response.status === 404) {
          setMessage({ type: 1, content: "User not found!", proceed: "Okay" });
        } else {
          setMessage({
            type: 1,
            content: "Something went wrong!",
            proceed: "Okay",
          });
        }
        setLoaderBox(false);
      })
      .catch((error) => {
        setMessage({
          type: 1,
          content: error.message + "Something went wrong!",
          proceed: "Okay",
        });
        setLoaderBox(false);
      });
  };

  const updateHandler = async (data) => {
    setLoaderBox(true);
    data = { ...data, id: updateId };
    await putData(data, `${currentApi}`)
      .then((response) => {
        if (response.status === 200) {
          setMessage({
            type: 1,
            content: `The '${shortName}' updated successfully!`,
            proceed: "Okay",
          });
          refreshView();
          setIsEditing(false);
        } else if (response.status === 404) {
          setMessage({ type: 1, content: "User not found!", proceed: "Okay" });
        } else {
          setMessage({
            type: 1,
            content: "Something went wrong!",
            proceed: "Okay",
          });
        }
        setLoaderBox(false);
      })
      .catch((error) => {
        alert(error);
        setLoaderBox(false);
      });
  };

  const filterChange = (option, name) => {
    const udpateValue = {
      ...filterView,
      [name]: option.id,
    };
    // updating the formm values
    setFilterView(udpateValue);
  };
  const dateRangeChange = (item) => {
    const startDate = new Date(item?.startDate);
    startDate.setHours(0, 0, 0, 0); // Set start date to 00:00

    const endDate = new Date(item?.endDate);
    endDate.setHours(23, 59, 59, 999); // Set end date to 23:59
    const udpateValue = {
      ...filterView,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };
    // updating the formm values
    setFilterView(udpateValue);
  };
  const closeManage = () => {
    setActions([]);
  };

  const TableRowWithActions = ({ attributes, data, slNo }) => {
    selectRef.current[slNo] = useRef(null);
    const titleValue = (itemTitle.collection?.length > 0 ? (data[itemTitle.collection] ? data[itemTitle.collection][itemTitle.name] : "NIl") : data[itemTitle.name]) ?? "Please udpate the itemTitle";
    const signleRecord = viewMode === "list" || viewMode === "subList" ? false : true;
    // data[attribute.name]?.title ? data[attribute.name]?.title : data[attribute.name]?.toString()

    return (
      <Tr theme={themeColors} className={signleRecord ? "single" : ""} key={`row-${shortName}-${data._id ?? slNo}`}>
        <TrBody className={signleRecord ? "single" : ""}>
          <Td key={`row-head-${slNo}`}>
            {signleRecord ? (
              <Head>
                <GetIcon icon={selectedMenuItem.icon} />
                <span>{shortName}</span>
              </Head>
            ) : (
              <Head
                onClick={() => {
                  setIsOpen(true);
                  setOpenData({ actions, attributes, data });
                  setSubAttributes({ actions, attributes, data });
                }}
              >
                <GetIcon icon={selectedMenuItem.icon} /> <span>{` ${getValue({ type: itemTitle.type ?? "text" }, titleValue)}`}</span>
              </Head>
            )}
          </Td>

          <Td key={`actions-${shortName}-${data._id}`} className="actions">
            {actions.map((item) => {
              return (
                item.element !== "button" && (
                  <ToggleContainer key={`${item.id}-${data._id}`}>
                    <ToggleInput
                      type="checkbox"
                      checked={data[item.id]}
                      onChange={async (event) => {
                        // item.callback(item, data);
                        setLoaderBox(true);
                        await postData({ status: event.target.checked }, `${item.api}/${data._id}`)
                          .then((response) => {
                            if (response.status === 200) {
                              if (response.data?.message) {
                                setMessage({
                                  type: 1,
                                  content: t(response.data?.message),
                                  proceed: t("okay"),
                                });
                              }
                              //
                              refreshView();
                              // setIsEditing(false);
                            } else if (response.status === 404) {
                              refreshView();
                              setMessage({
                                type: 1,
                                content: t("error"),
                                proceed: "Okay",
                              });
                            } else {
                              refreshView();
                              setMessage({
                                type: 1,
                                content: t("error"),
                                proceed: "Okay",
                              });
                            }
                            // setLoaderBox(false);
                          })
                          .catch((error) => {
                            alert(error);
                            // setLoaderBox(false);
                          });
                      }}
                    />
                    <ToggleSlider />
                  </ToggleContainer>
                )
              );
            })}
            {!signleRecord && (
              <More
                onClick={() => {
                  setIsOpen(true);
                  setOpenData({ actions, attributes, data });
                  setSubAttributes({ actions, attributes, data });
                }}
              >
                <GetIcon icon={"open"}></GetIcon>
              </More>
            )}
            {signleRecord && (
              <More
                onClick={() => {
                  refreshView(currentIndex);
                }}
              >
                <GetIcon icon={"reload"}></GetIcon>
              </More>
            )}
            <ToolTipContainer
              ref={selectRef.current[slNo]}
              onClick={() => {
                setCurrentAction(data._id);
              }}
            >
              <More className={currentAction === data._id ? `active` : ``}>
                <GetIcon icon={"dots"}></GetIcon>
              </More>
              <ToolTip className={currentAction === data._id ? `actions` : `actions hide`}>
                <Actions>
                  {updatePrivilege && (
                    <Button
                      theme={themeColors}
                      key={`edit-${data._id}`}
                      onClick={() => {
                        isEditingHandler(data, udpateView);
                      }}
                      className="edit menu"
                    >
                      <GetIcon icon={"edit"} />
                      <span>{t("edit")}</span>
                    </Button>
                  )}
                  {actions.map((item, index) => {
                    return (
                      item.element === "button" && (
                        <Button
                          theme={themeColors}
                          key={`custom-${item.id + "-" + index}-${data._id}`}
                          onClick={() => {
                            if (item.type === "callback") {
                              item.callback(item, data);
                            } else if (item.type === "call") {
                              window.location.href = `tel:${data.mobileNumber}`;
                            } else if (item.type === "subList" || item.type === "subItem") {
                              setSubAttributes({ item, data });
                              setShowSubList(true);
                            } else {
                              openAction(item, data);
                            }
                          }}
                          className="edit menu"
                        >
                          <GetIcon icon={item.icon} />
                          <span>{t(item.title)}</span>
                        </Button>
                      )
                    );
                  })}
                  {delPrivilege && !signleRecord && (
                    <Button
                      theme={themeColors}
                      key={`delete-${data._id}`}
                      onClick={() => {
                        setMessage({
                          type: 2,
                          content: t("deleteRequest", {
                            label: getValue({ type: itemTitle.type ?? "text" }, titleValue) ? getValue({ type: itemTitle.type ?? "text" }, titleValue) : "Item",
                          }),
                          proceed: t("delete"),
                          onProceed: deleteHandler,
                          data: data,
                        });
                      }}
                      className="delete menu"
                    >
                      <GetIcon icon={"delete"} />
                      <span>{t("delete")}</span>
                    </Button>
                  )}
                </Actions>
              </ToolTip>
            </ToolTipContainer>
          </Td>
        </TrBody>
        {signleRecord ? (
          <DisplayInformations formMode={formMode} attributes={attributes} data={data} />
        ) : (
          <TrBody>
            {attributes.map((attribute, index) => {
              if (attribute.view && (attribute.tag ?? false)) {
                try {
                  const itemValue = attribute.collection?.length > 0 && attribute.showItem?.length > 0 ? data[attribute.collection][attribute.showItem] : data[attribute.name];
                  const itemColor = attribute.collection?.length > 0 && attribute.color?.length > 0 ? data[attribute.collection][attribute.color] : "initial";
                  if (attribute.type === "image") {
                    return "";
                  }
                  return (
                    <Td key={index}>
                      <Title>{attribute.label}</Title>
                      <DataItem style={{ color: itemColor }}>{getValue(attribute, itemValue)}</DataItem>
                    </Td>
                  );
                } catch (error) {
                  return (
                    <Td key={index}>
                      <Title>{attribute.label}</Title>
                      <DataItem>{`--`} </DataItem>
                    </Td>
                  );
                }
              }

              return null;
            })}
          </TrBody>
        )}
      </Tr>
    );
  };
  const closeModal = () => {
    setShowSubList(false);
    setIsOpen(false);
    setIsPrint(false);
    setPrintData([]);
  };
  const [searchValue, setSearchValue] = useState("");
  // const [filter, setFilter] = useState(false);
  const searchTimeoutRef = useRef();
  const handleChange = (event) => {
    clearTimeout(searchTimeoutRef.current);
    setSearchValue(event.target.value);
    searchTimeoutRef.current = setTimeout(() => {
      setFilterView({ ...filterView, searchkey: event.target.value });
    }, 300);
  };
  const selectRef = useRef([]);
  const [currentAction, setCurrentAction] = useState("0");
  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedInsideRefs = selectRef.current.filter((ref) => ref.current && ref.current.contains(event.target));

      if (clickedInsideRefs.length === 0) {
        setCurrentAction("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //export to excel
  const toExcel = (currentIndex) => {
    try {
      exportToExcel();
    } catch (error) {
      alert(error);
    }
  };
  const printPage = async (currentIndex) => {
    try {
      setLoaderBox(true);
      await getData({ ...filterView, skip: 0, limit: 0 }, api)
        .then((response) => {
          setPrintData(response.data);
          setLoaderBox(false);
          setIsPrint(true);
        })
        .catch((error) => {
          setLoaderBox(false);
        });
    } catch (error) {
      alert(error);
    }
  };
  const exportToExcel = async () => {
    setLoaderBox(true);
    await getData({ ...filterView, skip: 0, limit: 0 }, api)
      .then((response) => {
        const jsonData = response.data.response;
        if (jsonData) {
          // Convert JSON to worksheet
          const excelData = [];
          jsonData.forEach((data) => {
            const excelRow = {};
            attributes.forEach((attribute) => {
              if (attribute.view) {
                const name = t(attribute.label);
                switch (attribute.type) {
                  case "minute":
                    return (excelRow[name] = convertMinutesToHHMM(parseFloat(data[attribute.name] ?? 0)));
                  case "datetime":
                    return (excelRow[name] = dateTimeFormat(data[attribute.name]));
                  case "date":
                    return (excelRow[name] = dateFormat(data[attribute.name]));
                  case "select":
                    if (attribute.apiType === "JSON") {
                      return (excelRow[name] = attribute.selectApi.filter((item) => item.id.toString() === data[attribute.name]?.toString()).map((filteredItem, index) => filteredItem.value));
                    } else if (attribute.apiType === "CSV") {
                      return (excelRow[name] = data[attribute.name]);
                    } else {
                      return (excelRow[name] = data[attribute.name]?.[attribute.showItem] ?? "Nil");
                    }

                  default:
                    switch (typeof data[attribute.name]) {
                      case "undefined":
                        return (excelRow[name] = "Not Found");
                      case "object":
                        return (excelRow[name] = data[attribute.name]?.[attribute.showItem] ?? "Nil");
                      case "boolean":
                        return (excelRow[name] = data[attribute.name].toString());
                      case "string":
                      case "number":
                      default:
                        if (attribute.type === "select" && attribute.apiType === "JSON") {
                          return attribute.selectApi.filter((item) => item.id.toString() === data[attribute.name]?.toString()).map((filteredItem) => (excelRow[name] = filteredItem.value));
                        } else {
                          return (excelRow[name] = data[attribute.name]?.toString().substring(0, 200));
                        }
                    }
                }
              }
            });
            excelData.push(excelRow);
          });
          const worksheet = xlsx.utils.json_to_sheet(excelData);

          // Create workbook
          const workbook = xlsx.utils.book_new();
          xlsx.utils.book_append_sheet(workbook, worksheet, t(shortName));
          // Convert workbook to Excel binary and download the file
          xlsx.writeFile(workbook, t(shortName) + "-data.xlsx");
          setLoaderBox(false);
        }
      })
      .catch((error) => {
        setLoaderBox(false);
      });
  };
  useEffect(() => {
    return () => {
      clearTimeout(searchTimeoutRef.current);
    };
  }, []);

  //end crud functions
  return viewMode === "list" || viewMode === "subList" ? (
    <RowContainer className={viewMode}>
      <ButtonPanel>
        <FilterBox>
          <Search title={"Search"} theme={themeColors} placeholder="Search" value={searchValue} onChange={handleChange}></Search>
          <Filter
            theme={themeColors}
            onClick={() => {
              refreshView(currentIndex);
            }}
          >
            <GetIcon icon={"reload"} />
          </Filter>
          {exportPrivilege && (
            <Filter
              theme={themeColors}
              onClick={() => {
                setMessage({
                  type: 2,
                  content: "Do you want export this page to excel?",
                  proceed: "Export Now",
                  onProceed: toExcel,
                  data: currentIndex,
                });
              }}
            >
              <GetIcon icon={"excel"} />
            </Filter>
          )}
          {printPrivilege && (
            <Filter
              theme={themeColors}
              onClick={() => {
                setMessage({
                  type: 2,
                  content: "Do you want print?",
                  proceed: "Print Now",
                  onProceed: printPage,
                  data: currentIndex,
                });
              }}
            >
              <GetIcon icon={"print"} />
            </Filter>
          )}
          {datefilter && <DateRangeSelector onChange={dateRangeChange} themeColors={themeColors}></DateRangeSelector>}
        </FilterBox>
        <Filters>
          {formInput.map((item, index) => {
            return item.type === "select" && (item.filter ?? true) === true && <FormInput customClass={"filter"} placeholder={item.placeHolder} value={filterView[item.name]} key={`input` + index} id={item.name} {...item} onChange={filterChange} />;
          })}
        </Filters>
        {(addPrivilege ? addPrivilege : false) && (
          <AddButton theme={themeColors} onClick={() => isCreatingHandler(true, refreshView)}>
            <AddIcon></AddIcon>
            {t("addNew", { label: t(shortName) })}
          </AddButton>
        )}
      </ButtonPanel>
      <Table className={`table ${displayColumn}`}>{users.data?.response?.length > 0 && users.data.response.map((item, index) => <TableRowWithActions key={`${shortName}-${index}`} slNo={index} attributes={attributes} data={item} />)}</Table>
      {!users.data && !users.data?.response && <NoData>No {t(shortName)} found!</NoData>}
      {users.data?.response?.length === 0 && (
        <CrudForm
          api={api}
          formMode={formMode}
          css="plain"
          formType={"post"}
          header={t("addNewTitle", {
            label: t(shortName ? shortName : "Form"),
          })}
          formInput={formInput}
          formValues={addValues}
          formErrors={errroInput}
          submitHandler={submitHandler}
          isOpenHandler={isCreatingHandler}
          isOpen={isCreating}
        ></CrudForm>
      )}
      {count > 0 ? (
        count > 10 ? (
          <Count>
            <ArrowButton
              theme={themeColors}
              onClick={() => {
                setCurrentIndex((prev) => (prev > 9 ? prev - 10 : 0));
              }}
            >
              <PreviousIcon />
            </ArrowButton>
            {`Showing ${currentIndex + 1} - ${currentIndex + 10 > count ? count : currentIndex + 10} out of ${count} records`}
            <ArrowButton
              theme={themeColors}
              onClick={() => {
                setCurrentIndex((prev) => (prev + 10 > count ? currentIndex : currentIndex + 10));
              }}
            >
              <NextIcon />
            </ArrowButton>
          </Count>
        ) : (
          <Count>{`Showing ${count} record${count > 1 ? "s" : ""}`}</Count>
        )
      ) : (
        <Count>{`No records found`}</Count>
      )}
      {isCreating && (
        <CrudForm
          formMode={formMode}
          api={api}
          formType={"post"}
          header={t("addNewTitle", {
            label: t(shortName ? shortName : "Form"),
          })}
          formInput={formInput}
          formValues={addValues}
          formErrors={errroInput}
          submitHandler={submitHandler}
          isOpenHandler={isCreatingHandler}
          isOpen={isCreating}
        ></CrudForm>
      )}
      {isEditing && <CrudForm formMode={formMode} api={api} formType={"put"} updateId={updateId} header={t("update", { label: t(shortName ? shortName : "Form") })} formInput={formInput} formErrors={errroInput} formValues={updateValues} submitHandler={updateHandler} isOpenHandler={isEditingHandler} isOpen={isEditing}></CrudForm>}
      {action.data && <Manage setMessage={setMessage} setLoaderBox={setLoaderBox} onClose={closeManage} {...action}></Manage>}
      {showLoader && <Loader></Loader>}
      {isOpen && <Popup formMode={formMode} closeModal={closeModal} themeColors={themeColors} setMessage={setMessage} setLoaderBox={setLoaderBox} itemTitle={itemTitle} openData={openData}></Popup>}
      {showSublist && subAttributes?.item?.attributes?.length > 0 && <SubPage themeColors={themeColors} formMode={formMode} closeModal={closeModal} setMessage={setMessage} setLoaderBox={setLoaderBox} itemTitle={itemTitle} subAttributes={subAttributes}></SubPage>}
      {isPrint && <Print key={shortName} data={printData} themeColors={themeColors} formMode={formMode} closeModal={closeModal} setMessage={setMessage} setLoaderBox={setLoaderBox} shortName={shortName} attributes={attributes}></Print>}
    </RowContainer>
  ) : (
    <RowContainer>
      {users.data?.response?.length === 0 && (
        <ButtonPanel>
          {(addPrivilege ? addPrivilege : false) && users.data?.response?.length === 0 && (
            <AddButton theme={themeColors} onClick={() => isCreatingHandler(true, refreshView)}>
              <AddIcon></AddIcon>
              {t("addNew", { label: t(shortName) })}
            </AddButton>
          )}
        </ButtonPanel>
      )}
      <Table className={users.data?.response?.length === 0 ? "norecord" : "record"}>{users.data?.response?.length > 0 && <TableRowWithActions key={`${shortName}-${0}`} slNo={0} attributes={attributes} data={users.data?.response[0]} />}</Table>
      {!users.data && !users.data?.response && <NoData>No {t(shortName)} found!</NoData>}
      {users.data?.response?.length === 0 && <NoData>No {t(shortName)} found!</NoData>}
      {isCreating && (
        <CrudForm
          api={api}
          formMode={formMode}
          formType={"post"}
          header={t("addNewTitle", {
            label: t(shortName ? shortName : "Form"),
          })}
          formInput={formInput}
          formValues={addValues}
          formErrors={errroInput}
          submitHandler={submitHandler}
          isOpenHandler={isCreatingHandler}
          isOpen={isCreating}
        ></CrudForm>
      )}
      {isEditing && <CrudForm formMode={formMode} api={api} formType={"put"} updateId={updateId} header={t("update", { label: t(shortName ? shortName : "Form") })} formInput={formInput} formErrors={errroInput} formValues={updateValues} submitHandler={updateHandler} isOpenHandler={isEditingHandler} isOpen={isEditing}></CrudForm>}
      {action.data && <Manage setMessage={setMessage} setLoaderBox={setLoaderBox} onClose={closeManage} {...action}></Manage>}
      {isOpen && <Popup data={openData} actions={actions}></Popup>}
      {showLoader && <Loader></Loader>}
    </RowContainer>
  );
};
export default ListTable;
