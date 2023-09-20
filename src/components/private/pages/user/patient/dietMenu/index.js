import React, { useEffect, useState } from "react";
import { getData } from "../../../../../../backend/api";
import { NoData } from "../../../../../elements/list/styles";
import {
  ColumnContainer,
  RowContainer,
} from "../../../../../styles/containers/styles";
import {
  TabContainer,
  TabButton,
  DayHead,
  Box,
  DayData,
  MealTimeHead,
  Recepe,
  RecepeImage,
  RecepeData,
  Recepes,
  RecepeContent,
  ReplacableItems,
  ReplacableItemsList,
  UserDetails,
  Details,
} from "./styles"; // Import styles from styles.js

import moment from "moment";
import { food } from "../../../../../../images";
import { calculateAge } from "../../../../../elements/list/functions";
import { GetIcon } from "../../../../../../icons";
import { dateFormat } from "../../../../../functions/date";
const DietMenu = ({ openData, themeColors, setMessage }) => {
  const [userId] = useState(openData.data._id);
  const [menuData, setMenuData] = useState(0);
  const [replacableItems, setReplacableItems] = useState({});
  const [selectedDayNumber, setSelectedDayNumber] = useState(0);
  const [selectedMealTime, setSelectedMealTime] = useState({});
  useEffect(() => {
    getData({ userId, details: true }, "patient-diet/food-schedule").then(
      (response) => {
        if (response.status === 200) {
          setMenuData(response.data);
        }
      }
    );
  }, [userId]);
  const getReplacableItems = (foodMenuItem) => {
    getData(
      { foodMenuItem, calories: menuData.user.diet.calories },
      "food-menu/replacable-items"
    ).then((response) => {
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
      return filteredDays?.map((item, index) => (
        <span key={index}>{item["value"]}</span>
      ));
    } else {
      return items?.map((item, index) => (
        <span key={index}>{item[value]}</span>
      ));
    }
  };
  function calculateExpiryDate(
    startDate,
    totalDays,
    excludedDays,
    skippedDays
  ) {
    console.log(startDate, totalDays, excludedDays, skippedDays);
    // Adjust total days considering skipped days and excluded days
    const eligibleDays = totalDays;

    let currentDate = moment(startDate);
    let eligibleCount = 0;

    // Iterate through each day and find the eligible expiry date
    while (eligibleCount < eligibleDays) {
      // Check if the current day is not an excluded day or a skipped day
      if (
        excludedDays.indexOf(currentDate.day()) === -1 &&
        skippedDays.indexOf(currentDate.day()) === -1
      ) {
        eligibleCount++;
      }

      // Move to the next day
      currentDate.add(1, "day");
    }

    // currentDate now holds the eligible expiry date
    return dateFormat(currentDate.toDate());
  }

  return menuData ? (
    <ColumnContainer style={{ marginBottom: "2em" }}>
      <RowContainer className="menu-schedule">
        <TabContainer>
          {menuData.result?.map((day, index) => {
            const date = moment(day._id);
            return (
              <TabButton
                key={day}
                active={selectedDayNumber === index}
                onClick={() => {
                  setSelectedDayNumber(index);
                }}
              >
                <DayHead>
                  <div className="dayName">{`${date.format("ddd")}`}</div>
                  <div className="day">{`${date.format("D MMM")}`}</div>
                </DayHead>
              </TabButton>
            );
          })}
        </TabContainer>
        {menuData &&
          menuData.result?.map((day, index) => {
            return (
              <Box active={selectedDayNumber === index} key={day._id}>
                <DayData>
                  {day.menu.map((menuItem) => (
                    <Box active={selectedDayNumber === index} key={menuItem.id}>
                      <MealTimeHead
                        active={
                          selectedMealTime[
                            `${menuItem.mealTimeCategory._id}-${day._id}`
                          ] ?? false
                        }
                        onClick={() =>
                          setSelectedMealTime((prev) => ({
                            ...prev,
                            [`${menuItem.mealTimeCategory._id}-${day._id}`]:
                              !prev[
                                `${menuItem.mealTimeCategory._id}-${day._id}`
                              ] ?? true,
                          }))
                        }
                      >
                        {menuItem.mealTimeCategory.mealtimeCategoriesName}{" "}
                        <GetIcon icon={"down"}></GetIcon>
                      </MealTimeHead>
                      {selectedMealTime[
                        `${menuItem.mealTimeCategory._id}-${day._id}`
                      ] === true && (
                        <Recepes>
                          {menuItem.recipes.map((recipeItem) => (
                            <>
                              <Recepe className="recipe">
                                <RecepeContent>
                                  <RecepeImage
                                    src={
                                      recipeItem.recipe.photo
                                        ? process.env.REACT_APP_CDN +
                                          recipeItem.recipe.photo
                                        : food
                                    }
                                  ></RecepeImage>
                                  <RecepeData>
                                    <span className="title">
                                      {recipeItem.recipe.title}
                                    </span>
                                    <span className="light">
                                      <span>
                                        {recipeItem.calories.toFixed(2)} Cal
                                      </span>
                                      <span>
                                        {recipeItem.gram.toFixed(2)} g
                                      </span>
                                    </span>
                                  </RecepeData>
                                </RecepeContent>
                                {recipeItem.foodmenuitem.replacableItems >
                                  0 && (
                                  <ReplacableItems
                                    className="horizontal"
                                    active={selectedDayNumber === index}
                                  >
                                    <button
                                      onClick={() =>
                                        getReplacableItems(
                                          recipeItem.foodmenuitem._id
                                        )
                                      }
                                    >
                                      <div>
                                        Replacable Options (
                                        {
                                          recipeItem.foodmenuitem
                                            .replacableItems
                                        }
                                        ){" "}
                                      </div>{" "}
                                      <GetIcon icon={"down"}></GetIcon>
                                    </button>
                                    {replacableItems[
                                      recipeItem.foodmenuitem._id
                                    ] && (
                                      <ReplacableItemsList>
                                        {replacableItems[
                                          recipeItem.foodmenuitem._id
                                        ]?.map((replacableItem) => (
                                          <Recepe className="horizontal">
                                            <RecepeContent>
                                              <RecepeImage
                                                src={
                                                  replacableItem.recipe.photo
                                                    ? process.env
                                                        .REACT_APP_CDN +
                                                      replacableItem.recipe
                                                        .photo
                                                    : food
                                                }
                                              ></RecepeImage>
                                              <RecepeData>
                                                <span className="title">
                                                  {replacableItem.recipe.title}
                                                </span>
                                                <span className="light">
                                                  <span>
                                                    {replacableItem.recipe.calories.toFixed(
                                                      2
                                                    )}{" "}
                                                    Cal
                                                  </span>
                                                  <span>
                                                    {replacableItem.recipe.gram.toFixed(
                                                      2
                                                    )}{" "}
                                                    g
                                                  </span>
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
            {selectedMealTime[`patient-diet`] === true && (
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
                  <div>
                    {populateArray(
                      menuData.user.profile.foodLikeList,
                      "foodLikeListName"
                    )}
                  </div>
                </Details>
                <Details>
                  <div>Dislike list </div>
                  <div>
                    {populateArray(
                      menuData.user.profile.foodDisLikeList,
                      "foodDislikeListName"
                    )}
                  </div>
                </Details>
                <Details>
                  <div>Medical condition </div>
                  <div>
                    {populateArray(
                      menuData.user.profile.medicalCondition,
                      "medicalConditionsName"
                    )}
                  </div>
                </Details>
                <Details>
                  <div>Addiction list</div>
                  <div>
                    {populateArray(
                      menuData.user.profile.addictionList,
                      "addictionListName"
                    )}
                  </div>
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
            {selectedMealTime[`active-deit`] === true && (
              <UserDetails>
                <Details>
                  <div>Diet, Sub diet </div>
                  <div>{`${menuData.user.diet.diet?.title}, ${menuData.user.diet.subDiet?.title}`}</div>
                </Details>
                <Details>
                  <div>Choosen Days</div>
                  <div>
                    {populateArray(menuData.user.diet.eligibleDays, "days")}
                  </div>
                </Details>
                <Details>
                  <div>Selected Meal Times</div>
                  <div>
                    {populateArray(
                      menuData.user.diet.mealTimeCategory,
                      "mealtimeCategoriesName"
                    )}
                  </div>
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
                  <div>
                    {calculateExpiryDate(
                      menuData.user.diet.startDate,
                      menuData.user.diet.numberofDays,
                      menuData.user.diet.eligibleDays,
                      []
                    )}
                  </div>
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
              <div>Remarks</div>
              <GetIcon icon={"down"}></GetIcon>
            </Details>
            {selectedMealTime[`active-deit`] === true && (
              <UserDetails>
                <Details>
                  <div>{menuData.user.diet?.remarks}</div>
                </Details>
              </UserDetails>
            )}
          </>
        )}
      </RowContainer>
    </ColumnContainer>
  ) : (
    <NoData>Loading</NoData>
  );
};

export default DietMenu;
