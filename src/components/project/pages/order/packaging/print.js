import React from "react";
import { useState } from "react";
import { Document, Page, Text, View, StyleSheet, PDFViewer } from "@react-pdf/renderer";
import { Page as PageView } from "../../../../core/form/styles";
import { dateFormat } from "../../../../core/functions/date";

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
    borderColor: 'black',
    borderStyle: 'solid',
    justifyContent: 'center',
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
    borderColor: 'black',
    borderStyle: 'solid',
  },
});

// PDFGenerator component
const Print = ({ openData, closeModal }) => {
  const [preparing] = useState(openData);

  // Logging to inspect the data structure
  console.log("Preparing data:", preparing);

  // Function to generate the PDF document
  const generatePDF = () => (
    <Document author="Tecnocorp Solutions" subject={`Number of servings: ${openData?.data?.numberOfPortion}, weight: ${openData?.data?.quantity}`} title={openData?.data?.title}>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerContainer}>
          <View style={[styles.scheduleContainer, styles.recipeBlock]}>
            <Text style={styles.recipeTitle}>{`Packaging Slip : ${dateFormat(openData.date)}`}</Text>
          </View>
          {Array.isArray(preparing) &&
            preparing.map((recipeItem, recipeIndex) => (
              <View style={styles.tableContainer}>
                 <Text style={styles.recipeTitle}>
                  {`${recipeIndex + 1}.${recipeItem?.user?.cprNumber || "No Title"} / ${recipeItem?.user?.fullName || "No Title"} / `} <Text style={styles.recipeCount}>{`${recipeItem.count} nos • ${recipeItem.gram.toFixed(2)} gram`}</Text>
                </Text>
                <View style={styles.tableHeader}>
                  <View style={[styles.headerCell, { maxWidth: 50 }]}>
                    <Text style={styles.headerText}>SLNO.</Text>
                  </View>
                  <View style={styles.headerCell}>
                    <Text style={styles.headerText}>Title</Text>
                  </View>
                  <View style={styles.headerCell}>
                    <Text style={styles.headerText}>Gram</Text>
                  </View>
                </View>
                {recipeItem.schedules.map((schedule, scheduleIndex) => (
                  <View key={scheduleIndex} style={styles.tableRow}>
                    <View style={[styles.cell, { maxWidth: 50 }]}>
                      <Text style={styles.rowText}>{scheduleIndex + 1}</Text>
                    </View>
                    <View style={styles.cell}>
                      <Text style={styles.rowText}>{schedule.recipe.title}</Text>
                    </View>
                    <View style={styles.cell}>
                      <Text style={styles.rowText}>{schedule.nutritionInfo.gram.toFixed(2)} gram</Text>
                    </View>
                  </View>
                ))}
              </View>
            ))}
        </View>
      </Page>
    </Document>
  );

  // Only render PDFViewer if preparing is an array and not empty
  return <PageView>{Array.isArray(preparing) && preparing.length > 0 && <PDFViewer style={{ display: "flex", width: "100%", height: "74vh" }}>{generatePDF()}</PDFViewer>}</PageView>;
};

export default Print;
