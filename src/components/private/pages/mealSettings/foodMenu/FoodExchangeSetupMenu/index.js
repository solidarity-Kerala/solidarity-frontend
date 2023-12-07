import React, { useCallback, useEffect, useState } from "react";
import { GetIcon } from "../../../../../../icons";
import { deleteData, getData, postData } from "../../../../../../backend/api";
import { FilterBox, NoData, ProfileImage } from "../../../../../elements/list/styles";
import { ColumnContainer, RowContainer } from "../../../../../styles/containers/styles";
import Search from "../../../../../elements/search";
import { TabContainer, TabButton, Table, TableHeader, TableBody, TableRow, Div, TableCell, TabData, TabDataItem, MealItem, Title, Variants, Variant, ReplacableItems, DayHead, Details, WeekSelection, ShowCalorie } from "./styles"; // Import styles from styles.js
import DraggableItem from "./dragdrop/drag";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import DropTarget from "./dragdrop/drop";
import { CloseButton } from "../../../../../elements/list/popup/styles";
import { Header } from "../../../../../elements/list/manage/styles";
import { useRef } from "react";
import FormInput from "../../../../../elements/input";
import { food } from "../../../../../../images";
import { MealTimeHead } from "../../../user/patient/dietMenu/styles";
import PopupView from "../../../../../elements/popupview";
import { getValue } from "../../../../../elements/list/functions";
import AutoForm from "../../../../../elements/form";
import { useDispatch } from "react-redux";
import { addSelectObject } from "../../../../../../store/actions/select";
const FoodExchangeSetupMenu = ({ openData, themeColors, setMessage, setLoaderBox }) => {
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const [menuId] = useState(openData.data._id);
  const [data] = useState(openData.data);
  const [menuData, setMenuData] = useState(null);
  const [selectedMealTime, setSelectedMealTime] = useState({});
  const [showAllReplacable, setShowAllReplacable] = useState(false);
  const [expandAll, setExpandAll] = useState(false);
  const [selectedDayNumber, setSelectedDayNumber] = useState(0);
  const [recipes, setRecipes] = useState([]);
  const [calories, setCalories] = useState({});
  const [popupData, setPopupData] = useState(null);
  const [activeTab] = useState("recipes");
  const [selctedRecipeType, setSelctedRecipeType] = useState({ typeOfRecipe: [], foodExchangeCategory: [], productionDepartment: [], proteinCategory: [] });
  const [weekNumber, setWeekNumber] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const searchTimeoutRef = useRef();
  const dispatch = useDispatch();
  const searchChange = (event) => {
    clearTimeout(searchTimeoutRef.current);
    setSearchValue(event.target.value);
    searchTimeoutRef.current = setTimeout(() => {
      handleTabClick(selctedRecipeType, event.target.value);
    }, 300);
  };
  const [coloriePerDay] = useState("900");
  const getCalories = useCallback((recipe, foodExchangeCategory, availableCalories, calorieOnly = true) => {
    // availableCalories = availableCalories ?? menuData.mealTimeCategories.find((item) => foodExchangeCategory === item._id)?.availableCalories;
    // const availableCalorie = availableCalories[coloriePerDay];
    let { numberOfPortion, recipeIngredients } = recipe;
    let nutritionInfoDetails = [];
    let nutritionInfo = {};
    if (numberOfPortion === 0) {
      numberOfPortion = 1;
    }
    ["Meat", "Bread", "Fruit", "Dessert", "Soup", "Salad","Fat","Snacking", "Other"].map((typeOfIngredient) => {
      let info = { typeOfIngredient, ingredients: 0 };
      let count = 1;
      count = count ? (count === 0 ? 1 : count) : 1;
      recipeIngredients.forEach((ingredient) => {
        if (ingredient.isCalculated) {
          if (typeOfIngredient === ingredient.data.typeOfIngredient) {
            ["calories", "gram", "protein", "saturatedFat", "totalFat", "cholesterol", "fiber", "carbohydrate", "sugars", "iron", "calcium", "potassium", "sodium", "vitaminA", "vitaminE", "vitaminC"].map((nutrition) => {
              const nutritionLower = nutrition.toLowerCase();
              info[nutrition] = (info[nutrition] ?? 0) + ((ingredient[nutritionLower] ?? 0) / (numberOfPortion ?? 1)) * count;
              nutritionInfo[nutrition] = (nutritionInfo[nutrition] ?? 0) + ((ingredient[nutritionLower] ?? 0) / (numberOfPortion ?? 1)) * count;
              return null;
            });
            nutritionInfo["ingredients"] += (nutritionInfo["ingredients"] ?? 0) + 1;
          }
        }
        return null;
      });
      nutritionInfo["ingredients"] = recipeIngredients.length;
      nutritionInfoDetails.push(info);
      return null;
    });

    return calorieOnly ? nutritionInfo.calories ?? 0 : nutritionInfo;
  }, []);
  useEffect(() => {
    if (menuData?.foodMenu) {
      const reducedResult = menuData.foodMenu.reduce((accumulator, item) => {
        const { dayNumber, recipes, foodExchangeCategory } = item;
        const availableCalories = menuData.foodExchangeCategories.find((item) => foodExchangeCategory === item._id);
        const key = "day_" + dayNumber;
        if (!accumulator[key]) {
          accumulator[key] = 0;
        }
        const recipeCalories = recipes.reduce((totalCalories, recipe) => {
          const recipeCalories = totalCalories + getCalories(recipe, foodExchangeCategory, availableCalories);
          if (recipe.title === "Fish Sayadeih") {
            console.log(recipe.title, "Cumulated", recipeCalories);
          }

          return recipeCalories;
        }, 0);

        accumulator[key] += isNaN(recipeCalories) ? 0 : recipeCalories;

        return accumulator;
      }, {});
      setCalories(reducedResult);
    }
  }, [menuData, getCalories]);

  const handleTabClick = useCallback(
    (typeOfRecipeTemp, searchKey = "") => {
      setLoaderBox(true);
      if (typeOfRecipeTemp) {
        console.log("typeOfRecipeTemp", typeOfRecipeTemp);
        setSelctedRecipeType(typeOfRecipeTemp);
        getData({ searchKey, ...typeOfRecipeTemp }, "recipe/search").then((result) => {
          setRecipes(result.data.response);
          setLoaderBox(false);
        });
      } else {
        getData({ searchKey, ...selctedRecipeType }, "recipe/search").then((result) => {
          setRecipes(result.data.response);
          setLoaderBox(false);
        });
      }
    },
    [selctedRecipeType, setLoaderBox]
  );

  useEffect(() => {
    handleTabClick();
    // console.log(openData.data);
  }, [handleTabClick]);

  const [showReplacable, setShowReplcable] = useState(0);
  const openReplacableItems = (foodMenuItem, mealOrRecepe) => {
    setShowReplcable(foodMenuItem);
  };
  const deleteItem = async (id, index, mealOrRecepe, foodExchangeCategory, dayNumber, optionNo) => {
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

          // Find the items object based on the provided parameters (foodExchangeCategory, dayNumber, optionNo)
          const items = menuDataTemp.foodMenu.find((cat) => cat.foodExchangeCategory === foodExchangeCategory && cat.dayNumber === dayNumber && cat.optionNo === optionNo);

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
            const itemIndex = menuDataTemp.foodMenu.findIndex((cat) => cat.foodExchangeCategory === foodExchangeCategory && cat.dayNumber === dayNumber && cat.optionNo === optionNo);
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
  const deleteReplcableItem = async (id, replacableIndex, index, mealOrRecepe, foodExchangeCategory, dayNumber, optionNo) => {
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
            // Find the items object based on the provided parameters (foodExchangeCategory, dayNumber, optionNo)
            const items = menuDataTemp.foodMenu.find((cat) => cat.foodExchangeCategory === foodExchangeCategory && cat.dayNumber === dayNumber && cat.optionNo === optionNo);

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

          // Find the items object based on the provided parameters (foodExchangeCategory, dayNumber, optionNo)
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
            weekNumber,
          },
          "food-menu-item/replacable-item"
        );
        if (response?.data?.success === true) {
          const items = menuDataTemp.foodMenu.find((cat) => data.foodExchangeCategory === cat.foodExchangeCategory && data.dayNumber === cat.dayNumber && data.optionNo === cat.optionNo);
          if (items.recipes[data.recipeIndex]?.foodmenureplacableitems) {
            items.recipes[data.recipeIndex].foodmenureplacableitems.push(response.data.foodMenuReplacableItem);
          } else {
            items.recipes[data.recipeIndex].foodmenureplacableitems = [response.data.foodMenuReplacableItem];
          }
        }
        setMenuData(menuDataTemp);
      } else if (data.mealOrRecepe === "meal" && activeTab === "meals") {
      }
      // setReplacableItems(replacableItemsTemp);
    } else {
      const items = menuDataTemp.foodMenu.find((cat) => data.foodExchangeCategory === cat.foodExchangeCategory && data.dayNumber === cat.dayNumber && data.optionNo === cat.optionNo);
      if (item.mealOrRecepe === "recipe") {
        const response = await postData(
          {
            ...data,
            mealOrRecepe: item.mealOrRecepe,
            foodMenu: menuId,
            recipe: item._id,
            optionNo: data.optionNo,
            weekNumber,
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
            weekNumber,
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
  const setCaloriesItems = (mealTimeCategories, single = false, recepeType = "") => {
    const bread = 1,
      meat = 1,
      fruit = 1,
      dessert = 1,
      soup = 1,
      salad = 1;
      fat=1;
      snacking=1;
    if (!single) {
      return `${meat && meat > 0 ? meat + "M" : ""}${bread && bread > 0 ? bread + "B" : ""}${fruit > 0 ? fruit + "F" : ""}${dessert > 0 ? dessert + "D" : ""}${salad > 0 ? salad + "SD" : ""}${fat > 0 ? fat + "FT" : ""}${snacking > 0 ? snacking + "SN" : ""}${soup > 0 ? soup + "SP" : ""}`;
    } else {
      let count = 0;
      if (recepeType === "Meat") {
        count = (meat || 0) + "M";
      } else if (recepeType === "Bread") {
        count = (bread || 0) + "B";
      } else if (recepeType === "Fruit") {
        count = (fruit || 0) + "F";
      } else if (recepeType === "Soup") {
        count = (soup || 0) + "SP";
      } else if (recepeType === "Dessert") {
        count = (dessert || 0) + "D";
      } else if (recepeType === "Salad") {
        count = (salad || 0) + "SD";
      }else if (recepeType === "Fat") {
        count = (fat || 0) + "FT";
      }else if (recepeType === "Snacking") {
        count = (snacking || 0) + "SN";
      } else if (recepeType === "Mixed") {
        count = meat + "M" + bread + "B";
      } else {
        count = "0";
      }
      return count;
    }
  };

  useEffect(() => {
    setLoaderBox(true);
    getData({ menuId: openData.data._id, weekNumber }, "food-menu/get-a-exchange-menu")
      .then((response) => {
        if (response.status === 200) {
          setMenuData(response.data);
          setLoaderBox(false);
        }
      })
      .catch(() => [setLoaderBox(false)]);
  }, [openData.data._id, weekNumber, setLoaderBox]);

  const [weeks] = useState({
    type: "select",
    placeholder: "Week",
    name: "week",
    validation: "",
    default: "",
    tag: false,
    label: "Week",
    search: false,
    required: true,
    view: true,
    add: true,
    update: true,
    selectApi: Array.from({ length: 52 }, (_, index) => ({
      id: index,
      value: `Week ${index + 1}`,
    })),
    apiType: "JSON",
  });
  const [typeOfRecipes] = useState([
    {
      type: "multiSelect",
      placeholder: "Type Of Recipe",
      name: "typeOfRecipe",
      validation: "",
      default: "",
      tag: true,
      label: "Type Of Recipe",
      required: true,
      search: false,
      view: true,
      add: true,
      update: true,
      filter: true,
      selectApi: [
        { id: "Bread", value: "Bread" },
        { id: "Meat", value: "Meat" },
        { id: "Fruit", value: "Fruit" },
        { id: "Dessert", value: "Dessert" },
        { id: "Salad", value: "Salad" },
        { id: "Soup", value: "Soup" },
        { id: "Fat", value: "Fat" },
        { id: "Snacking", value: "Snacking" },
        { id: "Mixed", value: "Mixed" },
      ],
      apiType: "JSON",
    },
    {
      type: "multiSelect",
      apiType: "API",
      selectApi: "mealtime-category/select",
      placeholder: "Mealtime Category",
      name: "foodExchangeCategory",
      validation: "",
      showItem: "mealtimeCategoriesName",
      default: "",
      tag: true,
      label: "Mealtime Category",
      required: false,
      view: true,
      add: true,
      update: true,
      filter: true,
    },
    {
      type: "multiSelect",
      placeholder: "Production Department",
      name: "productionDepartment",
      validation: "",
      default: "",
      tag: true,
      label: "Production Department",
      required: true,
      view: true,
      add: true,
      update: true,
      filter: true,
      selectApi: [
        { id: "Hot kitchen", value: "Hot kitchen" },
        { id: "Cold kitchen", value: "Cold kitchen" },
        { id: "Bakery", value: "Bakery" },
        { id: "Salad section", value: "Salad section" },
        { id: "Sandwich section", value: "Sandwich section" },
      ],
      apiType: "JSON",
    },
    {
      type: "multiSelect",
      apiType: "API",
      selectApi: "protein-categories/select",
      placeholder: "Ingredient Category",
      name: "proteinCategory",
      validation: "",
      showItem: "proteinCategoriesName",
      default: "",
      tag: true,
      label: "Ingredient Category",
      required: true,
      view: true,
      add: true,
      update: true,
      filter: true,
    },
  ]);
  //clone
  const [cloneParameters, setCloneParameters] = useState(null);
  const [isOpen, setIsOpen] = useState(null);
  const closeEdit = () => {
    setIsOpen(null);
    setLoaderBox(false);
  };

  const cloneData = async (option) => {
    setCloneParameters([
      {
        type: "multiSelect",
        placeholder: "Select Days of Week " + (weekNumber + 1),
        listView: true,
        name: "eligibleDays",
        validation: "",
        default: [0, 1, 2, 3, 4, 5, 6],
        label: "Select Days of Week " + (weekNumber + 1),
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
        placeholder: "Select Meal Times of Week " + (weekNumber + 1),
        name: "foodExchangeCategory",
        params: [{ name: "foodMenu", value: openData.data._id }],
        label: "Select Meal Times of Week " + (weekNumber + 1),
        required: true,
        view: true,
        default: "",
        add: true,
        update: true,
        apiType: "API",
        search: false,
        selectApi: `mealtime-category/select-by-menu/${openData.data._id}`,
      },
      {
        type: "select",
        placeholder: "Select Destinations Menu",
        name: "foodMenuId",
        validation: "",
        default: "",
        customClass: "list",
        tag: false,
        label: "Select Destinations Menu",
        search: true,
        required: true,
        view: true,
        add: true,
        update: true,
        apiType: "API",
        selectApi: `food-menu/get-menus/${openData.data._id}`,
      },
      {
        type: "multiSelect",
        placeholder: "Select Destinations Weeks",
        name: "weekNumbers",
        validation: "",
        default: "",
        customClass: "list",
        tag: false,
        label: "Select Destination Weeks",
        search: true,
        required: true,
        view: true,
        add: true,
        update: true,
        selectApi: Array.from({ length: 52 }, (_, index) => ({
          id: index,
          value: `Week ${index + 1}`,
        })), //.filter((item) => item.id !== parseInt(weekNumber))
        apiType: "JSON",
      },
    ]);
    setIsOpen({
      submit: "Clone Now",
      api: "food-menu/clone-menu",
      header: "Clone Setup",
      description: "Clone this week items to multiple weeks",
    });
  };
  const restoreData = async (option) => {
    dispatch(addSelectObject(null, `food-menu/clone-history/${openData.data._id}`));
    setCloneParameters([
      {
        type: "select",
        placeholder: "Select Clone",
        listView: true,
        name: "clonedMenuTrack",
        validation: "",
        params: [{ name: "foodMenu", value: openData.data._id }],
        tags: [
          {
            type: "text",
            item: "days",
            title: "Days",
            collection: "",
          },
          {
            type: "text",
            item: "foodExchangeCategory",
            title: "Meal Times",
            collection: "",
          },
          {
            type: "datetime",
            item: "clonedOn",
            title: "Cloned On",
            collection: "",
          },
          {
            type: "text",
            item: "weeks",
            title: "Weeks To",
            collection: "",
          },
        ],
        label: "Select Clone",
        required: true,
        view: true,
        customClass: "list",
        add: true,
        update: true,
        apiType: "API",
        search: false,
        selectApi: `food-menu/clone-history/${openData.data._id}`,
      },
    ]);
    setIsOpen({
      submit: "Undo Now",
      api: "food-menu/undo-clone",
      header: "Undo Clone",
      description: "",
    });
  };
  const updateHandler = async (post) => {
    setLoaderBox(true);
    await postData(
      {
        foodMenu: openData.data._id,
        weekNumber: parseInt(weekNumber),
        ...post,
      },
      isOpen.api
    ).then((response) => {
      closeEdit();
    });
  };
  function addSpaceBeforeCaps(str) {
    str = str.replace(/([a-z])([A-Z])/g, "$1 $2");
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return menuData ? (
    <ColumnContainer style={{ marginBottom: "30px", position: "relative", height: "90%" }}>
      <DndProvider backend={HTML5Backend}>
        <RowContainer className={`menu ${openData.item.viewOnly}`}>
          <RowContainer className="menu-header">
            <TabContainer>
              <TabButton className={showAllReplacable === true} onClick={() => setShowAllReplacable(false)}>
                Week View
              </TabButton>
              <TabButton className={showAllReplacable === false} onClick={() => setShowAllReplacable(true)}>
                Day View
              </TabButton>
            </TabContainer>
            <WeekSelection>
              <button className={expandAll ? "active" : ""} onClick={() => setExpandAll((prev) => !prev)}>
                <span>{expandAll ? "Collapse All" : "Expand All"}</span> <GetIcon icon={"open-book"} />
              </button>
              {!(openData.item.viewOnly ?? false) && (
                <>
                  <button onClick={() => cloneData()}>
                    <span>Clone</span> <GetIcon icon={"clone"} />
                  </button>
                  <button onClick={() => restoreData()}>
                    <span>Undo Clone</span> <GetIcon icon={"restoreIcon"} />
                  </button>
                </>
              )}
              <FormInput
                {...weeks}
                customClass={"filter auto single"}
                placeholder={`Week`}
                value={weekNumber}
                key={`input` + 2}
                id={`input` + 2}
                onChange={(event) => {
                  console.log(event.id);
                  if (!isNaN(event.id)) {
                    setWeekNumber(parseInt(event.id));
                  }
                }}
              />
            </WeekSelection>
          </RowContainer>
          <Table>
            <thead>
              <tr className="head">
                {/* <MealCategoryCell className="nb">
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
                </MealCategoryCell> */}
                {!showAllReplacable
                  ? daysOfWeek.map((day, index) => (
                      <TableHeader key={index}>
                        <DayHead>
                          <span className="day">{day}</span>
                          <span className="calories">{(parseFloat(calories["day_" + index] ?? 0) ?? 0)?.toFixed(2)} calories</span>
                        </DayHead>
                      </TableHeader>
                    ))
                  : daysOfWeek.map((day, index) => (
                      <TableHeader
                        key={index}
                        active={selectedDayNumber === index}
                        onClick={() => {
                          setSelectedDayNumber(index);
                        }}
                      >
                        <DayHead>
                          <span className="day">{day}</span>
                          <span className="calories">{(parseFloat(calories["day_" + index] ?? 0) ?? 0)?.toFixed(2)} calories</span>
                        </DayHead>
                      </TableHeader>
                    ))}
              </tr>
            </thead>
            <TableBody>
              {menuData.foodExchangeCategories.map((foodExchangeCategory) => (
                <>
                  <TableRow>
                    <TableCell colSpan={7}>
                      <MealTimeHead
                        active={(selectedMealTime[`${foodExchangeCategory._id}-${weekNumber}`] ?? false) || expandAll}
                        onClick={() =>
                          setSelectedMealTime((prev) => ({
                            ...prev,
                            [`${foodExchangeCategory._id}-${weekNumber}`]: !prev[`${foodExchangeCategory._id}-${weekNumber}`] ?? true,
                          }))
                        }
                      >
                        {`${foodExchangeCategory.foodExchangeCategoryName}`}
                        <GetIcon icon={"down"}></GetIcon>
                      </MealTimeHead>
                    </TableCell>
                  </TableRow>
                  {(selectedMealTime[`${foodExchangeCategory._id}-${weekNumber}`] === true || expandAll) && (
                    <TableRow key={foodExchangeCategory._id}>
                      {daysOfWeek.map((day, dayNumber) => {
                        if (showAllReplacable) {
                          if (dayNumber !== selectedDayNumber) {
                            return null;
                          }
                        }
                        const options = menuData.foodMenu.filter((item) => item.foodExchangeCategory === foodExchangeCategory._id && item.dayNumber === dayNumber && (item.meals.length > 0 || item.recipes.length > 0));
                        let mealtimeCalories = 0;
                        return (
                          <TableCell colSpan={showAllReplacable ? 7 : 0} className={dayNumber === 0 ? "first" : ""} key={dayNumber}>
                            <div className="layer">
                              {options.map((items, optionsIndex) => {
                                return (
                                  <Div key={`drop-${optionsIndex + foodExchangeCategory._id + dayNumber + items.optionNo}`}>
                                    <>
                                      <Variants className="vertical">
                                        {items?.recipes?.length > 0
                                          ? items.recipes.map((item, recipeIndex) => {
                                              let recipeCalories = getCalories(item ?? [], foodExchangeCategory._id);
                                              mealtimeCalories += recipeCalories;
                                              // Render your items inside the FoodButton here
                                              // For example, you can render a list of items like this
                                              return (
                                                <Variant key={item._id} className={`vertical replace ${data.menuType} ${(openData.item.viewOnly ?? false) === true ? "Fixed" : ""}`}>
                                                  <Variant key={item._id} className="vertical recipe">
                                                    <ProfileImage>
                                                      <img src={item.photo ? process.env.REACT_APP_CDN + item.photo : food} alt="icon"></img>
                                                    </ProfileImage>
                                                    <span className="recipe">{item.title} </span>
                                                    <span>{recipeCalories.toFixed(2)} calories</span>
                                                    <div className="actions">
                                                      <span
                                                        className="info"
                                                        onClick={() => {
                                                          setPopupData({
                                                            type: 1,
                                                            data: item,
                                                            foodExchangeCategory: foodExchangeCategory._id,
                                                            nutritionInfo: getCalories(item, "", foodExchangeCategory.availableCalories, false),
                                                            Serving: setCaloriesItems(foodExchangeCategory, true, item.typeOfRecipe),
                                                          });
                                                          console.log(popupData);
                                                        }}
                                                      >
                                                        <GetIcon icon={"info"} />
                                                      </span>
                                                      {!(openData.item.viewOnly ?? false) && (
                                                        <span
                                                          className="delete"
                                                          onClick={() => {
                                                            deleteItem(item.foodMenuItem, recipeIndex, "recipe", foodExchangeCategory._id, dayNumber, items.optionNo);
                                                          }}
                                                        >
                                                          <GetIcon icon={"delete"} />
                                                        </span>
                                                      )}
                                                    </div>
                                                  </Variant>

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
                                                        foodExchangeCategory: foodExchangeCategory._id,
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
                                                          <Variants className={showReplacable ? "vertical" : "day vertical "}>
                                                            {item.foodmenureplacableitems?.length > 0 &&
                                                              item.foodmenureplacableitems.map((replacableItem, replacableIndex) => (
                                                                <Variant key={replacableItem._id} className="horizontal child-recipe">
                                                                  <ProfileImage>
                                                                    <img src={replacableItem.recipe.photo ? process.env.REACT_APP_CDN + replacableItem.recipe.photo : food} alt="icon"></img>
                                                                  </ProfileImage>
                                                                  <Details>
                                                                    <span className="recipe">{replacableItem.recipe.title}</span>
                                                                    <span>{replacableItem.recipe.calories.toFixed(2)} calories</span>
                                                                  </Details>
                                                                  <div className="sub-actions">
                                                                    <span
                                                                      className="info"
                                                                      onClick={() => {
                                                                        setPopupData({
                                                                          type: 1,
                                                                          data: replacableItem.recipe,
                                                                          foodExchangeCategory: foodExchangeCategory._id,
                                                                          nutritionInfo: getCalories(replacableItem.recipe, "", foodExchangeCategory.availableCalories, false),
                                                                          Serving: setCaloriesItems(foodExchangeCategory, true, replacableItem.recipe.typeOfRecipe),
                                                                        });
                                                                      }}
                                                                    >
                                                                      <GetIcon icon={"info"} />
                                                                    </span>
                                                                    {!(openData.item.viewOnly ?? false) && (
                                                                      <span
                                                                        className="delete"
                                                                        title="Remove Item"
                                                                        onClick={() => {
                                                                          // deleteReplcableItem(replacableItem._id, index);
                                                                          deleteReplcableItem(replacableItem._id, replacableIndex, recipeIndex, "recipe", foodExchangeCategory._id, dayNumber, items.optionNo);
                                                                        }}
                                                                      >
                                                                        <GetIcon icon={"delete"} />
                                                                      </span>
                                                                    )}
                                                                  </div>
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
                                      {/* <DropTarget onDrop={showReplacable ? () => {} : onDrop} data={{ foodExchangeCategory: foodExchangeCategory._id, dayNumber, optionNo: items.optionNo }} element={<div>Dag Here</div>}></DropTarget> */}
                                    </>
                                  </Div>
                                );
                              })}
                              {(!openData.item.viewOnly ?? false) && (
                                <Div>
                                  <DropTarget
                                    onDrop={showReplacable ? () => {} : onDrop}
                                    data={{
                                      foodExchangeCategory: foodExchangeCategory._id,
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
                            </div>
                            <ShowCalorie>
                              <span className="calories">{mealtimeCalories.toFixed(2)} calories</span>
                            </ShowCalorie>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  )}
                </>
              ))}
            </TableBody>
          </Table>
        </RowContainer>
        {(!openData.item.viewOnly ?? false) && (
          <RowContainer className="mealSelection">
            <TabData>
              <FilterBox className="menu">
                <Search title={"Search"} theme={themeColors} className={"sticky"} placeholder="Search" value={searchValue} onChange={searchChange} />

                {typeOfRecipes.map((field, index) => (
                  <FormInput
                    customClass={"filter auto"}
                    placeholder={field.placeholder}
                    {...field}
                    value={selctedRecipeType[field.name] ?? []}
                    key={`input` + index}
                    id={`input` + index}
                    onChange={(event) => {
                      console.log("event.value", event.value);
                      let selctedRecipeTypeTemp = { ...selctedRecipeType };
                      const items = selctedRecipeType[field.name];
                      const index = items.findIndex((item) => item === event.id);

                      if (index === -1) {
                        // If event._id doesn't exist, push it to the items array
                        items.push(event.id);
                      } else {
                        // If event._id already exists, remove it from the items array
                        items.splice(index, 1);
                      }

                      selctedRecipeTypeTemp[field.name] = items;
                      handleTabClick(selctedRecipeTypeTemp, searchValue);
                    }}
                  />
                ))}
              </FilterBox>
              {recipes?.length > 0 ? (
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
                              <span className="calories">{`${(recipe.calories/recipe.numberOfPortion).toFixed(2)} calories`}</span>
                              <span className="calories">{`${recipe.typeOfRecipe}`}</span>
                              {recipe.typeOfRecipe === "Mixed" && <span className="calories">Meat {(recipe.mixedMeatPercentage ?? 0) + "%, Bread " + (recipe.mixedBreadPercentage ?? 0) + "%"}</span>}
                            </Title>
                          </Title>
                        </MealItem>
                      }
                    />
                  ))}
                </TabDataItem>
              ) : (
                <NoData>
                  <GetIcon icon={"recipe"}></GetIcon>No Recipes Found!
                </NoData>
              )}
            </TabData>
          </RowContainer>
        )}
      </DndProvider>
      {popupData && popupData.type === 1 && (
        <PopupView
          popupData={
            <Table className="full short">
              <thead>
                <tr>
                  <TableHeader colSpan={2}>Nutrition Info</TableHeader>
                </tr>
                <tr>
                  <TableHeader colSpan={2}>{` Base Calori: ${coloriePerDay} | Serving: ${popupData.Serving}`}</TableHeader>
                </tr>
              </thead>
              <TableBody>
                {Object.entries(popupData.nutritionInfo ?? {}).map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell>{addSpaceBeforeCaps(key)}</TableCell>
                    <TableCell>{getValue({ type: "number" }, value)}</TableCell>
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
      {isOpen && (
        <AutoForm
          userId={openData.data._id}
          useCaptcha={false}
          useCheckbox={false}
          css="double"
          description={isOpen.description}
          formValues={{}}
          key={isOpen.description}
          formType={"post"}
          header={isOpen.header}
          formInput={cloneParameters}
          submitHandler={updateHandler}
          button={isOpen.submit}
          isOpenHandler={(value) => {
            closeEdit(value);
          }}
          isOpen={true}
          plainForm={false}
        ></AutoForm>
      )}
    </ColumnContainer>
  ) : (
    <NoData>Loading</NoData>
  );
};

export default FoodExchangeSetupMenu;
