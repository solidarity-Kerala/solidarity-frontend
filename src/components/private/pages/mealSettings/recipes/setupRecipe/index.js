import React from "react";
import { useEffect, useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";
import { Page as PageView } from "../../../../../elements/form/styles";
import { getData } from "../../../../../../backend/api";
import { food } from "../../../../../../images";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: "20px",
    paddingLeft: "2cm",
    paddingRight: "1.5cm",
    fontFamily: "Helvetica",
    fontSize: "12pt",
  },
  headerContainer: {
    flexDirection: "row", // lays out children (text and logo) side by side
    justifyContent: "space-between", // creates space between the text and logo
    alignItems: "center", // vertically centers the text and logo
    marginBottom: 20, // or any other value to give some space below the header
  },
  textContainer: {
    width: "65%", // allocates 65% of the space to the text
  },
  logoContainer: {
    width: "35%", // allocates 35% of the space to the logo
  },
  logo: {
    width: 80, // or any other value
    height: 80, // or any other value, but should maintain the aspect ratio of your logo
  },
  bold: {
    fontWeight: "bold",
    fontFamily: "Helvetica-Bold",
  },
  title: {
    marginBottom: 5,
    fontSize: 20,
    textAlign: "left",
    fontWeight: 600,
  },
  italic: {
    fontFamily: "Helvetica-Oblique",
  },
  address: {
    marginBottom: "20px",
    marginLeft: "auto",
    marginRight: "0",
  },

  recipetitle: {
    minHeight: "10px",
    textAlign: "left",
  },
  content: {
    marginBottom: 20,
    marginTop: 20,
    border: 1,
    padding: 10,
  },
  signature: {
    marginTop: "20px",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  signatureText: {
    borderTop: 1,
    width: 200,
    paddingTop: 5,
  },
  footerTextleft: {
    marginTop: 2,
    textAlign: "left",
  },
  footerTextright: {
    marginTop: 2,
    textAlign: "right",
  },
  singleItem: {
    display: "flex",
    flexDirection: "row",
    marginTop: 3,
  },
  singleItemTitle: {
    width: 90,
  },
  singleItemContent: {
    width: 380,
  },
  small: {
    fontSize: 10,
  },
  p: {
    marginBottom: 0,
    marginTop: 10,
  },
  table: {
    display: "table",
    width: "100%",
    borderCollapse: "collapse",
    marginTop: 20,
    tableLayout: "fixed",
    textAlign: "left",
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCell: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 2,
    width: "33.33%",
    height: "16px", // Adjust the value to your preference
    fontSize: 9,
  },

  headerLineBlack: {
    border: 1,
    borderColor: "#000",
  },
  headerLineBlackSmall: {
    border: 1,
    borderColor: "#000",
    height: 1,
    marginBottom: 5,
  },
  paragraph: {
    width: "350px",
    fontSize: 14,
  },
  milkBreadTable: {
    marginTop: 20,
    border: 1,
    padding: 10,
  },
  milkBreadTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  nutritionFacts: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10,
  },
  servingSize: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 20,
    fontWeight: "600",
  },
  headerLine: {
    borderTop: 1,
    marginTop: 5,
  },
  nutrientRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 20,
    fontWeight: "600",
    marginTop: 10,
  },
  headerLineSmall: {
    borderTop: 1,
    marginTop: 5,
  },
  description: {
    width: "350px",
    fontSize: 14,
  },
  sectionBottomItems: {
    marginBottom: 20, // Adjust as needed
  },
  sectionBottomTitle: {
    backgroundColor: "#f0f0f0", // Example background color, adjust as needed
    padding: 10, // Adjust as needed
    borderRadius: 5, // Example border radius, adjust as needed
  },
  sectionBottomHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5, // Adjust as needed
  },
  h2: {
    fontSize: 16, // Example font size, adjust as needed
    fontWeight: "bold",
    // Add other text styles (color, fontFamily, etc.) as needed
  },
  sectionBottomTimings: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemcalories: {
    width: "80px",
  },
  itemIngredient: {
    width: "230px",
  },
  info: {
    paddingTop: "10px"
  },
  subtitle: {
    fontSize: 13,
    paddingTop: "10px"
  }
});

