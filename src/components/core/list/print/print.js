import React from "react";
import { useState } from "react";
import { Document, Page, Text, View, StyleSheet, PDFViewer } from "@react-pdf/renderer";
import { Page as PageView } from "../../form/styles";
import { getValue } from "../functions";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 10,
  },
  headerContainer: {
    marginBottom: 10,
    // additional header styles
  },
  scheduleContainer: {
    // styles for the schedule container
  },
  recipeBlock: {
    // styles for the recipe block
  },
  recipeTitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
  },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  thead: {
    width: "100%",
  },
  tbody: {
    marginTop: 2,
    width: "100%",
  },
  tr: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    borderTopWidth: 0,
  },
  th: {
    padding: 8,
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "left",
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: "#bfbfbf",
  },
  td: {
    padding: 8,
    fontSize: 10,
    textAlign: "left",
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: "#bfbfbf",
    
  },
  itemText: {
    textOverflow:"ellipsis"
  },
  header: {
  },
});

// PDFGenerator component
const Print = ({ orientation="protrait",style, themeColors, attributes, setLoaderBox, setMessage, closeModal, shortName, data = [] }) => {
  const [pageData] = useState(data.response);
  const TableRowWithActions = ({ attributes, data, slNo }) => {
    console.log(slNo, data);
    return (
      <View style={styles.tr}>
        {attributes.map((attribute, index) => {
          if ((attribute.print??true)) {
            try {
              const itemValue = attribute.collection?.length > 0 && attribute.showItem?.length > 0 ? data[attribute.collection][attribute.showItem] : data[attribute.name];

              return (
                <View style={styles.td}>
                  <Text style={styles.itemText}>{getValue(attribute, itemValue,false,true)}</Text>
                </View>
              );
            } catch (error) {
              return (
                <View style={styles.td}>
                  <Text style={styles.itemText}>{`--`}</Text>
                </View>
              );
            }
          }

          return null;
        })}
      </View>
    );
  };
  // Logging to inspect the data structure
  console.log("Print data:", pageData, attributes);

  // Function to generate the PDF document
  const generatePDF = () => (
    <Document author="Tecnocorp Solutions" subject={shortName} title={shortName}>
      <Page size="A4" orientation={orientation} style={styles.page}>
        <View style={styles.headerContainer}>
          <View style={[styles.scheduleContainer, styles.recipeBlock]}>
            <Text style={styles.recipeTitle}>{`Print Page : ${shortName}`}</Text>
          </View>
          {Array.isArray(pageData) && (
            <View style={styles.table}>
              <View style={styles.thead}>
                <View style={styles.tr}>
                  {attributes.map((attribute) => {
                    return (attribute.print??true) === true ? (
                      <View style={styles.th}>
                        <Text style={styles.header}>{attribute.label}</Text>
                      </View>
                    ) : (
                      ""
                    );
                  })}
                </View>
              </View>
              <View style={styles.tbody}>{pageData?.length > 0 && pageData.map((item, index) => <TableRowWithActions slNo={index} attributes={attributes} data={item} />)}</View>
            </View>
          )}
        </View>
      </Page>
    </Document>
  );

  // Only render PDFViewer if preparing is an array and not empty
  return <PageView>{Array.isArray(pageData) && pageData.length > 0 && <PDFViewer style={{ display: "flex", width: "100%", height: "74vh" }}>{generatePDF()}</PDFViewer>}</PageView>;
};

export default Print;
