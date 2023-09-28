import React, { useEffect, useState } from "react";
import { getData } from "../../../../../../backend/api";
import { ArrowButton, NoData } from "../../../../../elements/list/styles";
import { ColumnContainer, RowContainer } from "../../../../../styles/containers/styles";
import { TabContainer, TabButton, DayHead, Box, DayData, MealTimeHead, Recepe, RecepeImage, RecepeData, Recepes, RecepeContent, ReplacableItems, ReplacableItemsList, UserDetails, Details } from "./styles"; // Import styles from styles.js

import moment from "moment";
import { food } from "../../../../../../images";
import { calculateAge, getValue } from "../../../../../elements/list/functions";
import { GetIcon } from "../../../../../../icons";
import { dateFormat } from "../../../../../functions/date";
import { ActionBox, SwitchButton, Table, TableBody, TableCell, TableHeader, TableRow } from "../../../mealSettings/foodMenu/setupMenu/styles";
import PopupView from "../../../../../elements/popupview";
const DietMenu = ({ openData, themeColors, setMessage, setLoaderBox }) => {
  const [userId] = useState(openData.data._id);
  const [menuData, setMenuData] = useState(0);
  const [replacableItems, setReplacableItems] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedMealTime, setSelectedMealTime] = useState({});
  const [expandAll, setExpandAll] = useState(false);
  const [pause, setPause] = useState(false);
  const [currentDate, setCurrentDate] = useState(moment());
  const [selectedDayNumber, setSelectedDayNumber] = useState(moment().format("YYYY-MM-DD"));
  const [popupData, setPopupData] = useState(null);
  useEffect(() => {
    setLoaderBox(true);
    getData({ userId, details: true, startDate: currentDate.clone().startOf("week").toDate().toISOString(), endDate: currentDate.clone().endOf("week").toDate().toISOString() }, "patient-diet/food-schedule")
      .then((response) => {
        if (response.status === 200) {
          setMenuData(response.data);
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

  const getReplacableItems = (foodMenuItem) => {
    getData({ foodMenuItem, calories: menuData.user.diet.calories }, "food-menu/replacable-items").then((response) => {
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
    console.log(startDate, totalDays, excludedDays, skippedDays);
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
            console.log(day);
            const formattedDay = date.format("YYYY-MM-DD");
            return day?.menu ? (
              <Box active={selectedDayNumber === formattedDay} key={day._id}>
                <DayData>
                  {day.menu.map((menuItem) => (
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
                        {menuItem.mealTimeCategory.mealtimeCategoriesName} <GetIcon icon={"down"}></GetIcon>
                      </MealTimeHead>
                      {(selectedMealTime[`${menuItem.mealTimeCategory._id}-${day._id}`] === true || expandAll) && (
                        <Recepes>
                          {menuItem.recipes.map((recipeItem) => (
                            <>
                              <Recepe className="recipe">
                                <RecepeContent className="recipe1">
                                  <RecepeImage src={recipeItem.recipe.photo ? process.env.REACT_APP_CDN + recipeItem.recipe.photo : food}></RecepeImage>
                                  <RecepeData className="recipe2">
                                    <span className="title">{recipeItem.recipe.title}</span>
                                    <span className="light">
                                      <span>{recipeItem.recipe.typeOfRecipe}</span>
                                      <span>{recipeItem.nutritionInfo.calorieSplit}</span>
                                      <span>{recipeItem.gram?.toFixed(2)}g</span>
                                      <span>{recipeItem.calories?.toFixed(2)}KCal</span>
                                      <span>{recipeItem.nutritionInfo.Protein?.toFixed(2)}g</span>
                                      <span>{recipeItem.nutritionInfo.TotalFat?.toFixed(2)}g</span>
                                    </span>
                                    <div className="actions">
                                      <span
                                        className="info"
                                        onClick={() => {
                                          setPopupData({ nutritionInfo: recipeItem.nutritionInfo, data: recipeItem.recipe, availablecalories: recipeItem.availablecalories });
                                        }}
                                      >
                                        <GetIcon icon={"info"} />
                                      </span>
                                      <span
                                        className="delete"
                                        onClick={() => {
                                          // deleteItem(item.foodMenuItem, recipeIndex, "recipe", mealTimeCategory._id, dayNumber, items.optionNo);
                                        }}
                                      >
                                        <GetIcon icon={"delete"} />
                                      </span>
                                    </div>
                                  </RecepeData>
                                </RecepeContent>
                                {recipeItem.foodmenuitem.replacableItems > 0 && (
                                  <ReplacableItems className="horizontal" active={selectedDayNumber === index}>
                                    <button onClick={() => getReplacableItems(recipeItem.foodmenuitem._id)}>
                                      <div>Replacable Options ({recipeItem.foodmenuitem.replacableItems}) </div> <GetIcon icon={"down"}></GetIcon>
                                    </button>
                                    {replacableItems[recipeItem.foodmenuitem._id] && (
                                      <ReplacableItemsList>
                                        {replacableItems[recipeItem.foodmenuitem._id]?.map((replacableItem) => (
                                          <Recepe className="horizontal">
                                            <RecepeContent>
                                              <RecepeImage src={replacableItem.recipe.photo ? process.env.REACT_APP_CDN + replacableItem.recipe.photo : food}></RecepeImage>
                                              <RecepeData>
                                                <span className="title">{replacableItem.recipe.title}</span>
                                                <span className="light">
                                                  <span>{replacableItem.recipe.calories.toFixed(2)} Cal</span>
                                                  <span>{replacableItem.recipe.gram.toFixed(2)} g</span>
                                                </span>
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
                          ))}
                        </Recepes>
                      )}
                    </Box>
                  ))}
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
                <thead>
                  <tr>
                    <TableHeader colSpan={2}>Nutrition Info</TableHeader>
                  </tr>
                  <tr>
                    <TableHeader colSpan={2}>{` Base Calori: ${popupData.availablecalories.calories} KCal`}</TableHeader>
                  </tr>
                </thead>
                <TableBody>
                  {Object.entries(popupData.nutritionInfo ?? {}).map(([key, value]) => (
                    <TableRow key={key}>
                      <TableCell>{addSpaceBeforeCaps(key)}</TableCell>
                      <TableCell>{isNaN(value) ? value : getValue({ type: "number" }, value)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
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
          <SwitchButton enableBg={"white"} enableColor={"black"} active={pause} onClick={() => setPause((prev) => !prev)}>
            <span>{pause ? "Restart Diet" : "Pause Diet"}</span> <GetIcon icon={pause ? "play" : "pause"} />
          </SwitchButton>
          <SwitchButton enableBg={"white"} enableColor={"black"} active={pause} onClick={() => alert("save")}>
            <span>{"Modify Diet"}</span> <GetIcon icon={"edit"} />
          </SwitchButton>
        </ActionBox>
        {menuData && menuData.user && (
          <>
            <UserDetails>
              <Details
                className="head"
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
                className="head"
                onClick={() =>
                  setSelectedMealTime((prev) => ({
                    ...prev,
                    [`active-deit`]: !prev[`active-deit`] ?? true,
                  }))
                }
              >
                <div>Active Diet</div>
                <GetIcon icon={"down"}></GetIcon>
              </Details>
              {selectedMealTime[`active-deit`] === true && (
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
                className="head"
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
                  <div>{menuData.user.diet?.remarks.length > 0 ? menuData.user.diet?.remarks : "No diagnose found!"}</div>
                  <GetIcon icon={"edit"}></GetIcon>
                </Details>
              )}{" "}
            </UserDetails>
            <UserDetails>
              <Details
                className="head"
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
                  <div>{menuData.user.diet?.remarks.length > 0 ? menuData.user.diet?.remarks : "No remarks found!"}</div>
                  <GetIcon icon={"edit"}></GetIcon>
                </Details>
              )}{" "}
            </UserDetails>
          </>
        )}
      </RowContainer>
    </ColumnContainer>
  ) : (
    <NoData>{isLoaded ? "No Diet Schedule Found" : "Loading"}</NoData>
  );
};

export default DietMenu;
