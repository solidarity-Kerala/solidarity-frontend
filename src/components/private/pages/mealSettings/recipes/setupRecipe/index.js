import React from "react";
import { useEffect, useState } from "react";
import { Document, Page, Text, View, StyleSheet, PDFViewer, Image } from "@react-pdf/renderer";
import { Button } from "../../../../../elements/select/styles";
import { Footer } from "../../../../../elements/form/styles";
import { Overlay } from "../../../../../elements/form/styles";
import { Page as PageView } from "../../../../../elements/form/styles";
import FormInput from "../../../../../elements/input";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { getData } from "../../../../../../backend/api";

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
  logo: { width: "80px", marginBottom: "20px", marginTop: 30 },
  bold: {
    fontWeight: "bold",
    fontFamily: "Helvetica-Bold",
  },
  title: {
    marginBottom: 5,
    fontSize: 12,
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
  addressItem: {
    minHeight: "10px",
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
  footerText: {
    marginTop: 30,
    textAlign: "center",
    paddingLeft: 30,
    paddingRight: 30,
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
    width: "auto",
    borderCollapse: "collapse",
    marginTop: 20,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCell: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 8,
  },
});

const CustomTable = ({ data, openData }) => (
  <View style={styles.table}>
    <View style={styles.tableRow}>
      <View style={[styles.tableCell, styles.bold]}>
        <Text>Ingredient</Text>
      </View>
      <View style={[styles.tableCell, styles.bold]}>
        <Text>Calories</Text>
      </View>
      <View style={[styles.tableCell, styles.bold]}>
        <Text>Quantity</Text>
      </View>
    </View>
    {data?.length &&
      data.map((row, index) => (
        <View style={styles.tableRow} key={index}>
          <View style={styles.tableCell}>
            <Text>{row.ingredient?.ingredientsName}</Text>
          </View>
          <View style={styles.tableCell}>
            <Text>{row?.calories / openData?.data?.numberOfPortion}</Text>
          </View>
          <View style={styles.tableCell}>
            <Text>{row?.quantity / openData?.data?.numberOfPortion}</Text>
          </View>
        </View>
      ))}
  </View>
);

// PDFGenerator component
const PDFGenerator = ({ openData, closeModal }) => {
  const [recipeIngredients, setRecipeIngredients] = useState();
  const { t } = useTranslation();
  const themeColors = useSelector((state) => state.themeColors);

  // Fetch recipe ingredients data
  useEffect(() => {
    getData({ recipe: openData?.data?._id }, "recipe-ingredients").then(
      (response) => {
        console.log({ response });
        setRecipeIngredients(response?.data?.response);
      }
    );
  }, [openData]);

  // Function to generate the PDF document
  const generatePDF = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.address}>
          <Image
            src="https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img/https://foodcitybahrain.com/wp-content/uploads/2020/07/EuroBake_LogoSize_600x600.png"
            alt="Euro Bake"
            style={styles.logo}
          />
          <Text style={styles.addressItem}>
            {openData?.data?.title} ({openData?.data?.measurementType})
          </Text>
          <Text style={styles.addressItem}>Number of servings: 60.82(25g per slice)</Text>
          <Text style={styles.addressItem}>Number of servings: {openData?.data?.numberOfPortion}</Text>
          <Text style={styles.addressItem}>weight: 1850g (yield: 1520.59g)</Text>
          <Text style={styles.addressItem}></Text>
        </View>

        {/* Render the custom table component */}
        <CustomTable data={recipeIngredients} openData={openData} />

        {/* ... your existing content ... */}
      </Page>
    </Document>
  );

  return (
    <Overlay className={"popup"}>
      <PageView className={"full"}>
        <PDFViewer style={{ width: "100%", height: "600px" }}>
          {generatePDF()}
        </PDFViewer>
        <Footer>
          <FormInput type="close" value={"cancel"} onChange={closeModal} />
          <Button document={generatePDF()} fileName="test.pdf">
            {({ blob, url, loading, error }) => (loading ? "Loading document..." : "Download PDF")}
          </Button>
        </Footer>
      </PageView>
    </Overlay>
  );
};

export default PDFGenerator;