const CustomTable = ({ data, openData, recipeIngredients, labelPrint }) => (
  <View style={styles.table}>
    {/* Table Header */}
    <View style={styles.tableRow}>
      <View style={[styles.tableCell, styles.bold, styles.itemIngredient]}>
        <Text>Ingredient</Text>
      </View>
      <View style={[styles.tableCell, styles.bold, styles.itemcalories]}>
        <Text>Calories</Text>
      </View>
      <View style={[styles.tableCell, styles.bold]}>
        <Text>Grams</Text>
      </View>
    </View>
    {/* Table Data Rows */}
    {data?.length &&
      data.map((row, index) => (
        <View style={styles.tableRow} key={index}>
          <View style={[styles.tableCell, styles.itemIngredient]}>
            <Text>{row.ingredient?.ingredientsName}</Text>
          </View>
          <View style={[styles.tableCell, styles.itemcalories]}>
            <Text>{row?.calories}</Text>
          </View>
          <View style={styles.tableCell}>
            <Text>{row?.gram}g</Text>
          </View>
        </View>
      ))}
    {/* Nutrition Data */}
    <View>
      <Text style={[styles.h5, styles.bold, styles.info]}>Nutrition Info </Text>
    </View>
    <View style={styles.table}>
      <View style={styles.tableRow}>
        <Text style={styles.tableCell}>Calories</Text>
        {/* <Text style={styles.tableCell}>السعرات الحرارية</Text> */}
        <Text style={styles.tableCell}>
          {openData?.data?.calories.toFixed(2)}g
        </Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.tableCell}>Protein</Text>
        {/* <Text style={styles.tableCell}>البروتين</Text> */}
        <Text style={styles.tableCell}>
          {openData?.data?.protein.toFixed(2)}g
        </Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.tableCell}>Saturated Fat</Text>
        {/* <Text style={styles.tableCell}>البروتين</Text> */}
        <Text style={styles.tableCell}>
          {openData?.data?.satFat.toFixed(2)}g
        </Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.tableCell}>Unsaturated Fat</Text>
        {/* <Text style={styles.tableCell}>البروتين</Text> */}
        <Text style={styles.tableCell}>
          {openData?.data?.unSatFat.toFixed(2)}g
        </Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.tableCell}>Total Fat</Text>
        {/* <Text style={styles.tableCell}>الدهون الكلية</Text> */}
        <Text style={styles.tableCell}>
          {openData?.data?.totalFat - (openData?.data?.totalFat * openData?.data?.fatLoss / 100)}g
        </Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.tableCell}>Cholesterol</Text>
        {/* <Text style={styles.tableCell}>الدهون الكلية</Text> */}
        <Text style={styles.tableCell}>
          {openData?.data?.cholesterol.toFixed(2)}g
        </Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.tableCell}>Total Fiber</Text>
        {/* <Text style={styles.tableCell}>الألياف الكلية</Text> */}
        <Text style={styles.tableCell}>
          {openData?.data?.fiber.toFixed(2)}g
        </Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.tableCell}>Carbohydrate</Text>
        {/* <Text style={styles.tableCell}>الدهون الكلية</Text> */}
        <Text style={styles.tableCell}>
          {openData?.data?.carbohydrate.toFixed(2)}g
        </Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.tableCell}>Total Sugar</Text>
        {/* <Text style={styles.tableCell}>السكر الكلي</Text> */}
        <Text style={styles.tableCell}>
          {openData?.data?.sugars.toFixed(2)}g
        </Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.tableCell}>Iron</Text>
        {/* <Text style={styles.tableCell}>الحديد</Text> */}
        <Text style={styles.tableCell}>
          {openData?.data?.iron.toFixed(2)}g
        </Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.tableCell}>Calcium</Text>
        {/* <Text style={styles.tableCell}>الكالسيوم</Text> */}
        <Text style={styles.tableCell}>
          {openData?.data?.calcium.toFixed(2)}g
        </Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.tableCell}>Sodium</Text>
        {/* <Text style={styles.tableCell}>الحديد</Text> */}
        <Text style={styles.tableCell}>
          {openData?.data?.sodium.toFixed(2)}g
        </Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.tableCell}>Potassium</Text>
        {/* <Text style={styles.tableCell}>الحديد</Text> */}
        <Text style={styles.tableCell}>
          {openData?.data?.potassium.toFixed(2)}g
        </Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.tableCell}>Vitamin A</Text>
        {/* <Text style={styles.tableCell}>الحديد</Text> */}
        <Text style={styles.tableCell}>
          {openData?.data?.VitaminA.toFixed(2)}g
        </Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.tableCell}>Vitamin C</Text>
        {/* <Text style={styles.tableCell}>الحديد</Text> */}
        <Text style={styles.tableCell}>
          {openData?.data?.vitaminC.toFixed(2)}g
        </Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.tableCell}>Vitamin E</Text>
        {/* <Text style={styles.tableCell}>الحديد</Text> */}
        <Text style={styles.tableCell}>
          {openData?.data?.vitaminE.toFixed(2)}g
        </Text>
      </View>
      <Text style={styles.paragraph}>{labelPrint?.footNote}</Text>
    </View>

    {/* <Footer /> Include the Footer component here */}
    <View style={styles.sectionBottomItems}>
      <View style={styles.sectionBottomTitle}>
        {/* Allergens */}
        <View style={styles.sectionBottomHeader}>
          <Text style={styles.h5}>Allergens: </Text>
          <Text style={styles.h5}>{openData?.data?.allergy || 0}</Text>
        </View>

        {/* Ingredients */}

        {/* Storage */}
        <View style={styles.sectionBottomHeader}>
          <Text style={styles.h5}>Storage: </Text>
          <Text style={styles.h5}>{openData?.data?.storage || 0}</Text>
        </View>

        {/* Validity */}
        <View style={styles.sectionBottomHeader} id="section-validity">
          <Text style={styles.h5}>Validity: </Text>
          <Text style={styles.h5}>{openData?.data?.validity || 0}</Text>
        </View>
        {/* <View style={styles.sectionBottomHeader}>
          <Text style={styles.h3}>Ingredients: </Text>
          <Text style={styles.h3}>
            {data?.length &&
              data.map(
                (data, index) =>
                  (index !== 0 ? ", " : "") + data.ingredient?.ingredientsName
              )}
          </Text>
        </View> */}
        <View style={styles.headerLineBlackSmall} />
        {/* Produced By */}
        <View style={styles.sectionBottomHeader}>
          <Text style={styles.h5}>Produced By: </Text>
          <Text style={styles.h5}>{labelPrint?.address}</Text>
          
        </View>

        {/* MADE IN BAHRAIN */}
        <View style={styles.sectionBottomHeader}>
          <Text style={styles.h5}>MADE IN BAHRAIN</Text>
          <Text>{new Date().toLocaleString()}</Text>
        </View>

        {/* Timings */}
      </View>
    </View>
    <View style={styles.footer}>
      <View style={styles.footerItems}>
        <View>
          {/* <Text style={styles.footerTextleft}>
            Euros Bake W.L.L, CR.No:72669-6
          </Text> */}
          <Text style={styles.footerTextleft}>
            {/* P.O BOX:80304, Sanad, Kingdom of Bahrain */}
            {labelPrint?.contact}
          </Text>
        </View>
        {/* <View>
          <Text style={styles.footerTextright}>
            (+973 17 627777 ) (+973 33 626044)
          </Text>
          <Text style={styles.footerTextright}>(sales@eurobakes.me.com)</Text>
        </View> */}
      </View>
    </View>
  </View>
);

