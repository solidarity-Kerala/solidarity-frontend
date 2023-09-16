import React, { useEffect, useState } from "react";
import { getData } from "../../../../../../backend/api";
import { NoData } from "../../../../../elements/list/styles";
import { ColumnContainer, RowContainer } from "../../../../../styles/containers/styles";
import { TabContainer, TabButton, DayHead, Box, DayData, MealTimeHead, Recepe, RecepeImage, RecepeData, Recepes, RecepeContent, ReplacableItems, ReplacableItemsList, UserDetails, Details } from "./styles"; // Import styles from styles.js

import moment from "moment";
import { food } from "../../../../../../images";
import { calculateAge } from "../../../../../elements/list/functions";
const DietMenu = ({ openData, themeColors, setMessage }) => {
  const [userId] = useState(openData.data._id);
  const [menuData, setMenuData] = useState(0);
  const [selectedDayNumber, setSelectedDayNumber] = useState(0);
  useEffect(() => {
    getData({ userId, details: true }, "patient-diet/food-schedule").then((response) => {
      if (response.status === 200) {
        setMenuData(response.data);
      }
    });
  }, [userId]);
  const populateArray = (items, value) => {
    return items?.map((item, index) => <span key={index}>{item[value]}</span>);
  };
  console.log(menuData);
  return menuData ? (
    <ColumnContainer>
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
                      <MealTimeHead>{menuItem.mealTimeCategory.mealtimeCategoriesName}</MealTimeHead>
                      <Recepes>
                        {menuItem.recipes.map((recipeItem) => (
                          <>
                            <Recepe className="recipe">
                              <RecepeContent>
                                <RecepeImage src={recipeItem.recipe.photo ? process.env.REACT_APP_CDN + recipeItem.recipe.photo : food}></RecepeImage>
                                <RecepeData>
                                  <span className="title">{recipeItem.recipe.title}</span>
                                  <span className="light">
                                    <span>{recipeItem.calories.toFixed(2)} Cal</span>
                                    <span>{recipeItem.gram.toFixed(2)} g</span>
                                  </span>
                                </RecepeData>
                              </RecepeContent>
                              {recipeItem.replacableItems.length > 0 && (
                                <ReplacableItems className="horizontal" active={selectedDayNumber === index}>
                                  <div className="head">Available Options</div>
                                  <ReplacableItemsList>
                                    {recipeItem.replacableItems.map((replacableItem) => (
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
                                </ReplacableItems>
                              )}
                            </Recepe>
                          </>
                        ))}
                      </Recepes>
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
            <Details className="head">
              <div>Patient Details</div>
            </Details>
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
                <div>Gender</div>
                <div>{menuData.user.profile.gender}</div>
              </Details>
              <Details>
                <div>Age</div>
                <div>{calculateAge(menuData.user.profile.dateOfBirth)}</div>
              </Details>
              <Details>
                <div>Diet, Sub diet </div>
                <div>{`${menuData.user.diet.diet?.title}, ${menuData.user.diet.subDiet?.title}`}</div>
              </Details>
              <Details>
                <div>Foodlike list </div>
                <div>{populateArray(menuData.user.profile.foodLikeList, "foodLikeListName")}</div>
              </Details>
              <Details>
                <div>Dislike list </div>
                <div>{populateArray(menuData.user.profile.foodDisLikeList, "foodDislikeListName")}</div>
              </Details>
              <Details>
                <div>Medical condition </div>
                <div>{populateArray(menuData.user.profile.medicalCondition, "medicalConditionsName")}</div>
              </Details>
              <Details>
                <div>Addiction list</div>
                <div>{populateArray(menuData.user.profile.addictionList, "addictionListName")}</div>
              </Details>
            </UserDetails>
          </>
        )}
      </RowContainer>
    </ColumnContainer>
  ) : (
    <NoData>Loading</NoData>
  );
};

export default DietMenu;
