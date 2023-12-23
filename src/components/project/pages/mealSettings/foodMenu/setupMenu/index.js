import React, { useCallback, useEffect, useState } from "react";
import { GetIcon } from "../../../../../../icons";
import { deleteData, getData, postData } from "../../../../../../backend/api";
import { Filter, FilterBox, NoData, ProfileImage } from "../../../../../core/list/styles";
import { ColumnContainer, RowContainer } from "../../../../../styles/containers/styles";
import Search from "../../../../../core/search";
import { TabContainer, TabButton, Table, TableHeader, TableBody, TableRow, Div, TableCell, TabData, TabDataItem, MealItem, Title, Variants, Variant, ReplacableItems, DayHead, Details, WeekSelection, ShowCalorie, CommonReplace, Seriving } from "./styles"; // Import styles from styles.js
import DraggableItem from "./dragdrop/drag";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import DropTarget from "./dragdrop/drop";
import { CloseButton } from "../../../../../core/list/popup/styles";
import { Header } from "../../../../../core/list/manage/styles";
import { useRef } from "react";
import FormInput from "../../../../../core/input";
import { food } from "../../../../../../images";
import { MealTimeHead } from "../../../user/patient/dietMenu/styles";
import PopupView from "../../../../../core/popupview";
import { getValue } from "../../../../../core/list/functions";
import AutoForm from "../../../../../core/form";
import { useDispatch } from "react-redux";
import { addSelectObject } from "../../../../../../store/actions/select";

