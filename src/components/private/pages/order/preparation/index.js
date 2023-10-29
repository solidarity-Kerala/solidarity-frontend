import React, { useEffect, useState } from "react";
import Layout from "../../../common/layout";
import { Container } from "../../../common/layout/styels";
import { ColumnContainer, RowContainer } from "../../../../styles/containers/styles";
import { TabContainer } from "../../Calories/avialableCalories/styles";
import { TabButton } from "../../mealSettings/foodMenu/setupMenu/styles";
import FormInput from "../../../../elements/input";
import { FilterBox } from "../../../../elements/list/styles";
import { Head, Items } from "../styels";
import { GetIcon } from "../../../../../icons";
import { Patient, Patients, Recepe, RecepeContent, RecepeData, RecepeImage } from "../../user/patient/dietMenu/styles";
import { food } from "../../../../../images";

const Preparation = (props) => {
  useEffect(() => {
    document.title = `Today Order - Diet Food Management Portal`;
  }, []);
  const [showAllReplacable, setShowAllReplacable] = useState(false);
  const [filterView, setFilterView] = useState({ date: new Date().toISOString(), mealTimeCategory: "", typeOfRecipe: "" });
  const [openRecipe, setOpenRecipe] = useState({});
  const [preparing, setPreparing] = useState();
  const [prepared, setPrepared] = useState();
  const takeData = () => {
    setPreparing([
      {
        _id: 1,
        gram: 20,
        quantiy: 2,
        recipe: { title: "Pineaple Juice", photo: "public/dfms/uploads/meals/photo-1696104654422.jpg" },
        patients: [
          { userDisplayName: "Azhar PK", recipeNote: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
          { userDisplayName: "Shameer Babu", recipeNote: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
        ],
      },
      { _id: 2, gram: 20, quantiy: 2, recipe: { title: "Pineaple Juice", photo: "public/dfms/uploads/meals/photo-1696104654422.jpg" } },
      { _id: 3, gram: 20, quantiy: 2, recipe: { title: "Pineaple Juice", photo: "public/dfms/uploads/meals/photo-1696104654422.jpg" } },
    ]);
    setPrepared([
      {
        _id: 1,
        gram: 20,
        quantiy: 2,
        recipe: { title: "Pineaple Juice", photo: "public/dfms/uploads/meals/photo-1696104654422.jpg" },
        patients: [
          { userDisplayName: "Azhar PK", recipeNote: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
          { userDisplayName: "Shameer Babu", recipeNote: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
        ],
      },
      { _id: 2, gram: 20, quantiy: 2, recipe: { title: "Pineaple Juice", photo: "public/dfms/uploads/meals/photo-1696104654422.jpg" } },
      { _id: 3, gram: 20, quantiy: 2, recipe: { title: "Pineaple Juice", photo: "public/dfms/uploads/meals/photo-1696104654422.jpg" } },
    ]);
  };
  useEffect(() => {
    takeData();
  },[]);
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
      [name]: type === "select" ? option.id : type === "date" ? option?.toISOString() : null,
    };
    setFilterView(updateValue);
    // updating the form values
  };
  return (
    <Container className="noshadow">
      <ColumnContainer>
        <RowContainer className="order">
          <RowContainer className="order-page">
            <TabContainer>
              <TabButton className={showAllReplacable === true} onClick={() => setShowAllReplacable(false)}>
                Preparing
              </TabButton>
              <TabButton className={showAllReplacable === false} onClick={() => setShowAllReplacable(true)}>
                Prepared
              </TabButton>
            </TabContainer>
            <FilterBox className="gap">
              <FormInput value={filterView[date.name]} key={`input` + 0} id={date.name} onChange={filterChange} {...date} required={false} />
              <FormInput value={filterView[mealtimeCategories.name]} key={`input` + 1} id={mealtimeCategories.name} onChange={filterChange} {...mealtimeCategories} required={false} />
              <FormInput value={filterView[typeOfRecipe.name]} key={`input` + 2} id={typeOfRecipe.name} onChange={filterChange} {...typeOfRecipe} required={false} />
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
                    <Recepe className={"recipe order"} key={`recipe-${recepeIndex}`}>
                      <RecepeContent className="recipe1">
                        <RecepeImage src={recipeItem.recipe.photo ? process.env.REACT_APP_CDN + recipeItem.recipe.photo : food}></RecepeImage>
                        <RecepeData className="recipe">
                          <span className="title">{recipeItem.recipe.title}</span>
                          <span className="light">
                            <span>{recipeItem.gram?.toFixed(2)} gram</span>
                            <span>{recipeItem.quantiy?.toFixed(0)} nos</span>
                          </span>
                          <div className="actions">
                            <span
                              className="delete full"
                              title="View Recipe Info"
                              onClick={() => {
                                //setPopupData({ nutritionInfo: recipeItem.nutritionInfo, data: recipeItem.recipe, recipe: recipeItem, availablecalories: recipeItem.availablecalories });
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
                                  ["preparing_" + recipeItem._id]: !(prev["preparing_" +recipeItem._id] ?? false),
                                }));
                              }}
                            >
                              {!(openRecipe[recipeItem._id] ?? false) ? <GetIcon icon={"down"} /> : <GetIcon icon={"up"} />}
                            </span>
                          </div>
                          {openRecipe[recipeItem._id] && (
                            <Patients>
                              {recipeItem.patients?.map((item) => (
                                <Patient>
                                  <span className="light">
                                    <span className="bold">{item.userDisplayName}</span>
                                    <span className="bold">{recipeItem.gram?.toFixed(2)} g</span>
                                    <span>{item.recipeNote}</span>
                                  </span>
                                </Patient>
                              ))}
                            </Patients>
                          )}
                        </RecepeData>
                      </RecepeContent>
                    </Recepe>
                  ))}
                </Items>
                <Items>
                  {prepared?.map((recipeItem, recepeIndex) => (
                    <Recepe className={"recipe order"} key={`recipe-${recepeIndex}`}>
                      <RecepeContent className="recipe">
                        <RecepeImage src={recipeItem.recipe.photo ? process.env.REACT_APP_CDN + recipeItem.recipe.photo : food}></RecepeImage>
                        <RecepeData>
                          <span className="title">{recipeItem.recipe.title}</span>
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