// PDFGenerator component
const PDFGenerator = ({ openData, closeModal }) => {
  const [recipeIngredients, setRecipeIngredients] = useState();
  const [labelPrint, setLabelPrint] = useState();

  // Fetch recipe ingredients data
  useEffect(() => {
    getData({ recipe: openData?.data?._id }, "recipe-ingredients").then(
      (response) => {
        setRecipeIngredients(response?.data?.response);
        setLabelPrint(response?.data?.labelPrint);
      }
    );
  }, [openData]);

  console.log({labelPrint})

  // Function to generate the PDF document
  const generatePDF = () => (
    <Document
      author="Tecnocorp Solutions"
      subject={`Number of servings: ${openData?.data?.numberOfPortion}, weight: ${openData?.data?.gram - (openData?.data?.gram * openData?.data?.waterLoss / 100) - (openData?.data?.gram * openData?.data?.processingLoss / 100)}`}
      title={openData?.data?.title}
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.headerContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>
              {openData?.data?.title} ({openData?.data?.measurementType})
            </Text>
            <Text style={styles.recipetitle}>
              Number of servings: {openData?.data?.numberOfPortion}
            </Text>
            <Text style={styles.recipetitle}>
              weight: {openData?.data?.gram}g
            </Text>
            {/* <Text style={[styles.title, styles.subtitle]}>Yield Management</Text> */}
            <Text style={styles.recipetitle}>
              Yield Weight: {openData?.data?.gram - (openData?.data?.gram * openData?.data?.waterLoss / 100) - (openData?.data?.gram * openData?.data?.processingLoss / 100)}
            </Text>
          </View>
          <View style={styles.logoContainer}>
            <Image
              source={
                openData?.data?.photo
                  ? process.env.REACT_APP_CDN + openData?.data?.photo
                  : food
              } // Adjusted the way of specifying source
              style={styles.logo}
            />
          </View>
        </View>

        {/* Render the custom table component */}
        <CustomTable data={recipeIngredients} openData={openData} labelPrint={labelPrint} />

        {/* ... your existing content ... */}
      </Page>
    </Document>
  );

  return (
    <PageView>
      <PDFViewer style={{ width: "100%", height: "600px" }}>
        {generatePDF()}
      </PDFViewer>
    </PageView>
  );
};

export default PDFGenerator;

