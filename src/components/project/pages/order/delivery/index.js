import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";
import Layout from "../../../../core/layout";
import { Container } from "../../../../core/layout/styels";
import { ColumnContainer, RowContainer } from "../../../../styles/containers/styles";
import FormInput from "../../../../core/input";
import { FilterBox } from "../../../../core/list/styles";
import { DataBox, Head, Items, Patient, SubHead } from "../styels";
import { GetIcon } from "../../../../../icons";
import { Patients, Recepe, RecepeContent, RecepeData, RecepeImage } from "../../user/patient/dietMenu/styles";
import { food } from "../../../../../images";
import { getData, postData } from "../../../../../backend/api";
import Checkbox from "../../../../core/checkbox";
import { useSelector } from "react-redux";

const Delivery = (props) => {
  useEffect(() => {
    document.title = `Today Order - Diet Food Management Portal`;
  }, []);
  const { setLoaderBox } = props;
  const themeColors = useSelector((state) => state.themeColors);
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
      const preperation = await getData({ ...updateValue, prepared: false }, "preperation/delivery");
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
    postData({ recipeSchedule, status }, "preperation/move-to-delivered").then((response) => {
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
    selectApi: "Bread,Meat,Fruit,Dessert,Salad,Fat,Snacking,Soup,Mixed",
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
            </FilterBox>
            <FilterBox className="gap">
              <FormInput value={filterView[mealtimeCategories.name]} key={`input` + 1} id={mealtimeCategories.name} onChange={filterChange} {...mealtimeCategories} required={false} />
              <FormInput value={filterView[productionDepartment.name]} key={`input` + 2} id={productionDepartment.name} onChange={filterChange} {...productionDepartment} required={false} />
              <FormInput value={filterView[typeOfRecipe.name]} key={`input` + 3} id={typeOfRecipe.name} onChange={filterChange} {...typeOfRecipe} required={false} />
            </FilterBox>
          </RowContainer>
          <RowContainer className="order-page">
            <RowContainer>
              <ColumnContainer className="gap"></ColumnContainer>
              <ColumnContainer className="gap">
                <Items>
                  <Head className="first">
                    <span>
                      Out For Delivery <i>{preparing?.length} Items</i>
                    </span>
                    <GetIcon icon={"preparation"} />
                  </Head>
                  <DataBox>
                    {preparing?.map((recipeItem, recipeIndex) => {
                      const count = recipeItem.schedules.filter((item) => item.status === "Out for Delivery").length;
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
                                  <span className="title">{recipeItem.user.username}</span>
                                  <span className="light">
                                    <span>{recipeItem.gram?.toFixed(2)} gram</span>
                                    <span>{recipeItem.count?.toFixed(0)} nos</span>
                                  </span>
                                  <div className="small">Ref No: {recipeItem.user.cprNumber}</div>
                                  {count > 0 && <span className={"small red"}>Pending: {count ?? 0}</span>}
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
                        {prepared.user.username} <i>{prepared?.schedules.length} Items</i>
                      </span>
                      <GetIcon icon={"recipe"} />
                    </Head>
                    <DataBox aBox key={`recipe-group`}>
                      <Recepe className="recipe order" key={`recipe`}>
                        <RecepeContent className="recipe1">
                          <RecepeData className="recipe">
                            <Patients>
                              {(() => {
                                let lastStatus = "";
                                const sorted = prepared.schedules.sort((a, b) => a.status.localeCompare(b.status));

                                return sorted.map((item, recipeIndex) => {
                                  const isNewStatus = lastStatus !== item.status;
                                  lastStatus = item.status;

                                  return (
                                    <React.Fragment key={"recipe-item" + recipeIndex}>
                                      {isNewStatus && <SubHead>{item.status === "Scheduled" ? "Preparing" : item.status}</SubHead>}
                                      <Patient>
                                        <RecepeContent className="recipe1">
                                          <RecepeImage src={item.recipe.photo ? process.env.REACT_APP_CDN + item.recipe.photo : food}></RecepeImage>
                                          <Checkbox onChange={() => statusChange(item._id, "Delivered", recipeIndex)} checked={item.status !== "Out for Delivery"} theme={themeColors} />
                                          <RecepeData className="recipe">
                                            <span className="title">{item.recipe.title}</span>
                                            <span className="light">
                                              <div className="bold">{item.nutritionInfo.gram?.toFixed(2)} g</div>
                                              <span>{item.mealTimeCategoryInfo.mealtimeCategoriesName}</span>
                                              <span>{item.status === "Scheduled" ? "Preparing" : item.status}</span>
                                            </span>
                                          </RecepeData>
                                        </RecepeContent>
                                      </Patient>
                                    </React.Fragment>
                                  );
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
                          No Item in Delivery!
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
    </Container>
  );
};

export default Layout(Delivery);
