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
import PrintPreparaton from "./print";

const Preparation = (props) => {
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
  const [openPrint, setOpenPrint] = useState(false);

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
  const [selectedIndex, setSelectedIndex] = useState(null);
  const loadData = useCallback(
    async (updateValue) => {
      console.log("setLoaderBox", setLoaderBox);
      setLoaderBox(true);
      const preperation = await getData({ ...updateValue, prepared: false }, "preperation");
      // const prepared = await getData({ ...updateValue, prepared: true }, "preperation");
      setPreparing(preperation.data.response);
      setPrepared(null);
      setLoaderBox(false);
    },
    [setLoaderBox, setPreparing] // Add dependencies here
  );
  useLayoutEffect(() => {
    const fetchData = async () => {
      await loadData(filterView);
    };

    fetchData();
  }, [filterView, loadData]);
  const statusChange = (recipeSchedule, status, index) => {
    setLoaderBox(true);
    postData({ recipeSchedule, status }, "preperation/move-to-packaging").then((response) => {
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
    selectApi: "Bread,Meat,Fruit,Dessert,Salad,Soup,Fat,Snacking,Mixed",
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
                  setOpenPrint(true);
                }}
              >
                <GetIcon icon={"print"} />
              </Filter>
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
                      Schedules <i>{preparing?.length} Items</i>
                    </span>
                    <GetIcon icon={"preparation"} />
                  </Head>
                  <DataBox>
                    {preparing?.map((recipeItem, recipeIndex) => {
                      const count = recipeItem.schedules.filter((item) => item.status === "Scheduled").length;
                      return (
                        <div className={selectedIndex === recipeIndex ? "selected" : ""} key={`recipe-group-${recipeIndex}`}>
                          {recipeItem.recipe && (
                            <Recepe
                              onClick={() => {
                                setPrepared(recipeItem);
                                setSelectedIndex(recipeIndex);
                              }}
                              className="recipe order"
                              key={`recipe-${recipeIndex}`}
                            >
                              <RecepeContent className="recipe1">
                                <RecepeImage src={recipeItem.recipe.photo ? `${process.env.REACT_APP_CDN}${recipeItem.recipe.photo}` : food}></RecepeImage>
                                <RecepeData className="recipe">
                                  <span className="title">{recipeItem.recipe.title}</span>
                                  <span className="light">
                                    <span>{recipeItem.gram?.toFixed(2)} gram</span>
                                    <span>{recipeItem.count?.toFixed(0)} nos</span>
                                    {count > 0 && <span className={"red"}>Pending: {count ?? 0}</span>}
                                  </span>
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
                        No Schedule Found!
                      </Recepe>
                    </div>
                  )}
                </Items>
                {prepared && (
                  <Items className="sticky">
                    <Head className="last">
                      <span>
                        {prepared.recipe.title} <i>{prepared?.count} Items</i>
                      </span>
                      <GetIcon icon={"recipe"} />
                    </Head>
                    <DataBox aBox key={`recipe-group`}>
                      <Recepe className="recipe order" key={`recipe`}>
                        <RecepeContent className="recipe1">
                          <RecepeImage src={prepared.recipe.photo ? `${process.env.REACT_APP_CDN}${prepared.recipe.photo}` : food}></RecepeImage>
                          <RecepeData className="recipe">
                            <span className="title">{prepared.recipe.title}</span>
                            <span className="light">
                              <span>{prepared.gram?.toFixed(2)} gram</span>
                              <span>{prepared.count?.toFixed(0)} nos</span>
                            </span>
                            <Patients>
                              {(() => {
                                let lastStatus = null; // Variable to track the last status

                                return prepared.schedules
                                  ?.sort((a, b) => a.user.username.localeCompare(b.user.username))
                                  .map((schedule, userIndex) => {
                                    const isNewStatus = schedule.status !== lastStatus;
                                    lastStatus = schedule.status; // Update the lastStatus for the next iteration

                                    return (
                                      <React.Fragment key={`patient-${schedule.user.userId}-${userIndex}`}>
                                        {isNewStatus && <SubHead>{schedule.status}</SubHead>}
                                        <Patient>
                                          <Checkbox
                                            onChange={() => {
                                              statusChange(schedule._id, "Packaging", userIndex);
                                            }}
                                            checked={schedule.status !== "Scheduled"}
                                            theme={themeColors}
                                          ></Checkbox>
                                          <div className="light">
                                            <div className="bold">{schedule.user.username}</div>
                                            <div className="bold">{schedule.nutritionInfo.gram?.toFixed(2)} g</div>
                                            {schedule.recipeNote.length > 0 && <div>{"Note: " + schedule.recipeNote}</div>}
                                            {schedule.diet.kitchenNote?.length > 0 && <div>{"Kitchen Note: " + schedule.diet.kitchenNote}</div>}
                                            <div className="small">Ref No: {schedule.user.cprNumber}</div>
                                          </div>
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
            <PrintPreparaton
              customClass={"print"}
              openData={preparing}
              setMessage={props.setMessage}
              closeModal={() => {
                setOpenPrint(false);
              }}
            />
          }
          themeColors={themeColors}
          closeModal={() => setOpenPrint(false)}
          itemTitle={{ name: "title", type: "text", collection: "" }}
          openData={{ data: { key: "print_preparation", title: "Print Preparation" } }}
        ></PopupView>
      )}
    </Container>
  );
};

export default Layout(Preparation);
