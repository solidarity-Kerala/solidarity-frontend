import React, { useCallback, useEffect, useState } from "react";
import { GetIcon } from "../../../../../../icons";
import { deleteData, getData, postData } from "../../../../../../backend/api";
import { NoData, ProfileImage } from "../../../../../elements/list/styles";
import { ColumnContainer, RowContainer } from "../../../../../styles/containers/styles";
import Search from "../../../../../elements/search";
import { TabContainer, TabButton, Table, TableHeader, TableBody, TableRow, MealCategoryCell, Div, TableCell, TabData, TabDataItem, MealItem, Title, Variants, Variant, ReplacableItems, DayHead, Details } from "./styles"; // Import styles from styles.js
import DraggableItem from "./dragdrop/drag";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import DropTarget from "./dragdrop/drop";
import { CloseButton } from "../../../../../elements/list/popup/styles";
import { Header } from "../../../../../elements/list/manage/styles";
import { useRef } from "react";
import FormInput from "../../../../../elements/input";
import { food } from "../../../../../../images";
const DietMenu = ({ openData, themeColors, setMessage }) => {
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const [menuId] = useState(openData.data._id);
  const [userId] = useState(openData.data._id);
  const [data] = useState(openData.data);
  const [menuData, setMenuData] = useState(null);
  const [showAllReplacable, setShowAllReplacable] = useState(false);
  const [selectedDayNumber, setSelectedDayNumber] = useState(0);
  const [recipes, setRecipes] = useState([]);
  const [calories, setCalories] = useState({});
  const [activeTab, setActiveTab] = useState("recipes");
  const [searchValue, setSearchValue] = useState("");
  const searchTimeoutRef = useRef();
  const searchChange = (event) => {
    clearTimeout(searchTimeoutRef.current);
    setSearchValue(event.target.value);
    searchTimeoutRef.current = setTimeout(() => {
      handleTabClick(activeTab, event.target.value);
    }, 300);
  };
  const [coloriePerDay, setColoriePerDay] = useState("900");
  const getCalories = useCallback(
    (recipe, mealTimeCategory, availableCalories) => {
      availableCalories = availableCalories ?? menuData.mealTimeCategories.find((item) => mealTimeCategory === item._id)?.availableCalories;
      const { meal, bread, fruit, dessert, soup } = availableCalories[coloriePerDay];
      let { calories, typeOfRecipe, mixedMeatPercentage, mixedBreadPercentage, numberOfPortion } = recipe;
      mixedMeatPercentage = mixedMeatPercentage ?? 100;
      mixedBreadPercentage = mixedBreadPercentage ?? 100;
      const portion = (calories ?? 0) / (numberOfPortion ?? 1);
      if (recipe.title === "Fish Sayadeih") {
        // console.log(recipe);
      }
      let total = 0;
      if (typeOfRecipe === "Meat") {
        total = portion * (meal || 0);
      } else if (typeOfRecipe === "Bread") {
        total = portion * (bread || 0);
      } else if (typeOfRecipe === "Fruit") {
        total = portion * (fruit || 0);
      } else if (typeOfRecipe === "Soup") {
        total = portion * (soup || 0);
      } else if (typeOfRecipe === "Dessert") {
        total = portion * (dessert || 0);
      } else if (typeOfRecipe === "Mixed") {
        const mealCal = (portion * meal * mixedMeatPercentage) / 100;
        const breadCal = (portion * bread * mixedBreadPercentage) / 100;
        total = mealCal + breadCal;
      } else {
      }
      return total;
    },
    [coloriePerDay, menuData?.mealTimeCategories]
  );

  useEffect(() => {
    if (menuData?.foodMenu) {
      const reducedResult = menuData.foodMenu.reduce((accumulator, item) => {
        const { dayNumber, recipes, meals, mealTimeCategory } = item;
        const availableCalories = menuData.mealTimeCategories.find((item) => mealTimeCategory === item._id)?.availableCalories;
        const key = "day_" + dayNumber;
        if (item.optionNo > 1) {
          return accumulator;
        }
        if (!accumulator[key]) {
          accumulator[key] = 0;
        }

        const recipeCalories = recipes.reduce((totalCalories, recipe) => {
          return totalCalories + getCalories(recipe, mealTimeCategory, availableCalories);
        }, 0);

        accumulator[key] += isNaN(recipeCalories) ? 0 : recipeCalories;

        const mealCalories = meals.reduce((totalCalories, meal) => {
          const mealRecipeCalories = meal.mealItems.reduce((total, mealItem) => {
            return total + getCalories(mealItem.recipe, mealTimeCategory, availableCalories);
          }, 0);
          return totalCalories + mealRecipeCalories;
        }, 0);

        accumulator[key] += isNaN(mealCalories) ? 0 : mealCalories;

        return accumulator;
      }, {});
      setCalories(reducedResult);
    }
  }, [menuData, getCalories]);

  const handleTabClick = useCallback((tab, searchKey = "") => {
    setActiveTab(tab);
    getData({ searchKey }, tab === "meals" ? "meal/search" : "recipe/search").then((result) => {
      setRecipes(result.data.response);
    });
  }, []);

  useEffect(() => {
    handleTabClick("recipes");
    // console.log(openData.data);
  }, [handleTabClick]);

  const [showReplacable, setShowReplcable] = useState(0);
  const openReplacableItems = (foodMenuItem, mealOrRecepe) => {
    setShowReplcable(foodMenuItem);
  };
  const deleteItem = async (id, index, mealOrRecepe, mealTimeCategory, dayNumber, optionNo) => {
    setMessage({
      type: 2,
      content: "Are you sure you want to delete?",
      proceed: "Delete",
      onProceed: async () => {
        try {
          // Call the deleteData function to delete the item with the given id from the server (Assuming this is an asynchronous function)
          await deleteData({ id }, "food-menu-item");

          // Create a copy of menuData.foodMenu to work with
          const menuDataTemp = { ...menuData };

          // Find the items object based on the provided parameters (mealTimeCategory, dayNumber, optionNo)
          const items = menuDataTemp.foodMenu.find((cat) => cat.mealTimeCategory === mealTimeCategory && cat.dayNumber === dayNumber && cat.optionNo === optionNo);

          // Check the value of mealOrRecepe to decide whether to delete from recipes or meals
          if (mealOrRecepe === "recipe") {
            // Delete the recipeVariant at the specified index
            items.recipes.splice(index, 1);
          } else {
            // Delete the meal at the specified index
            items.meals.splice(index, 1);
          }

          // If both recipes and meals are empty, remove the entire items object from menuDataTemp.foodMenu
          if (items.recipes.length === 0 && items.meals.length === 0) {
            const itemIndex = menuDataTemp.foodMenu.findIndex((cat) => cat.mealTimeCategory === mealTimeCategory && cat.dayNumber === dayNumber && cat.optionNo === optionNo);
            if (itemIndex !== -1) {
              menuDataTemp.foodMenu.splice(itemIndex, 1);
            }
          }

          // Update the state with the modified menuDataTemp
          setMenuData(menuDataTemp);
        } catch (error) {
          // Handle any errors that occur during the deletion process
          console.log(error);
        }
      },
      data: { id },
    });
  };
  const deleteReplcableItem = async (id, replacableIndex, index, mealOrRecepe, mealTimeCategory, dayNumber, optionNo) => {
    setMessage({
      type: 2,
      content: "Are you sure you want to delete?",
      proceed: "Delete",
      onProceed: async () => {
        try {
          // Call the deleteData function to delete the item with the given id from the server (Assuming this is an asynchronous function)
          const response = await deleteData({ id }, "food-menu-item/replacable-item");
          if (response.data?.success === true) {
            const menuDataTemp = { ...menuData };
            // Find the items object based on the provided parameters (mealTimeCategory, dayNumber, optionNo)
            const items = menuDataTemp.foodMenu.find((cat) => cat.mealTimeCategory === mealTimeCategory && cat.dayNumber === dayNumber && cat.optionNo === optionNo);

            // Check the value of mealOrRecepe to decide whether to delete from recipes or meals
            if (mealOrRecepe === "recipe") {
              // Delete the recipeVariant at the specified index
              items.recipes[index].foodmenureplacableitems.splice(replacableIndex, 1);
            } else {
              // Delete the meal at the specified index
              // items.meals.splice(index, 1);
            }
            // Update the state with the modified menuDataTemp
            setMenuData(menuDataTemp);
          }

          // Find the items object based on the provided parameters (mealTimeCategory, dayNumber, optionNo)
        } catch (error) {
          // Handle any errors that occur during the deletion process
          console.log(error);
        }
      },
      data: { id },
    });
  };
  const onDrop = async (item, data) => {
    const menuDataTemp = { ...menuData };
    const foodMenuItem = data.foodMenuItem;

    if (data.recipeIndex >= 0) {
      // const replacableItemsTemp = { ...replacableItems };
      if (data.mealOrRecepe === "recipe" && activeTab === "recipes") {
        const response = await postData(
          {
            ...data,
            mealOrRecepe: item.mealOrRecepe,
            foodMenuItem,
            recipe: item._id,
            optionNo: data.optionNo,
          },
          "food-menu-item/replacable-item"
        );
        if (response?.data?.success === true) {
          const items = menuDataTemp.foodMenu.find((cat) => data.mealTimeCategory === cat.mealTimeCategory && data.dayNumber === cat.dayNumber && data.optionNo === cat.optionNo);
          if (items.recipes[data.recipeIndex]?.foodmenureplacableitems) {
            items.recipes[data.recipeIndex].foodmenureplacableitems.push(response.data.foodMenuReplacableItem);
          } else {
            items.recipes[data.recipeIndex].foodmenureplacableitems = [response.data.foodMenuReplacableItem];
          }
        }
        setMenuData(menuDataTemp);
      } else if (data.mealOrRecepe === "meal" && activeTab === "meals") {
        // const response = await postData({ ...data, mealOrRecepe: item.mealOrRecepe, foodMenuItem, meal: item._id }, "food-menu-item/replacable-item");
        // if (response?.data?.success === true) {
        //   const replacableItems = replacableItemsTemp[`replacable-${item.mealOrRecepe}-${foodMenuItem}`];
        //   if (replacableItems) {
        //     replacableItems.push({
        //       ...item,
        //       ...data,
        //       foodMenuReplacableItem: response.data.foodMenuReplacableItem._id,
        //     });
        //   } else {
        //     replacableItemsTemp[`replacable-${item.mealOrRecepe}-${foodMenuItem}`] = [
        //       {
        //         ...item,
        //         ...data,
        //         foodMenuReplacableItem: response.data.foodMenuReplacableItem._id,
        //       },
        //     ];
        //   }
        // }
      }
      // setReplacableItems(replacableItemsTemp);
    } else {
      const items = menuDataTemp.foodMenu.find((cat) => data.mealTimeCategory === cat.mealTimeCategory && data.dayNumber === cat.dayNumber && data.optionNo === cat.optionNo);
      if (item.mealOrRecepe === "recipe") {
        const response = await postData(
          {
            ...data,
            mealOrRecepe: item.mealOrRecepe,
            foodMenu: menuId,
            recipe: item._id,
            optionNo: data.optionNo,
          },
          "food-menu-item"
        );
        if (response?.data?.success === true) {
          if (items) {
            items.recipes.push({
              ...item,
              ...data,
              foodMenuItem: response.data.foodMenuItem._id,
            });
          } else {
            menuDataTemp.foodMenu.push({
              ...data,
              meals: [],
              recipes: [
                {
                  ...item,
                  ...data,
                  foodMenuItem: response.data.foodMenuItem._id,
                },
              ],
            });
          }
        }
      } else {
        const response = await postData(
          {
            ...data,
            mealOrRecepe: item.mealOrRecepe,
            foodMenu: menuId,
            meal: item._id,
            optionNo: data.optionNo,
          },
          "food-menu-item"
        );
        if (response?.data?.success === true) {
          if (items) {
            items.meals.push({
              ...item,
              ...data,
              foodMenuItem: response.data.foodMenuItem._id,
            });
          } else {
            menuDataTemp.foodMenu.push({
              ...data,
              recipes: [],
              meals: [
                {
                  ...item,
                  ...data,
                  foodMenuItem: response.data.foodMenuItem._id,
                },
              ],
            });
          }
        }
      }
      setMenuData(menuDataTemp);
    }
  };
  const setCaloriesItems = (mealTimeCategories) => {
    const { bread, meal, fruit, dessert } = mealTimeCategories.availableCalories[coloriePerDay];
    return `${meal && meal > 0 ? meal + "M" : ""}${bread && bread > 0 ? bread + "B" : ""}${fruit > 0 ? fruit + "F" : ""}${dessert > 0 ? dessert + "D" : ""}`;
  };

  useEffect(() => {
    getData({ menuId: openData.data._id }, "food-menu/get-a-menu").then((response) => {
      if (response.status === 200) {
        setMenuData(response.data);
      }
    });
  }, [openData.data._id]);
  const [item] = useState({
    type: "select",
    placeholder: "Calories",
    name: "calories",
    validation: "",
    default: "",
    tag: false,
    label: "Calories",
    required: true,
    view: true,
    add: true,
    update: true,
    selectApi: "900,1000,1100,1200,1300,1400,1500,1600,1700,1800,1900,2000",
    apiType: "CSV",
  });
  return menuData ? (
    <ColumnContainer style={{ marginBottom: "30px", position: "relative", height: "90%" }}>
      <DndProvider backend={HTML5Backend}>
        <RowContainer className={`menu ${openData.item.viewOnly}`}>
          <RowContainer className="menu-header">
            <TabContainer>
              <TabButton active={showAllReplacable === true} onClick={() => setShowAllReplacable(false)}>
                Week View
              </TabButton>
              <TabButton active={showAllReplacable === false} onClick={() => setShowAllReplacable(true)}>
                Day View
              </TabButton>
            </TabContainer>
          </RowContainer>
          <Table>
            <thead>
              <tr>
                <MealCategoryCell className="nb">
                  <DayHead>
                    <span>Set Calories</span>
                    <FormInput
                      customClass={"filter auto"}
                      placeholder={`Available Colories`}
                      value={coloriePerDay}
                      key={`input` + 0}
                      id={`available_colories`}
                      {...item}
                      onChange={(event) => {
                        if (!isNaN(event.value) && event.value?.toString().length > 0) {
                          setColoriePerDay(event.value);
                        }
                      }}
                    />
                  </DayHead>
                </MealCategoryCell>

                {!showAllReplacable ? (
                  daysOfWeek.map((day, index) => (
                    <TableHeader key={index}>
                      <DayHead>
                        <span className="day">{day}</span>
                        <span className="calories">{(parseFloat(calories["day_" + index] ?? 0) ?? 0)?.toFixed(2)} calories</span>
                      </DayHead>
                    </TableHeader>
                  ))
                ) : (
                  <TabContainer>
                    {daysOfWeek.map((day, index) => (
                      <TabButton
                        key={index}
                        active={selectedDayNumber === index}
                        onClick={() => {
                          setSelectedDayNumber(index);
                        }}
                      >
                        <DayHead>
                          <span className="day">{day}</span>
                          <span className="calories">{(parseFloat(calories["day_" + index] ?? 0) ?? 0)?.toFixed(2)} calories</span>
                        </DayHead>{" "}
                      </TabButton>
                    ))}
                  </TabContainer>
                )}
              </tr>
            </thead>
            <TableBody>
              {menuData.mealTimeCategories.map((mealTimeCategory) => (
                <TableRow key={mealTimeCategory._id}>
                  <MealCategoryCell>
                    {mealTimeCategory.mealtimeCategoriesName}
                    {<div>{setCaloriesItems(mealTimeCategory)}</div>}
                  </MealCategoryCell>
                  {daysOfWeek.map((day, dayNumber) => {
                    if (showAllReplacable) {
                      if (dayNumber !== selectedDayNumber) {
                        return null;
                      }
                    }
                    const options = menuData.foodMenu.filter((item) => item.mealTimeCategory === mealTimeCategory._id && item.dayNumber === dayNumber && (item.meals.length > 0 || item.recipes.length > 0));
                    return (
                      <TableCell className={dayNumber === 0 ? "first" : ""} key={dayNumber}>
                        {options.map((items, optionsIndex) => {
                          return (
                            <Div key={`drop-${optionsIndex + mealTimeCategory._id + dayNumber + items.optionNo}`}>
                              <>
                                <Variants className="vertical">
                                  {items?.recipes?.length > 0
                                    ? items.recipes.map((item, recipeIndex) => {
                                        // Render your items inside the FoodButton here
                                        // For example, you can render a list of items like this
                                        return (
                                          <Variant key={item._id} className={`vertical replace ${data.menuType} ${(openData.item.viewOnly ?? false) === true ? "Fixed" : ""}`}>
                                            <Variant key={item._id} className="vertical">
                                              <ProfileImage>
                                                <img src={item.photo ? process.env.REACT_APP_CDN + item.photo : food} alt="icon"></img>
                                              </ProfileImage>
                                              <span className="recipe">{item.title} </span>
                                              <span>{getCalories(item ?? [], mealTimeCategory._id).toFixed(2)} calories</span>
                                            </Variant>
                                            {!(openData.item.viewOnly ?? false) && (
                                              <span
                                                className="delete"
                                                onClick={() => {
                                                  deleteItem(item.foodMenuItem, recipeIndex, "recipe", mealTimeCategory._id, dayNumber, items.optionNo);
                                                }}
                                              >
                                                <GetIcon icon={"close"} />
                                              </span>
                                            )}
                                            {data.menuType === "Dynamic" && !showAllReplacable && (
                                              <span
                                                title="Replacable Items"
                                                className={`replace ${showReplacable === item.foodMenuItem && "selected"}`}
                                                onClick={() => {
                                                  openReplacableItems(item.foodMenuItem, "recipe");
                                                }}
                                              >
                                                <GetIcon icon={"replace"} />
                                              </span>
                                            )}
                                            {(showReplacable === item.foodMenuItem || showAllReplacable === true) && data.menuType === "Dynamic" && (
                                              <DropTarget
                                                onDrop={onDrop}
                                                className={showAllReplacable.toString()}
                                                data={{
                                                  recipeIndex,
                                                  mealTimeCategory: mealTimeCategory._id,
                                                  dayNumber,
                                                  optionNo: items.optionNo,
                                                  foodMenuItem: item.foodMenuItem,
                                                  mealOrRecepe: "recipe",
                                                  optionsIndex,
                                                }}
                                                element={
                                                  <ReplacableItems className={showAllReplacable.toString()}>
                                                    {!showAllReplacable && (
                                                      <Header className="small">
                                                        <span>{`Replacable Recipes`}</span>
                                                        <CloseButton theme={themeColors} onClick={() => setShowReplcable(false)}>
                                                          <GetIcon icon={"Close"} />
                                                        </CloseButton>
                                                      </Header>
                                                    )}
                                                    <Variants className="vertical">
                                                      {item.foodmenureplacableitems?.length > 0 &&
                                                        item.foodmenureplacableitems.map((replacableItem, replacableIndex) => (
                                                          <Variant key={replacableItem._id} className="horizontal">
                                                            <ProfileImage>
                                                              <img src={replacableItem.recipe.photo ? process.env.REACT_APP_CDN + replacableItem.recipe.photo : food} alt="icon"></img>
                                                            </ProfileImage>
                                                            <Details>
                                                              <span className="recipe">{replacableItem.recipe.title}</span>
                                                              <span>{replacableItem.recipe.calories} calories</span>
                                                            </Details>
                                                            {!(openData.item.viewOnly ?? false) && (
                                                              <span
                                                                className="delete"
                                                                title="Remove Item"
                                                                onClick={() => {
                                                                  // deleteReplcableItem(replacableItem._id, index);
                                                                  deleteReplcableItem(replacableItem._id, replacableIndex, recipeIndex, "recipe", mealTimeCategory._id, dayNumber, items.optionNo);
                                                                }}
                                                              >
                                                                <GetIcon icon={"close"} />
                                                              </span>
                                                            )}
                                                          </Variant>
                                                        ))}
                                                      <Variant className="vertical add-button">
                                                        <GetIcon icon={"add"}></GetIcon>
                                                      </Variant>
                                                    </Variants>
                                                  </ReplacableItems>
                                                }
                                              />
                                            )}
                                          </Variant>
                                        );
                                      })
                                    : ""}
                                </Variants>
                                {/* <DropTarget onDrop={showReplacable ? () => {} : onDrop} data={{ mealTimeCategory: mealTimeCategory._id, dayNumber, optionNo: items.optionNo }} element={<div>Dag Here</div>}></DropTarget> */}
                              </>
                            </Div>
                          );
                        })}
                        {(!openData.item.viewOnly ?? false) && (
                          <Div>
                            <DropTarget
                              onDrop={showReplacable ? () => {} : onDrop}
                              data={{
                                mealTimeCategory: mealTimeCategory._id,
                                dayNumber,
                                optionNo: options.length + 1,
                              }}
                              element={
                                <Variants className="vertical add-button">
                                  <GetIcon icon={"add"}></GetIcon>
                                </Variants>
                              }
                            />
                          </Div>
                        )}
                      </TableCell>
                    );
                  })}
                  <MealCategoryCell></MealCategoryCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </RowContainer>
        {(!openData.item.viewOnly ?? false) && (
          <RowContainer className="mealSelection">
            <TabContainer>
              <TabButton active={activeTab === "recipes"} onClick={() => handleTabClick("recipes", searchValue)}>
                Recipes
              </TabButton>
            </TabContainer>
            <TabData>
              <Search title={"Search"} theme={themeColors} className={"sticky"} placeholder="Search" value={searchValue} onChange={searchChange} />
              {activeTab === "recipes" && recipes && (
                <TabDataItem>
                  {recipes.map((recipe) => (
                    <DraggableItem
                      key={recipe._id}
                      item={{
                        ...recipe,
                        mealOrRecepe: "recipe",
                        recipe: { title: recipe.title },
                      }}
                      element={
                        <MealItem key={recipe._id}>
                          <ProfileImage>
                            <img src={recipe.photo ? process.env.REACT_APP_CDN + recipe.photo : food} alt="icon" />
                          </ProfileImage>
                          <Title>
                            {recipe.title ?? "Title not found!"}
                            <Title>
                              <span>BHD</span>
                              <span className="price">{recipe.price}</span>
                              <span className="offer">{recipe.offerPrice}</span>
                              <span className="calories">{`${recipe.calories.toFixed(2)} calories`}</span>
                              <span className="calories">{`${recipe.typeOfRecipe}`}</span>
                              {recipe.typeOfRecipe === "Mixed" && <span className="calories">Meat {(recipe.mixedMeatPercentage ?? 0) + "%, Bread " + (recipe.mixedBreadPercentage ?? 0) + "%"}</span>}
                            </Title>
                          </Title>
                        </MealItem>
                      }
                    />
                  ))}
                </TabDataItem>
              )}
            </TabData>
          </RowContainer>
        )}
      </DndProvider>
    </ColumnContainer>
  ) : (
    <NoData>Loading</NoData>
  );
};

export default DietMenu;
