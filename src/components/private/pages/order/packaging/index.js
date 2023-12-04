import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";
import Layout from "../../../common/layout";
import { Container } from "../../../common/layout/styels";
import { ColumnContainer, RowContainer } from "../../../../styles/containers/styles";
import FormInput from "../../../../elements/input";
import { Filter, FilterBox } from "../../../../elements/list/styles";
import { DataBox, Head, Items, Patient, SubHead } from "../styels";
import { GetIcon } from "../../../../../icons";
import { Patients, Recepe, RecepeContent, RecepeData, RecepeImage } from "../../user/patient/dietMenu/styles";
import { food } from "../../../../../images";
import { getData, postData } from "../../../../../backend/api";
import Checkbox from "../../../../elements/checkbox";
import { useSelector } from "react-redux";
import PopupView from "../../../../elements/popupview";
import Print from "./print";
import LabelPrint from "./labelPrint";

const Preparation = (props) => {
  useEffect(() => {
    document.title = `Today Order - Diet Food Management Portal`;
  }, []);
  const { setLoaderBox } = props;
  const themeColors = useSelector((state) => state.themeColors);
  const [openPrint, setOpenPrint] = useState(false);
  const [openPrintType, setOpenPrintType] = useState(null);
  const [filterView, setFilterView] = useState({
    scheduleDate: new Date().toISOString(),
    mealTimeCategory: "",
    typeOfRecipe: "",
    productionDepartment: "",
  });
  const filterChange = async (option, name, type) => {
    const updateValue = {
      ...filterView,
      [name]: type === "select" ? option.id : type === "date" ? option?.toISOString() : null,
    };
    setFilterView(updateValue);
    // loadData(updateValue);
  };
  const [preparing, setPreparing] = useState([]);
  const [prepared, setPrepared] = useState(null);

  const loadData = useCallback(
    async (updateValue) => {
      console.log("setLoaderBox", setLoaderBox);
      setLoaderBox(true);
      const preperation = await getData({ ...updateValue, prepared: false }, "preperation/packaging");
      // const prepared = await getData({ ...updateValue, prepared: true }, "preperation");
      setPreparing(preperation.data.response);
      setPrepared(null);
      setLoaderBox(false);
    },
    [setLoaderBox, setPreparing] // Add dependencies here
  );
  const [selectedIndex, setSelectedIndex] = useState(null);
  useLayoutEffect(() => {
    const fetchData = async () => {
      await loadData(filterView);
    };

    fetchData();
  }, [filterView, loadData]);
  const statusChange = (recipeSchedule, status, index) => {
    setLoaderBox(true);
    postData({ recipeSchedule, status }, "preperation/move-to-delivery").then((response) => {
      if (response.status === 200) {
        const preparationTemp = [...preparing];
        preparationTemp[selectedIndex].schedules[index].status = status;
        setPreparing(preparationTemp);
        setPrepared(preparationTemp[selectedIndex]);
      }
      setLoaderBox(false);
    });
  };
  const [date] = useState({
    type: "date",
    placeholder: "scheduleDate",
    customClass: "filter",
    name: "scheduleDate",
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
  const [productionDepartment] = useState({
    type: "select",
    placeholder: "Production Department",
    name: "productionDepartment",
    customClass: "filter auto single",
    validation: "",
    default: "",
    tag: true,
    label: "Production Department",
    required: true,
    view: true,
    add: true,
    update: true,
    filter: true,
    selectApi: "Hot kitchen, Cold kitchen, Bakery, Salad section, Sandwich section",
    apiType: "CSV",
  });
  return (
    <Container className="noshadow">
      <ColumnContainer>
        <RowContainer className="order">
          <RowContainer className="order-page">
            <FilterBox className="gap">
              <FormInput value={filterView[date.name]} key={`input` + 0} id={date.name} onChange={filterChange} {...date} required={false} />
              <Filter
                theme={themeColors}
                onClick={() => {
                  setOpenPrintType(1);
                  setOpenPrint(true);
                }}
              >
                <GetIcon icon={"print"} />
              </Filter>
            </FilterBox>
            <FilterBox className="gap">
              <FormInput value={filterView[mealtimeCategories.name]} key={`input` + 1} id={mealtimeCategories.name} onChange={filterChange} {...mealtimeCategories} required={false} />
              <FormInput value={filterView[productionDepartment.name]} key={`input` + 1} id={productionDepartment.name} onChange={filterChange} {...productionDepartment} required={false} />
              <FormInput value={filterView[typeOfRecipe.name]} key={`input` + 2} id={typeOfRecipe.name} onChange={filterChange} {...typeOfRecipe} required={false} />
            </FilterBox>
          </RowContainer>
          <RowContainer className="order-page">
            <RowContainer>
              <ColumnContainer className="gap"></ColumnContainer>
              <ColumnContainer className="gap">
                <Items>
                  <Head className="first">
                    <span>
                      <GetIcon icon={"preparation"} />
                      List to Package <i>{preparing?.length} Items</i>
                    </span>
                    <Filter
                      className="single"
                      theme={themeColors}
                      onClick={() => {
                        setOpenPrintType(2);
                        setOpenPrint(true);
                      }}
                    >
                      <GetIcon icon={"print"} />
                    </Filter>
                  </Head>
                  <DataBox>
                    {preparing?.map((recipeItem, recipeIndex) => {
                      const count = recipeItem.schedules.filter((item) => item.status === "Packaging").length;
                      return (
                        <div className={selectedIndex === recipeIndex ? "selected" : ""} key={`recipe-group-${recipeIndex}`}>
                          {recipeItem.user && (
                            <Recepe
                              onClick={() => {
                                setPrepared(recipeItem);
                                setSelectedIndex(recipeIndex);
                              }}
                              className="recipe order"
                              key={`recipe-${recipeIndex}`}
                            >
                              <RecepeContent className="recipe1">
                                {/* <RecepeImage src={recipeItem.recipe.photo ? `${process.env.REACT_APP_CDN}${recipeItem.recipe.photo}` : food}></RecepeImage> */}
                                <RecepeData className="recipe">
                                  <span className="user">
                                    {recipeItem.user.fullName}
                                    <span className="light">
                                      <span>{recipeItem.gram?.toFixed(2)} gram</span>
                                      <span>{recipeItem.count?.toFixed(0)} nos</span>
                                    </span>
                                  </span>
                                  {recipeItem.userData.foodDisLikeList.length > 0 && (
                                    <div className="conditions small">
                                      <span>Food DisLike List:</span> {recipeItem.userData.foodDisLikeList.map((dislike) => dislike.proteinCategoriesName).join(", ")}
                                    </div>
                                  )}
                                  {recipeItem.userData.allergyList.length > 0 && (
                                    <div className="conditions small">
                                      <span>Allergy List:</span> {recipeItem.userData.allergyList.map((allergy) => allergy.title).join(", ")}
                                    </div>
                                  )}
                                  {recipeItem.userData.medicalCondition && (
                                    <div className="conditions small">
                                      <span>Medical Condition:</span> {recipeItem.userData.medicalCondition.map((allergy) => allergy.medicalConditionsName).join(", ")}
                                    </div>
                                  )}
                                  <div className="conditions small">
                                    <span>Ref No: {recipeItem.user.cprNumber}</span>
                                  </div>
                                  {count > 0 && <span className={"conditions small red"}>Ready for Package: {count ?? 0}</span>}
                                </RecepeData>
                              </RecepeContent>
                            </Recepe>
                          )}
                        </div>
                      );
                    })}
                  </DataBox>
                  {preparing?.length === 0 && (
                    <div key={`recipe-group`}>
                      <Recepe className="recipe order" key={`recipe`}>
                        No Recipe to Pack!
                      </Recepe>
                    </div>
                  )}
                </Items>
                {prepared && (
                  <Items className="sticky">
                    <Head className="last">
                      <span>
                        <GetIcon icon={"recipe"} />
                        {prepared.user.fullName} <i>{prepared?.schedules.length} Items</i>
                      </span>

                      <Filter
                        className="single"
                        theme={themeColors}
                        onClick={() => {
                          setOpenPrintType(3);
                          setOpenPrint(true);
                        }}
                      >
                        <GetIcon icon={"print"} />
                      </Filter>
                    </Head>
                    <DataBox aBox key={`recipe-group`}>
                      <Recepe className="recipe order" key={`recipe`}>
                        <RecepeContent className="recipe1">
                          <RecepeData className="recipe">
                            <Patients>
                              {(() => {
                                let order = ""; // Ensure 'order' is initialized
                                // Optional: Add sorting if needed
                                const sortedSchedules = prepared.schedules.sort((a, b) => a.status.localeCompare(b.status));

                                return sortedSchedules.map((item, recipeIndex) => {
                                  const recipes = (
                                    <React.Fragment key={"recipe-item" + recipeIndex}>
                                      {(order !== item.status || order === "") && <SubHead>{item.status === "Scheduled" ? "Preparing" : item.status}</SubHead>}
                                      <Patient>
                                        <RecepeContent className="recipe1">
                                          <RecepeImage src={item.recipe.photo ? process.env.REACT_APP_CDN + item.recipe.photo : food}></RecepeImage>
                                          {item.status === "Packaging" && (
                                            <Checkbox
                                              onChange={() => {
                                                statusChange(item._id, "Out for Delivery", recipeIndex);
                                              }}
                                              checked={["Out for Delivery"].includes(item.status.toString())}
                                              theme={themeColors}
                                            ></Checkbox>
                                          )}
                                          <RecepeData className="recipe">
                                            <span className="title">{item.recipe.title}</span>
                                            <span className="light">
                                              <div className="bold">{item.nutritionInfo.gram?.toFixed(2)} g</div>
                                              <span>{item.mealTimeCategoryInfo.mealtimeCategoriesName}</span>
                                              <span>{item.status === "Scheduled" ? "Preparing • You can pack this only once prepared" : item.status}</span>
                                            </span>
                                          </RecepeData>
                                        </RecepeContent>
                                      </Patient>
                                    </React.Fragment>
                                  );
                                  order = item.status;
                                  return recipes;
                                });
                              })()}
                            </Patients>
                          </RecepeData>
                        </RecepeContent>
                      </Recepe>
                    </DataBox>
                    {prepared?.length === 0 && (
                      <div key={`recipe-group`}>
                        <Recepe className="recipe order" key={`recipe`}>
                          No Item in Packaging!
                        </Recepe>
                      </div>
                    )}
                  </Items>
                )}
              </ColumnContainer>
            </RowContainer>
          </RowContainer>
        </RowContainer>
      </ColumnContainer>
      {openPrint && (
        <PopupView
          customClass={"print"}
          popupData={
            openPrintType === 1 ? (
              <Print
                customClass={"print"}
                openData={preparing}
                setMessage={props.setMessage}
                closeModal={() => {
                  setOpenPrint(false);
                }}
              />
            ) : openPrintType === 2 ? (
              <LabelPrint
                customClass={"print"}
                openData={preparing}
                setMessage={props.setMessage}
                closeModal={() => {
                  setOpenPrint(false);
                }}
              />
            ) : (
              <LabelPrint
                customClass={"print"}
                openData={[prepared]}
                setMessage={props.setMessage}
                closeModal={() => {
                  setOpenPrint(false);
                }}
              />
            )
          }
          themeColors={themeColors}
          closeModal={() => setOpenPrint(false)}
          itemTitle={{ name: "title", type: "text", collection: "" }}
          openData={{ data: { key: "print_preparation", title: "Print Packaging" } }}
        ></PopupView>
      )}
    </Container>
  );
};

export default Layout(Preparation);
