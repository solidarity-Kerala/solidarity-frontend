import React, { useEffect, useState } from "react";
import { getData, postData } from "../../../../../../backend/api";
import { ArrowButton, NoData } from "../../../../../elements/list/styles";
import { ColumnContainer, RowContainer } from "../../../../../styles/containers/styles";
import { TabContainer, TabButton, DayHead, Box, DayData, MealTimeHead, Recepe, RecepeImage, RecepeData, Recepes, RecepeContent, ReplacableItems, ReplacableItemsList, UserDetails, Details } from "./styles"; // Import styles from styles.js

import moment from "moment";
import { food } from "../../../../../../images";
import { calculateAge, getValue } from "../../../../../elements/list/functions";
import { GetIcon } from "../../../../../../icons";
import { dateFormat } from "../../../../../functions/date";
import { ActionBox, SwitchButton, Table } from "../../../mealSettings/foodMenu/setupMenu/styles";
import PopupView from "../../../../../elements/popupview";
import AutoForm from "../../../../../elements/form";
const DietMenu = ({ openData, themeColors, setMessage, setLoaderBox }) => {
  const [userId] = useState(openData.data._id);
  const [menuData, setMenuData] = useState(0);
  const [replacableItems, setReplacableItems] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedMealTime, setSelectedMealTime] = useState({});
  const [expandAll, setExpandAll] = useState(true);
  const [pause, setPause] = useState(false);
  const [currentDate, setCurrentDate] = useState(moment());
  const [selectedDayNumber, setSelectedDayNumber] = useState(moment().format("YYYY-MM-DD"));
  const [popupData, setPopupData] = useState(null);
  // State to control the display of the SetupMenu popup
  const [openMenuSetup, setOpenMenuSetup] = useState(false);
  const [openedMenu, setOpenedMenu] = useState("");
  // State to store the data for the item that was clicked on in the ListTable
  const [openItemData, setOpenItemData] = useState(null);
  useEffect(() => {
    setLoaderBox(true);
    getData({ userId, details: true, startDate: currentDate.clone().startOf("week").toDate().toISOString(), endDate: currentDate.clone().endOf("week").toDate().toISOString() }, "patient-diet/food-schedule")
      .then((response) => {
        if (response.status === 200) {
          setMenuData(response.data);
          setPause(response.data.user?.diet?.isPaused ?? false);
          const today = moment();
          if (currentDate.isSameOrAfter(today)) {
            setSelectedDayNumber(currentDate.clone().format("YYYY-MM-DD"));
          } else {
            setSelectedDayNumber(today.format("YYYY-MM-DD"));
          }
          setIsLoaded(true);
          setLoaderBox(false);
        }
      })
      .catch((error) => {
        setIsLoaded(false);
      });
  }, [userId, currentDate, setLoaderBox]);
  const ChangeDate = (value = 1) => {
    const date = currentDate.clone();
    const today = moment().startOf("week");
    const upcomingWeek = date.clone().add(value, "weeks").startOf("week");
    // Check if the upcoming week is greater than or equal to the current week
    if (upcomingWeek.isSameOrAfter(today)) {
      setCurrentDate(upcomingWeek);
    }
  };

  const getReplacableItems = (foodMenuItem, recipeSchedule) => {
    getData({ foodMenuItem, calories: menuData.user.diet.calories, recipeSchedule }, "patient-diet/replacable-items").then((response) => {
      if (response.status === 200) {
        setReplacableItems((prev) => ({
          ...prev,
          [foodMenuItem]: response.data.replacableItems,
        }));
      }
    });
  };
  const populateArray = (items, value) => {
    if (value === "days") {
      const days = [
        { value: "Sunday", id: 0 },
        { value: "Monday", id: 1 },
        { value: "Tuesday", id: 2 },
        { value: "Wednesday", id: 3 },
        { value: "Thursday", id: 4 },
        { value: "Friday", id: 5 },
        { value: "Saturday", id: 6 },
      ];
      const filteredDays = days.filter((day) => days.includes(day));
      return filteredDays?.map((item, index) => <span key={index}>{item["value"]}</span>);
    } else {
      return items?.map((item, index) => <span key={index}>{item[value]}</span>);
    }
  };
  const getRelativeDay = (date) => {
    const today = moment().startOf("day");
    const tomorrow = moment().add(1, "day").startOf("day");
    const yesterday = moment().subtract(1, "day").startOf("day");

    if (moment(date).isSame(today, "d")) {
      return "Today";
    } else if (moment(date).isSame(tomorrow, "d")) {
      return "Tomorrow";
    } else if (moment(date).isSame(yesterday, "d")) {
      return "Yesterday";
    } else {
      return "Unknown";
    }
  };

  function calculateExpiryDate(startDate, totalDays, excludedDays, skippedDays) {
    // Adjust total days considering skipped days and excluded days
    const eligibleDays = totalDays;

    let currentDate = moment(startDate);
    let eligibleCount = 0;

    // Iterate through each day and find the eligible expiry date
    while (eligibleCount < eligibleDays) {
      // Check if the current day is not an excluded day or a skipped day
      if (excludedDays.indexOf(currentDate.day()) === -1 && skippedDays.indexOf(currentDate.day()) === -1) {
        eligibleCount++;
      }
      // Move to the next day
      currentDate.add(1, "day");
    }

    // currentDate now holds the eligible expiry date
    return dateFormat(currentDate.toDate());
  }
  const getWeekDays = () => {
    const startOfWeek = moment(currentDate).startOf("week");
    return Array.from({ length: 7 }, (_, i) => moment(startOfWeek).add(i, "days"));
  };
  function addSpaceBeforeCaps(str) {
    str = str.replace(/([a-z])([A-Z])/g, "$1 $2");
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  //form data and action
  const [parameters, setParameters] = useState(null);
  const [isOpen, setIsOpen] = useState(null);
  const closeEdit = () => {
    setIsOpen(null);
    setLoaderBox(false);
  };
  const closeModal = () => {
    setOpenMenuSetup(false);
    setOpenItemData(null);
  };

  const swapRecipe = async (recipeSchedule, replacableItem, date, categoryIndex, recepeIndex) => {
    const menuDataTemp = { ...menuData };
    // Find the day based on the date
    let day = menuDataTemp.result.find((item) => item._id === date.format("YYYY-MM-DD"));
    if (day) {
      const item = day.menu[categoryIndex].recipes[recepeIndex];
      setLoaderBox(true);
      try {
        const response = await postData({ recipeSchedule, replacableItem }, "patient-diet/replace-food-menu-item");
        if (response.data.ReplacedItem) {
          // Update the item with the response data
          day.menu[categoryIndex].recipes[recepeIndex] = { ...item, ...response.data.ReplacedItem };
          // Update the menuData
          setMenuData(menuDataTemp);
        } else {
          setMessage({
            content: response.data.message,
          });
        }
        closeEdit();
        return response;
      } catch (error) {
        console.error("Error swapping recipe:", error);
        // Handle error here if needed
      } finally {
        setLoaderBox(false);
      }
    }
  };

  const editDiet = async (option) => {
    setParameters([
      // TYPE OF DIET IS A DIET //
      {
        type: "select",
        apiType: "API",
        selectApi: "diet/select",
        placeholder: "Diet",
        name: "diet",
        validation: "",
        showItem: "title",
        default: "",
        tag: true,
        label: "Diet",
        required: true,
        view: true,
        add: true,
        update: true,
        filter: false,
      },
      // TYPE OF DIET IS A DIET //
      // DIET PLAN IS A SUB DIET //
      {
        type: "select",
        apiType: "API",
        selectApi: "sub-diet/get-sub-diet-by-diet",
        updateOn: "diet",
        placeholder: "Sub Diet",
        name: "subDiet",
        validation: "",
        collection: "subDiet",
        showItem: "title",
        default: "",
        tag: true,
        label: "Sub Diet",
        required: true,
        view: true,
        add: true,
        update: true,
        filter: false,
      },
      {
        type: "select",
        apiType: "API",
        selectApi: "package/select",
        updateOn: "subDiet",
        updateFields: [{ id: "foodMenu", value: "_id", collection: "foodMenu" }],
        placeholder: "Package",
        tags: [
          {
            type: "text",
            item: "menuType",
            title: "Menu Type",
            collection: "foodMenu",
          },
        ],
        viewButton: {
          title: "View Menu",
          callback: (item, data) => {
            setOpenedMenu("menu");
            // Set the data for the clicked item and open the SetupMenu popup
            setOpenItemData({
              data: { ...item, ...item.foodMenu, _id: item.foodMenu._id },
              item: {
                viewOnly: true,
                itemTitle: {
                  name: "value",
                  type: "text",
                  collection: "",
                },
                icon: "menu",
                title: "Setup Menu",
                params: {
                  api: `food-group-item`,
                  parentReference: "",
                  // itemTitle: "username",
                  itemTitle: {
                    name: "value",
                    type: "text",
                    collection: "",
                  },
                  shortName: "Recipe Items",
                  addPrivilege: true,
                  delPrivilege: true,
                  updatePrivilege: true,
                  customClass: "medium",
                  // formMode: "double",
                },
              },
            });
            setOpenMenuSetup(true);
          },
        },
        name: "package",
        validation: "",
        showItem: "value",
        collection: "diet",
        default: "",
        tag: true,
        label: "Package",
        required: false,
        view: true,
        add: true,
        update: true,
        filter: false,
      },
      {
        type: "select",
        selectApi: "900,1000,1100,1200,1300,1400,1500,1600,1700,1800,1900,2000",
        apiType: "CSV",
        placeholder: "Calories",
        name: "calories",
        showItem: "",
        validation: "",
        default: "",
        tag: true,
        label: "Calories",
        filter: false,
        required: true,
        view: true,
        add: true,
        update: true,
      },
      {
        type: "multiSelect",
        placeholder: "Select Days of Week",
        listView: true,
        name: "eligibleDays",
        validation: "",
        default: [0, 1, 2, 3, 4, 5, 6],
        label: "Select Days of Week",
        required: true,
        view: true,
        customClass: "list",
        add: true,
        update: true,
        apiType: "JSON",
        search: false,
        selectApi: [
          { value: "Sunday", id: 0 },
          { value: "Monday", id: 1 },
          { value: "Tuesday", id: 2 },
          { value: "Wednesday", id: 3 },
          { value: "Thursday", id: 4 },
          { value: "Friday", id: 5 },
          { value: "Saturday", id: 6 },
        ],
      },
      {
        type: "multiSelect",
        placeholder: "Select Meal Times",
        name: "mealTimeCategory",
        updateOn: "package",
        label: "Select Meal Times",
        required: true,
        view: true,
        default: "",
        add: true,
        update: true,
        apiType: "API",
        search: false,
        selectApi: "mealtime-category/select-by-menu",
      },
    ]);
    setIsOpen({ submit: "Udpate Now", api: "food-menu/undo-clone", header: "Change Diet", description: "" });
  };
  const editNotes = async (type, item, index = { date: 0, categoryIndex: 0, recepeIndex: 0 }) => {
    switch (type) {
      case "diagnose":
        setParameters([
          {
            type: "textarea",
            placeholder: "Diagnose Report",
            name: "diagnoseNote",
            showItem: "",
            validation: "",
            default: menuData.user.diet.diagnoseNote ?? "",
            // tag: true,
            label: "Remarks",
            required: true,
            view: true,
            add: false,
            update: true,
          },
          {
            type: "hidden",
            placeholder: "patientDeit",
            name: "patientDiet",
            showItem: "",
            validation: "",
            default: menuData.user.diet._id,
            label: "patientDeit",
            required: true,
            view: true,
            add: false,
            update: true,
          },
        ]);
        setIsOpen({ type, submit: "Udpate Now", api: "patient-diet/update-patient-diet", header: "Edit Diagnose Report", description: "" });
        break;
      case "kitchen":
        setParameters([
          {
            type: "textarea",
            placeholder: "Kitchen Note",
            name: "kitchenNote",
            showItem: "",
            validation: "",
            default: menuData.user.diet?.kitchenNote ?? "",
            label: "Kitchen Note",
            required: true,
            view: true,
            add: false,
            update: true,
          },
          {
            type: "hidden",
            placeholder: "patientDeit",
            name: "patientDiet",
            showItem: "",
            validation: "",
            default: menuData.user.diet._id,
            // tag: true,
            label: "patientDeit",
            required: true,
            view: true,
            add: false,
            update: true,
          },
        ]);
        setIsOpen({ type, submit: "Udpate Now", api: "patient-diet/update-patient-diet", header: "Edit Kitchen Note", description: "" });
        break;
      case "recipe":
        setParameters([
          {
            type: "textarea",
            placeholder: "Recipe Note",
            name: "recipeNote",
            showItem: "",
            validation: "",
            default: item.recipeNote ?? "",
            // tag: true,
            label: "Recipe Note",
            required: true,
            view: true,
            add: false,
            update: true,
          },
          {
            type: "hidden",
            placeholder: "recipeSchedule",
            name: "recipeSchedule",
            showItem: "",
            validation: "",
            default: item._id,
            label: "recipeSchedule",
            required: true,
            view: true,
            add: false,
            update: true,
          },
        ]);
        setIsOpen({ type, index, submit: "Udpate Now", api: "patient-diet/udpate-recipe-note", header: `Edit ${item.recipe.title}'s Note `, description: "" });
        break;

      default:
        break;
    }
  };
  const updateHandler = async (post) => {
    setLoaderBox(true);
    await postData({ foodMenu: openData.data._id, weekNumber: parseInt(0), ...post }, isOpen.api).then((response) => {
      if (response.status === 200) {
        switch (isOpen.type) {
          case "diagnose":
            updateDiet("diagnoseNote", response.data.response.diagnoseNote);
            break;
          case "kitchen":
            updateDiet("kitchenNote", response.data.response.kitchenNote);
            break;
          case "recipe":
            updateRecipe(isOpen.index.categoryIndex, isOpen.index.recepeIndex, isOpen.index.date, "recipeNote", response.data.response.recipeNote);
            break;
          case "pause":
            break;
          case "restart":
            break;
          default:
            break;
        }
      }
      closeEdit();
    });
  };
  const pauseStartDiet = () => {
    pause
      ? setParameters([
          {
            type: "date",
            placeholder: "Pause start date?",
            name: "restartDate",
            showItem: "",
            validation: "",
            default: "",
            tag: true,
            label: "Pause start date?",
            required: true,
            view: true,
            add: true,
            update: true,
          },
          {
            type: "date",
            placeholder: "When do you want to restart?",
            name: "restartDate",
            showItem: "",
            validation: "",
            default: "",
            tag: true,
            label: "When do you want to restart?",
            required: false,
            view: true,
            add: true,
            update: true,
          },
        ])
      : setParameters([
          {
            type: "checkbox",
            placeholder: "Do you want to reshcedule?",
            name: "reschedule",
            showItem: "",
            validation: "",
            default: "",
            tag: true,
            label: "Do you want to reshcedule?",
            required: false,
            view: true,
            add: true,
            update: true,
          },
          {
            type: "date",
            placeholder: "When would you like to reschedule the diet?",
            name: "restartDate",
            condition: {
              item: "reschedule",
              if: true,
              then: "enabled",
              else: "disabled",
            },
            showItem: "",
            validation: "",
            default: "",
            tag: true,
            label: "When would you like to reschedule the diet?",
            required: false,
            view: true,
            add: true,
            update: true,
          },
        ]);
    setIsOpen({ type: pause ? "pause" : "restart", customClass: "single", submit: pause ? "Restart" : "Pause", api: "patient-diet/udpate-status", header: pause ? "Restarting the diet?" : "Pausing the diet?", description: "" });
  };
  const updateRecipe = (categoryIndex, recepeIndex, date, item, value) => {
    const menuDataTemp = { ...menuData };
    // Find the day based on the date
    let day = menuDataTemp.result.find((item) => item._id === date.format("YYYY-MM-DD"));
    day.menu[categoryIndex].recipes[recepeIndex][item] = value; // Fixed splice syntax
    // Update the menuData
    setMenuData(menuDataTemp);
  };
  const updateDiet = (item, value) => {
    const menuDataTemp = { ...menuData };
    // Find the day based on the date
    let diet = menuDataTemp.user.diet;
    diet[item] = value; // Fixed splice syntax
    // Update the menuData
    setMenuData(menuDataTemp);
  };
  const renderRecipe = (recipes, index, date, categoryIndex, isDeleted) => {
    return recipes.map((recipeItem, recepeIndex) => {
      return (
        (recipeItem.isDeleted ?? false) === isDeleted && (
          <>
            <Recepe className={isDeleted ? "recipe deleted" : "recipe"}>
              <RecepeContent className="recipe1">
                <RecepeImage src={recipeItem.recipe.photo ? process.env.REACT_APP_CDN + recipeItem.recipe.photo : food}></RecepeImage>
                <RecepeData className="recipe2">
                  <span className="title">
                    {recipeItem.recipe.title}
                    {isDeleted && (
                      <>
                        {recipeItem.isDislike && <span className="red">Don't Like</span>}
                        {recipeItem.isAllergy && <span className="red">Has Allergy</span>}
                        <span>{recipeItem.recipe.typeOfRecipe}</span>
                        <span>{recipeItem.calories?.toFixed(2)}KCal</span>
                        <span>{recipeItem.gram?.toFixed(2)}g</span>
                        <span className="red">Removed</span>
                      </>
                    )}
                  </span>
                  <span className="light">
                    {recipeItem.isDislike && <span className="red">Don't Like</span>}
                    {recipeItem.isAllergy && <span className="red">Has Allergy</span>}
                    <span>{recipeItem.recipe.typeOfRecipe}</span>
                    <span>{recipeItem.nutritionInfo.calorieSplit}</span>
                    <span>{recipeItem.calories?.toFixed(2)}KCal</span>
                    <span>{recipeItem.gram?.toFixed(2)}g</span>
                    <span>Protein {recipeItem.nutritionInfo.Protein?.toFixed(2)}g</span>
                    <span>Fat {recipeItem.nutritionInfo.TotalFat?.toFixed(2)}g</span>
                    {/* <span>{recipeItem.isDeleted && "Deleted"}</span> */}
                  </span>
                  <div className="actions">
                    <span
                      className="info"
                      title="View Recipe Info"
                      onClick={() => {
                        setPopupData({ nutritionInfo: recipeItem.nutritionInfo, data: recipeItem.recipe, recipe: recipeItem, availablecalories: recipeItem.availablecalories });
                      }}
                    >
                      <GetIcon icon={"info"} />
                    </span>
                    {!isDeleted && (
                      <span
                        className="edit"
                        title="Modify Recipe Note"
                        onClick={() => {
                          // deleteItem(item.foodMenuItem, recipeIndex, "recipe", mealTimeCategory._id, dayNumber, items.optionNo);
                          editNotes("recipe", recipeItem, { date, categoryIndex, recepeIndex });
                        }}
                      >
                        <GetIcon icon={"edit"} />
                      </span>
                    )}
                    {recipeItem.foodmenuitem.replacableItems > 0 && (recipeItem.isReplaced ?? false) && (
                      <span
                        className="edit"
                        onClick={() => {
                          swapRecipe(recipeItem._id, 0, date, categoryIndex, recepeIndex);
                        }}
                      >
                        <GetIcon icon={"swap"} />
                      </span>
                    )}
                    <span
                      title={isDeleted ? "Restore Recipe" : "Delete Recipe"}
                      className={isDeleted ? "" : "delete"}
                      onClick={() => {
                        setMessage({
                          type: 2,
                          content: isDeleted ? "Do you want to restore the recipe?" : "Are you sure you want to delete?",
                          proceed: isDeleted ? "Restore" : "Delete",
                          onProceed: async () => {
                            try {
                              const response = await postData({ isDeleted: !isDeleted, recipeSchedule: recipeItem._id }, "patient-diet/delete-recipe");
                              if (response.status === 200) {
                                // Update the item with the response data
                                console.log(response?.data?.response?.isDeleted);
                                if (response?.data?.response) {
                                  // const menuDataTemp = { ...menuData };
                                  // // Find the day based on the date
                                  // let day = menuDataTemp.result.find((item) => item._id === date.format("YYYY-MM-DD"));
                                  // day.menu[categoryIndex].recipes[recepeIndex].isDeleted = response.data.response.isDeleted; // Fixed splice syntax
                                  // // Update the menuData
                                  // setMenuData(menuDataTemp);
                                  updateRecipe(categoryIndex, recepeIndex, date, "isDeleted", response.data.response.isDeleted);
                                }
                              }
                            } catch (error) {
                              // Handle any errors that occur during the deletion process
                              console.log(error);
                            }
                          },
                          data: { id: recipeItem._id },
                        });
                      }}
                    >
                      <GetIcon icon={isDeleted ? "restoreIcon" : "delete"} />
                    </span>
                  </div>
                </RecepeData>
              </RecepeContent>
              {recipeItem.foodmenuitem.replacableItems > 0 && !isDeleted && (
                <ReplacableItems className="horizontal" active={selectedDayNumber === index}>
                  <button onClick={() => getReplacableItems(recipeItem.foodmenuitem._id, recipeItem._id)}>
                    <div>Replacable Options ({recipeItem.foodmenuitem.replacableItems}) </div> <GetIcon icon={"down"}></GetIcon>
                  </button>
                  {replacableItems[recipeItem.foodmenuitem._id] && (
                    <ReplacableItemsList>
                      {replacableItems[recipeItem.foodmenuitem._id]?.map((replacableItem) => (
                        <Recepe className="horizontal">
                          <RecepeContent className="child-recipe">
                            <RecepeImage src={replacableItem.recipe.photo ? process.env.REACT_APP_CDN + replacableItem.recipe.photo : food}></RecepeImage>
                            <RecepeData>
                              <span className="title">{replacableItem.recipe.title}</span>
                              <span className="light">
                                <span>{replacableItem.calories?.toFixed(2)}KCal</span>
                                <span>{replacableItem.gram?.toFixed(2)}g</span>
                                <span>Protein {replacableItem.nutritionInfo.Protein?.toFixed(2)}g</span>
                                <span>Fat {replacableItem.nutritionInfo.TotalFat?.toFixed(2)}g</span>
                              </span>
                              <div className="sub-actions">
                                <span
                                  className="info"
                                  onClick={() => {
                                    setPopupData({ nutritionInfo: replacableItem.nutritionInfo, data: recipeItem.recipe, availablecalories: recipeItem.availablecalories });
                                  }}
                                >
                                  <GetIcon icon={"info"} />
                                </span>
                                <span
                                  className="edit"
                                  onClick={() => {
                                    swapRecipe(recipeItem._id, replacableItem._id, date, categoryIndex, recepeIndex);
                                  }}
                                >
                                  <GetIcon icon={"swap"} />
                                </span>
                              </div>
                            </RecepeData>
                          </RecepeContent>
                        </Recepe>
                      ))}
                    </ReplacableItemsList>
                  )}
                </ReplacableItems>
              )}
            </Recepe>
          </>
        )
      );
    });
  };
  return menuData?.user?.diet ? (
    <ColumnContainer>
      <RowContainer className="menu-schedule">
        <TabContainer>
          <SwitchButton className="custom" enableBg={"rgb(239 239 239)"} enableColor={"black"} active={expandAll} onClick={() => setExpandAll((prev) => !prev)}>
            <GetIcon icon={"open-book"} />
          </SwitchButton>
          {/* <SwitchButton enableBg={"#cccccc;"} enableColor={"black"} active={expandAll} onClick={() => setExpandAll((prev) => !prev)}>
            <span>{expandAll ? "Collapse All" : "Expand All"}</span> <GetIcon icon={"open-book"} />
          </SwitchButton> */}
          <ArrowButton
            className="normal"
            onClick={() => {
              ChangeDate(-1);
            }}
          >
            <GetIcon icon={"previous"} />
          </ArrowButton>
          <TabContainer>
            {getWeekDays().map((day, index) => {
              const dateName = getRelativeDay(day);
              const formattedDay = day.format("YYYY-MM-DD");
              return (
                <TabButton
                  key={day}
                  active={selectedDayNumber === formattedDay}
                  onClick={() => {
                    setSelectedDayNumber(formattedDay);
                  }}
                >
                  <DayHead key={day}>
                    {dateName === "Unknown" ? <div className="dayName">{`${day.format("ddd")}`}</div> : <div className="dayName">{dateName}</div>}
                    <div className="day">{day.format("D MMM")}</div>
                  </DayHead>
                </TabButton>
              );
            })}
          </TabContainer>
          <ArrowButton
            className="normal"
            onClick={() => {
              ChangeDate(1);
            }}
          >
            <GetIcon icon={"next"} />
          </ArrowButton>
        </TabContainer>
        {menuData && menuData.result?.length === 0 && <NoData>No menu set for this week!</NoData>}
        {menuData &&
          getWeekDays().map((date, index) => {
            // const date = moment(day._id);
            const day = menuData.result.find((item) => item._id === date.format("YYYY-MM-DD"));
            const formattedDay = date.format("YYYY-MM-DD");
            const calories = day?.menu?.reduce((sumMenu, menu) => {
              const mealtimeCalories = menu.recipes.reduce((sumMealtime, mealtime) => {
                return sumMealtime + (mealtime.isDeleted ?? false ? 0 : mealtime.calories || 0);
              }, 0);

              return sumMenu + mealtimeCalories;
            }, 0);
            return day?.menu ? (
              <Box active={selectedDayNumber === formattedDay} key={day._id}>
                <DayData>
                  <MealTimeHead className="assigned title">
                    {`Total Calori`}
                    <span>{calories.toFixed(2)}KCal </span>
                  </MealTimeHead>
                  {day.menu.map((menuItem, categoryIndex) => {
                    const mealtimeCalories = menuItem.recipes.reduce((sumMealtime, mealtime) => {
                      return sumMealtime + (mealtime.calories || 0);
                    }, 0);
                    return (
                      <Box active={selectedDayNumber === formattedDay} key={menuItem.id}>
                        <MealTimeHead
                          className="assigned"
                          active={(selectedMealTime[`${menuItem.mealTimeCategory._id}-${day._id}`] ?? false) || expandAll}
                          onClick={() =>
                            setSelectedMealTime((prev) => ({
                              ...prev,
                              [`${menuItem.mealTimeCategory._id}-${day._id}`]: !prev[`${menuItem.mealTimeCategory._id}-${day._id}`] ?? true,
                            }))
                          }
                        >
                          {`${menuItem.mealTimeCategory.mealtimeCategoriesName}`}
                          <span>{mealtimeCalories.toFixed(2)}Kcal</span> <GetIcon icon={"down"}></GetIcon>
                        </MealTimeHead>
                        {(selectedMealTime[`${menuItem.mealTimeCategory._id}-${day._id}`] === true || expandAll) && (
                          <>
                            <Recepes>{renderRecipe(menuItem.recipes, index, date, categoryIndex, false)}</Recepes>
                            <Recepes>{renderRecipe(menuItem.recipes, index, date, categoryIndex, true)}</Recepes>
                          </>
                        )}
                      </Box>
                    );
                  })}
                </DayData>
              </Box>
            ) : (
              <Box active={selectedDayNumber === formattedDay} key={formattedDay}>
                <NoData>
                  <GetIcon icon={"recipe"}></GetIcon> <span>No menu for the day</span>
                </NoData>
              </Box>
            );
          })}
        {popupData && (
          <PopupView
            popupData={
              <Table className="full short">
                {popupData.recipe.isAllergy && (
                  <UserDetails>
                    <Details className="head true">
                      <div>{`Alergy on Ingrediens`} </div>
                    </Details>

                    {popupData.recipe.recipe.recipeingredients.map((item) => {
                      return (
                        item.isAllergy && (
                          <Details>
                            <div>{item.data.ingredientsName}</div>
                          </Details>
                        )
                      );
                    })}
                  </UserDetails>
                )}
                {popupData.recipe.isDislike && (
                  <UserDetails>
                    <Details className="head true">
                      <div>{`Dislike Ingredients`}</div>
                    </Details>

                    {popupData.recipe.recipe.recipeingredients.map((item) => {
                      return (
                        item.isDislike && (
                          <Details>
                            <div>{item.data.ingredientsName}</div>
                          </Details>
                        )
                      );
                    })}
                  </UserDetails>
                )}
                <UserDetails>
                  <Details className="head true">
                    <div>{`Nutrition Info based on ${popupData.availablecalories.calories} KCal`} </div>
                  </Details>
                  {Object.entries(popupData.nutritionInfo ?? {}).map(([key, value]) => (
                    <Details>
                      <div>{addSpaceBeforeCaps(key)}</div>
                      <div>{isNaN(value) ? value : getValue({ type: "number" }, value)}</div>
                    </Details>
                  ))}
                </UserDetails>
              </Table>
            }
            themeColors={themeColors}
            closeModal={() => setPopupData(null)}
            itemTitle={{ name: "title", type: "text", collection: "" }}
            openData={popupData} // Pass selected item data to the popup for setting the time and taking menu id and other required data from the list item
            customClass={"small"}
          ></PopupView>
        )}
      </RowContainer>

      <RowContainer className="user-details">
        <ActionBox>
          <SwitchButton enableBg={"white"} enableColor={"black"} active={pause} onClick={() => pauseStartDiet()}>
            <span>{pause ? "Restart Diet" : "Pause Diet"}</span> <GetIcon icon={pause ? "play" : "pause"} />
          </SwitchButton>
          <SwitchButton enableBg={"white"} enableColor={"black"} active={pause} onClick={() => editDiet()}>
            <span>{"Modify Diet"}</span> <GetIcon icon={"edit"} />
          </SwitchButton>
        </ActionBox>
        {menuData && menuData.user && (
          <>
            <UserDetails>
              <Details
                className="head true"
                onClick={() =>
                  setSelectedMealTime((prev) => ({
                    ...prev,
                    [`patient-diet`]: !prev[`patient-diet`] ?? true,
                  }))
                }
              >
                <div>{menuData.user.profile.user.username}'s Medical Records</div>
              </Details>
              {
                <>
                  <Details>
                    <div>Height</div>
                    <div>{menuData.user.profile.height}</div>
                  </Details>
                  <Details>
                    <div>Weight</div>
                    <div>{menuData.user.profile.presentWeight}</div>
                  </Details>
                  <Details>
                    <div>Gender</div>
                    <div>{menuData.user.profile.gender}</div>
                  </Details>
                  <Details>
                    <div>Age</div>
                    <div>{calculateAge(menuData.user.profile.dateOfBirth)}</div>
                  </Details>

                  <Details>
                    <div>Foodlike list </div>
                    <div>{populateArray(menuData.user.profile.foodLikeList, "foodLikeListName")}</div>
                  </Details>
                  <Details>
                    <div>Dislike list </div>
                    <div>{populateArray(menuData.user.profile.foodDisLikeList, "proteinCategoriesName")}</div>
                  </Details>
                  <Details>
                    <div>Medical condition </div>
                    <div>{populateArray(menuData.user.profile.medicalCondition, "medicalConditionsName")}</div>
                  </Details>
                  <Details>
                    <div>Addiction list</div>
                    <div>{populateArray(menuData.user.profile.addictionList, "addictionListName")}</div>
                  </Details>
                  <Details>
                    <div>Allergy list</div>
                    <div>{populateArray(menuData.user.profile.allergyList, "title")}</div>
                  </Details>
                </>
              }
            </UserDetails>
            <UserDetails>
              <Details
                className={`head ${selectedMealTime[`active-diet`] ?? ""}`}
                onClick={() =>
                  setSelectedMealTime((prev) => ({
                    ...prev,
                    [`active-diet`]: !prev[`active-diet`] ?? true,
                  }))
                }
              >
                <div>Active Diet</div>
                <GetIcon icon={"down"}></GetIcon>
              </Details>
              {selectedMealTime[`active-diet`] === true && (
                <>
                  <Details>
                    <div>Diet, Sub diet </div>
                    <div>{`${menuData.user.diet.diet?.title}, ${menuData.user.diet.subDiet?.title}`}</div>
                  </Details>
                  <Details>
                    <div>Choosen Days</div>
                    <div>{populateArray(menuData.user.diet.eligibleDays, "days")}</div>
                  </Details>
                  <Details>
                    <div>Selected Meal Times</div>
                    <div>{populateArray(menuData.user.diet.mealTimeCategory, "mealtimeCategoriesName")}</div>
                  </Details>
                  <Details>
                    <div>Start Date</div>
                    <div>{dateFormat(menuData.user.diet.startDate)}</div>
                  </Details>
                  <Details>
                    <div>No of Days</div>
                    <div>{menuData.user.diet.numberofDays}</div>
                  </Details>
                  <Details>
                    <div>Calorie Intake</div>
                    <div>{menuData.user.diet.calories} (Per day)</div>
                  </Details>
                  <Details>
                    <div>End Date</div>
                    <div>{calculateExpiryDate(menuData.user.diet.startDate, menuData.user.diet.numberofDays, menuData.user.diet.eligibleDays, [])}</div>
                  </Details>
                </>
              )}
            </UserDetails>
            <UserDetails>
              <Details
                className={`head ${selectedMealTime[`diagnose`] ?? ""}`}
                onClick={() =>
                  setSelectedMealTime((prev) => ({
                    ...prev,
                    [`diagnose`]: !prev[`diagnose`] ?? true,
                  }))
                }
              >
                <div>Diagnose Report</div>
                <GetIcon icon={"down"}></GetIcon>
              </Details>
              {selectedMealTime[`diagnose`] === true && (
                <Details>
                  <div>{menuData.user.diet?.diagnoseNote?.length > 0 ? menuData.user.diet?.diagnoseNote : "No diagnose found!"}</div>
                  <button onClick={() => editNotes("diagnose")}>
                    <GetIcon icon={"edit"}></GetIcon>
                  </button>
                </Details>
              )}
            </UserDetails>
            <UserDetails>
              <Details
                className={`head ${selectedMealTime[`remarks`] ?? ""}`}
                onClick={() =>
                  setSelectedMealTime((prev) => ({
                    ...prev,
                    [`remarks`]: !prev[`remarks`] ?? true,
                  }))
                }
              >
                <div>Kitchen Note</div>
                <GetIcon icon={"down"}></GetIcon>
              </Details>
              {selectedMealTime[`remarks`] === true && (
                <Details>
                  <div>{menuData.user.diet?.kitchenNote?.length > 0 ? menuData.user.diet?.kitchenNote : "No diagnose found!"}</div>
                  <button onClick={() => editNotes("kitchen")}>
                    <GetIcon icon={"edit"}></GetIcon>
                  </button>
                </Details>
              )}
            </UserDetails>
          </>
        )}
      </RowContainer>
      {isOpen && (
        <AutoForm
          userId={openData.data._id}
          useCaptcha={false}
          useCheckbox={false}
          customClass={isOpen.customClass ?? ""}
          description={isOpen.description}
          formValues={{}}
          css={isOpen.customClass ?? "double"}
          key={isOpen.description}
          formType={"post"}
          header={isOpen.header}
          formInput={parameters}
          submitHandler={updateHandler}
          button={isOpen.submit}
          isOpenHandler={(value) => {
            closeEdit(value);
          }}
          isOpen={true}
          plainForm={false}
        ></AutoForm>
      )}
      {openedMenu === "diet" && openMenuSetup && openItemData && (
        <PopupView
          // Popup data is a JSX element which is binding to the Popup Data Area like HOC
          popupData={<DietMenu openData={openItemData} setMessage={setMessage} themeColors={themeColors}></DietMenu>}
          themeColors={themeColors}
          closeModal={closeModal}
          itemTitle={{ name: "username", type: "text", collection: "" }}
          openData={openItemData} // Pass selected item data to the popup for setting the time and taking menu id and other required data from the list item
          customClass={"full-page"}
        ></PopupView>
      )}
    </ColumnContainer>
  ) : (
    <NoData>{isLoaded ? "No Diet Schedule Found" : "Loading"}</NoData>
  );
};

export default DietMenu;
