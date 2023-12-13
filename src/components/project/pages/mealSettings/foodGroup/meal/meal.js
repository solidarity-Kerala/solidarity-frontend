import React, { useCallback, useEffect, useState } from "react";
import { GetIcon } from "../../../../../../icons";
import { deleteData, getData, postData } from "../../../../../../backend/api";
import { NoData } from "../../../../../core/list/styles";
import { ColumnContainer, RowContainer } from "../../../../../styles/containers/styles";
import Search from "../../../../../core/search";
import { TabContainer, TabButton, Table, TableHeader, TableBody, TableRow, MealCategoryCell, Div, TableCell, TabData, TabDataItem, MealItem, Title, Variants, Variant } from "./styles"; // Import styles from styles.js
import DraggableItem from "./dragdrop/drag";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import DropTarget from "./dragdrop/drop";

const Meal = ({ openData, themeColors, setMessage }) => {
  const daysOfWeek = ["Recipe Variant"];
  const [questions, setQuestions] = useState([]);
  const [activeTab, setActiveTab] = useState("meals");
  const [searchValue, setSearchValue] = useState("");
  const [examQuestions, setExamQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [selectedMealItem, setSelectedMealItem] = useState();

  const searchChange = (item) => {
    setSearchValue(item.target.value);
  };

  const handleTabClick = useCallback((tab) => {
    setActiveTab(tab);
    getData({}, "recipe-variant").then((result) => {
      setQuestions(result.data?.response);
    });
  }, []);

  useEffect(() => {
    handleTabClick("meals");
  }, [handleTabClick]);

  const deleteItem = async (id, index, mealOrRecepe, mealTimeCategory, dayNumber) => {
    setMessage({
      type: 2,
      content: "Are you sure do delete?",
      proceed: "Delete",
      onProceed: async () => {
        await deleteData({ id }, "meal-item");

        await getData({ meal: openData?.data?._id }, "meal-item").then((response) => {
          // setMenuData(response.data);
          setSelectedMealItem(response?.data?.response);
        });
      },
      data: { id },
    });
  };

  const onDrop = async (item, data) => {
    const response = await postData(
      {
        meal: openData?.data?._id,
        recipe: item.recipe._id,
        recipeVariant: item._id,
      },
      "meal-item"
    );
    setExamQuestions(response?._id);
    // setMenuData(menuDataTemp);
    console.log({ openData, themeColors, setMessage });
    console.log({ item, data });
    await getData(
      {
        meal: openData?.data?._id,
        // recipe: item.recipe._id,
        // recipeVariant: item._id,
      },
      "meal-item"
    ).then((response) => {
      setSelectedMealItem(response?.data?.response);
      // setMenuData(response.data);
    });
  };

  useEffect(() => {
    getData({ meal: openData?.data?._id }, "meal-item").then((response) => {
      setSelectedQuestions(response?.data?.response);
      // setSelectedIngredient(response?.data?.response);
      setSelectedMealItem(response?.data?.response);
    });

    getData({}, "recipe").then((response_one) => {
      //   setSelectedQuestions(response_one?.data?.response);
    });
    getData({}, "recipe-variant").then((response) => {
      // setSelectedQuestions(response?.data?.response);
    });
  }, [openData?.data?._id]);

  console.log({ openData });

  return selectedQuestions ? (
    <ColumnContainer style={{ marginBottom: "30px" }}>
      <DndProvider backend={HTML5Backend}>
        <RowContainer className="">
          <TabContainer>
            <TabButton active={activeTab === "meals"} onClick={() => handleTabClick("meals")}>
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
            <Search title={"Search"} theme={themeColors} placeholder="Search" value={searchValue} onChange={searchChange} />
            {activeTab === "meals" && (
              <TabDataItem>
                {questions?.map((variant) => (
                  // <MealItem key={variant?._id}>
                  //   <div>{variant.title ?? "Title not found!"}</div>
                  // </MealItem>
                  <DraggableItem
                    key={variant?._id}
                    item={{
                      ...variant,
                      mealOrRecepe: "variant",
                      variant: { title: variant?.recipe?.title },
                    }}
                    element={
                      <MealItem key={variant?._id} onClick={() => onDrop(variant)}>
                        <Title>
                          {variant?.recipe?.title ?? "Title not found!"} {"-"} {variant?.variant}
                        </Title>
                        <Title>
                          {/* <span>BHD</span>
                            <span className="price">{variant.variant}</span> */}
                          <span className="offer">Calories: </span>
                          <span>{variant?.calories}</span>
                          <span className="offer">Protein: </span>
                          <span>{variant?.protein}</span>
                          <span className="offer">Fat: </span>
                          <span>{variant?.satFat}</span>
                          <span className="offer">UnSatFat: </span>
                          <span>{variant?.unSatFat}</span>
                          <span className="offer">Total Fat: </span>
                          <span>{variant?.totalFat}</span>
                          <span className="offer">Cholesterol: </span>
                          <span>{variant?.cholesterol}</span>
                          <span className="offer">Fiber: </span>
                          <span>{variant?.fiber}</span>
                          <span className="offer">Carbohydrate: </span>
                          <span>{variant?.carbohydrate}</span>
                          <span className="offer">Sugars: </span>
                          <span>{variant?.sugars}</span>
                          <span className="offer">Iron: </span>
                          <span>{variant?.iron}</span>
                          <span className="offer">Calcium: </span>
                          <span>{variant?.calcium}</span>
                          <span className="offer">Cho: </span>
                          <span>{variant?.cho}</span>
                          <span className="offer">Fat: </span>
                          <span>{variant?.fat}</span>
                        </Title>
                        <Variants>
                          {variant?.mealItems?.map((item) => {
                            const recipeVariant = item.recipeVariant;
                            return (
                              <Variant key={item?._id}>
                                <span>
                                  <span className="recipe">{recipeVariant.recipe.title}</span>
                                </span>
                                <span className="variant">{recipeVariant.variant}</span>
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
            {activeTab === "recipes" && (
              <TabDataItem>
                {daysOfWeek?.map((recipe) => (
                  <MealItem key={recipe?._id}>
                    <Title>{recipe.title ?? "Title not found!"}</Title>
                    <Variants>
                      {daysOfWeek?.map((variant) => {
                        return (
                          <DraggableItem
                            key={variant?._id}
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
                                  <span className="offer">{variant.price}</span>{" "}
                                </span>
                                <span className="variant">{variant.variant} </span>
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
        {/* <p>protein: {openData?.data?.protein}</p> */}
        <div className="box">
          <span className="offer">Calories: </span>
          <span>{openData?.data?.calories}</span>
          <span className="offer">Protein: </span>
          <span>{openData?.data?.protein}</span>
          <span className="offer">Fat: </span>
          <span>{openData?.data?.satFat}</span>
          <span className="offer">UnSatFat: </span>
          <span>{openData?.data?.unSatFat}</span>
          <span className="offer">Total Fat: </span>
          <span>{openData?.data?.totalFat}</span>
          <span className="offer">Cholesterol: </span>
          <span>{openData?.data?.cholesterol}</span>
          <span className="offer">Fiber: </span>
          <span>{openData?.data?.fiber}</span>
          <span className="offer">Carbohydrate: </span>
          <span>{openData?.data?.carbohydrate}</span>
          <span className="offer">Sugars: </span>
          <span>{openData?.data?.sugars}</span>
          <span className="offer">Iron: </span>
          <span>{openData?.data?.iron}</span>
          <span className="offer">Calcium: </span>
          <span>{openData?.data?.calcium}</span>
          <span className="offer">Cho: </span>
          <span>{openData?.data?.cho}</span>
          <span className="offer">Fat: </span>
          <span>{openData?.data?.fat}</span>
        </div>
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
              // key={question?._id}
              >
                <Variants className="vertical">{/* <MealCategoryCell>{index + 1}</MealCategoryCell> */}</Variants>
                <TableCell
                // className={index === 0 ? "first" : ""}
                // key={index}
                >
                  <Div>
                    <DropTarget
                      onDrop={onDrop}
                      // data={{
                      //   question: question?._id,
                      //   index,
                      // }}
                      element={
                        <Variants className="vertical">
                          {selectedMealItem?.length > 0
                            ? selectedMealItem?.map((variant, index) => {
                                // Render your items inside the FoodButton here
                                // For example, you can render a list of items like this
                                return (
                                  <>
                                    <Variant className="vertical">
                                      <span className="recipe">
                                        {variant?.recipe?.title} {variant?.recipeVariant?.variant}
                                        {/* item 1 */}
                                      </span>
                                      <span className="recipe">
                                        Protien: {variant?.recipeVariant?.protein}
                                        {/* item 1 */}
                                      </span>
                                      <span className="variant">
                                        {variant?.recipeVariant?.satFat}
                                        {/* item 2 */}
                                      </span>
                                      <span className="recipe">
                                        {variant?.recipeVariant?.unSatFat}
                                        {/* item 3 */}
                                      </span>
                                      <span
                                        className="delete"
                                        onClick={() => {
                                          deleteItem(
                                            variant?._id,
                                            // question.foodMenuItem,
                                            index,
                                            "exam",
                                            // question?._id,
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
                                    <span className="recipe">{item?.title}</span>
                                    <span className="variant">{"Items: " + item.mealItems?.length} </span>
                                    <span
                                      className="delete"
                                      onClick={() => {
                                        deleteItem(
                                          item?.foodMenuItem,
                                          index,
                                          "exam",
                                          // question?._id,
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

export default Meal;
