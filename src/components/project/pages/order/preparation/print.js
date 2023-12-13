import React from "react";
import { useState } from "react";
import { Document, Page, Text, View, StyleSheet, PDFViewer } from "@react-pdf/renderer";
import { Page as PageView } from "../../../../elements/form/styles";
import { dateFormat } from "../../../../elements/functions/date";

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
    fontSize: 14,
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
  },
  scheduleText: {
    fontSize: 12,
    marginBottom: 2,
  },
});

// PDFGenerator component
const PrintPreparation = ({ openData, closeModal }) => {
  const [preparing] = useState(openData);

  // Logging to inspect the data structure
  console.log("Preparing data:", preparing);

  // Function to generate the PDF document
  const generatePDF = () => (
    <Document author="Tecnocorp Solutions" subject={`Number of servings: ${openData?.data?.numberOfPortion}, weight: ${openData?.data?.quantity}`} title={openData?.data?.title}>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerContainer}>
          <View style={[styles.scheduleContainer,styles.recipeBlock]}>
            <Text style={styles.recipeTitle}>{`Preparation Slip : ${dateFormat(openData.date)}`}</Text>
          </View>
          {Array.isArray(preparing) &&
            preparing.map((recipeItem, recipeIndex) => (
              <View key={recipeIndex} style={styles.recipeBlock}>
                <Text style={styles.recipeTitle}>
                  {`${recipeIndex + 1}. ${recipeItem?.recipe?.title || "No Title"} / `} <Text style={styles.recipeCount}>{`${recipeItem.count} nos • ${recipeItem.gram.toFixed(2)} gram`}</Text>
                </Text>
                <View style={styles.scheduleContainer}>
                  {recipeItem.schedules.map((schedule, scheduleIndex) => (
                    <Text key={scheduleIndex} style={styles.scheduleText}>
                      {`${schedule.user.cprNumber} / ${schedule.nutritionInfo.gram.toFixed(2)} gram ${schedule.recipeNote?.length > 0 || schedule.diet.kitchenNote?.length > 0 ? "/ Note: " + (schedule.recipeNote?.length > 0 ? schedule.recipeNote + ", " : "") + schedule.diet.kitchenNote + " " : ""}`}
                    </Text>
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

export default PrintPreparation;
