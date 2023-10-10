import React, { useEffect, useState } from "react";
import {
  ColumnContainer,
  RowContainer,
} from "../../../../../styles/containers/styles";
import FormInput from "../../../../../elements/input";
import {
  Button,
  DataItem,
  DataItemContainer,
  Div,
  Table,
  TableCell,
  Title,
} from "./styles";
import styled from "styled-components";
import AutoForm from "../../../../../elements/form";
import {
  deleteData,
  getData,
  postData,
  putData,
} from "../../../../../../backend/api";
import { useDispatch, useSelector } from "react-redux";
import { addSelectObject } from "../../../../../../store/actions/select";
import { GetIcon } from "../../../../../../icons";
import Checkbox from "../../../../../elements/checkbox";
import { NoData } from "../../../../../elements/list/styles";
import { getValue } from "../../../../../elements/list/functions";

const SetupRecipe = ({ openData, setMessage }) => {
  const [search] = useState("");
  const dispatch = useDispatch();
  const [recipe] = useState(openData.data._id);
  const [portion] = useState(openData.data.numberOfPortion ?? 1);
  const selectData = useSelector((state) => state.select["ingredient/select"]);
  const themeColors = useSelector((state) => state.themeColors);
  const [updateIngredient] = useState([
    {
      type: "text",
      placeholder: "Ingredient Name",
      validation: "",
      tag: false,
      name: "ingredientsName",
      label: "Ingredient Name",
      required: true,
      view: true,
      add: true,
      update: true,
      filter: false,
    },
    {
      type: "select",
      placeholder: "Measurement Type",
      name: "measureType",
      validation: "",
      default: "",
      tag: false,
      label: "Measurement Type",
      required: true,
      view: true,
      add: true,
      update: true,
      filter: false,
      selectApi:
        "Gram,Teaspoon,Tablespoon,Cup,Ounce,Piece,Milliliter,Pinch,Bunch",
      apiType: "CSV",
    },
    {
      type: "number",
      placeholder: "Gram Per Measurement Type",
      name: "gramOfType",
      validation: "",
      default: 0,
      dynamicClass: "direct",
      tag: false,
      label: "Gram Per Measurement Type",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "select",
      apiType: "API",
      selectApi: "protein-categories/select",
      placeholder: "Ingredient Category",
      name: "proteinCategory",
      validation: "",
      collection: "proteinCategory",
      showItem: "proteinCategoriesName",
      default: "",
      tag: true,
      label: "Ingredient Category",
      required: false,
      view: true,
      add: true,
      update: true,
      filter: false,
    },
    {
      type: "hidden",
      placeholder: "id",
      name: "id",
      validation: "",
      default: "",
      dynamicClass: "direct",
      tag: false,
      label: "id",
      required: true,
      view: true,
      add: true,
      update: true,
      filter: false,
    },
    {
      type: "hidden",
      placeholder: "quantity",
      name: "quantity",
      validation: "",
      default: "",
      dynamicClass: "direct",
      tag: false,
      label: "quantity",
      required: true,
      view: true,
      add: true,
      update: true,
      filter: false,
    },
  ]);
  const [ingredients, setIngredients] = useState(null);
  const [nutritionInfo, setNutritionInfo] = useState(null);
  const [updateId, setUpdateId] = useState(null);
  const [ingredient, setIngredient] = useState(null);
  const addIngredient = async (option) => {
    // setRefresh(!refresh);

    if (typeof option.calories !== "number" || isNaN(option.calories)) {
      // setMessage({ content: "You cannot add this ingredient, the calorie of this ingredient is not valid!" });
      option.measureType = "";
      option.gramOfType = 0;
      option.quantity = 100;
      option.value = typeof option.value === "undefined" ? "" : option.value;
      option.ingredientsName = option.value ?? "";
      setIngredient(option);
      setUpdateId(option._id);
      setIsOpen(true);
      return;
    } else {
      if (option.measureType) {
        const response = await postData(
          { ingredient: option.id, recipe },
          "recipe-ingredients"
        );
        response.data.addedItems && setIngredients(response.data.addedItems);
        response.data.recipeNutritionInfo &&
          setNutritionInfo(response.data.recipeNutritionInfo);
      } else {
        if (option.id) {
          option.measureType = "";
          option.gramOfType = 0;
          option.value =
            typeof option.value === "undefined" ? "" : option.value;
          option.ingredientsName = option.value ?? "";
          option.quantity = 100;
          setIngredient(option);
          setUpdateId(option._id);
          setIsOpen(true);
        }
      }
    }
  };
  const updateHandler = async (post) => {
    await putData(post, "ingredient");
    const response = await postData(
      { ingredient: post.id, recipe },
      "recipe-ingredients"
    );
    response.data.addedItems && setIngredients(response.data.addedItems);
    response.data.recipeNutritionInfo &&
      setNutritionInfo(response.data.recipeNutritionInfo);
    setNutritionInfo(response.data.recipeNutritionInfo);
    const data = [...selectData];
    const item = selectData.find((item) => [item.id === post._id]);
    item.measureType = post.measureType;
    item.gramOfType = post.gramOfType;
    setIngredients(response.data.addedItems);
    dispatch(addSelectObject(data, "ingredient/select"));
    closeEdit();
  };
  const [mealIngredient] = useState({
    type: "select",
    apiType: "API",
    selectApi: "ingredient/select",
    placeholder: "Ingredient",
    apiSearch: true,
    listBox: true,
    tags: [
      {
        type: "text",
        item: "gram",
        title: "Gram",
        collection: "",
      },
      {
        type: "text",
        item: "calories",
        title: "Calories",
        collection: "",
      },
    ],
    name: "ingredient",
    collection: "ingredient",
    validation: "",
    showItem: "ingredientsName",
    default: "",
    tag: false,
    label: "Ingredient",
    required: true,
    view: true,
    add: true,
    update: true,
    filter: false,
  });
  useEffect(() => {
    getData({ recipe }, "recipe-ingredients").then((response) => {
      setIngredients(response.data.response);
      setNutritionInfo(response.data.recipeNutritionInfo);
    });
  }, [recipe]);
  const textChange = async (event, index) => {
    const ingredientTest = [...ingredients];
    ingredientTest[index].quantity = event.target.value;
    setIngredients(ingredientTest);
    const response = await putData(
      {
        id: ingredientTest[index]._id,
        ingredient: ingredientTest[index].ingredient._id,
        quantity: ingredientTest[index].quantity,
      },
      "recipe-ingredients"
    );
    setNutritionInfo(response.data.recipeNutritionInfo);
  };
  const checkChange = async (event, index) => {
    const ingredientTest = [...ingredients];
    ingredientTest[index].isCalculated = event.target.checked;
    setIngredients(ingredientTest);
    const response = await putData(
      {
        id: ingredientTest[index]._id,
        ingredient: ingredientTest[index].ingredient._id,
        isCalculated: ingredientTest[index].isCalculated,
        quantity: ingredientTest[index].quantity,
      },
      "recipe-ingredients"
    );
    setNutritionInfo(response.data.recipeNutritionInfo);
  };
  const [isOpen, setIsOpen] = useState(false);
  const closeEdit = () => {
    setIsOpen(false);
  };
  return (
    <ColumnContainer className="custom">
      <RowContainer className="quarter">
        <FormInput
          customClass="menu"
          animation={`sub-1`}
          placeholder={"Search Ingredient"}
          key={1}
          id={0}
          error={null}
          value={search}
          {...mealIngredient}
          onChange={addIngredient}
        />
      </RowContainer>
      <RowContainer>
        {ingredients ? (
          <Table>
            <thead>
              <tr>
                <TableCell className="left head">
                  <Div className="variants left">
                    Ingredients You have added ({ingredients?.length ?? 0})
                  </Div>
                </TableCell>
                <TableCell className="left head">
                  <Div className="variants">Quantity / Calculate?</Div>
                </TableCell>
                <TableCell className="left head">
                  <Div className="variants">Total Gram / Calori</Div>
                </TableCell>
                <TableCell className="left head">
                  <Div className="variants">Remove</Div>
                </TableCell>
              </tr>
            </thead>
            <tbody>
              {ingredients?.length > 0 &&
                ingredients.map((item, index) => (
                  <tr key={index}>
                    <TableCell className="padding left">
                      <Title>
                        <GetIcon icon={"recepe"}></GetIcon>
                        {item.ingredient.ingredientsName ?? "Nil"}
                      </Title>
                      <DataItemContainer className="nowrp">
                        <DataItem>{item.ingredient.typeOfIngredient}</DataItem>
                        <DataItem>
                          {item.ingredient.gramOfType}g/
                          {item.ingredient.measureType}
                        </DataItem>
                        <DataItem>
                          {(
                            (item.ingredient.calories *
                              item.ingredient.gramOfType) /
                            100
                          )?.toFixed(2)}
                          KCal
                        </DataItem>
                        <DataItem>
                          {(
                            (item.ingredient.protein *
                              item.ingredient.gramOfType) /
                            100
                          )?.toFixed(2)}
                          g Protein
                        </DataItem>
                        <DataItem>
                          {(
                            (item.ingredient.totalFat *
                              item.ingredient.gramOfType) /
                            100
                          )?.toFixed(2)}
                          g Fat
                        </DataItem>
                        <DataItem>
                          {(
                            (item.ingredient.carbohydrate *
                              item.ingredient.gramOfType) /
                            100
                          )?.toFixed(2)}
                          g Carbs
                        </DataItem>
                      </DataItemContainer>
                    </TableCell>
                    {/* <TableCell>{`${item.ingredient.gramOfType}g ${item.ingredient.measureType !== "Gram" ? ` per ${item.ingredient.measureType} = ` : ""} | ${item.ingredient.calories?.toFixed(2)} cal`}</TableCell> */}

                    <TableCell>
                      <StyledInput
                        placeholder="1"
                        type="number"
                        value={item.quantity}
                        onChange={(event) => {
                          textChange(event, index);
                        }}
                      />
                      <Checkbox
                        onChange={(event) => {
                          checkChange(event, index);
                        }}
                        checked={item.isCalculated}
                        theme={themeColors}
                      />
                    </TableCell>

                    <TableCell>{`${(
                      item.ingredient.gramOfType * item.quantity
                    ).toFixed(2)}g / ${(
                      (item.ingredient.calories *
                        (item.ingredient.gramOfType * item.quantity)) /
                      100
                    )?.toFixed(2)}cal`}</TableCell>

                    <TableCell>
                      <Button
                        onClick={() => {
                          setMessage({
                            type: 2,
                            content: "Do you want to delete?",
                            proceed: "Delete",
                            data: index,
                            onProceed: async () => {
                              const response = await deleteData(
                                { id: item._id },
                                "recipe-ingredients"
                              );
                              setNutritionInfo(
                                response.data.recipeNutritionInfo
                              );
                              setIngredients(response.data.addedItems);
                            },
                          });
                        }}
                      >
                        <GetIcon icon={"delete"} />
                      </Button>
                    </TableCell>
                  </tr>
                ))}
              {ingredients.length === 0 && (
                <TableCell colSpan={4}>
                  <NoData>
                    <GetIcon icon={"recipe"}></GetIcon>No recipe added!
                  </NoData>
                </TableCell>
              )}
              {nutritionInfo && (
                <>
                  {portion > 1 ? (
                    <tr key={0}>
                      <TableCell colSpan={4}>
                        <DataItemContainer>
                          <DataItem className="head">
                            <GetIcon icon={"info"}></GetIcon>Total Nutrition
                            Info {portion > 1 && ` of ${1}/${portion}`}
                          </DataItem>
                          <DataItem>
                            Gram:
                            {getValue(
                              { type: "number" },
                              nutritionInfo.gram / portion
                            )}
                            /{getValue({ type: "number" }, nutritionInfo.gram)}
                          </DataItem>
                          <DataItem>
                            Calories:
                            {getValue(
                              { type: "number" },
                              nutritionInfo.calories / portion
                            )}
                            /
                            {getValue(
                              { type: "number" },
                              nutritionInfo.calories
                            )}
                          </DataItem>
                          <DataItem>
                            Protein:{" "}
                            {getValue(
                              { type: "number" },
                              nutritionInfo.protein / portion
                            )}
                            /{" "}
                            {getValue(
                              { type: "number" },
                              nutritionInfo.protein
                            )}
                          </DataItem>
                          <DataItem>
                            Saturated Fat:{" "}
                            {getValue(
                              { type: "number" },
                              nutritionInfo.satFat / portion
                            )}
                            /
                            {getValue({ type: "number" }, nutritionInfo.satFat)}
                          </DataItem>
                          <DataItem>
                            Unsaturated Fat:{" "}
                            {getValue(
                              { type: "number" },
                              nutritionInfo.unSatFat / portion
                            )}
                            /
                            {getValue(
                              { type: "number" },
                              nutritionInfo.unSatFat
                            )}
                          </DataItem>
                          <DataItem>
                            Total Fat:{" "}
                            {getValue(
                              { type: "number" },
                              nutritionInfo.totalFat / portion
                            )}
                            /
                            {getValue(
                              { type: "number" },
                              nutritionInfo.totalFat
                            )}
                          </DataItem>
                          <DataItem>
                            Cholesterol:{" "}
                            {getValue(
                              { type: "number" },
                              nutritionInfo.cholesterol / portion
                            )}
                            /
                            {getValue(
                              { type: "number" },
                              nutritionInfo.cholesterol
                            )}
                          </DataItem>
                          <DataItem>
                            Fiber:{" "}
                            {getValue(
                              { type: "number" },
                              nutritionInfo.fiber / portion
                            )}
                            /{getValue({ type: "number" }, nutritionInfo.fiber)}
                          </DataItem>
                          <DataItem>
                            Carbohydrate:{" "}
                            {getValue(
                              { type: "number" },
                              nutritionInfo.carbohydrate / portion
                            )}
                            /
                            {getValue(
                              { type: "number" },
                              nutritionInfo.carbohydrate
                            )}
                          </DataItem>
                          <DataItem>
                            Sugars:{" "}
                            {getValue(
                              { type: "number" },
                              nutritionInfo.sugars / portion
                            )}
                            /
                            {getValue({ type: "number" }, nutritionInfo.sugars)}
                          </DataItem>
                          <DataItem>
                            Iron:{" "}
                            {getValue(
                              { type: "number" },
                              nutritionInfo.iron / portion
                            )}
                            /{getValue({ type: "number" }, nutritionInfo.iron)}
                          </DataItem>
                          <DataItem>
                            Calcium:{" "}
                            {getValue(
                              { type: "number" },
                              nutritionInfo.calcium / portion
                            )}
                            /
                            {getValue(
                              { type: "number" },
                              nutritionInfo.calcium
                            )}
                          </DataItem>
                          <DataItem>
                            Sodium:{" "}
                            {getValue(
                              { type: "number" },
                              nutritionInfo.sodium / portion
                            )}
                            /
                            {getValue({ type: "number" }, nutritionInfo.sodium)}
                          </DataItem>
                          <DataItem>
                            Potassium:{" "}
                            {getValue(
                              { type: "number" },
                              nutritionInfo.potassium / portion
                            )}
                            /
                            {getValue(
                              { type: "number" },
                              nutritionInfo.potassium
                            )}
                          </DataItem>
                          <DataItem>
                            Vitamin A:{" "}
                            {getValue(
                              { type: "number" },
                              nutritionInfo.vitaminA
                            )}
                          </DataItem>
                          <DataItem>
                            Vitamin C:{" "}
                            {getValue(
                              { type: "number" },
                              nutritionInfo.vitaminC
                            )}
                          </DataItem>
                          <DataItem>
                            Vitamin E:{" "}
                            {getValue(
                              { type: "number" },
                              nutritionInfo.vitaminE
                            )}
                          </DataItem>
                        </DataItemContainer>
                      </TableCell>
                    </tr>
                  ) : (
                    <tr key={0}>
                      <TableCell colSpan={4}>
                        <DataItemContainer>
                          <DataItem className="head">
                            <GetIcon icon={"info"}></GetIcon>Total Nutrition
                            Info
                          </DataItem>
                          <DataItem>
                            Gram:{" "}
                            {getValue({ type: "number" }, nutritionInfo.gram)}
                          </DataItem>
                          <DataItem className="span">
                            <span>
                              Bread:{" "}
                              {getValue(
                                { type: "percentage" },
                                nutritionInfo.breadGram
                              )}
                            </span>
                            <span>
                              Meat:{" "}
                              {getValue(
                                { type: "percentage" },
                                nutritionInfo.meatGram
                              )}
                            </span>
                            <span>
                              Other:{" "}
                              {getValue(
                                { type: "percentage" },
                                nutritionInfo.otherGram
                              )}
                            </span>
                          </DataItem>
                          <DataItem>
                            Calories:{" "}
                            {getValue(
                              { type: "number" },
                              nutritionInfo.calories
                            )}
                          </DataItem>
                          <DataItem>
                            Protein:{" "}
                            {getValue(
                              { type: "number" },
                              nutritionInfo.protein
                            )}
                          </DataItem>
                          <DataItem>
                            Saturated Fat:{" "}
                            {getValue({ type: "number" }, nutritionInfo.satFat)}
                          </DataItem>
                          <DataItem>
                            Unsaturated Fat:{" "}
                            {getValue(
                              { type: "number" },
                              nutritionInfo.unSatFat
                            )}
                          </DataItem>
                          <DataItem>
                            Total Fat:{" "}
                            {getValue(
                              { type: "number" },
                              nutritionInfo.totalFat
                            )}
                          </DataItem>
                          <DataItem>
                            Cholesterol:{" "}
                            {getValue(
                              { type: "number" },
                              nutritionInfo.cholesterol
                            )}
                          </DataItem>
                          <DataItem>
                            Fiber:{" "}
                            {getValue({ type: "number" }, nutritionInfo.fiber)}
                          </DataItem>
                          <DataItem>
                            Carbohydrate:{" "}
                            {getValue(
                              { type: "number" },
                              nutritionInfo.carbohydrate
                            )}
                          </DataItem>
                          <DataItem>
                            Sugars:{" "}
                            {getValue({ type: "number" }, nutritionInfo.sugars)}
                          </DataItem>
                          <DataItem>
                            Iron:{" "}
                            {getValue({ type: "number" }, nutritionInfo.iron)}
                          </DataItem>
                          <DataItem>
                            Calcium:{" "}
                            {getValue(
                              { type: "number" },
                              nutritionInfo.calcium
                            )}
                          </DataItem>
                          <DataItem>
                            Sodium:{" "}
                            {getValue({ type: "number" }, nutritionInfo.sodium)}
                          </DataItem>
                          <DataItem>
                            Potassium:{" "}
                            {getValue(
                              { type: "number" },
                              nutritionInfo.potassium
                            )}
                          </DataItem>
                          <DataItem>
                            Vitamin A:{" "}
                            {getValue(
                              { type: "number" },
                              nutritionInfo.vitaminA
                            )}
                          </DataItem>
                          <DataItem>
                            Vitamin C:{" "}
                            {getValue(
                              { type: "number" },
                              nutritionInfo.vitaminC
                            )}
                          </DataItem>
                          <DataItem>
                            Vitamin E:{" "}
                            {getValue(
                              { type: "number" },
                              nutritionInfo.vitaminE
                            )}
                          </DataItem>
                        </DataItemContainer>
                      </TableCell>
                    </tr>
                  )}
                </>
              )}
            </tbody>
          </Table>
        ) : (
          <NoData>
            <GetIcon icon={"recipe"}></GetIcon>Loading
          </NoData>
        )}
      </RowContainer>
      {isOpen && (
        <AutoForm
          userId={updateId}
          useCaptcha={false}
          useCheckbox={false}
          css="double"
          description={""}
          formValues={ingredient}
          key={"type.description"}
          formType={"post"}
          header={`Update '${ingredient.ingredientsName ?? "NIL"}'`}
          formInput={updateIngredient}
          submitHandler={updateHandler}
          button={"Submit"}
          isOpenHandler={(value) => {
            closeEdit(value);
          }}
          isOpen={true}
          plainForm={false}
        ></AutoForm>
      )}
    </ColumnContainer>
  );
};
// Define a styled component for each input field
const StyledInput = styled.input`
  background-color: white;
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 5px;
  width: 40px;
  margin-right: 10px;
`;

export default SetupRecipe;
