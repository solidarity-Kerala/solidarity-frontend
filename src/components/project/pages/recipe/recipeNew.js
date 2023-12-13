import React, { useCallback, useEffect, useState } from "react";
import { GetIcon } from "../../../../icons";
import { deleteData, getData, postData } from "../../../../backend/api";
import { NoData } from "../../../elements/list/styles";
import {
  ColumnContainer,
  RowContainer,
} from "../../../styles/containers/styles";
import Search from "../../../elements/search";
import {
  TabContainer,
  TabButton,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  MealCategoryCell,
  Div,
  TableCell,
  TabData,
  TabDataItem,
  MealItem,
  Title,
  Variants,
  Variant,
} from "./styles"; // Import styles from styles.js
import DraggableItem from "./dragdrop/drag";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import DropTarget from "./dragdrop/drop";

const RecipeNew = ({ openData, themeColors, setMessage }) => {
  const daysOfWeek = ["Exam 01"];
  // const [menuData, setMenuData] = useState(null);
  const [meals] = useState([]);
  const [recipes] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [activeTab, setActiveTab] = useState("meals");
  const [searchValue, setSearchValue] = useState("");
  const [examQuestions, setExamQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [currentRecipe, setCurrentRecipe] = useState();
  const [selectedIngredient, setSelectedIngredient] = useState();

  const searchChange = (item) => {
    setSearchValue(item.target.value);
  };

  const handleTabClick = useCallback((tab) => {
    setActiveTab(tab);
    getData({}, "ingredient").then((result) => {
      setQuestions(result.data?.response);
    });
  }, []);

  useEffect(() => {
    handleTabClick("meals");
  }, [handleTabClick]);

  const deleteItem = async (
    id,
    index,
    mealOrRecepe,
    mealTimeCategory,
    dayNumber
  ) => {
    setMessage({
      type: 2,
      content: "Are you sure do delete?",
      proceed: "Delete",
      onProceed: async () => {
        await deleteData({ id }, "recipe-ingredients");

        await getData({ recipe: openData.data._id }, "recipe-ingredients").then(
          (response) => {
            // setMenuData(response.data);
            setSelectedIngredient(response?.data?.response);
          }
        );
      },
      data: { id },
    });
  };

  const onDrop = async (item, data) => {
    // const menuDataTemp = { ...menuData };
    // const items = menuDataTemp?.foodMenu?.find(
    //   (cat) =>
    //     data.mealTimeCategory === cat.mealTimeCategory &&
    //     data.dayNumber === cat.dayNumber
    // );
    const response = await postData(
      {
        recipe: openData.data._id,
        ingredient: item._id,
      },
      "recipe-ingredients"
    );
    setExamQuestions(response._id);
    // setMenuData(menuDataTemp);
    await getData({ recipe: openData.data._id }, "recipe-ingredients").then(
      (response) => {
        // setMenuData(response.data);
        setSelectedIngredient(response?.data?.response);
      }
    );
  };

  useEffect(() => {
    getData({ recipe: openData?.data._id }, "recipe-ingredients").then(
      (response) => {
        // setMenuData(response?.data);
        setSelectedQuestions(response?.data?.response);
        setSelectedIngredient(response?.data?.response);
      }
    );
    getData({ id: openData?.data._id }, "recipe").then((response_one) => {
      setCurrentRecipe([response_one?.data?.response]);
      //   setSelectedQuestions(response_one?.data?.response);
    });
    // getData({ recipe: openData?.data._id }, "recipe-ingredients").then(
    //   (response) => {
    //     // setSelectedQuestions(response?.data?.response);
    //   }
    // );
  }, [openData?.data._id]);

  return selectedQuestions ? (
    <ColumnContainer style={{ marginBottom: "30px" }}>
      <DndProvider backend={HTML5Backend}>
        <RowContainer className="">
          <TabContainer>
            <TabButton
              active={activeTab === "meals"}
              onClick={() => handleTabClick("meals")}
            >
              Ingredients
            </TabButton>
            {/* <TabButton
                active={activeTab === "recipes"}
                onClick={() => handleTabClick("recipes")}
                >
                Recipes
                </TabButton> */}
          </TabContainer>

          <TabData>
            <Search
              title={"Search"}
              theme={themeColors}
              placeholder="Search"
              value={searchValue}
              onChange={searchChange}
            />
            {activeTab === "meals" && meals && (
              <TabDataItem>
                {questions?.map((question) => (
                  // <MealItem key={question._id}>
                  //   <div>{question.title ?? "Title not found!"}</div>
                  // </MealItem>
                  <DraggableItem
                    key={question._id}
                    item={{
                      ...question,
                      mealOrRecepe: "question",
                      question: { title: question?.title },
                    }}
                    element={
                      <MealItem key={question._id}>
                        <Title>
                          {question?.ingredientsName ?? "Title not found!"}
                        </Title>
                        <Title>
                          {/* <span>BHD</span>
                            <span className="price">{question.question}</span> */}
                          <span className="offer">Calories: </span>
                          <span>{question.calories}</span>
                          <span className="offer">Protein: </span>
                          <span>{question.protein}</span>
                          <span className="offer">Fat: </span>
                          <span>{question.satFat}</span>
                          <span className="offer">Carbohydrate: </span>
                          <span>{question.carbohydrate}</span>
                        </Title>
                        <Variants>
                          <input />
                          <input
                            type="checkbox"
                            id="vehicle1"
                            name="vehicle1"
                            value="Bike"
                            defaultChecked
                          />
                          {question.mealItems?.map((item) => {
                            const recipeVariant = item.recipeVariant;
                            return (
                              <Variant key={item._id}>
                                <span>
                                  <span className="recipe">
                                    {recipeVariant.recipe.title}
                                  </span>
                                </span>
                                <span className="variant">
                                  {recipeVariant.variant}
                                </span>
                              </Variant>
                            );
                          })}
                        </Variants>
                      </MealItem>
                    }
                  />
                ))}
              </TabDataItem>
            )}
            {activeTab === "recipes" && recipes && (
              <TabDataItem>
                {daysOfWeek?.map((recipe) => (
                  <MealItem key={recipe._id}>
                    <Title>{recipe.title ?? "Title not found!"}</Title>
                    <Variants>
                      {daysOfWeek?.map((variant) => {
                        return (
                          <DraggableItem
                            key={variant._id}
                            item={{
                              ...variant,
                              mealOrRecepe: "recipe",
                              recipe: { title: recipe.title },
                            }}
                            element={
                              <Variant>
                                <span>
                                  <span>BHD</span>
                                  <span className="price">{variant.price}</span>
                                  <span className="offer">
                                    {variant.price}
                                  </span>{" "}
                                </span>
                                <span className="variant">
                                  {variant.variant}{" "}
                                </span>
                              </Variant>
                            }
                          />
                        );
                      })}
                    </Variants>
                  </MealItem>
                ))}
              </TabDataItem>
            )}
          </TabData>
        </RowContainer>
        <RowContainer className="">
          <TabContainer>
            <TabButton
              active={activeTab === "meals"}
              onClick={() => handleTabClick("meals")}
            >
              Recipe
            </TabButton>
            {/* <TabButton
                    active={activeTab === "recipes"}
                    onClick={() => handleTabClick("recipes")}
                    >
                    Recipes
                    </TabButton> */}
          </TabContainer>

          <TabData>
            <Search
              title={"Search"}
              theme={themeColors}
              placeholder="Search"
              value={searchValue}
              onChange={searchChange}
            />
            {activeTab === "meals" && meals && (
              <TabDataItem>
                {currentRecipe?.map((question) => (
                  // <MealItem key={question._id}>
                  //   <div>{question.title ?? "Title not found!"}</div>
                  // </MealItem>
                  <DraggableItem
                    key={question._id}
                    item={{
                      ...question,
                      mealOrRecepe: "question",
                      question: { title: question?.title },
                    }}
                    element={
                      <MealItem key={question._id}>
                        <Title>{question?.title ?? "Title not found!"}</Title>
                        <Title>
                          {/* <span>BHD</span>
                                <span className="price">{question.question}</span> */}
                          <span className="offer">Calories: </span>
                          <span>{question.calories}</span>
                          <span className="offer">Protein: </span>
                          <span>{question.protein}</span>
                          <span className="offer">Fat: </span>
                          <span>{question.satFat}</span>
                          <span className="offer">Carbohydrate: </span>
                          <span>{question.carbohydrate}</span>
                        </Title>
                        <Variants>
                          {question.mealItems?.map((item) => {
                            const recipeVariant = item.recipeVariant;
                            return (
                              <Variant key={item._id}>
                                <span>
                                  <span className="recipe">
                                    {recipeVariant.recipe.title}
                                  </span>
                                </span>
                                <span className="variant">
                                  {recipeVariant.variant}
                                </span>
                              </Variant>
                            );
                          })}
                        </Variants>
                      </MealItem>
                    }
                  />
                ))}
              </TabDataItem>
            )}
            {activeTab === "recipes" && recipes && (
              <TabDataItem>
                {daysOfWeek?.map((recipe) => (
                  <MealItem key={recipe._id}>
                    <Title>{recipe.title ?? "Title not found!"}</Title>
                    <Variants>
                      {daysOfWeek?.map((variant) => {
                        return (
                          <DraggableItem
                            key={variant._id}
                            item={{
                              ...variant,
                              mealOrRecepe: "recipe",
                              recipe: { title: recipe.title },
                            }}
                            element={
                              <Variant>
                                <span>
                                  <span>BHD</span>
                                  <span className="price">{variant.price}</span>
                                  <span className="offer">
                                    {variant.price}
                                  </span>{" "}
                                </span>
                                <span className="variant">
                                  {variant.variant}{" "}
                                </span>
                              </Variant>
                            }
                          />
                        );
                      })}
                    </Variants>
                  </MealItem>
                ))}
              </TabDataItem>
            )}
          </TabData>
        </RowContainer>
        <RowContainer>
          <Table>
            <thead>
              <tr>
                <MealCategoryCell></MealCategoryCell>
                {daysOfWeek?.map((day, index) => (
                  <TableHeader key={index}>{day}</TableHeader>
                ))}
              </tr>
            </thead>
            <TableBody>
              {/* {menuData.mealTimeCategories?.map((mealTimeCategory) => ( */}
              {/* {selectedQuestions?.length > 0 &&
                selectedQuestions?.map((question, index) => ( */}
              <TableRow
              // key={question._id}
              >
                <Variants className="vertical">
                  {/* <MealCategoryCell>{index + 1}</MealCategoryCell> */}
                </Variants>
                <TableCell
                // className={index === 0 ? "first" : ""}
                // key={index}
                >
                  <Div>
                    <DropTarget
                      onDrop={onDrop}
                      // data={{
                      //   question: question._id,
                      //   index,
                      // }}
                      element={
                        <Variants className="vertical">
                          {selectedIngredient?.length > 0
                            ? selectedIngredient?.map((ingredient, index) => {
                                // Render your items inside the FoodButton here
                                // For example, you can render a list of items like this
                                return (
                                  <>
                                    <Variant className="vertical">
                                      <span className="recipe">
                                        {
                                          ingredient?.ingredient
                                            ?.ingredientsName
                                        }
                                        {/* item 1 */}
                                      </span>
                                      <span className="recipe">
                                        Protien:{" "}
                                        {ingredient?.ingredient?.protein}
                                        {/* item 1 */}
                                      </span>
                                      <span className="variant">
                                        {ingredient?.ingredient?.questionType}
                                        {/* item 2 */}
                                      </span>
                                      <span className="recipe">
                                        {ingredient?.ingredient?.examType}
                                        {/* item 3 */}
                                      </span>
                                      <span
                                        className="delete"
                                        onClick={() => {
                                          deleteItem(
                                            ingredient._id,
                                            // question.foodMenuItem,
                                            index,
                                            "exam",
                                            // question._id,
                                            index
                                          );
                                        }}
                                      >
                                        <GetIcon icon={"close"} />
                                      </span>
                                    </Variant>
                                  </>
                                );
                              })
                            : ""}
                          {examQuestions?.length > 0
                            ? examQuestions?.map((item, index) => {
                                // Render your items inside the FoodButton here
                                // For example, you can render a list of items like this
                                return (
                                  <Variant className="vertical">
                                    <span className="recipe">
                                      {item?.title}
                                    </span>
                                    <span className="variant">
                                      {"Items: " + item.mealItems?.length}{" "}
                                    </span>
                                    <span
                                      className="delete"
                                      onClick={() => {
                                        deleteItem(
                                          item?.foodMenuItem,
                                          index,
                                          "exam",
                                          // question._id,
                                          index
                                        );
                                      }}
                                    >
                                      <GetIcon icon={"close"} />
                                    </span>
                                  </Variant>
                                );
                              })
                            : ""}
                        </Variants>
                      }
                    ></DropTarget>
                  </Div>
                </TableCell>

                <MealCategoryCell></MealCategoryCell>
              </TableRow>
              {/* // ))} */}
            </TableBody>
          </Table>
        </RowContainer>
      </DndProvider>
    </ColumnContainer>
  ) : (
    <NoData>Loading</NoData>
  );
};

export default RecipeNew;
