import React from "react";
import { useState } from "react";
import { Document, Page, Text, View, StyleSheet, PDFViewer } from "@react-pdf/renderer";
import { Page as PageView } from "../../../../elements/form/styles";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  headerContainer: {
    marginBottom: 10,
  },
  recipeTitle: {
    fontSize: 8,
    fontWeight: "bold",
    marginBottom: 5,
    borderBottom: 1,
  },
  userName: {
    fontSize: 9,
    fontWeight: "bold",
    marginBottom: 5,
  },
  recipeCount: {
    fontSize: 12,
    marginBottom: 5,
  },
  scheduleContainer: {
    marginTop: 0,
    marginBottom: 10,
    paddingBottom: 10,
    borderBottom: 1,
    borderColor: "#DDDDDD",
    flex: "wrap",
    display: "flex",
  },
  scheduleText: {
    fontSize: 9,
    marginBottom: 2,
  },
  tableContainer: {
    marginBottom: 10,
    // additional container styles
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2", // Optional: for different header background
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "black",
    borderStyle: "solid",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "black",
    borderStyle: "solid",
  },
  headerCell: {
    flex: 1,
    padding: 5,
    borderRightWidth: 1,
    borderColor: "black",
    borderStyle: "solid",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 12,
    fontWeight: "bold",
    paddingLeft: 5, // For spacing inside cells
    borderColor: "black",
    borderStyle: "solid",
  },
  rowText: {
    fontSize: 12,
    paddingLeft: 5, // For spacing inside cells
    borderColor: "black",
    borderStyle: "solid",
  },
  cell: {
    flex: 1,
    padding: 5,
    borderRightWidth: 1,
    borderColor: "black",
    borderStyle: "solid",
  }, //slip
  scheduleItem: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "30%",
    // Additional styles for each schedule row
  },
  schedules: {
    display: "flex",
    flexWrap: "wrap",
    gap: 20,
    marginBottom:20
  },
  ingredientsText: {
    display: "flex",
    flexWrap: "wrap",
    fontSize: 5,
    color:"darkgrey"
  },
  nutritionalValues: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
    marginTop: 10,
    // Styles for the nutritional values container
  },
  nutritionalValuesItem: {},
  nutritionalText: {
    fontSize: 6,
    color:"darkgrey"
  },
  nutritionalTextSmall: {
    fontSize: 8,
  },
});

// PDFGenerator component
const LabelPrint = ({ openData, closeModal }) => {
  const [preparing] = useState(openData);

  // Logging to inspect the data structure
  console.log("Preparing data:", preparing);

  // Function to generate the PDF document
  const generatePDF = () => (
    <Document author="Tecnocorp Solutions" subject={`Number of servings: ${openData?.data?.numberOfPortion}, weight: ${openData?.data?.quantity}`} title={openData?.data?.title}>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerContainer}>
          {Array.isArray(preparing) &&
            preparing.map((userItem, recipeIndex) => (
              <View style={styles.tableContainer} key={`userItem-${recipeIndex}`}>
                <View style={styles.schedules}>
                  <View key={`schedule-${recipeIndex}`} style={styles.scheduleItem}>
                    <Text style={styles.userName}>{`For ${userItem?.user?.fullName || "No Title"}`}</Text>
                    <Text style={styles.scheduleText}>{`${userItem?.user?.cprNumber || "No CPR"}`}</Text>
                    <Text style={styles.scheduleText}>{`Items: ${userItem?.count || "No CPR"} • Gram: ${userItem?.gram.toFixed(2) || "No CPR"}`}</Text>
                  </View> 
                </View>
                <View style={styles.schedules}>
                  {userItem.schedules.map((schedule, scheduleIndex) => (
                    <View key={`schedule-${scheduleIndex}`} style={styles.scheduleItem}>
                      <Text style={styles.userName}>{`For ${userItem?.user?.fullName}`}</Text>
                      <Text style={styles.scheduleText}>{schedule.recipe.title}</Text>
                      <Text style={styles.ingredientsText}>{schedule.recipe.recipeingredients.map((ingredient) => ingredient.data.ingredientsName).join(", ")}</Text>
                      <View style={styles.nutritionalValues}>
                        <View style={styles.nutritionalValuesItem}>
                          <Text style={styles.nutritionalTextSmall}>{schedule.nutritionInfo.calories.toFixed(2)}</Text>
                          <Text style={styles.nutritionalText}>Calories</Text>
                        </View>
                        <View style={styles.nutritionalValuesItem}>
                          <Text style={styles.nutritionalTextSmall}>{schedule.nutritionInfo.protein.toFixed(2)}</Text>
                          <Text style={styles.nutritionalText}>protein</Text>
                        </View>
                        <View style={styles.nutritionalValuesItem}>
                          <Text style={styles.nutritionalTextSmall}>{schedule.nutritionInfo.carbohydrate.toFixed(2)}g</Text>
                          <Text style={styles.nutritionalText}>Carbs</Text>
                        </View>
                        <View style={styles.nutritionalValuesItem}>
                          <Text style={styles.nutritionalTextSmall}>{schedule.nutritionInfo.totalFat.toFixed(2)}g</Text>
                          <Text style={styles.nutritionalText}>Fat</Text>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            ))}
        </View>
      </Page>
    </Document>
  );

  // Only render PDFViewer if preparing is an array and not empty
  return <PageView>{Array.isArray(preparing) && preparing.length > 0 && <PDFViewer style={{ display: "flex", width: "100%", height: "74vh" }}>{generatePDF()}</PDFViewer>}</PageView>;
};

export default LabelPrint;
