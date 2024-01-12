import React, { useEffect, useState } from "react";
// import moment from "moment";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import { ColumnContainer, RowContainer } from "../../../../../styles/containers/styles";
import { Button, DataItem, DataItemContainer, Div, MealItem, Table, TableCell, Title } from "./styles";
import AutoForm from "../../../../../core/form";
import { getData, postData, putData } from "../../../../../../backend/api";
import { useDispatch, useSelector } from "react-redux";
import { addSelectObject } from "../../../../../../store/actions/select";
import { GetIcon } from "../../../../../../icons";
// import Checkbox from "../../../../../core/checkbox";
import { NoData, ProfileImage } from "../../../../../core/list/styles";
import { getValue } from "../../../../../core/list/functions";
import axios from "axios";
// import { GetAccessToken } from "../../../../../../backend/authentication";

import { RecepeImage } from "../dietMenu/styles";
import InvoicePDF from "./inovicePDF";
import PopupView from "../../../../../core/popupview";
import { food } from "../../../../../../images";

// const OrderForm = styled.form`
//   display: flex;
//   gap: 5px;
//   align-items: center;
//   justify-content: space-evenly;
//   padding: 0 10px;

//   @media (max-width: 768px) {
//     flex-direction: column;
//     align-items: center;
//     margin: 10px;
//     gap: 0;
//   }
// `;

// const Invoice = styled.label`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   gap: 10px;
//   border-radius: 15px;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//   margin: 20px 0;
//   padding: 3px 20px;
//   width: 300px;

//   @media (max-width: 768px) {
//     width: 100%;
//     margin: 10px;
//   }
// `;

// const Field = styled.label`
//   border-radius: 15px;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//   margin: 20px 0;
//   padding: 15px;
//   display: flex;
//   gap: 10px;
//   align-items: center;
//   width: 300px;

//   @media (max-width: 768px) {
//     width: 100%;
//     margin: 10px;
//   }
// `;

// const CustomDatePicker = styled(DatePicker)`
//   border: none;
//   border-radius: 4px;
//   padding: 8px;
//   width: 95%;
//   font-size: 16px;
//   color: #333;

//   @media (max-width: 768px) {
//     width: 90%;
//     margin: 10px;
//   }
// `;

// const DeliveryTimeSelect = styled.select`
//   padding: 8px;
//   border: none;
//   border-radius: 4px;
//   width: 60%;
//   font-size: 16px;
//   color: #333;

//   @media (max-width: 768px) {
//     width: 100%;
//   }
// `;

// const PlaceOrderButton = styled.button`
//   background-color: rgb(75, 75, 75);
//   color: white;
//   border: none;
//   width: 150px;
//   height: 60px;
//   border-radius: 4px;
//   cursor: pointer;

//   @media (max-width: 768px) {
//     width: 100%;
//   }
// `;

// const options = [
//   { value: "morning", label: "Morning" },
//   { value: "afternoon", label: "Afternoon" },
//   { value: "evening", label: "Evening" },
// ];

