import React, { useEffect, useState } from "react";
import { getData } from "../../../../../../backend/api";
import { ArrowButton, NoData } from "../../../../../elements/list/styles";
import { ColumnContainer, RowContainer } from "../../../../../styles/containers/styles";
import { TabContainer, TabButton, DayHead, Box, DayData, MealTimeHead, Recepe, RecepeImage, RecepeData, Recepes, RecepeContent, ReplacableItems, ReplacableItemsList, UserDetails, Details } from "./styles"; // Import styles from styles.js

import moment from "moment";
import { food } from "../../../../../../images";
import { calculateAge } from "../../../../../elements/list/functions";
import { GetIcon } from "../../../../../../icons";
import { dateFormat } from "../../../../../functions/date";
import { ActionBox, SwitchButton } from "../../../mealSettings/foodMenu/setupMenu/styles";
const DietMenu = ({ openData, themeColors, setMessage, setLoaderBox }) => {
  const [userId] = useState(openData.data._id);
  const [menuData, setMenuData] = useState(0);
  const [replacableItems, setReplacableItems] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedDayNumber, setSelectedDayNumber] = useState(0);
  const [selectedMealTime, setSelectedMealTime] = useState({});
  const [expandAll, setExpandAll] = useState(false);
  const [pause, setPause] = useState(false);
  const [currentDate, setCurrentDate] = useState(moment());
  useEffect(() => {
    setLoaderBox(true);
    getData({ userId, details: true, startDate: currentDate.clone().startOf("week").toDate().toISOString(), endDate: currentDate.clone().endOf("week").toDate().toISOString() }, "patient-diet/food-schedule")
      .then((response) => {
        if (response.status === 200) {
          setMenuData(response.data);
          setIsLoaded(true);
          setLoaderBox(false);
        }
      })
      .catch((error) => {
        setIsLoaded(false);
      });
  }, [userId, currentDate, setLoaderBox]);
  const ChangeDate = (value = 1) => {
    console.log(currentDate);
    const date = currentDate.clone();
    setCurrentDate(date.add(value, "weeks"));
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

  return menuData?.user?.diet ? (
    
    <ColumnContainer>
      <RowContainer className="menu-schedule">
        <TabContainer>
          <ArrowButton
            onClick={() => {
              ChangeDate(-1);
            }}
          >
            <GetIcon icon={"previous"} />
          </ArrowButton>
          <TabContainer>
            {menuData.result?.map((day, index) => {
              const date = moment(day._id);
              const dateName = getRelativeDay(date);
              return (
                <TabButton
                  key={day}
                  active={selectedDayNumber === index}
                  onClick={() => {
                    setSelectedDayNumber(index);
                  }}
                >
                  <DayHead>
                    {dateName === "Unknown" ? <div className="dayName">{`${date.format("ddd")}`}</div> : <div className="dayName">{dateName}</div>}
                    <div className="day">{`${date.format("D MMM")}`}</div>
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
        {menuData &&
          menuData.result?.map((day, index) => {
            return (
              <Box active={selectedDayNumber === index} key={day._id}>
                <DayData>
                  {day.menu.map((menuItem) => (
                    <Box active={selectedDayNumber === index} key={menuItem.id}>
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
                                <RecepeContent>
                                  <RecepeImage src={recipeItem.recipe.photo ? process.env.REACT_APP_CDN + recipeItem.recipe.photo : food}></RecepeImage>
                                  <RecepeData>
                                    <span className="title">{recipeItem.recipe.title}</span>
                                    <span className="light">
                                      <span>{recipeItem.recipe.typeOfRecipe}</span>
                                      <span>{recipeItem.nutritionInfo.calorieSplit}</span>
                                      <span>{recipeItem.gram?.toFixed(2)}g</span>
                                      <span>{recipeItem.calories?.toFixed(2)}KCal</span>
                                      <span>{recipeItem.nutritionInfo.Protein?.toFixed(2)}g</span>
                                      <span>{recipeItem.nutritionInfo.TotalFat?.toFixed(2)}g</span>
                                    </span>
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
            );
          })}
      </RowContainer>

      <RowContainer className="user-details">
        <ActionBox>
          <SwitchButton enableBg={"#cccccc;"} enableColor={"black"} active={expandAll} onClick={() => setExpandAll((prev) => !prev)}>
            <span>{expandAll ? "Collapse All" : "Expand All"}</span> <GetIcon icon={"open-book"} />
          </SwitchButton>
          <SwitchButton enableBg={"white"} enableColor={"black"} active={pause} onClick={() => setPause((prev) => !prev)}>
            <span>{pause ? "Restart Diet" : "Pause Diet"}</span> <GetIcon icon={pause ? "play" : "pause"} />
          </SwitchButton>
        </ActionBox>
        {menuData && menuData.user && (
          <>
            <Details
              className="head"
              onClick={() =>
                setSelectedMealTime((prev) => ({
                  ...prev,
                  [`patient-diet`]: !prev[`patient-diet`] ?? true,
                }))
              }
            >
              <div>Patient Details</div>
              <GetIcon icon={"down"}></GetIcon>
            </Details>
            {(selectedMealTime[`patient-diet`] === true || expandAll) && (
              <UserDetails>
                <Details>
                  <div>Name</div>
                  <div>{menuData.user.profile.user.username}</div>
                </Details>
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
              </UserDetails>
            )}

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
            {(selectedMealTime[`active-deit`] === true || expandAll) && (
              <UserDetails>
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
              </UserDetails>
            )}
            <Details
              className="head"
              onClick={() =>
                setSelectedMealTime((prev) => ({
                  ...prev,
                  [`remarks`]: !prev[`remarks`] ?? true,
                }))
              }
            >
              <div>Remarks</div>
              <GetIcon icon={"down"}></GetIcon>
            </Details>
            {(selectedMealTime[`remarks`] === true || expandAll) && (
              <UserDetails>
                <Details>
                  <div>{menuData.user.diet?.remarks.length > 0 ? menuData.user.diet?.remarks : "No remarks found!"}</div>
                </Details>
              </UserDetails>
            )}
          </>
        )}
      </RowContainer>
    </ColumnContainer>
  ) : (
    <NoData>{isLoaded ? "No Diet Schedule Found" : "Loading"}</NoData>
  );
};

export default DietMenu;
