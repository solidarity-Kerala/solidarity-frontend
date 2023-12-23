import React, { useEffect, useRef, useState } from "react";
import { Table, Button, Td, Tr, Count, AddButton, ButtonPanel, Filter, Filters, ToggleContainer, ToggleInput, ToggleSlider, NoData, FilterBox, More, Actions, Title, DataItem, ToolTipContainer, Head, TrBody, TableView, TrView, ThView, TdView, TableContaner, ProfileImage, ArrowPagination, ListContainer, PageNumber, ListContainerData, ListContainerBox } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { RowContainer } from "../../styles/containers/styles";
import { AddIcon, GetIcon, NextIcon, PreviousIcon } from "../../../icons";
import { useNavigate } from "react-router-dom";
import { deleteData, getData, postData, putData } from "../../../backend/api";
import CrudForm from "./create";
import { addPageObject } from "../../../store/actions/pages";
import FormInput from "../input";
import Manage from "./manage";
import Loader from "../loader";
import Search from "../search";
import SubPage from "./subPage";
import DateRangeSelector from "../daterange";
import * as xlsx from "xlsx";
import { ToolTip } from "../../styles/list/styles";
import { dateFormat, dateTimeFormat } from "../functions/date";
import { convertMinutesToHHMM, getValue } from "./functions";
import Popup, { DisplayInformations } from "./popup";
import Print from "./print/print";
import Highlight from "./highlight";
import Editable from "./editable";
import Details from "./details";
import PopupView from "../popupview";
import { TabContainer } from "./popup/styles";
import { food } from "../../../images";
const SetTd = (props) => {
  if (props.viewMode === "table") {
    return <TdView {...props}></TdView>;
  } else {
    return <Td {...props}></Td>;
  }
};
const SetTr = (props) => {
  if (props.viewMode === "table") {
    return <TrView {...props}></TrView>;
  } else {
    return <Tr {...props}></Tr>;
  }
};
const ListTable = ({ orientation = "portrait", profileImage, displayColumn = "single", printPrivilege = true, formMode = "single", parentReference = "_id", referenceId = 0, actions = [], api, setMessage, attributes = [], exportPrivilege = false, addPrivilege = true, delPrivilege = true, updatePrivilege = true, clonePrivilege = false, shortName = "Item", itemTitle = { type: "text", name: "title" }, highlight = null, datefilter = false, preFilter = {}, viewMode = "list" }) => {
  const userData = useSelector((state) => state.pages);
  const [users, setUsers] = useState({
    data: null,
    isLoading: true,
    error: null,
  });
  useEffect(() => {
    setUsers(
      userData[`${api}`] ?? {
        data: null,
        isLoading: true,
        error: null,
      }
    );
  }, [userData, api]);
  const [showSublist, setShowSubList] = useState(false);
  const [currentApi] = useState(`${api}`);
  const [subAttributes, setSubAttributes] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [showPageCount, setShowPageCount] = useState(false);
  const [shoFilter, setShowFilter] = useState(false);
  const [count, setCount] = useState(0);
  const [editable, setEditable] = useState({});
  const themeColors = useSelector((state) => state.themeColors);
  const selectedMenuItem = useSelector((state) => state.selectedMenu);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  const [hasFilter, setHasFilter] = useState(false);
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
        if (item.type === "date" && (item.filter ?? false) === true) {
          // addValuesTemp.filterValues[item.name] = date.toISOString();
          // tempFilter = true;
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
          addValuesTemp.addValues[item.name] = Array.isArray(item.default) ? item.default : [];
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
      dispatch(addPageObject(currentApi, currentIndex, filterView, perPage));
    }
  }, [initialized, currentApi, currentIndex, dispatch, filterView, perPage]);

  useEffect(() => {
    setPageNumber(Math.ceil((currentIndex + 1) / perPage));
  }, [count, currentIndex, perPage]);
  const refreshView = (currentIndex) => {
    try {
      dispatch(addPageObject(currentApi, currentIndex, filterView, perPage));
    } catch {}
  };
  const [isOpen, setIsOpen] = useState(false);
  const [detailView] = useState(false);
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
  const isEditingHandler = (value, callback, titleValue, clone = false) => {
    setLoaderBox(true);
    console.log(value);
    if (!isEditing) {
      if (!clone) {
        setUpdateView(() => callback);
        let updateValuesTemp = {};
        setUpdateId(value._id);
        formInput.forEach((item) => {
          const itemValue = item.collection?.length > 0 && item.showItem?.length > 0 ? value[item.collection]?.[item.showItem] : value[item.name] ?? "";
          if (item.update) {
            if (item.type === "checkbox") {
              let bool = value[item.name]?.toString() === "true" ? true : false;
              updateValuesTemp[item.name] = bool;
            } else if (item.type === "number") {
              updateValuesTemp[item.name] = parseInt(value[item.name]);
            } else if (item.type === "select") {
              updateValuesTemp[item.name] = typeof value[item.name] === "undefined" ? "" : typeof value[item.name] === "string" || typeof value[item.name] === "number" ? value[item.name] : value[item.name]?._id ? value[item.name]._id : "";
            } else if (item.type === "multiSelect") {
              try {
                if (item.apiType === "API") {
                  updateValuesTemp[item.name] = value[item.name].map((obj) => obj._id);
                } else {
                  updateValuesTemp[item.name] = value[item.name].map((obj) => obj);
                }
              } catch (error) {
                updateValuesTemp[item.name] = [];
              }
            } else if (item.type === "image") {
              updateValuesTemp["old_" + item.name] = value[item.name] ? value[item.name] : "";
              updateValuesTemp[item.name] = [];
            } else {
              updateValuesTemp[item.name] = itemValue ? itemValue : "";
            }
          }
        });
        updateValuesTemp["_id"] = value._id;
        updateValuesTemp["clone"] = clone;
        updateValuesTemp["_title"] = titleValue;
        setUpdateValues(updateValuesTemp);
        setIsEditing(true);
        window.location.hash = "edit";
      } else {
        updateHandler({ id: value._id, _title: titleValue, clone: true });
      }
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
          if (response.customMessage?.length > 0) {
            setMessage({
              type: 1,
              content: response.customMessage,
              proceed: "Okay",
            });
          } else {
            setMessage({
              type: 1,
              content: `The '${item.title ? item.title : shortName}' deleted successfully!`,
              proceed: "Okay",
            });
          }
          setCount((count) => count - 1);
          setIsCreating(false);
          refreshView(currentIndex);
          // udpateView(0);
        } else if (response.status === 404) {
          if (response.customMessage?.length > 0) {
            setMessage({
              type: 1,
              content: response.customMessage,
              proceed: "Okay",
            });
          } else {
            setMessage({ type: 1, content: "User not found!", proceed: "Okay" });
          }
        } else {
          if (response.customMessage?.length > 0) {
            setMessage({
              type: 1,
              content: response.customMessage,
              proceed: "Okay",
            });
          } else {
            setMessage({
              type: 1,
              content: "Something went wrong!",
              proceed: "Okay",
            });
          }
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
          if (response.data.customMessage?.length > 0) {
            setMessage({
              type: 1,
              content: response.customMessage,
              proceed: "Okay",
            });
          } else {
            setMessage({
              type: 1,
              content: `The '${shortName}' saved successfully!`,
              proceed: "Okay",
            });
          }
          setIsCreating(false);
          setCurrentIndex(0);
          refreshView(0);
          // udpateView(0);
        } else if (response.status === 404) {
          if (response.customMessage?.length > 0) {
            setMessage({
              type: 1,
              content: response.customMessage,
              proceed: "Okay",
            });
          } else {
            setMessage({ type: 1, content: "User not found!", proceed: "Okay" });
          }
        } else {
          console.log(response);
          if (response.customMessage?.length > 0) {
            setMessage({
              type: 1,
              content: response.customMessage,
              proceed: "Okay",
            });
          } else {
            setMessage({
              type: 1,
              content: "Something went wrong!",
              proceed: "Okay",
            });
          }
        }
        setLoaderBox(false);
      })
      .catch((error) => {
        console.log(error);
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
          if (response.customMessage?.length > 0) {
            setMessage({
              type: 1,
              content: response.customMessage,
              proceed: "Okay",
            });
          } else {
            setMessage({
              type: 1,
              content: `The '${data._title ?? shortName}' ${data.clone ? "cloned" : "updated"} successfully!`,
              proceed: "Okay",
            });
          }
          refreshView(currentIndex);
          setIsEditing(false);
        } else if (response.status === 404) {
          if (response.customMessage?.length > 0) {
            setMessage({
              type: 1,
              content: response.customMessage,
              proceed: "Okay",
            });
          } else {
            setMessage({ type: 1, content: "User not found!", proceed: "Okay" });
          }
        } else {
          console.log("Error", response);
          if (response.customMessage?.length > 0) {
            setMessage({
              type: 1,
              content: response.customMessage,
              proceed: "Okay",
            });
          } else {
            setMessage({
              type: 1,
              content: "Something went wrong!",
              proceed: "Okay",
            });
          }
        }
        setLoaderBox(false);
      })
      .catch((error) => {
        alert(error);
        setLoaderBox(false);
      });
  };

  const filterChange = (option, name, type) => {
    const updateValue = {
      ...filterView,
      [name]: type === "select" ? option.id : type === "date" ? option?.toISOString() : "",
    };
    setFilterView(updateValue);
    // updating the form values
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
    const titleValue = (itemTitle.collection?.length > 0 ? (data[itemTitle.collection] ? data[itemTitle.collection][itemTitle.name] : "NIl") : data[itemTitle.name]) ?? shortName;
    const signleRecord = viewMode === "list" || viewMode === "subList" || viewMode === "table" ? false : true;
    // data[attribute.name]?.title ? data[attribute.name]?.title : data[attribute.name]?.toString()

    const ActionDiv = (
      <React.Fragment key={`actions-${shortName}-${data._id}`}>
        {actions.map((item, index) => {
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
                              content: response.data?.message,
                              proceed: "Okay",
                            });
                          }
                          //
                          refreshView();
                          // setIsEditing(false);
                        } else if (response.status === 404) {
                          refreshView();
                          setMessage({
                            type: 1,
                            content: "Something Went Wrong!",
                            proceed: "Okay",
                          });
                        } else {
                          refreshView();
                          setMessage({
                            type: 1,
                            content: "Something Went Wrong!",
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
          <>
            <More
              onClick={(event) => {
                event.stopPropagation();
                setIsOpen(true);
                setOpenData({ actions, attributes, data });
                setSubAttributes({ actions, attributes, data });
              }}
            >
              <GetIcon icon={"open"}></GetIcon>
            </More>
            {/* //added print button */}
            {/* <More
              onClick={() => {
                setDetailView(true);
                setOpenData({ actions, attributes, data });
                setSubAttributes({ actions, attributes, data });
              }}
            >
              <GetIcon icon={"print"}></GetIcon>
            </More> */}
          </>
        )}
        {updatePrivilege && (
          <More
            onClick={(event) => {
              event.stopPropagation();
              isEditingHandler(data, udpateView, titleValue);
            }}
          >
            <GetIcon icon={"edit"} />
          </More>
        )}
        {signleRecord && (
          <More
            onClick={(event) => {
              event.stopPropagation();
              refreshView(currentIndex);
            }}
          >
            <GetIcon icon={"reload"}></GetIcon>
          </More>
        )}
        <ToolTipContainer
          ref={selectRef.current[slNo]}
          onClick={(event) => {
            event.stopPropagation();
            setCurrentAction(data._id);
          }}
        >
          <More className={currentAction === data._id ? `active` : ``}>
            <GetIcon icon={"dots"}></GetIcon>
          </More>
          <ToolTip className={currentAction === data._id ? `actions` : `actions hide`}>
            <Actions>
              {clonePrivilege && (
                <Button
                  theme={themeColors}
                  key={`clone-${data._id}`}
                  onClick={() => {
                    setUpdateId(data._id);
                    setMessage({
                      type: 2,
                      content: `Do you want to clone '${getValue({ type: itemTitle.type ?? "text" }, titleValue) ? getValue({ type: itemTitle.type ?? "text" }, titleValue) : "Item"}'?`,
                      proceed: "Clone",
                      onProceed: async (event) => {
                        event.stopPropagation();
                        await updateHandler({
                          cloneId: data._id,
                          _title: titleValue,
                          clone: true,
                        });
                      },
                      data: data,
                    });
                  }}
                  className="edit menu"
                >
                  <GetIcon icon={"clone"} />
                  <span>Clone</span>
                </Button>
              )}
              {actions.map((item, index) => {
                return (
                  item.element === "button" && (
                    <Button
                      theme={themeColors}
                      key={`custom-${item.id + "-" + index}-${data._id}`}
                      onClick={(event) => {
                        event.stopPropagation();
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
                      <span>{item.title}</span>
                    </Button>
                  )
                );
              })}
              {delPrivilege && !signleRecord && (
                <Button
                  theme={themeColors}
                  key={`delete-${data._id}`}
                  onClick={(event) => {
                    event.stopPropagation();
                    setMessage({
                      type: 2,
                      content: `Do you want to delete '${getValue({ type: itemTitle.type ?? "text" }, titleValue) ? getValue({ type: itemTitle.type ?? "text" }, titleValue) : "Item"}'?`,
                      proceed: "Delete",
                      onProceed: deleteHandler,
                      data: data,
                    });
                  }}
                  className="delete menu"
                >
                  <GetIcon icon={"delete"} />
                  <span>{"Delete"}</span>
                </Button>
              )}
            </Actions>
          </ToolTip>
        </ToolTipContainer>
      </React.Fragment>
    );
    let sticky = true;
    return viewMode === "table" ? (
      <TrView style={{ zIndex: users.data?.response?.length - slNo }} key={`${shortName}-${slNo}`}>
        <TdView className={sticky} key={-1}>
          {slNo + 1 + currentIndex}
        </TdView>
        {attributes.map((attribute, index) => {
          if (attribute.view && (attribute.tag ?? false)) {
            try {
              const itemValue = attribute.collection?.length > 0 && attribute.showItem?.length > 0 ? data[attribute.collection][attribute.showItem] : data[attribute.name];
              let dynamicClass = "";
              if (attribute.condition) {
                if (data[attribute.condition.item] === attribute.condition.if) {
                  dynamicClass = attribute.condition.then;
                } else {
                  dynamicClass = attribute.condition.else;
                }
              }

              const result = (
                <TdView
                  className={sticky}
                  key={index}
                  onClick={() => {
                    if (attribute.editable === true) {
                      alert("yes");
                    } else {
                      // alert("no");
                    }
                  }}
                >
                  {dynamicClass === "disabled" ? "--" : getValue(attribute, itemValue)}
                </TdView>
              );
              sticky = false;
              return result;
            } catch (error) {
              const result = <TdView className={sticky} key={index}>{`--`}</TdView>;
              sticky = false;
              return result;
            }
          }

          return null;
        })}
        <TdView style={{ zIndex: users.data?.response?.length - slNo, border: 0 }} key={`actions-${shortName}-${data._id}`} className="actions">
          {ActionDiv}
        </TdView>
      </TrView>
    ) : (
      <SetTr
        onClick={() => {
          if (!signleRecord) {
            setIsOpen(true);
            setOpenData({ actions, attributes, data });
            setSubAttributes({ actions, attributes, data });
          }
        }}
        viewMode={viewMode}
        theme={themeColors}
        className={signleRecord ? "single" : ""}
        key={`row-${shortName}-${data._id ?? slNo}`}
      >
        {profileImage && (
          <ProfileImage>
            <img src={data[profileImage] ? process.env.REACT_APP_CDN + data[profileImage] : food} alt="Profile"></img>
          </ProfileImage>
        )}
        <ListContainerBox>
          <TrBody className={signleRecord ? "nowrap single" : "nowrap "}>
            <SetTd key={`row-head-${slNo}`}>
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
                  {!profileImage && <GetIcon icon={selectedMenuItem.icon} />} <span>{` ${getValue({ type: itemTitle.type ?? "text" }, titleValue)}`}</span>
                  <Highlight data={data} highlight={highlight}></Highlight>
                </Head>
              )}
            </SetTd>
            <Td style={{ zIndex: users.data?.response?.length - slNo }} key={`actions-${shortName}-${data._id}`} className="actions">
              {ActionDiv}
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
                    let dynamicClass = "";
                    if (attribute.condition) {
                      if (data[attribute.condition.item] === attribute.condition.if) {
                        dynamicClass = attribute.condition.then;
                      } else {
                        dynamicClass = attribute.condition.else;
                      }
                    }
                    if (attribute.type === "image") {
                      return "";
                    }
                    return (
                      <Td className={"custom " + dynamicClass} key={index}>
                        <Title>{attribute.label}</Title>
                        <DataItem
                          onClick={() => {
                            if (attribute.editable === true) {
                              const temp = { ...editable };
                              temp[`${index}-${attribute.name}`] = temp[`${index}-${attribute.name}`] ? !temp[`${index}-${attribute.name}`] : true;
                              setEditable(temp);
                            }
                          }}
                          style={{ color: itemColor }}
                        >
                          {getValue(attribute, itemValue)}
                        </DataItem>
                        {editable[`${index}-${attribute.name}`] ? <Editable item={attribute} /> : ""}
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
          <TrBody className="actions">
            {actions.map((item, index) => {
              let status = true;
              if (item.condition) {
                if (data[item.condition.item].toString() === item.condition.if.toString()) {
                  status = item.condition.then;
                } else {
                  status = item.condition.else;
                }
              }
              return (
                item.type === "callback" &&
                status && (
                  <More
                    theme={themeColors}
                    key={`custom-${item.id + "-" + index}-${data._id}`}
                    onClick={(event) => {
                      event.stopPropagation();
                      item.callback(item, data, refreshView);
                    }}
                    className="edit menu callBack"
                  >
                    <GetIcon icon={item.icon} />
                    <span>{item.title}</span>
                  </More>
                )
              );
            })}
          </TrBody>
        </ListContainerBox>
      </SetTr>
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
  const [currentAction, setCurrentAction] = useState("");
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
              if (attribute.export ?? true) {
                const name = attribute.label;
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
          xlsx.utils.book_append_sheet(workbook, worksheet, shortName);
          // Convert workbook to Excel binary and download the file
          xlsx.writeFile(workbook, shortName + "-data.xlsx");
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
  let headerSticky = true;
  const pageCount = Math.ceil(count / perPage);
  useEffect(() => {
    if (datefilter) {
      setHasFilter(true);
    }
    formInput.map((item, index) => {
      switch (item.type) {
        case "select":
          if ((item.filter ?? true) === true) setHasFilter(true);
          return true;
        case "date":
          if ((item.filter ?? false) === true) setHasFilter(true);
          return true;
        default:
          return true;
      }
    });
  }, [formInput, setHasFilter, datefilter]);

  //end crud functions
  return viewMode === "list" || viewMode === "subList" || viewMode === "table" ? (
    <RowContainer theme={themeColors} className={"data-layout " + viewMode}>
      <ButtonPanel>
        <FilterBox>
          {hasFilter && (
            <Filter
              theme={themeColors}
              onClick={() => {
                setShowFilter(!shoFilter);
              }}
            >
              <GetIcon icon={shoFilter ? "close" : "filter"} />
            </Filter>
          )}
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

          <Search title={"Search"} theme={themeColors} placeholder="Search" value={searchValue} onChange={handleChange}></Search>
        </FilterBox>

        {(addPrivilege ? addPrivilege : false) && (
          <AddButton theme={themeColors} onClick={() => isCreatingHandler(true, refreshView)}>
            <AddIcon></AddIcon>
            <span>{shortName}</span>
          </AddButton>
        )}
      </ButtonPanel>
      <ListContainer className={shoFilter && "show-filter"}>
        <Filters>
          {datefilter && <DateRangeSelector onChange={dateRangeChange} themeColors={themeColors}></DateRangeSelector>}
          {formInput.map((item, index) => {
            switch (item.type) {
              case "select":
                return (item.filter ?? true) === true && <FormInput customClass={"filter"} placeholder={item.placeHolder} value={filterView[item.name]} key={`input` + index} id={item.name} {...item} onChange={filterChange} required={false} />;
              case "date":
                return (item.filter ?? false) === true && <FormInput customClass={"filter"} placeholder={item.placeHolder} value={filterView[item.name]} key={`input` + index} id={item.name} {...item} onChange={filterChange} required={false} />;
              default:
                return null;
            }
          })}
        </Filters>
        <ListContainerData>
          {viewMode === "table" ? (
            <TableContaner>
              <TableView>
                <thead>
                  <tr>
                    <ThView className={headerSticky} key={"slno"}>
                      S/N
                    </ThView>
                    {attributes.map((attribute) => {
                      const result =
                        attribute.view && (attribute.tag ?? false) ? (
                          <ThView className={headerSticky} key={shortName + attribute.name}>
                            {attribute.label}
                          </ThView>
                        ) : (
                          ""
                        );
                      headerSticky = false;
                      return result;
                    })}
                    <ThView key={"actions"}></ThView>
                  </tr>
                </thead>
                <tbody>{users.data?.response?.length > 0 && users.data?.response.map((item, index) => <TableRowWithActions key={`${shortName}-${index}`} slNo={index} attributes={attributes} data={item} />)}</tbody>
              </TableView>
              {!users.data && !users.data?.response && <NoData>No {shortName} found!</NoData>}
              {users.data?.response?.length === 0 && <NoData>No records found for {shortName}.</NoData>}
            </TableContaner>
          ) : (
            <>
              <Table className={`table ${displayColumn} ${count > 0 ? "" : "no-data"}`}>
                {users.data?.response?.length > 0 && users.data.response.map((item, index) => <TableRowWithActions key={`${shortName}-${index}`} slNo={index} attributes={attributes} data={item} />)}
                {!users.data && !users.data?.response && <NoData className="white-list">No {shortName} found!</NoData>}
                {users.data?.response?.length === 0 && <NoData className="white-list">No records found for {shortName}.</NoData>}
              </Table>
            </>
          )}
        </ListContainerData>
      </ListContainer>
      {/* {!users.data && !users.data?.response && <NoData>No {shortName} found!</NoData>}
      {users.data?.response?.length === 0 && <NoData>No records found for {shortName}.</NoData>} */}
      {count > 0 ? (
        count > perPage ? (
          <Count>
            <ArrowPagination
              theme={themeColors}
              onClick={() => {
                setCurrentIndex((prev) => (prev > 9 ? prev - perPage : 0));
              }}
            >
              <PreviousIcon />
            </ArrowPagination>
            {`Showing ${currentIndex + 1} - ${currentIndex + perPage > count ? count : currentIndex + perPage} out of ${count} records`}
            <ArrowPagination
              theme={themeColors}
              onClick={() => {
                setCurrentIndex((prev) => (prev + perPage > count ? currentIndex : currentIndex + perPage));
              }}
            >
              <NextIcon />
            </ArrowPagination>
            <ArrowPagination
              className="button"
              onClick={() => {
                setShowPageCount(true);
              }}
            > {`${perPage} per Page`}<GetIcon icon={'edit'}></GetIcon></ArrowPagination>
          </Count>
        ) : (
          <Count>{`Showing ${count} record${count > 1 ? "s" : ""}`}</Count>
        )
      ) : (
        <Count>{`No records found`}</Count>
      )}
      {isCreating && <CrudForm parentReference={parentReference} referenceId={referenceId} formMode={formMode} api={api} formType={"post"} header={`Add a ${shortName ? shortName : "Form"}`} formInput={formInput} formValues={addValues} formErrors={errroInput} submitHandler={submitHandler} isOpenHandler={isCreatingHandler} isOpen={isCreating}></CrudForm>}
      {isEditing && <CrudForm parentReference={parentReference} referenceId={referenceId} formMode={formMode} api={api} formType={"put"} updateId={updateId} header={`${updateValues.clone === false ? "Update" : "Clone"} '${updateValues._title}'`} formInput={formInput} formErrors={errroInput} formValues={updateValues} submitHandler={updateHandler} isOpenHandler={isEditingHandler} isOpen={isEditing}></CrudForm>}
      {action.data && <Manage setMessage={setMessage} setLoaderBox={setLoaderBox} onClose={closeManage} {...action}></Manage>}
      {showLoader && <Loader></Loader>}
      {isOpen && <Popup formMode={formMode} closeModal={closeModal} themeColors={themeColors} setMessage={setMessage} setLoaderBox={setLoaderBox} itemTitle={itemTitle} openData={openData}></Popup>}
      {detailView && <Details formMode={formMode} closeModal={closeModal} themeColors={themeColors} setMessage={setMessage} setLoaderBox={setLoaderBox} itemTitle={itemTitle} openData={openData}></Details>}
      {showSublist && subAttributes?.item?.attributes?.length > 0 && <SubPage themeColors={themeColors} formMode={formMode} closeModal={closeModal} setMessage={setMessage} setLoaderBox={setLoaderBox} itemTitle={itemTitle} subAttributes={subAttributes}></SubPage>}
      {isPrint && <PopupView customClass={"print"} popupData={<Print orientation={orientation} key={shortName} data={printData} themeColors={themeColors} formMode={formMode} closeModal={() => setIsPrint(false)} setMessage={setMessage} setLoaderBox={setLoaderBox} shortName={shortName} attributes={attributes}></Print>} themeColors={themeColors} closeModal={() => setIsPrint(false)} itemTitle={{ name: "title", type: "text", collection: "" }} openData={{ data: { key: "print_preparation", title: "Print " + shortName } }}></PopupView>}
      {showPageCount && (
        <PopupView
          // Popup data is a JSX element which is binding to the Popup Data Area like HOC
          popupData={
            <>
              <TabContainer className="page">
                <div className="head">Items Per Page</div>
                {[10, 25, 50, 100, 250].map((num) => (
                  <PageNumber
                    key={`per-${num}`}
                    className={"nomargin " + (perPage === num)}
                    onClick={() => {
                      setPerPage(num);
                    }}
                  >
                    {num}
                  </PageNumber>
                ))}
              </TabContainer>
              <TabContainer className="page">
                <div className="head">
                  Pages: {pageCount} | Current Page: {pageNumber}
                </div>
                {Array.from({ length: pageCount }, (_, index) => index + 1).map((num) => (
                  <PageNumber
                    key={`page-${num}`}
                    className={"nomargin " + (pageNumber === num)}
                    onClick={() => {
                      setCurrentIndex((num - 1) * perPage);
                    }}
                  >
                    {num}
                  </PageNumber>
                ))}
              </TabContainer>
            </>
          }
          themeColors={themeColors}
          closeModal={() => setShowPageCount(false)}
          itemTitle={{ name: "title", type: "text", collection: "" }}
          openData={{ data: { _id: "", title: "Pagination Setup!" } }} // Pass selected item data to the popup for setting the time and taking menu id and other required data from the list item
          customClass={"small"}
        ></PopupView>
      )}
      {/* <PopupView
        // Popup data is a JSX element which is binding to the Popup Data Area like HOC
        popupData={
          <Filters>
            {datefilter && <DateRangeSelector onChange={dateRangeChange} themeColors={themeColors}></DateRangeSelector>}
            {formInput.map((item, index) => {
              switch (item.type) {
                case "select":
                  return (item.filter ?? true) === true && <FormInput customClass={"filter"} placeholder={item.placeHolder} value={filterView[item.name]} key={`input` + index} id={item.name} {...item} onChange={filterChange} required={false} />;
                case "date":
                  return (item.filter ?? false) === true && <FormInput customClass={"filter"} placeholder={item.placeHolder} value={filterView[item.name]} key={`input` + index} id={item.name} {...item} onChange={filterChange} required={false} />;
                default:
                  return null;
              }
            })}
          </Filters>
        }
        themeColors={themeColors}
        closeModal={() => setShowFilter(false)}
        itemTitle={{ name: "title", type: "text", collection: "" }}
        openData={{ data: { _id: "", title: "Filters" } }} // Pass selected item data to the popup for setting the time and taking menu id and other required data from the list item
        customClass={"medium filter " + (shoFilter ? "show" : "hide")}
      ></PopupView> */}
    </RowContainer>
  ) : (
    <RowContainer>
      {users.data?.response?.length === 0 && (
        <ButtonPanel>
          {(addPrivilege ? addPrivilege : false) && users.data?.response?.length === 0 && (
            <AddButton theme={themeColors} onClick={() => isCreatingHandler(true, refreshView)}>
              <AddIcon></AddIcon>
              {shortName}
            </AddButton>
          )}
        </ButtonPanel>
      )}
      <Table className={users.data?.response?.length === 0 ? "norecord" : "record"}>{users.data?.response?.length > 0 && <TableRowWithActions key={`${shortName}-${0}`} slNo={0} attributes={attributes} data={users.data?.response[0]} />}</Table>
      {!users.data && !users.data?.response && <NoData>No {shortName} found!</NoData>}
      {users.data?.response?.length === 0 && <NoData>No {shortName} found!</NoData>}
      {isCreating && <CrudForm parentReference={parentReference} referenceId={referenceId} api={api} formMode={formMode} formType={"post"} header={`Add a ${shortName ? shortName : "Form"}`} formInput={formInput} formValues={addValues} formErrors={errroInput} submitHandler={submitHandler} isOpenHandler={isCreatingHandler} isOpen={isCreating}></CrudForm>}
      {isEditing && <CrudForm parentReference={parentReference} referenceId={referenceId} formMode={formMode} api={api} formType={"put"} updateId={updateId} header={`${updateValues.clone === false ? "Update" : "Clone"} '${updateValues._title}'`} formInput={formInput} formErrors={errroInput} formValues={updateValues} submitHandler={updateHandler} isOpenHandler={isEditingHandler} isOpen={isEditing}></CrudForm>}
      {action.data && <Manage setMessage={setMessage} setLoaderBox={setLoaderBox} onClose={closeManage} {...action}></Manage>}
      {isOpen && <Popup data={openData} actions={actions}></Popup>}
      {showLoader && <Loader></Loader>}
    </RowContainer>
  );
};
export default ListTable;