const SetupRecipe = ({ openData, setMessage, closeModal }) => {
  const dispatch = useDispatch();
  const [recipe] = useState(openData.data._id);
  const [portion] = useState(openData.data.numberOfPortion ?? 1);
  const selectData = useSelector((state) => state.select["ingredient/select"]);
  // const themeColors = useSelector((state) => state.themeColors);
  const [updateIngredient] = useState([
    {
      type: "text",
      placeholder: "Ingredient Name",
      validation: "",
      tag: false,
      name: "ingredientsName",
      label: "Ingredient Name",
      required: false,
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
      required: false,
      view: true,
      add: true,
      update: true,
      filter: false,
      selectApi: "Gram,Teaspoon,Tablespoon,Cup,Ounce,Piece,Milliliter,Pinch,Bunch",
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
      required: false,
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
      required: false,
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
      required: false,
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
  const [selectedDate, setSelectedDate] = useState("");
  const [mealTimeCategory, setMealTimeCatogory] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [lastInvoiceNumber, setLastInvoiceNumber] = useState("");
  const [showPDF, setShowPDF] = useState(false);
  const [directOrders, setDirectOrders] = useState();
  // const [orderDate, setOrderDate] = useState("");

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    // Handle the place order action here
  };

  const themeColors = useSelector((state) => state.themeColors);

  // const handleOptionChange = (event) => {
  //   setSelectedOption(event.target.value);
  // };

  const handleDateChange = (date) => {
    // setOrderDate(date);
    setSelectedDate(date);
    getData({ deliverydate: date }, "direct-order").then((response) => {
      console.log({ response });
      setLastInvoiceNumber(response?.data?.ordersCount);
    });
  };

  const addIngredient = async (option) => {
    // setRefresh(!refresh);
    // if (typeof option.calories !== "number" || isNaN(option.calories)) {
    if (!option) {
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
      const exists = ingredients.some((ingredient) => ingredient?._id === option?._id);

      if (!exists) {
        // If the option doesn't exist, add it to the array
        option.quantity = 1;
        option.totalPrice = option?.recipe?.price;
        option.taxTotalPrice = (option?.recipe?.price / 100) * 5 + option?.recipe?.price;
        setIngredients([...ingredients, option]);
      }
    }
  };

  const updateHandler = async (post) => {
    await putData(post, "ingredient");
    const response = await postData({ ingredient: post.id, recipe }, "recipe-ingredients");
    response.data.addedItems && setIngredients(response.data.addedItems);
    response.data.recipeNutritionInfo && setNutritionInfo(response.data.recipeNutritionInfo);
    setNutritionInfo(response.data.recipeNutritionInfo);
    const data = [...selectData];
    const item = selectData.find((item) => [item.id === post._id]);
    item.measureType = post.measureType;
    item.gramOfType = post.gramOfType;
    setIngredients(response.data.addedItems);
    dispatch(addSelectObject(data, "ingredient/select"));
    closeEdit();
  };

  // const [mealIngredient] = useState({
  //   type: "select",
  //   apiType: "API",
  //   // selectApi: "recipe/select",
  //   selectApi: "available-direct-orders/select",
  //   placeholder: "Recipe",
  //   apiSearch: true,
  //   listBox: true,
  //   iconImage: { collection: "recipe", item: "photo" },
  //   tags: [
  //     // {
  //     //   type: "image",
  //     //   showItem: "photo",
  //     //   item: "photo",
  //     //   title: "Image",
  //     //   collection: "recipe",
  //     // },

  //     // {
  //     //   type: "text",
  //     //   item: "protein",
  //     //   title: "Protein",
  //     //   collection: "",
  //     // },
  //     // {
  //     //   type: "text",
  //     //   item: "calories",
  //     //   title: "Calories",
  //     //   collection: "",
  //     // },
  //     {
  //       type: "text",
  //       showItem: "price",
  //       item: "price",
  //       title: "Price",
  //       collection: "recipe",
  //     },
  //   ],
  //   name: "recipe",
  //   collection: "recipe",
  //   validation: "",
  //   showItem: "title",
  //   default: "",
  //   tag: false,
  //   label: "Recipe",
  //   required: true,
  //   view: true,
  //   add: true,
  //   update: true,
  //   filter: false,
  // });

  useEffect(() => {
    getData({}, "mealtime-category/select").then((response) => {
      setMealTimeCatogory(response.data);
    });
    getData({ deliverydate: new Date() }, "direct-order").then((response) => {
      console.log({ response });
      setLastInvoiceNumber(response?.data?.ordersCount);
    });
    getData({}, "available-direct-orders/select").then((response) => {
      setDirectOrders(response?.data);
    });
  }, []);

  useEffect(() => {
    getData({ recipe }, "recipe-ingredients").then((response) => {
      setIngredients(response.data.responseOne);
      // setNutritionInfo(response.data.recipeNutritionInfo);
    });
  }, [recipe]);

  const textChange = (event, index) => {
    const newQuantity = parseInt(event.target.value);

    const updatedIngredients = ingredients.map((ingredient, i) => {
      if (i === index) {
        const totalPrice = newQuantity * ingredient?.recipe?.price;
        const taxTotalPrice = totalPrice + ((newQuantity * ingredient?.recipe?.price) / 100) * 5;
        return {
          ...ingredient,
          quantity: newQuantity,
          totalPrice,
          taxTotalPrice,
        };
      } else {
        return ingredient;
      }
    });

    setIngredients(updatedIngredients);
  };

  const calculateGrandTotal = () => {
    return ingredients?.reduce((total, ingredient) => total + ingredient?.taxTotalPrice, 0);
  };

  const grandTotal = calculateGrandTotal();

  // const checkChange = async (event, index) => {
  //   const ingredientTest = [...ingredients];
  //   ingredientTest[index].isCalculated = event.target.checked;
  //   setIngredients(ingredientTest);
  //   const response = await putData(
  //     {
  //       id: ingredientTest[index]._id,
  //       ingredient: ingredientTest[index].ingredient._id,
  //       isCalculated: ingredientTest[index].isCalculated,
  //       quantity: ingredientTest[index].quantity,
  //     },
  //     "recipe-ingredients"
  //   );
  //   setNutritionInfo(response.data.recipeNutritionInfo);
  // };

  const [isOpen, setIsOpen] = useState(false);
  const closeEdit = () => {
    setIsOpen(false);
  };

  // const token = GetAccessToken();

  const submitOrder = async () => {
    // const response = await postData({ ingredients }, "direct-order");
    const orderDate = selectedDate;
    await axios.post(
      `${process.env.REACT_APP_API}direct-order`,
      {
        recipe: ingredients,
        deliverydate: orderDate,
        grandTotal,
        mealTimeCategory: selectedOption,
        inovice: lastInvoiceNumber,
      }
      // {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //     "x-access-token": token,
      //   },
      // }
    );
    setShowPDF(true);
    // closeModal();
  };

  const deleteItem = (ingredientId) => {
    // Filter out the ingredient with the specified ID
    const updatedIngredients = ingredients.filter((ingredient) => ingredient._id !== ingredientId);

    // Update the state with the updated list of ingredients
    setIngredients(updatedIngredients);
  };

  // const today = moment();
  // const maxDate = moment().add(1, "year");

  const closeModals = () => {
    setShowPDF(false);
    closeModal();
  };

  const openItemData = {
    name: "user name",
    data: {
      _id: "1234567890",
    },
    _id: "1234567890",
  };

  return (
    <>
      {/* <OrderForm onSubmit={handlePlaceOrder}> */}
        {/* <Invoice>
          Invoice No:
          <span>
            <h5>{`INV-${lastInvoiceNumber + 1}`}</h5>
          </span>
        </Invoice>
        <Field>
          Order Date:
          <CustomDatePicker selected={selectedDate} placeholderText="Select your date" onChange={handleDateChange} />
        </Field>

        <Field>
          Delivery Time:
          <DeliveryTimeSelect value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
            {mealTimeCategory.map((option, index) => (
              <option key={index} value={option?.id}>
                {option?.value}
              </option>
            ))}
          </DeliveryTimeSelect>
        </Field> */}
        {/* <PlaceOrderButton type="submit" onClick={submitOrder}>
          Place Order
        </PlaceOrderButton> */}
      {/* </OrderForm> */}
      <ColumnContainer className="custom">
        {showPDF && (
          <PopupView
            customClass={"print"}
            popupData={
              <InvoicePDF
                customClass={"print"}
                openData={ingredients}
                total={grandTotal}
                inovice={`INV-${lastInvoiceNumber + 1}`}
                // setMessage={props.setMessage}
                closeModal={closeModals}
              />
            }
            themeColors={themeColors}
            closeModal={closeModals}
            itemTitle={{ name: "title", type: "text", collection: "" }}
            openData={openItemData}
          ></PopupView>
        )}

        <RowContainer className="quarter">
          {directOrders?.length &&
            directOrders?.map((recipe) => (
              <MealItem key={recipe?.id} onClick={() => addIngredient(recipe)}>
                <ProfileImage>
                  <img src={recipe?.recipe?.photo ? process.env.REACT_APP_CDN + recipe?.recipe?.photo : food} alt="icon" />
                </ProfileImage>
                <Title>
                  {recipe?.value ?? "Title not found!"}
                  <Title>
                    <span>BHD</span>
                    <span className="price">{recipe?.recipe?.price}</span>
                  </Title>
                </Title>
              </MealItem>
            ))}
        </RowContainer>

        <RowContainer>
          {ingredients ? (
            <Table>
              <thead>
                <tr>
                  <TableCell className="left head">
                    <Div className="variants left">Recipes You have added ({ingredients?.length ?? 0})</Div>
                  </TableCell>
                  <TableCell className="left head">
                    <Div className="variants">Quantity</Div>
                  </TableCell>
                  <TableCell className="left head">
                    <Div className="variants">Price</Div>
                  </TableCell>
                  <TableCell className="left head">
                    <Div className="variants">Tax (5%)</Div>
                  </TableCell>
                  <TableCell className="left head">
                    <Div className="variants">Tax Price</Div>
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
                          {item?.recipe?.title ?? "Nil"}
                        </Title>
                        <RecepeImage
                          // src="https://www.seiu1000.org/sites/main/files/main-images/camera_lense_0.jpeg"
                          src={item?.recipe?.photo ? process.env.REACT_APP_CDN + item?.recipe?.photo : null}
                        ></RecepeImage>
                        <DataItemContainer className="nowrp">
                          {/* <DataItem>
                          {item?.ingredient?.typeOfIngredient}
                        </DataItem>
                        <DataItem>
                          {item?.ingredient?.gramOfType}g/
                          {item?.ingredient?.measureType}
                        </DataItem> */}
                          <DataItem>
                            {/* {(
                            (item?.ingredient?.calories *
                              item?.ingredient?.gramOfType) /
                            100
                          )?.toFixed(2)} */}
                            {item?.carbohydrate}
                            Carbohydrate
                          </DataItem>
                          <DataItem>
                            {/* {(item?.protein / 100)?.toFixed(2)}g Protein */}
                            {item?.protein}g Protein
                          </DataItem>
                          <DataItem>
                            {/* {(
                            (item?.ingredient?.totalFat *
                              item?.ingredient?.gramOfType) /
                            100
                          )?.toFixed(2)} */}
                            {item?.calories}Calories
                          </DataItem>
                          <DataItem>
                            {/* {(
                            (item?.ingredient?.carbohydrate *
                              item?.ingredient?.gramOfType) /
                            100
                          )?.toFixed(2)} */}
                            {item?.totalFat}
                            Total Fat
                          </DataItem>
                        </DataItemContainer>
                      </TableCell>
                      {/* <TableCell>{`${item?.ingredient?.gramOfType}g ${item?.ingredient?.measureType !== "Gram" ? ` per ${item?.ingredient?.measureType} = ` : ""} | ${item?.ingredient?.calories?.toFixed(2)} cal`}</TableCell> */}

                      <TableCell>
                        <StyledInput
                          placeholder="1"
                          type="number"
                          value={item?.quantity}
                          onChange={(event) => {
                            textChange(event, index, item);
                          }}
                        />
                        {/* <Checkbox
                        onChange={(event) => {
                          checkChange(event, index);
                        }}
                        checked={item?.isCalculated}
                        theme={themeColors}
                      /> */}
                      </TableCell>

                      <TableCell>
                        {item?.recipe?.price}
                        {/* {`${(
                        item?.ingredient?.gramOfType * item?.quantity
                      ).toFixed(2)}g / ${(
                        (item?.ingredient?.calories *
                          (item?.ingredient?.gramOfType * item?.quantity)) /
                        100
                      )?.toFixed(2)}cal`} */}
                      </TableCell>

                      <TableCell>{(item?.totalPrice / 100) * 5}</TableCell>

                      <TableCell>{item?.totalPrice + (item?.totalPrice / 100) * 5}</TableCell>

                      <TableCell>
                        <Button onClick={() => deleteItem(item?._id)}>
                          <GetIcon icon={"delete"} />
                        </Button>
                      </TableCell>
                    </tr>
                  ))}
                {ingredients.length === 0 && (
                  <TableCell colSpan={6}>
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
                              <GetIcon icon={"info"}></GetIcon>Total Nutrition Info {portion > 1 && ` of ${1}/${portion}`}
                            </DataItem>
                            <DataItem>
                              Gram:
                              {getValue({ type: "number" }, nutritionInfo?.gram / portion)}/{getValue({ type: "number" }, nutritionInfo?.gram)}
                            </DataItem>
                            <DataItem>
                              Calories:
                              {getValue({ type: "number" }, nutritionInfo?.calories / portion)}/{getValue({ type: "number" }, nutritionInfo?.calories)}
                            </DataItem>
                            <DataItem>
                              Protein: {getValue({ type: "number" }, nutritionInfo?.protein / portion)}/ {getValue({ type: "number" }, nutritionInfo?.protein)}
                            </DataItem>
                            <DataItem>
                              Saturated Fat: {getValue({ type: "number" }, nutritionInfo?.satFat / portion)}/{getValue({ type: "number" }, nutritionInfo?.satFat)}
                            </DataItem>
                            <DataItem>
                              Unsaturated Fat: {getValue({ type: "number" }, nutritionInfo?.unSatFat / portion)}/{getValue({ type: "number" }, nutritionInfo?.unSatFat)}
                            </DataItem>
                            <DataItem>
                              Total Fat: {getValue({ type: "number" }, nutritionInfo?.totalFat / portion)}/{getValue({ type: "number" }, nutritionInfo?.totalFat)}
                            </DataItem>
                            <DataItem>
                              Cholesterol: {getValue({ type: "number" }, nutritionInfo?.cholesterol / portion)}/{getValue({ type: "number" }, nutritionInfo?.cholesterol)}
                            </DataItem>
                            <DataItem>
                              Fiber: {getValue({ type: "number" }, nutritionInfo?.fiber / portion)}/{getValue({ type: "number" }, nutritionInfo?.fiber)}
                            </DataItem>
                            <DataItem>
                              Carbohydrate: {getValue({ type: "number" }, nutritionInfo?.carbohydrate / portion)}/{getValue({ type: "number" }, nutritionInfo?.carbohydrate)}
                            </DataItem>
                            <DataItem>
                              Sugars: {getValue({ type: "number" }, nutritionInfo?.sugars / portion)}/{getValue({ type: "number" }, nutritionInfo?.sugars)}
                            </DataItem>
                            <DataItem>
                              Iron: {getValue({ type: "number" }, nutritionInfo?.iron / portion)}/{getValue({ type: "number" }, nutritionInfo?.iron)}
                            </DataItem>
                            <DataItem>
                              Calcium: {getValue({ type: "number" }, nutritionInfo?.calcium / portion)}/{getValue({ type: "number" }, nutritionInfo?.calcium)}
                            </DataItem>
                            <DataItem>
                              Sodium: {getValue({ type: "number" }, nutritionInfo?.sodium / portion)}/{getValue({ type: "number" }, nutritionInfo?.sodium)}
                            </DataItem>
                            <DataItem>
                              Potassium: {getValue({ type: "number" }, nutritionInfo?.potassium / portion)}/{getValue({ type: "number" }, nutritionInfo?.potassium)}
                            </DataItem>
                            <DataItem>Vitamin A: {getValue({ type: "number" }, nutritionInfo?.vitaminA)}</DataItem>
                            <DataItem>Vitamin C: {getValue({ type: "number" }, nutritionInfo?.vitaminC)}</DataItem>
                            <DataItem>Vitamin E: {getValue({ type: "number" }, nutritionInfo?.vitaminE)}</DataItem>
                          </DataItemContainer>
                        </TableCell>
                      </tr>
                    ) : (
                      <tr key={0}>
                        <TableCell colSpan={4}>
                          <DataItemContainer>
                            <DataItem className="head">
                              <GetIcon icon={"info"}></GetIcon>Total Nutrition Info
                            </DataItem>
                            <DataItem>Gram: {getValue({ type: "number" }, nutritionInfo?.gram)}</DataItem>
                            <DataItem className="span">
                              <span>Bread: {getValue({ type: "percentage" }, nutritionInfo.breadGram)}</span>
                              <span>Meat: {getValue({ type: "percentage" }, nutritionInfo.breadGram)}</span>
                              <span>Other: {getValue({ type: "percentage" }, nutritionInfo.breadGram)}</span>
                            </DataItem>
                            <DataItem>Calories: {getValue({ type: "number" }, nutritionInfo.calories)}</DataItem>
                            <DataItem>Protein: {getValue({ type: "number" }, nutritionInfo.protein)}</DataItem>
                            <DataItem>Saturated Fat: {getValue({ type: "number" }, nutritionInfo.satFat)}</DataItem>
                            <DataItem>Unsaturated Fat: {getValue({ type: "number" }, nutritionInfo.unSatFat)}</DataItem>
                            <DataItem>Total Fat: {getValue({ type: "number" }, nutritionInfo.totalFat)}</DataItem>
                            <DataItem>Cholesterol: {getValue({ type: "number" }, nutritionInfo.cholesterol)}</DataItem>
                            <DataItem>Fiber: {getValue({ type: "number" }, nutritionInfo.fiber)}</DataItem>
                            <DataItem>Carbohydrate: {getValue({ type: "number" }, nutritionInfo.carbohydrate)}</DataItem>
                            <DataItem>Sugars: {getValue({ type: "number" }, nutritionInfo.sugars)}</DataItem>
                            <DataItem>Iron: {getValue({ type: "number" }, nutritionInfo.iron)}</DataItem>
                            <DataItem>Calcium: {getValue({ type: "number" }, nutritionInfo.calcium)}</DataItem>
                            <DataItem>Sodium: {getValue({ type: "number" }, nutritionInfo.sodium)}</DataItem>
                            <DataItem>Potassium: {getValue({ type: "number" }, nutritionInfo.potassium)}</DataItem>
                            <DataItem>Vitamin A: {getValue({ type: "number" }, nutritionInfo.vitaminA)}</DataItem>
                            <DataItem>Vitamin C: {getValue({ type: "number" }, nutritionInfo.vitaminC)}</DataItem>
                            <DataItem>Vitamin E: {getValue({ type: "number" }, nutritionInfo.vitaminE)}</DataItem>
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
          {ingredients?.length ? (
            <>
              <TableCell
                style={{
                  width: 80,
                }}
              >
                {grandTotal}
              </TableCell>
            </>
          ) : null}

          {/* {ingredients?.length ? (
            <ButtonContanter
              style={{
                width: "max-content",
                marginLeft: "auto",
                cursor: "pointer",
              }}
              onClick={submitOrder}
            >
              Place Order
            </ButtonContanter>
          ) : null} */}
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
    </>
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
