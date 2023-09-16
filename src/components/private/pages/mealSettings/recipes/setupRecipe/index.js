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
  headerContainer: {
    flexDirection: 'row', // lays out children (text and logo) side by side
    justifyContent: 'space-between', // creates space between the text and logo
    alignItems: 'center', // vertically centers the text and logo
    marginBottom: 20, // or any other value to give some space below the header
  },
  textContainer: {
    width: '65%', // allocates 65% of the space to the text
  },
  logoContainer: {
    width: '35%', // allocates 35% of the space to the logo
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
    textAlign:"left",
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
    textAlign:"left",
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
    height: "20px",  // Adjust the value to your preference
},

  headerLineBlack: {
    border: 1,
    borderColor: "#000",
  },
  headerLineBlackSmall: {
    border: 1,
    borderColor: "#000",
    height: 1,
    marginBottom:5,
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
    backgroundColor: "#f0f0f0", // Example background color, adjust as needed
    padding: 10, // Adjust as needed
    borderRadius: 5, // Example border radius, adjust as needed
  },
  sectionBottomHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5, // Adjust as needed
  },
  h2: {
    fontSize: 16, // Example font size, adjust as needed
    fontWeight: "bold",
    fontWeight: "bold",
    // Add other text styles (color, fontFamily, etc.) as needed
  },
  sectionBottomTimings: {
    flexDirection: "row",
    justifyContent: "space-between",
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

    <View style={styles.table}>
  <View style={styles.tableRow}>
    <Text style={styles.tableCell}>Calories</Text>
    <Text style={styles.tableCell}>السعرات الحرارية</Text>
    <Text style={styles.tableCell}>
      {openData?.data?.calories / openData?.data?.numberOfPortion}
    </Text>
  </View>
  <View style={styles.tableRow}>
    <Text style={styles.tableCell}>Total Fat</Text>
    <Text style={styles.tableCell}>الدهون الكلية</Text>
    <Text style={styles.tableCell}>
      {openData?.data?.totalFat / openData?.data?.numberOfPortion}
    </Text>
  </View>
  <View style={styles.tableRow}>
    <Text style={styles.tableCell}>Total Fiber</Text>
    <Text style={styles.tableCell}>الألياف الكلية</Text>
    <Text style={styles.tableCell}>
      {openData?.data?.fiber / openData?.data?.numberOfPortion}
    </Text>
  </View>
  <View style={styles.tableRow}>
    <Text style={styles.tableCell}>Total Sugar</Text>
    <Text style={styles.tableCell}>السكر الكلي</Text>
    <Text style={styles.tableCell}>
      {openData?.data?.sugars / openData?.data?.numberOfPortion}
    </Text>
  </View>
  <View style={styles.tableRow}>
    <Text style={styles.tableCell}>Protein</Text>
    <Text style={styles.tableCell}>البروتين</Text>
    <Text style={styles.tableCell}>
      {openData?.data?.protein / openData?.data?.numberOfPortion}
    </Text>
  </View>
  <View style={styles.tableRow}>
    <Text style={styles.tableCell}>Calcium</Text>
    <Text style={styles.tableCell}>الكالسيوم</Text>
    <Text style={styles.tableCell}>
      {openData?.data?.calcium / openData?.data?.numberOfPortion}
    </Text>
  </View>
  <View style={styles.tableRow}>
    <Text style={styles.tableCell}>Iron</Text>
    <Text style={styles.tableCell}>الحديد</Text>
    <Text style={styles.tableCell}>
      {openData?.data?.iron / openData?.data?.numberOfPortion}
    </Text>
  </View>
  <Text style={styles.paragraph}>
    {openData?.data?.description}
  </Text>
</View>



    {/* <Footer /> Include the Footer component here */}
    <View style={styles.sectionBottomItems}>
      <View style={styles.sectionBottomTitle}>
        {/* Allergens */}
        <View style={styles.sectionBottomHeader}>
          <Text style={styles.h3}>Allergens: </Text>
          <Text style={styles.h3}>{openData?.data?.allergy || 0}</Text>
        </View>

        {/* Ingredients */}
        

        {/* Storage */}
        <View style={styles.sectionBottomHeader}>
          <Text style={styles.h3}>Storage: </Text>
          <Text style={styles.h3}>{openData?.data?.storage || 0}</Text>
        </View>

        {/* Validity */}
        <View style={styles.sectionBottomHeader} id="section-validity">
          <Text style={styles.h3}>Validity: </Text>
          <Text style={styles.h3}>{openData?.data?.validity || 0}</Text>
        </View>
        <View style={styles.sectionBottomHeader}>
          <Text style={styles.h3}>Ingredients: </Text>
          {data?.length &&
            data.map((data, key) => (
              <Text style={styles.h3} key={key}>
                {data.ingredient?.ingredientsName}
              </Text>
            ))}
        </View>
        <View style={styles.headerLineBlackSmall} />
        {/* Produced By */}
        <View style={styles.sectionBottomHeader}>
          <Text style={styles.h3}>Produced By: </Text>
          <Text style={styles.h3}>EUROS BAKE, Bahrain</Text>
        </View>

        {/* MADE IN BAHRAIN */}
        <View style={styles.sectionBottomHeader}>
          <Text style={styles.h3}>MADE IN BAHRAIN</Text>
          <Text>{new Date().toLocaleString()}</Text>
        </View>

        {/* Timings */}
       
      </View>
    </View>
    <View style={styles.footer}>
      <View style={styles.footerItems}>
        <View >
          <Text style={styles.footerTextleft}>Euros Bake W.L.L, CR.No:72669-6</Text>
          <Text style={styles.footerTextleft}>
            P.O BOX:80304, Sanad, Kingdom of Bahrain
          </Text>
        </View>
        <View>
          <Text style={styles.footerTextright}>
            (+973 17 627777 ) (+973 33 626044)
          </Text>
          <Text style={styles.footerTextright}>
            (sales@eurobakes.me.com)
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
      <View style={styles.headerContainer}>
  <View style={styles.textContainer}>
    <Text style={styles.title}>
      {openData?.data?.title} ({openData?.data?.measurementType})
    </Text>
    <Text style={styles.recipetitle}>
      Number of servings: {openData?.data?.numberOfPortion}
    </Text>
    <Text style={styles.recipetitle}>
      weight: {openData?.data?.quantity}
    </Text>
  </View>
  <View style={styles.logoContainer}>
    <Image
      source={require('https://www.gcpr.net/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2019/03/Public-Link-bild-blog-450x338.jpg')} // Adjusted the way of specifying source
      style={styles.logo}
    />
  </View>
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