const SetupMenu = ({ openData, themeColors, setMessage, setLoaderBox }) => {
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
  const [activeCustomReplace, setActiveCustomReplace] = useState(null);
  const [activeCustomReplaceRecipeType, setActiveCustomReplaceRecipeType] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [selctedRecipeType, setSelctedRecipeType] = useState({
    typeOfRecipe: [],
    mealTimeCategory: [],
    productionDepartment: [],
    proteinCategory: [],
    cuisineCategory: [],
  });
  const [weekNumber, setWeekNumber] = useState(0);
  const [parameters, setParameters] = useState(null);
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
  const [coloriePerDay, setColoriePerDay] = useState(900);
  const getCalories = useCallback(
    (recipe, mealTimeCategory, availableCalories, calorieOnly = true) => {
      const dietCategory = openData.data.subDiet.category ?? "General";
      let { numberOfPortion, recipeIngredients } = recipe;
      let nutritionInfoDetails = [];
      let nutritionInfo = {};
      if (numberOfPortion === 0) {
        numberOfPortion = 1;
      }
      if (dietCategory === "FoodExchange") {
        availableCalories = availableCalories ?? menuData.mealTimeCategories.find((item) => mealTimeCategory === item._id)?.availableCalories;
        const availableCalorie = availableCalories?.[coloriePerDay] ?? { calories: coloriePerDay, starch: 0, leanMeat: 0, skimMilk: 0, nonStarchyVegetable: 0, fruits: 0, fats: 0, sugar: 0, veryLeanMeat: 0, mediumFatMeat: 0, highFatMeat: 0, vegetarianProtein: 0, lowfatMilk: 0, regularMilk: 0, other: 0 };

        return {};
      } else {
        availableCalories = availableCalories ?? menuData.mealTimeCategories.find((item) => mealTimeCategory === item._id)?.availableCalories;
        const availableCalorie = availableCalories?.[coloriePerDay] ?? {
          calories: coloriePerDay,
          meal: 0,
          bread: 0,
          dessert: 0,
          fruit: 0,
          fat: 0,
          salad: 0,
          snacking: 0,
          soup: 0,
        };
        if (!availableCalorie) {
          console.log("Not Found Available Calori: ", availableCalorie);
          return 0;
        }

        ["Meat", "Bread", "Fruit", "Dessert", "Soup", "Salad", "Fat", "Snacking", "Other"].map((typeOfIngredient) => {
          let info = { typeOfIngredient, ingredients: 0 };
          const typeOfIngredientLower = typeOfIngredient.toLowerCase();
          let count = availableCalorie[typeOfIngredientLower === "meat" ? "meal" : typeOfIngredientLower];
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
      }
    },
    [coloriePerDay, menuData?.mealTimeCategories, openData.data.subDiet.category]
  );
  useEffect(() => {
    if (menuData?.foodMenu) {
      const reducedResult = menuData.foodMenu.reduce((accumulator, item) => {
        const { dayNumber, recipes, mealTimeCategory } = item;
        const availableCalories = menuData.mealTimeCategories.find((item) => mealTimeCategory === item._id)?.availableCalories;
        const key = "day_" + dayNumber;
        if (!accumulator[key]) {
          accumulator[key] = 0;
        }
        const recipeCalories = recipes.reduce((totalCalories, recipe) => {
          const recipeCalories = totalCalories + getCalories(recipe, mealTimeCategory, availableCalories);
          // if (recipe.title === "Fish Sayadeih") {
          //   console.log(recipe.title, "Cumulated", recipeCalories);
          // }
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

  const deleteFoodMenu = async (id, index, mealOrRecepe, mealTimeCategory, dayNumber, optionNo) => {
    setMessage({
      type: 2,
      content: "Are you sure you want to delete?",
      proceed: "Delete",
      onProceed: async () => {
        try {
          // Call the deleteData function to delete the item with the given id from the server (Assuming this is an asynchronous function)
          await deleteData({ weekNumber: weekNumber, foodMenu: openData?.data?._id }, "food-menu-item");

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
  const deleteCommonReplcableItem = async (id) => {
    setMessage({
      type: 2,
      content: "Are you sure you want to delete?",
      proceed: "Delete",
      onProceed: async () => {
        try {
          // Call the deleteData function to delete the item with the given id from the server (Assuming this is an asynchronous function)
          const response = await deleteData({ id }, "food-menu-item/common-replacable-item");
          if (response.data?.success === true) {
            const menuDataTemp = { ...menuData };
            // Find the items object based on the provided parameters (mealTimeCategory, dayNumber, optionNo)
            const replacableIndex = menuDataTemp.commonReplacableItems.findIndex((cat) => cat._id === id);
            console.log("replacableIndex", replacableIndex);
            menuDataTemp.commonReplacableItems.splice(replacableIndex, 1, id);
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
    if ((data.type ?? 1) === 0) {
      if (item.typeOfRecipe !== activeCustomReplaceRecipeType) {
        setMessage({ content: "Sorry, you can add only same type of recipes to the list!", proceed: "Okay" });
      } else {
        const response = await postData(
          {
            ...data,
            foodMenu: openData.data._id,
            recipe: item._id,
            typeOfRecipe: item.typeOfRecipe,
            mealTimeCategory: data.mealTimeCategory,
          },
          "food-menu-item/common-replacable-item"
        );
        if (response?.data?.success === true) {
          menuDataTemp.commonReplacableItems.push(response.data.replacableItem);
          console.log(menuDataTemp);
          setMenuData(menuDataTemp);
        }
      }
      return;
    }
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
          const items = menuDataTemp.foodMenu.find((cat) => data.mealTimeCategory === cat.mealTimeCategory && data.dayNumber === cat.dayNumber && data.optionNo === cat.optionNo);
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
      const items = menuDataTemp.foodMenu.find((cat) => data.mealTimeCategory === cat.mealTimeCategory && data.dayNumber === cat.dayNumber && data.optionNo === cat.optionNo);
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
    const dietCategory = openData.data.subDiet.category ?? "General";

    if (dietCategory === "FoodExchange") {
      const availableCalorie = mealTimeCategories.availableCalories?.[coloriePerDay] ?? {
        calories: coloriePerDay,
        starch: 0,
        leanMeat: 0,
        skimMilk: 0,
        nonStarchyVegetable: 0,
        fruits: 0,
        fats: 0,
        sugar: 0,
        veryLeanMeat: 0,
        mediumFatMeat: 0,
        highFatMeat: 0,
        vegetarianProtein: 0,
        lowfatMilk: 0,
        regularMilk: 0,
        other: 0,
      };

      const { starch, leanMeat, skimMilk, nonStarchyVegetable, fruits, fats, sugar, veryLeanMeat, mediumFatMeat, highFatMeat, vegetarianProtein, lowfatMilk, regularMilk, other } = availableCalorie;

      const items = [
        { name: "Starch", value: starch },
        { name: "Lean Meat", value: leanMeat },
        { name: "Skim Milk", value: skimMilk },
        { name: "Non-Starchy Vegetable", value: nonStarchyVegetable },
        { name: "Fruits", value: fruits },
        { name: "Fats", value: fats },
        { name: "Sugar", value: sugar },
        { name: "Very Lean Meat", value: veryLeanMeat },
        { name: "Medium Fat Meat", value: mediumFatMeat },
        { name: "High Fat Meat", value: highFatMeat },
        { name: "Vegetarian Protein", value: vegetarianProtein },
        { name: "Low-Fat Milk", value: lowfatMilk },
        { name: "Regular Milk", value: regularMilk },
        { name: "Other", value: other },
      ];

      const text = items
        .filter((item) => item.value > 0)
        .map((item) => (
          <span key={item.name}>
            {item.name} x {item.value}{" "}
          </span>
        ));

      return text.length > 0 ? (
        <>
          <i>Seriving: </i>
          {text}
        </>
      ) : null;
    } else {
      const availableCalorie = mealTimeCategories.availableCalories?.[coloriePerDay] ?? {
        calories: coloriePerDay,
        meal: 0,
        bread: 0,
        dessert: 0,
        fruit: 0,
        fat: 0,
        salad: 0,
        snacking: 0,
        soup: 0,
      };

      const { bread, meal: meat, fruit, dessert, soup, salad, fat, snacking } = availableCalorie;
      if (!single) {
        const items = [
          { name: "Meat", value: meat },
          { name: "Bread", value: bread },
          { name: "Fruit", value: fruit },
          { name: "Dessert", value: dessert },
          { name: "Salad", value: salad },
          { name: "Soup", value: soup },
          { name: "Fat", value: fat },
          { name: "Snacking", value: snacking },
        ];

        const text = items
          .filter((item) => item.value > 0)
          .map((item) => (
            <span key={item.name}>
              {item.name} x {item.value}{" "}
            </span>
          ));

        return text.length > 0 ? (
          <>
            <i>Seriving: </i>
            {text}
          </>
        ) : null;
      } else {
        let count = 0;
        if (recepeType === "Meat") {
          count = `${meat || 0} Meat`;
        } else if (recepeType === "Bread") {
          count = `${bread || 0} Bread`;
        } else if (recepeType === "Fruit") {
          count = `${fruit || 0} Fruit`;
        } else if (recepeType === "Soup") {
          count = `${soup || 0} Soup`;
        } else if (recepeType === "Dessert") {
          count = `${dessert || 0} Dessert`;
        } else if (recepeType === "Fat") {
          count = `${fat || 0} Fat`;
        } else if (recepeType === "Snacking") {
          count = `${dessert || 0} Snacking`;
        } else if (recepeType === "Salad") {
          count = `${salad || 0} Salad`;
        } else if (recepeType === "Mixed") {
          count = `${meat} Meat ${bread} Bread`;
        } else {
          count = "0";
        }

        return count.length > 0 ? count : null;
      }
    }
  };

  useEffect(() => {
    setLoaderBox(true);
    getData({ menuId: openData.data._id, weekNumber, category: openData.data.subDiet.category ?? "General", subDiet: openData.data.subDiet._id }, "food-menu/get-a-menu")
      .then((response) => {
        if (response.status === 200) {
          setMenuData(response.data);
          setLoaderBox(false);
        }
      })
      .catch(() => [setLoaderBox(false)]);
  }, [openData.data._id, weekNumber, setLoaderBox, openData.data.subDiet.category, openData.data.subDiet._id]);
  const [item] = useState({
    type: "select",
    placeholder: "Calories",
    name: "calories",
    validation: "",
    default: "",
    tag: false,
    label: "Calories",
    search: false,
    required: true,
    view: true,
    add: true,
    update: true,
    selectApi: "800,900,1000,1100,1200,1300,1400,1500,1600,1700,1800,1900,2000,2100,2200",
    apiType: "CSV",
  });
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
  const [typeOfRecipesTitles] = useState([
    { id: "Bread", value: "Bread" },
    { id: "Meat", value: "Meat" },
    { id: "Fruit", value: "Fruit" },
    { id: "Dessert", value: "Dessert" },
    { id: "Salad", value: "Salad" },
    { id: "Soup", value: "Soup" },
    { id: "Fat", value: "Fat" },
    { id: "Snacking", value: "Snacking" },
    { id: "Mixed", value: "Mixed" },
  ]);
  const [typeOfRecipes] = useState([
    {
      type: "multiSelect",
      placeholder: "Type Of Recipe",
      name: "typeOfRecipe",
      validation: "",
      default: "",
      tag: true,
      label: "Type Of Recipe",
      required: false,
      search: false,
      view: true,
      add: true,
      update: true,
      filter: true,
      selectApi: typeOfRecipesTitles,
      apiType: "JSON",
    },
    {
      type: "multiSelect",
      apiType: "API",
      selectApi: "mealtime-category/select",
      placeholder: "Mealtime Category",
      name: "mealTimeCategory",
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
      required: false,
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
      required: false,
      view: true,
      add: true,
      update: true,
      filter: true,
    },
    {
      type: "multiSelect",
      apiType: "API",
      selectApi: "cuisine-category/select",
      placeholder: "Cuisine Category",
      name: "cuisineCategory",
      validation: "",
      showItem: "cuisineCategoriesName",
      default: "",
      tag: true,
      label: "Cuisine Category",
      required: false,
      view: true,
      add: true,
      update: true,
      filter: true,
    },
  ]);
  //clone
  const [cloneParameters, setCloneParameters] = useState(null);
  const [isOpen, setIsOpen] = useState(null);
  const [isOpenEdit, setIsOpenEdit] = useState(null);
  const closeEdit = () => {
    setIsOpen(null);
    setIsOpenEdit(null);
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
        name: "mealTimeCategory",
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
            item: "mealTimeCategory",
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

  const editNotes = async (type, item, index = { date: 0, categoryIndex: 0, recepeIndex: 0 }) => {
    switch (type) {
      case "recipe":
        setParameters([
          {
            type: "textarea",
            placeholder: "Recipe Note new",
            name: "recipeNote",
            showItem: "",
            validation: "",
            default: item.recipeNote ?? "",
            // tag: true,
            label: "Recipe Note new",
            required: false,
            view: true,
            add: true,
            update: true,
          },
          // {
          //   type: "hidden",
          //   placeholder: "recipeSchedule",
          //   name: "recipeSchedule",
          //   showItem: "",
          //   validation: "",
          //   default: item._id,
          //   label: "recipeSchedule",
          //   required: true,
          //   view: true,
          //   add: false,
          //   update: true,
          // },
        ]);
        setIsOpenEdit({
          type,
          index,
          submit: "Udpate Now",
          api: "patient-diet/udpate-recipe-note",
          header: `Edit ${item?.recipe?.title}'s Note `,
          description: "",
        });
        break;
      default:
        break;
    }
  };

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
              <button
                onClick={() => {
                  deleteFoodMenu(item.foodMenuItem);
                }}
              >
                <span>Delete</span> <GetIcon icon={"delete"} />
              </button>
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
                customClass={"filter auto single"}
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
              <FormInput
                {...weeks}
                customClass={"filter auto single"}
                placeholder={`Week`}
                value={weekNumber}
                key={`input` + 2}
                id={`input` + 2}
                onChange={(event) => {
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
              {menuData.mealTimeCategories.map((mealTimeCategory) => (
                <>
                  <TableRow>
                    <TableCell className="row" colSpan={7}>
                      <MealTimeHead
                        active={(selectedMealTime[`${mealTimeCategory._id}-${weekNumber}`] ?? false) || expandAll}
                        onClick={() =>
                          setSelectedMealTime((prev) => ({
                            ...prev,
                            [`${mealTimeCategory._id}-${weekNumber}`]: !prev[`${mealTimeCategory._id}-${weekNumber}`] ?? true,
                          }))
                        }
                      >
                        {`${mealTimeCategory.mealtimeCategoriesName} `}
                        <GetIcon icon={"down"}></GetIcon>
                      </MealTimeHead>
                    </TableCell>
                  </TableRow>

                  {(selectedMealTime[`${mealTimeCategory._id}-${weekNumber}`] === true || expandAll) && (
                    <React.Fragment>
                      <TableRow>
                        <TableCell colSpan={7}>
                          <Seriving>{setCaloriesItems(mealTimeCategory)}</Seriving>
                        </TableCell>
                      </TableRow>
                      <TableRow key={mealTimeCategory._id}>
                        {daysOfWeek.map((day, dayNumber) => {
                          if (showAllReplacable) {
                            if (dayNumber !== selectedDayNumber) {
                              return null;
                            }
                          }
                          const options = menuData.foodMenu.filter((item) => item.mealTimeCategory === mealTimeCategory._id && item.dayNumber === dayNumber && (item.meals.length > 0 || item.recipes.length > 0));
                          let mealtimeCalories = 0;
                          return (
                            <TableCell colSpan={showAllReplacable ? 7 : 0} className={dayNumber === 0 ? "first" : ""} key={dayNumber}>
                              <div className="layer">
                                {options.map((items, optionsIndex) => {
                                  return (
                                    <Div key={`drop-${optionsIndex + mealTimeCategory._id + dayNumber + items.optionNo}`}>
                                      <>
                                        <Variants className="vertical">
                                          {items?.recipes?.length > 0
                                            ? items.recipes.map((item, recipeIndex) => {
                                                let recipeCalories = getCalories(item ?? [], mealTimeCategory._id);
                                                mealtimeCalories += recipeCalories;
                                                // Render your items inside the FoodButton here
                                                // For example, you can render a list of items like this
                                                return (
                                                  <Variant key={item._id} className={`vertical replace ${data.menuType} ${(openData.item.viewOnly ?? false) === true ? "Fixed" : ""}`}>
                                                    <Variant key={item._id} className="vertical recipe">
                                                      <ProfileImage>
                                                        <img src={item.photoThumbnail ? process.env.REACT_APP_CDN + item.photoThumbnail : food} alt="icon"></img>
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
                                                              mealTimeCategory: mealTimeCategory._id,
                                                              nutritionInfo: getCalories(item, "", mealTimeCategory.availableCalories, false),
                                                              Serving: setCaloriesItems(mealTimeCategory, true, item.typeOfRecipe),
                                                            });
                                                          }}
                                                        >
                                                          <GetIcon icon={"info"} />
                                                        </span>
                                                        <span
                                                          className="edit"
                                                          title="Modify Recipe Note"
                                                          onClick={() => {
                                                            // deleteItem(item.foodMenuItem, recipeIndex, "recipe", mealTimeCategory._id, dayNumber, items.optionNo);
                                                            editNotes("recipe", item, {
                                                              date: "date",
                                                              categoryIndex: "categoryIndex",
                                                              recepeIndex: "recepeIndex",
                                                            });
                                                          }}
                                                        >
                                                          <GetIcon icon={"edit"} />
                                                        </span>
                                                        {!(openData.item.viewOnly ?? false) && (
                                                          <span
                                                            className="delete"
                                                            onClick={() => {
                                                              deleteItem(item.foodMenuItem, recipeIndex, "recipe", mealTimeCategory._id, dayNumber, items.optionNo);
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
                                                            <Variants className={showReplacable ? "vertical" : "day vertical "}>
                                                              {item.foodmenureplacableitems?.length > 0 &&
                                                                item.foodmenureplacableitems.map((replacableItem, replacableIndex) => (
                                                                  <Variant key={replacableItem._id} className="horizontal child-recipe">
                                                                    <ProfileImage>
                                                                      <img src={replacableItem.recipe.photoThumbnail ? process.env.REACT_APP_CDN + replacableItem.recipe.photoThumbnail : food} alt="icon"></img>
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
                                                                            mealTimeCategory: mealTimeCategory._id,
                                                                            nutritionInfo: getCalories(replacableItem.recipe, "", mealTimeCategory.availableCalories, false),
                                                                            Serving: setCaloriesItems(mealTimeCategory, true, replacableItem.recipe.typeOfRecipe),
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
                                                                            deleteReplcableItem(replacableItem._id, replacableIndex, recipeIndex, "recipe", mealTimeCategory._id, dayNumber, items.optionNo);
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
                              </div>
                              <ShowCalorie>
                                <span className="calories">{mealtimeCalories.toFixed(2)} calories</span>
                              </ShowCalorie>
                            </TableCell>
                          );
                        })}
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={7}>
                          {new Set(["General", "Keto"]).has(openData.data.subDiet.category ?? "General") && (
                            <Filter
                              // className={showFilter ? "close" : "open"}
                              theme={themeColors}
                              className="inner-long"
                              onClick={() => {
                                setActiveCustomReplaceRecipeType(typeOfRecipesTitles[0].id);

                                setActiveCustomReplace(activeCustomReplace && activeCustomReplace.id === mealTimeCategory._id ? null : { id: mealTimeCategory._id, name: mealTimeCategory.mealtimeCategoriesName });
                              }}
                            >
                              {`Common Recipe Replacables for '${mealTimeCategory.mealtimeCategoriesName}'`} <GetIcon icon={activeCustomReplace?.id === mealTimeCategory._id ? "close" : "info"} />
                            </Filter>
                          )}
                          {activeCustomReplace && activeCustomReplace.id === mealTimeCategory._id && (
                            <CommonReplace>
                              <TabContainer>
                                {typeOfRecipesTitles.map((item) => {
                                  return (
                                    <TabButton className={activeCustomReplaceRecipeType === item.id} onClick={() => setActiveCustomReplaceRecipeType(item.id)}>
                                      {item.value}
                                    </TabButton>
                                  );
                                })}
                              </TabContainer>

                              {(!openData.item.viewOnly ?? false) &&
                                typeOfRecipesTitles.map((item) => {
                                  const replacableItems = menuData.commonReplacableItems?.filter((replaceRecipe) => replaceRecipe.typeOfRecipe === activeCustomReplaceRecipeType && activeCustomReplace.id === replaceRecipe.mealTimeCategory);
                                  return (
                                    //custome replacabe recipes
                                    item.id === activeCustomReplaceRecipeType && (
                                      <div className="layer">
                                        <Div>
                                          <DropTarget
                                            onDrop={showReplacable ? () => {} : onDrop}
                                            data={{
                                              type: 0,
                                              foodMenu: openData.data._id,
                                              mealTimeCategory: activeCustomReplace.id,
                                              typeOfRecipe: activeCustomReplaceRecipeType,
                                            }}
                                            element={
                                              item.id === activeCustomReplaceRecipeType && (
                                                <Variants className={`vertical ${replacableItems.length > 0 ? "day" : ""}`}>
                                                  {replacableItems.length > 0 &&
                                                    replacableItems.map((replacableItem, replacableIndex) => (
                                                      <Variant key={replacableItem._id} className="horizontal child-recipe">
                                                        <ProfileImage>
                                                          <img src={replacableItem.recipe.photoThumbnail ? process.env.REACT_APP_CDN + replacableItem.recipe.photoThumbnail : food} alt="icon"></img>
                                                        </ProfileImage>
                                                        <Details>
                                                          <span className="recipe">{replacableItem.recipe.title}</span>
                                                          <span>{replacableItem.recipe.calories?.toFixed(2)} calories</span>
                                                        </Details>
                                                        <div className="sub-actions">
                                                          <span
                                                            className="info"
                                                            onClick={() => {
                                                              // setPopupData({
                                                              //   type: 1,
                                                              //   data: replacableItem.recipe,
                                                              //   mealTimeCategory: mealTimeCategory._id,
                                                              //   nutritionInfo: getCalories(replacableItem.recipe, "", mealTimeCategory.availableCalories, false),
                                                              //   Serving: setCaloriesItems(mealTimeCategory, true, replacableItem.recipe.typeOfRecipe),
                                                              // });
                                                            }}
                                                          >
                                                            <GetIcon icon={"info"} />
                                                          </span>
                                                          {!(openData.item.viewOnly ?? false) && (
                                                            <span
                                                              className="delete"
                                                              title="Remove Item"
                                                              onClick={() => {
                                                                deleteCommonReplcableItem(replacableItem._id);
                                                                // deleteReplcableItem(replacableItem._id, replacableIndex, recipeIndex, "recipe", mealTimeCategory._id, dayNumber, items.optionNo);
                                                              }}
                                                            >
                                                              <GetIcon icon={"delete"} />
                                                            </span>
                                                          )}
                                                        </div>
                                                      </Variant>
                                                    ))}
                                                  <Variant className=" add-button">
                                                    <GetIcon icon={"add"}></GetIcon>
                                                  </Variant>
                                                </Variants>
                                              )
                                            }
                                          />
                                        </Div>
                                      </div>
                                    )
                                  );
                                })}
                            </CommonReplace>
                          )}
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  )}
                </>
              ))}
            </TableBody>
          </Table>
        </RowContainer>
        {(!openData.item.viewOnly ?? false) && (
          <RowContainer className="mealSelection">
            <TabData>
              <FilterBox className={`menu `}>
                <ColumnContainer className="left">
                  <Filter
                    className={showFilter ? "close" : "open"}
                    theme={themeColors}
                    onClick={() => {
                      setShowFilter(!showFilter);
                    }}
                  >
                    <GetIcon icon={"filter"} />
                  </Filter>
                  <Search title={"Search"} theme={themeColors} className={"sticky"} placeholder="Search" value={searchValue} onChange={searchChange} />
                </ColumnContainer>
                <ColumnContainer className={`filter auto ${showFilter ? "close" : ""}`}>
                  {typeOfRecipes.map((field, index) => (
                    <FormInput
                      customClass={"filter auto"}
                      placeholder={field.placeholder}
                      {...field}
                      value={selctedRecipeType[field.name] ?? []}
                      key={`input` + index}
                      id={`input` + index}
                      onChange={(event) => {
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
                </ColumnContainer>
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
                            <img src={recipe.photoThumbnail ? process.env.REACT_APP_CDN + recipe.photoThumbnail : food} alt="icon" />
                          </ProfileImage>
                          <Title>
                            {recipe.title ?? "Title not found!"}
                            <Title>
                              <span>BHD</span>
                              <span className="price">{recipe.price}</span>
                              <span className="offer">{recipe.offerPrice}</span>
                              <span className="calories">{`${(recipe.calories / recipe.numberOfPortion).toFixed(2)} calories`}</span>
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
                  <TableHeader colSpan={2}>
                    {` Base Calori: ${coloriePerDay} | Serving: `} {popupData.Serving}
                  </TableHeader>
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
      {isOpenEdit && (
        <AutoForm
          userId={openData.data._id}
          // useCaptcha={true}
          useCheckbox={false}
          customClass={isOpen?.customClass ?? ""}
          description={isOpen?.description}
          formValues={{}}
          formMode={isOpen?.customClass ?? "double"}
          key={isOpen?.header}
          formType={"post"}
          header={isOpen?.header}
          formInput={parameters}
          submitHandler={updateHandler}
          button={isOpen?.submit}
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

export default SetupMenu;
