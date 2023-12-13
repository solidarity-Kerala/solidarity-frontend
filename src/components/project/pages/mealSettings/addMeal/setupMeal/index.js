import React, { useEffect, useState } from "react";
import { ColumnContainer, RowContainer } from "../../../../../styles/containers/styles";
import FormInput from "../../../../../core/input";
import { Variant, Variants } from "./styles";
import { GetIcon } from "../../../../../../icons";
import { deleteData, getData, postData } from "../../../../../../backend/api";
import { ImgBox, TagBox, TagData, TagItem, TagTitle } from "../../../../../core/select/styles";
import { getValue } from "../../../../../core/list/functions";
import { DataItem, DataItemContainer } from "../../addRecipe/setupRecipe/styles";
import { NoData } from "../../../../../core/list/styles";

const SetupMeal = ({ openData, setMessage }) => {
  const [search] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [meal] = useState(openData.data._id);
  const [nutritionInfo, setNutritionInfo] = useState(null);
  const addRecipe = async (option) => {
    const response = await postData({ recipe: option._id, meal }, "meal-item");
    setNutritionInfo(response.data.NutritionInfo ?? null);
    setRecipes(response.data.addedItems ?? []);
  };
  const deleteRecipe = async (option) => {
    const response = await deleteData({ id: option._id, recipe: option.recipe._id }, "meal-item");
    setNutritionInfo(response.data.NutritionInfo ?? null);
    setRecipes(response.data.addedItems ?? []);
  };
  useEffect(() => {
    getData({ meal }, "meal-item").then((response) => {
      setRecipes(response.data.response ?? []);
      setNutritionInfo(response.data.NutritionInfo ?? null);
    });
  }, [meal]);
  const [mealRecipe] = useState({
    type: "select",
    apiType: "API",
    selectApi: "recipe/select",
    placeholder: "Recipes",
    apiSearch: true,
    listBox: true,
    iconImage: {
      type: "img",
      item: "photo",
      title: "photo",
      collection: "",
    },
    tags: [
      {
        type: "number",
        item: "calories",
        title: "Calories",
        collection: "",
      },
      {
        type: "number",
        item: "protein",
        title: "Protein",
        collection: "",
      },
      {
        type: "number",
        item: "totalFat",
        title: "Fat",
        collection: "",
      },
      {
        type: "number",
        item: "carbohydrate",
        title: "Carbs",
        collection: "",
      },
    ],
    displayValue: "title",
    name: "recipes",
    collection: "",
    validation: "",
    showItem: "title",
    default: "",
    tag: false,
    label: "Recipes",
    required: true,
    view: true,
    add: true,
    update: true,
    filter: false,
  });

  return (
    <ColumnContainer className="custom">
      <RowContainer className="quarter">
        <FormInput animation={`sub-1`} placeholder={"Search Recipe"} key={`input`} id={0} error={null} value={search} {...mealRecipe} onChange={addRecipe} />
      </RowContainer>
      <RowContainer>
        <Variants>
          {recipes?.map((recipe, index) => {
            return (
              <Variant key={index}>
                <span
                  className="delete"
                  title="Remove Item"
                  onClick={() => {
                    deleteRecipe(recipe, index);
                  }}
                >
                  <GetIcon icon={"close"} />
                </span>
                {mealRecipe.iconImage && <ImgBox alt="icon" src={process.env.REACT_APP_CDN + recipe["recipe"]?.[mealRecipe.iconImage.item]} />}
                <TagBox className="column">
                  {recipe["recipe"]?.title}
                  <TagData>
                    {mealRecipe.tags.map((tag) => (
                      <React.Fragment key={tag.item}>
                        <TagTitle>{`${tag.title}`}</TagTitle>
                        <TagItem className={tag.type}>{getValue(tag, recipe["recipe"]?.[tag.item])}</TagItem>
                      </React.Fragment>
                    ))}
                  </TagData>
                </TagBox>
              </Variant>
            );
          })}
        </Variants>
        <Variants style={{ marginTop: "10px" }}>
          {recipes.length === 0 && <NoData>No recipe added!</NoData>}
          {nutritionInfo && (
            <Variant key={0}>
              <DataItemContainer>
                <DataItem>Calories: {nutritionInfo.calories}</DataItem>
                <DataItem>Protein: {nutritionInfo.protein}</DataItem>
                <DataItem>Saturated Fat: {nutritionInfo.satFat}</DataItem>
                <DataItem>Unsaturated Fat: {nutritionInfo.unSatFat}</DataItem>
                <DataItem>Total Fat: {nutritionInfo.totalFat}</DataItem>
                <DataItem>Cholesterol: {nutritionInfo.cholesterol}</DataItem>
                <DataItem>Fiber: {nutritionInfo.fiber}</DataItem>
                <DataItem>Carbohydrate: {nutritionInfo.carbohydrate}</DataItem>
                <DataItem>Sugars: {nutritionInfo.sugars}</DataItem>
                <DataItem>Iron: {nutritionInfo.iron}</DataItem>
                <DataItem>Calcium: {nutritionInfo.calcium}</DataItem>
              </DataItemContainer>
            </Variant>
          )}
        </Variants>
      </RowContainer>
      {/* <RowContainer>{recipesVariants && recipesVariants.map((item) => <div key={item.id}>{item.value}</div>)}</RowContainer> */}
    </ColumnContainer>
  );
};

export default SetupMeal;
