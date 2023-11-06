import React, { useEffect, useState } from "react";
import Layout from "../../../common/layout";
import { Container } from "../../../common/layout/styels";
import {
  ColumnContainer,
  RowContainer,
} from "../../../../styles/containers/styles";
import { TabContainer } from "../../Calories/avialableCalories/styles";
import { TabButton } from "../../mealSettings/foodMenu/setupMenu/styles";
import FormInput from "../../../../elements/input";
import { FilterBox } from "../../../../elements/list/styles";
import { Head, Items } from "../styels";
import { GetIcon } from "../../../../../icons";
import {
  Patient,
  Patients,
  Recepe,
  RecepeContent,
  RecepeData,
  RecepeImage,
} from "../../user/patient/dietMenu/styles";
import { food } from "../../../../../images";
import { getData } from "../../../../../backend/api";

const Preparation = (props) => {
  useEffect(() => {
    document.title = `Today Order - Diet Food Management Portal`;
  }, []);
  const [showAllReplacable, setShowAllReplacable] = useState(false);
  const [filterView, setFilterView] = useState({
    date: new Date().toISOString(),
    mealTimeCategory: "",
    typeOfRecipe: "",
  });
  const [openRecipe, setOpenRecipe] = useState({});
  const [preparing, setPreparing] = useState([]);
  const [prepared, setPrepared] = useState([]);
  const takeData = () => {
    // Fetch all recipe schedules here
    getData({}, "preperation")
      .then((data) => {
        console.log(data);
        
        const userName = data.data.response
        console.log(userName);
        console.log(data.data.response.user);
        setPreparing(data.data.response);
        setPrepared(data.prepared);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    takeData();
  }, []);
  const [date] = useState({
    type: "date",
    placeholder: "Date",
    customClass: "filter",
    name: "date",
    validation: "",
    default: "",
    tag: true,
    label: "Date",
    required: true,
    view: true,
    add: true,
    update: true,
  });
  const [mealtimeCategories] = useState({
    type: "select",
    apiType: "API",
    selectApi: "mealtime-category/select",
    placeholder: "Mealtime Category",
    name: "mealTimeCategory",
    customClass: "filter auto single",
    validation: "",
    showItem: "mealtimeCategoriesName",
    default: "",
    tag: true,
    label: "Mealtime Category",
    required: true,
    view: true,
    add: true,
    update: true,
    filter: true,
  });
  const [typeOfRecipe] = useState({
    type: "select",
    placeholder: "Type Of Recipe",
    name: "typeOfRecipe",
    validation: "",
    customClass: "filter auto single",
    default: "",
    tag: true,
    label: "Type Of Recipe",
    required: true,
    view: true,
    add: true,
    update: true,
    filter: true,
    selectApi: "Bread,Meat,Fruit,Dessert,Salad,Soup,Mixed",
    apiType: "CSV",
  });

  const filterChange = (option, name, type) => {
    const updateValue = {
      ...filterView,
      [name]:
        type === "select"
          ? option.id
          : type === "date"
          ? option?.toISOString()
          : null,
    };
    setFilterView(updateValue);

    // Make an API call to fetch data based on the selected filters
    getData({ mealTimeCategory: updateValue.mealTimeCategory }, "preperation")
      .then((data) => {
        // Update your state with the retrieved data
        setPreparing(data.data.response);
        setPrepared(data.prepared);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  };

  const moveRecipeToPrepared = (recipeId) => {
    // Make an API call to update the status of the recipe to "prepared"
    // Replace 'yourApiCall' with your actual API endpoint to update the status
    getData({ recipeId }, "preperation/prepared")
      .then((data) => {
        // Handle success, e.g., refresh the list of recipes
        // You might want to refetch the data or update the state accordingly
        console.log("Recipe moved to Prepared", data);

        // You can also update the state to reflect the change
        // For example, you can remove the recipe from 'preparing' and add it to 'prepared'
        // Make sure to update the state based on the response from your API call
        setPreparing((prevPreparing) =>
          prevPreparing.filter((recipe) => recipe._id !== recipeId)
        );
        setPrepared(data.preparedRecipes); // Update prepared recipes from the API response

        // Handle other actions if needed
      })
      .catch((error) => {
        // Handle error
        console.error("Error moving recipe to Prepared", error);
      });
  };

  return (
    <Container className="noshadow">
      <ColumnContainer>
        <RowContainer className="order">
          <RowContainer className="order-page">
            <TabContainer>
              <TabButton
                className={showAllReplacable === true}
                onClick={() => setShowAllReplacable(false)}
              >
                Preparing
              </TabButton>
              <TabButton
                className={showAllReplacable === false}
                onClick={() => setShowAllReplacable(true)}
              >
                Prepared
              </TabButton>
            </TabContainer>
            <FilterBox className="gap">
              <FormInput
                value={filterView[date.name]}
                key={`input` + 0}
                id={date.name}
                onChange={filterChange}
                {...date}
                required={false}
              />
              <FormInput
                value={filterView[mealtimeCategories.name]}
                key={`input` + 1}
                id={mealtimeCategories.name}
                onChange={filterChange}
                {...mealtimeCategories}
                required={false}
              />
              <FormInput
                value={filterView[typeOfRecipe.name]}
                key={`input` + 2}
                id={typeOfRecipe.name}
                onChange={filterChange}
                {...typeOfRecipe}
                required={false}
              />
            </FilterBox>
          </RowContainer>
          <RowContainer className="order-page">
            <RowContainer>
              <ColumnContainer className="gap">
                <Head className="first">
                  <span>
                    Preparing <i>{preparing?.length} Items</i>
                  </span>
                  <GetIcon icon={"preparation"} />
                </Head>
                <Head className="last">
                  <span>
                    Prepared <i>{prepared?.length} Items</i>
                  </span>
                  <GetIcon icon={"checked"} />
                </Head>
              </ColumnContainer>
              <ColumnContainer className="gap">
                <Items>
                  {preparing?.map((recipeItem, recepeIndex) => (
                    <Recepe
                      className={"recipe order"}
                      key={`recipe-${recepeIndex}`}
                    >
                      <RecepeContent className="recipe1">
                        <RecepeImage
                          src={
                            recipeItem.recipe.photo
                              ? process.env.REACT_APP_CDN +
                                recipeItem.recipe.photo
                              : food
                          }
                        ></RecepeImage>
                        <RecepeData className="recipe">
                          <span className="title">
                            {recipeItem.recipe.title}
                          </span>
                          <span className="light">
                            <span>
                              {recipeItem.recipe.gram?.toFixed(2)} gram
                            </span>
                            <span>
                              {recipeItem.recipe.quantiy?.toFixed(0)} nos
                            </span>
                          </span>
                          <div className="actions">
                            <span
                              className="delete full"
                              title="View Recipe Info"
                              onClick={() => {
                                moveRecipeToPrepared(recipeItem._id);
                              }}
                            >
                              Move to Prepared
                              <GetIcon icon={"next"} />
                            </span>
                            <span
                              className="info"
                              title="View Recipe Info"
                              onClick={() => {
                                setOpenRecipe((prev) => ({
                                  ...prev,
                                  ["preparing_" + recipeItem._id]: !(
                                    prev["preparing_" + recipeItem._id] ?? false
                                  ),
                                }));
                              }}
                            >
                              {!(openRecipe[recipeItem._id] ?? false) ? (
                                <GetIcon icon={"down"} />
                              ) : (
                                <GetIcon icon={"up"} />
                              )}
                            </span>
                          </div>
                          {openRecipe[recipeItem._id] && (
                            <Patients>
                              {/* {recipeItem.user?.map((item) => ( */}
                                <Patient>
                                  <span className="light">
                                    <span className="bold">
                                      {recipeItem.user.username}
                                    </span>
                                    <span className="bold">
                                      {recipeItem.recipe.gram?.toFixed(2)} g
                                    </span>
                                    <span>{recipeItem.recipeNote}</span>
                                  </span>
                                </Patient>
                              {/* ))} */}
                            </Patients>
                          )}
                        </RecepeData>
                      </RecepeContent>
                    </Recepe>
                  ))}
                </Items>
                <Items>
                  {prepared?.map((recipeItem, recepeIndex) => (
                    <Recepe
                      className={"recipe order"}
                      key={`recipe-${recepeIndex}`}
                    >
                      <RecepeContent className="recipe">
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
                            <span>{recipeItem.gram?.toFixed(2)} gram</span>
                            <span>{recipeItem.quantiy?.toFixed(2)} nos</span>
                          </span>
                        </RecepeData>
                      </RecepeContent>
                    </Recepe>
                  ))}
                </Items>
              </ColumnContainer>
            </RowContainer>
          </RowContainer>
        </RowContainer>
      </ColumnContainer>
    </Container>
  );
};
export default Layout(Preparation);
