import React, { useState } from "react";
import { ColumnContainer, RowContainer } from "../../../../../styles/containers/styles";
import FormInput from "../../../../../elements/input";
import { Div, Table, TableCell, TableHead } from "./styles";
import styled from "styled-components";
import { GetIcon } from "../../../../../../icons";
import Checkbox from "../../../../../elements/checkbox";
import { useSelector } from "react-redux";
import AutoForm from "../../../../../elements/form";
import { putData } from "../../../../../../backend/api";

const SetupRecipe = ({ openData, setMessage }) => {
  const [search] = useState("");
  const themeColors = useSelector((state) => state.themeColors);
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
  const [textInuput] = useState([
    {
      type: "text",
      placeholder: "Ingredient",
      name: "ingredient",
      validation: "",
      default: "",
      dynamicClass: "direct",
      tag: false,
      label: "Ingredient",
      required: true,
      view: true,
      add: true,
      update: true,
      filter: false,
    },
    {
      type: "select",
      placeholder: "MT",
      name: "measurementType",
      validation: "",
      value: "Gram",
      dynamicClass: "direct",
      tag: false,
      label: "MT",
      required: true,
      view: true,
      add: true,
      update: true,
      filter: false,
      selectApi: "Cup,T Spoon,Gram",
      apiType: "CSV",
    },
    {
      type: "checkbox",
      placeholder: "MT",
      name: "measurementType",
      validation: "",
      default: "",
      dynamicClass: "direct",
      tag: false,
      label: "MT",
      required: true,
      view: true,
      add: true,
      update: true,
      filter: false,
      selectApi: "Cup,T Spoon,Gram",
      apiType: "CSV",
    },
  ]);
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
      placeholder: "Type Of Ingredient",
      name: "typeOfIngredient",
      validation: "",
      default: "",
      tag: false,
      label: "Type Of Ingredient",
      required: true,
      view: true,
      add: true,
      update: true,
      filter: false,
      selectApi: "Meal,Bead",
      apiType: "CSV",
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
      selectApi: "Cup,Tea Spoon,Gram",
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
  ]);
  const [ingredients, setIngredients] = useState([]);

  const [updateId, setUpdateId] = useState(null);
  const [ingredient, setIngredient] = useState(null);
  const [variants, setVariants] = useState([{ variant: "", total: 0, isCalculated: true }]);
  const addIngredient = (option) => {
    if (option.typeOfIngredient) {
      const ingredienTest = [...ingredients];
      ingredienTest.push({ ...option, type: "Gram" });
      const variantsTemp = [...variants];
      variantsTemp.map((variant) => {
        variant[option.id] = { value: 0, isCalculated: true };
        return variant;
      });
      setVariants(variantsTemp);
      setIngredients(ingredienTest);
      console.log(variantsTemp, ingredienTest);
    } else {
      console.log(option);
      option.typeOfIngredient = "";
      option.measureType = "";
      option.gramOfType = 0;
      option.ingredientsName = option.value;
      console.log(option);
      setIngredient(option);
      setUpdateId(option._id);
      setIsOpen(true);
    }
  };
  const textChange = (event, index) => {
    const variantsTest = [...variants];
    variantsTest[index].variant = event.target.value;
    setVariants(variantsTest);
    console.log(event.target.value);
  };
  const variantValueChange = (value, index, id, name) => {
    const variantsTest = [...variants];
    variantsTest[index][id][name] = value;
    setVariants(variantsTest);
  };
  const ingredientValueChange = (value, index) => {
    const ingredientsTest = [...ingredients];
    ingredientsTest[index].type = value;
    console.log(ingredientsTest[index], value, index);
    setIngredients(ingredientsTest);
  };
  const addNewVariant = () => {
    const variantsTest = [...variants];
    const ingredientsTemp = [...ingredients];
    let variant = { variant: "", total: 0, isCalculated: true };
    ingredientsTemp.forEach((ingredient) => {
      variant[ingredient.id] = { value: 0, isCalculated: true };
    });
    variantsTest.push(variant);
    setVariants(variantsTest);
    console.log(variantsTest, variants);
  };
  const updateHandler = async (post) => {
    const data = await putData(post, "ingredient");
    console.log(data);
  };

  const [isOpen, setIsOpen] = useState(false);
  const closeEdit = () => {
    setIsOpen(false);
  };
  return (
    <ColumnContainer className="custom">
      <RowContainer className="quarter">
        <FormInput animation={`sub-1`} placeholder={"Search Ingredient"} key={`input`} id={0} error={null} value={search} {...mealIngredient} onChange={addIngredient} />
      </RowContainer>
      <RowContainer>
        <Table>
          <thead>
            <tr>
              <TableCell className=" left">
                <Div className="variants">{variants.length} Variants</Div>
                <Div>Total Gram</Div>
                <Div>Total Calories</Div>
              </TableCell>
              {ingredients &&
                ingredients?.length > 0 &&
                variants.map((option, mainIndex) => (
                  <TableHead>
                    <FormInput animation={`sub-1`} {...textInuput[0]} placeholder={"Variant"} key={`input` + mainIndex} id={mainIndex} error={null} value={option.variant} onChange={textChange} />
                    <Div>0 g</Div>
                    <Div>0 cal</Div>
                  </TableHead>
                ))}
              <TableCell>
                <button onClick={addNewVariant}>
                  <GetIcon icon={"add"}></GetIcon>
                </button>
              </TableCell>
            </tr>
          </thead>
          <tbody>
            {ingredients?.length > 0 &&
              ingredients?.length > 0 &&
              ingredients.map((option, index) => (
                <tr key={index}>
                  <TableCell className="padding left">
                    {/* Type Select Box with values 'Cup', 'Tea spoon', 'gram' */}
                    <StyledSelect
                      name="typeSelect"
                      key={`select-${index}`}
                      value={option.type}
                      onChange={(event) => {
                        console.log(event);
                        const newValue = event.target.value;
                        console.log(newValue);
                        ingredientValueChange(newValue, index);
                      }}
                    >
                      <option value="Cup">Cup</option>
                      <option value="Tea spoon">Spoon</option>
                      <option value="Gram">Gram</option>
                    </StyledSelect>
                    {option.value}
                  </TableCell>
                  {variants?.length > 0 &&
                    ingredients?.length > 0 &&
                    variants.map((item, mainIndex) => (
                      <TableCell key={mainIndex}>
                        <ColumnContainer className="direct">
                          {/* Number Value */}
                          <StyledInput placeholder="Val" type="number" value={item[option.id]?.value ?? ""} onChange={(event) => variantValueChange(event.target.value, mainIndex, option.id, "value")} />
                          {option.type !== "Gram" && <StyledInput placeholder="Display" type="text" value={item[option.id]?.display ?? ""} onChange={(event) => variantValueChange(event.target.value, mainIndex, option.id, "display")} />}
                          {/* Checkbox isCalculated */}
                          {/* <StyledCheckboxLabel>
                        <StyledCheckbox type="checkbox" checked={item.isCalculated} name="isCalculated" />
                      </StyledCheckboxLabel> */}
                          <Checkbox
                            theme={themeColors}
                            checked={item[option.id]?.isCalculated}
                            onChange={(event) => {
                              variantValueChange(event.target.checked, mainIndex, option.id, "isCalculated");
                            }}
                          ></Checkbox>
                        </ColumnContainer>
                      </TableCell>
                    ))}
                  <TableCell>--</TableCell>
                </tr>
              ))}
          </tbody>
        </Table>
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
          header={`Update '${ingredient.ingredientsName}'`}
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
`;

const StyledSelect = styled.select`
  background-color: white;
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 5px;
  width: 70px;
  margin-right: 10px;
`;

export default SetupRecipe;
