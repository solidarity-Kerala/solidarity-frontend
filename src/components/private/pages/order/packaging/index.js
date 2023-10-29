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

const Packaging = (props) => {
  useEffect(() => {
    document.title = `Today Order - Diet Food Management Portal`;
  }, []);
  const [showAllReplacable, setShowAllReplacable] = useState(false);
  const [filterView, setFilterView] = useState({ date: new Date().toISOString(), deliveryArea: "", deliveryMan: "" });
  const [openRecipe, setOpenRecipe] = useState({});
  const [packaging, setPackaging] = useState();
  const [packaged, setPackaged] = useState();
  const takeData = () => {
    setPackaging([
      {
        _id: 1,
        userDisplayName: "Azhar PK",
        id: "12321312",
        items: 2,
        recipes: [
          { _id: 1, mealTimeCategory: { mealTimeCategoryName: "Break Fast" }, gram: 100, recipeNote: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", recipe: { title: "Pineaple Juice", photo: "public/dfms/uploads/meals/photo-1696104654422.jpg" } },
          { _id: 2, mealTimeCategory: { mealTimeCategoryName: "Break Fast" }, gram: 100, recipeNote: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", recipe: { title: "Pineaple Juice", photo: "public/dfms/uploads/meals/photo-1696104654422.jpg" } },
          { _id: 3, mealTimeCategory: { mealTimeCategoryName: "Break Fast" }, gram: 100, recipeNote: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", recipe: { title: "Pineaple Juice", photo: "public/dfms/uploads/meals/photo-1696104654422.jpg" } },
        ],
      },
      {
        _id: 2,
        userDisplayName: "Azhar PK",
        id: "12321312",
        items: 2,
        recipes: [{ _id: 1, mealTimeCategory: { mealTimeCategoryName: "Break Fast" }, gram: 90, recipeNote: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", recipe: { title: "Pineaple Juice", photo: "public/dfms/uploads/meals/photo-1696104654422.jpg" } }],
      },
      {
        _id: 3,
        userDisplayName: "Azhar PK",
        id: "12321312",
        items: 2,
        recipes: [{ _id: 1, mealTimeCategory: { mealTimeCategoryName: "Break Fast" }, gram: 100, recipeNote: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", recipe: { title: "Pineaple Juice", photo: "public/dfms/uploads/meals/photo-1696104654422.jpg" } }],
      },
    ]);
    setPackaged([
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
  const [deliveryMan] = useState({
    type: "select",
    apiType: "API",
    selectApi: "mealtime-category/select",
    placeholder: "Delivery Man",
    name: "deliveryMan",
    customClass: "filter auto single",
    validation: "",
    showItem: "mealtimeCategoriesName",
    default: "",
    tag: true,
    label: "Delivery Man",
    required: true,
    view: true,
    add: true,
    update: true,
    filter: true,
  });
  const [deliveryArea] = useState({
    type: "select",
    apiType: "API",
    selectApi: "mealtime-category/select",
    placeholder: "Mealtime Category",
    name: "deliveryArea",
    customClass: "filter auto single",
    validation: "",
    showItem: "mealtimeCategoriesName",
    default: "",
    tag: true,
    label: "Delivery Area",
    required: true,
    view: true,
    add: true,
    update: true,
    filter: true,
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
                Packaging
              </TabButton>
              <TabButton className={showAllReplacable === false} onClick={() => setShowAllReplacable(true)}>
                Packaged
              </TabButton>
            </TabContainer>
            <FilterBox className="gap">
              <FormInput value={filterView[date.name]} key={`input` + 0} id={date.name} onChange={filterChange} {...date} required={false} />
              <FormInput value={filterView[deliveryMan.name]} key={`input` + 1} id={deliveryMan.name} onChange={filterChange} {...deliveryMan} required={false} />
              <FormInput value={filterView[deliveryArea.name]} key={`input` + 2} id={deliveryArea.name} onChange={filterChange} {...deliveryArea} required={false} />
            </FilterBox>
          </RowContainer>
          <RowContainer className="order-page">
            <RowContainer>
              <ColumnContainer className="gap">
                <Head className="first">
                  <span>
                    Packaging <i>{packaging?.length} boxes</i>
                  </span>
                  <GetIcon icon={"packaging"} />
                </Head>
                <Head className="last">
                  <span>
                    Packaged <i>{packaged?.length} boxes</i>
                  </span>
                  <GetIcon icon={"checked"} />
                </Head>
              </ColumnContainer>
              <ColumnContainer className="gap">
                <Items>
                  {packaging?.map((user, recepeIndex) => (
                    <Recepe className={"recipe order"} key={`recipe-${recepeIndex}`}>
                      <RecepeContent className="recipe1">
                        {/* <RecepeImage src={user.recipe.photo ? process.env.REACT_APP_CDN + recipeItem.recipe.photo : food}></RecepeImage> */}
                        <RecepeData className="recipe">
                          <span className="title">{user.userDisplayName}</span>
                          <span className="light">
                            <span>{user.recipes.length?.toFixed(0)} items</span>
                          </span>
                          <div className="actions">
                            <span
                              className="delete full"
                              title="View Recipe Info"
                              onClick={() => {
                                //setPopupData({ nutritionInfo: recipeItem.nutritionInfo, data: recipeItem.recipe, recipe: recipeItem, availablecalories: recipeItem.availablecalories });
                              }}
                            >
                              Move to Packaged
                              <GetIcon icon={"next"} />
                            </span>
                            <span
                              className="info"
                              title="View Recipe Info"
                              onClick={() => {
                                setOpenRecipe((prev) => ({
                                  ...prev,
                                  ["packaging_" + user._id]: !(prev["packaging_" + user._id] ?? false),
                                }));
                              }}
                            >
                              {!(openRecipe["packaging_" + user._id] ?? false) ? <GetIcon icon={"down"} /> : <GetIcon icon={"up"} />}
                            </span>
                          </div>
                          {openRecipe["packaging_" + user._id] && (
                            <Patients>
                              {user.recipes?.map((item) => (
                                <Patient>
                                  <RecepeContent className="recipe1">
                                    <RecepeImage src={item.recipe.photo ? process.env.REACT_APP_CDN + item.recipe.photo : food}></RecepeImage>
                                    <RecepeData className="recipe">
                                      <span className="title">{item.recipe.title}</span>
                                      <span className="light">
                                        <span>{item.gram?.toFixed(2)} gram</span>
                                        <span>{item.mealTimeCategory.mealTimeCategoryName}</span>
                                      </span>
                                    </RecepeData>
                                  </RecepeContent>
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
                  {packaging?.map((user, recepeIndex) => (
                    <Recepe className={"recipe order"} key={`recipe-${recepeIndex}`}>
                      <RecepeContent className="recipe1">
                        {/* <RecepeImage src={user.recipe.photo ? process.env.REACT_APP_CDN + recipeItem.recipe.photo : food}></RecepeImage> */}
                        <RecepeData className="recipe">
                          <span className="title">{user.userDisplayName}</span>
                          <span className="light">
                            <span>{user.recipes.length?.toFixed(0)} items</span>
                          </span>
                          <div className="actions">
                            <span
                              className="info"
                              title="View Recipe Info"
                              onClick={() => {
                                setOpenRecipe((prev) => ({
                                  ...prev,
                                  ["packaged_" + user._id]: !(prev["packaged_" + user._id] ?? false),
                                }));
                              }}
                            >
                              {!(openRecipe["packaged_" + user._id] ?? false) ? <GetIcon icon={"down"} /> : <GetIcon icon={"up"} />}
                            </span>
                          </div>
                          {openRecipe["packaged_" + user._id] && (
                            <Patients>
                              {user.recipes?.map((item) => (
                                <Patient>
                                  <RecepeContent className="recipe1">
                                    <RecepeImage src={item.recipe.photo ? process.env.REACT_APP_CDN + item.recipe.photo : food}></RecepeImage>
                                    <RecepeData className="recipe">
                                      <span className="title">{item.recipe.title}</span>
                                      <span className="light">
                                        <span>{item.gram?.toFixed(2)} gram</span>
                                        <span>{item.quantiy?.toFixed(0)} nos</span>
                                      </span>
                                    </RecepeData>
                                  </RecepeContent>
                                </Patient>
                              ))}
                            </Patients>
                          )}
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
export default Layout(Packaging);
