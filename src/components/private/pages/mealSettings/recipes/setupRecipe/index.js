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
  nutritionData: {
    fontSize: 14,
    fontWeight: "600",
    display: "flex",
    justifyContent: "space-between",
  },
  headerLineBlack: {
    border: 1,
    borderColor: "#000",
  },
  headerLineBlackSmall: {
    border: 1,
    borderColor: "#000",
    height: 5,
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
});

const CustomTable = ({ data, openData, recipeIngredients }) => (
  <View style={styles.table}>
    {/* Table Header */}
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
    {/* Table Data Rows */}
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
    {/* Nutrition Data */}
    <View>
      <Text>{openData?.data?.title}</Text>
      {/* Nutrition Data Entries */}
      <View style={styles.nutritionData}>
        <Text>Calories</Text>
        <Text>
          {openData?.data?.calories / openData?.data?.numberOfPortion}
        </Text>
      </View>
      <View style={styles.headerLineBlackSmall} />

      {/* Repeat the above structure for other nutrition data */}
      <View style={styles.nutritionData}>
        <Text>Total Fat 1.5g</Text>
        <Text>
          {openData?.data?.totalFat / openData?.data?.numberOfPortion}
        </Text>
      </View>
      <View style={styles.headerLineBlackSmall} />

      <View style={styles.nutritionData}>
        <Text>Total Fiber 0g</Text>
        <Text>{openData?.data?.fiber / openData?.data?.numberOfPortion}</Text>
      </View>
      <View style={styles.headerLineBlackSmall} />

      <View style={styles.nutritionData}>
        <Text>Total Sugar 0g</Text>
        <Text>{openData?.data?.sugars / openData?.data?.numberOfPortion}</Text>
      </View>
      <View style={styles.headerLineBlackSmall} />

      <View style={styles.nutritionData}>
        <Text>Protein 2g</Text>
        <Text>
          {openData?.data?.calories / openData?.data?.numberOfPortion}
        </Text>
      </View>
      <View style={styles.headerLineBlackSmall} />

      <View style={styles.nutritionData}>
        <Text>Calcium 15mg</Text>
        <Text>{openData?.data?.calcium / openData?.data?.numberOfPortion}</Text>
      </View>
      <View style={styles.headerLineBlackSmall} />

      <View style={styles.nutritionData}>
        <Text>Iron 1mg</Text>
        <Text>{openData?.data?.iron / openData?.data?.numberOfPortion}</Text>
      </View>

      {/* Additional Paragraph */}
      <Text style={styles.paragraph}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae nam,
        odio mollitia, repellendus quo commodi quas
      </Text>
    </View>
    <View style={styles.milkBreadTable}>
      <Text style={styles.milkBreadTitle}>Milk bread small</Text>
      <Text style={styles.nutritionFacts}>Nutrition facts</Text>
      <View style={styles.servingSize}>
        <Text>serving size</Text>
        <Text>(25g)</Text>
      </View>
      <View style={styles.headerLine} />
      <Text>Calories</Text>
      <View style={styles.servingSize}>
        <Text>Calories</Text>
        <Text>70</Text>
      </View>
      <View style={styles.headerLineSmall} />
      <View style={styles.servingSize}>
        <Text>serving size</Text>
        <Text>(25g)</Text>
      </View>
      <View style={styles.servingSize}>
        <Text>Trans fat</Text>
        <Text>0</Text>
      </View>
      <View style={styles.servingSize}>
        <Text>Total carbohydrate</Text>
        <Text>4%</Text>
      </View>
      <View style={styles.headerLine} />
      <View style={styles.servingSize}>
        <Text>chelostrol</Text>
        <Text>4%</Text>
      </View>
      <View style={styles.servingSize}>
        <Text>sodium</Text>
        <Text>2%</Text>
      </View>
      <View style={styles.servingSize}>
        <Text>Chelostrol</Text>
        <Text>2%</Text>
      </View>
      <View style={styles.headerLineSmall} />
      <Text style={styles.description}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae nam,
        odio mollitia, repellendus quo commodi quas
      </Text>
    </View>

    {/* <Footer /> Include the Footer component here */}
    <View style={styles.sectionBottomItems}>
      <View style={styles.sectionBottomTitle}>
        {/* Allergens */}
        <View style={styles.sectionBottomHeader}>
          <Text style={styles.h2}>Allergens: </Text>
          <Text style={styles.h2}>{openData?.data?.allergy || 0}</Text>
        </View>

        {/* Ingredients */}
        <View style={styles.sectionBottomHeader}>
          <Text style={styles.h2}>Ingredients: </Text>
          {recipeIngredients?.length &&
            recipeIngredients.map((data, key) => (
              <Text style={styles.h2} key={key}>
                {data.ingredient?.ingredientsName}
              </Text>
            ))}
        </View>

        {/* Storage */}
        <View style={styles.sectionBottomHeader}>
          <Text style={styles.h2}>Storage: </Text>
          <Text style={styles.h2}>{openData?.data?.storage || 0}</Text>
        </View>

        {/* Validity */}
        <View style={styles.sectionBottomHeader} id="section-validity">
          <Text style={styles.h2}>Validity: </Text>
          <Text style={styles.h2}>{openData?.data?.validity || 0}</Text>
        </View>

        {/* Produced By */}
        <View style={styles.sectionBottomHeader}>
          <Text style={styles.h2}>Produced By: </Text>
          <Text style={styles.h2}>EUROS BAKE, Bahrain</Text>
        </View>

        {/* MADE IN BAHRAIN */}
        <View style={styles.sectionBottomHeader}>
          <Text style={styles.h2}>MADE IN BAHRAIN</Text>
        </View>

        {/* Timings */}
        <View style={styles.sectionBottomTimings}>
          <Text>12/27/2021</Text>
          <Text>3:45:35pm</Text>
        </View>
      </View>
    </View>
    <View style={styles.footer}>
      <View style={styles.footerItems}>
        <View style={styles.footerItemsData}>
          <Text style={styles.footerText}>Euros Bake W.L.L, CR.No:72669-6</Text>
          <Text style={styles.footerText}>
            P.O BOX:80304, Sanad, Kingdom of Bahrain
          </Text>
        </View>
        <View>
          <Text style={styles.footerText}>
            (+973 17 627777 ) (+973 33 626044)
          </Text>
          <Text style={styles.footerText}>
            (sales@eurobakes.me.com) (www.eurobakes.com)
          </Text>
        </View>
      </View>
    </View>
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
          <Text style={styles.addressItem}>
            Number of servings: 60.82(25g per slice)
          </Text>
          <Text style={styles.addressItem}>
            Number of servings: {openData?.data?.numberOfPortion}
          </Text>
          <Text style={styles.addressItem}>
            weight: 1850g (yield: 1520.59g)
          </Text>
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
        {/* Add the provided code here */}
        <hr className="footer-line-brown" />
        <div className="button-container" style={{ padding: 10 }}>
          <button
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              padding: "10px 20px",
              border: "none",
              cursor: "pointer",
              marginRight: "10px",
            }}
            onClick={generatePDF}
          >
            Generate PDF
          </button>
          <button
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              padding: "10px 20px",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => window.print()}
          >
            Print PDF
          </button>
        </div>
        <Footer>
          <FormInput type="close" value={t("cancel")} onChange={closeModal} />
          <Button document={generatePDF()} fileName="test.pdf">
            {({ blob, url, loading, error }) =>
              loading ? "Loading document..." : t("download") + " PDF"
            }
          </Button>
        </Footer>
      </PageView>
    </Overlay>
  );
};

export default PDFGenerator;
