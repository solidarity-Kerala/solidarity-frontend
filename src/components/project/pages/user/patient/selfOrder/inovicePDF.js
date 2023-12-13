// import React from "react";
// import { useSelector } from "react-redux";
// import {
//   Document,
//   Page,
//   Text,
//   View,
//   StyleSheet,
//   PDFViewer,
//   Image,
// } from "@react-pdf/renderer";
// import { Page as PageView } from "../../../../../core/form/styles";
// import { food } from "../../../../../../images";

// const staticInvoiceData = {
//   title: "Invoice Details",
//   invoiceDate: "2023-10-09",
//   dueDate: "2023-10-16",
//   customerName: "John Doe",
//   address: "123 Main Street",
//   cityStateZIP: "Anytown, USA 12345",
//   email: "john@example.com",
//   item: "",
//   quantity: "2",
//   unitPrice: "299",
//   tax: "2",
//   totalAmount: 1000, // Replace with the static total amount
//   additionalNotes: "Thank you for your business!",
// };

// const styles = StyleSheet.create({
//   page: {
//     // fontFamily: "Helvetica",
//     // fontSize: 12,
//     // padding: 40,
//     backgroundColor: "#ffffff",
//     padding: "20px",
//     paddingLeft: "2cm",
//     paddingRight: "1.5cm",
//     fontFamily: "Helvetica",
//     fontSize: "12pt",
//   },
//   headerContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 20,
//     alignItems: "center",
//   },
//   textContainer: {
//     width: "65%", // allocates 65% of the space to the text
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//   },
//   logoContainer: {
//     width: "100%",
//     // height: 100,
//     borderRadius: 50,
//     // backgroundColor: "#ccc",
//     justifyContent: "center",
//     // alignItems: "center",
//   },
//   logo: {
//     width: 80,
//     height: 80,
//   },
//   invoicetitle: {
//     fontSize: 12,
//     marginTop: 8,
//     textAlign: "right",
//   },
//   sectionBottomItems: {
//     marginTop: 20,
//   },
//   sectionBottomTitle: {
//     backgroundColor: "#f0f0f0", // Example background color, adjust as needed
//     padding: 10, // Adjust as needed
//     borderRadius: 5, // Example border radius, adjust as needed
//   },
//   sectionBottomHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 5,
//   },
//   h3: {
//     fontSize: 16,
//     fontWeight: "bold",
//     marginBottom: 4,
//   },
//   description: {
//     width: "350px",
//     fontSize: 14,
//     marginBottom: 4,
//   },
// });

// const InvoicePDF = (openData) => {
//   const user = useSelector((state) => state.login);
//   const loginUser = user?.data?.user;

//   console.log({ loginUser });
//   console.log(openData);
//   const generatePDF = () => (
//     <Document
//       author="Datahex"
//       subject={`Invoice for ${staticInvoiceData.title}`}
//       title={`Invoice - ${staticInvoiceData.title}`}
//     >
//       <Page size="A4" style={styles.page}>
//         <View style={styles.headerContainer}>
//           <View style={styles.textContainer}>
//             <Text style={styles.title}>Datahex</Text>
//             <View style={styles.logoContainer}>
//               <Image source={food} style={styles.logo} />
//             </View>
//           </View>

//           <View>
//             <Text style={styles.invoicetitle}>
//               Invoice Date: {staticInvoiceData.invoiceDate}
//             </Text>
//             <Text style={styles.invoicetitle}>
//               Due Date: {staticInvoiceData.dueDate}
//             </Text>
//           </View>
//         </View>
//         <View style={styles.sectionBottomItems}>
//           <View style={styles.sectionBottomTitle}>
//             <View style={styles.sectionBottomHeader}>
//               <Text style={styles.h3}>Bill To:</Text>
//             </View>
//             <Text style={styles.description}>
//               Customer Name: {loginUser.userDisplayName}
//             </Text>
//             {/* <Text style={styles.description}>
//               Address: {staticInvoiceData.address}
//             </Text>
//             <Text style={styles.description}>
//               City, State, ZIP: {staticInvoiceData.cityStateZIP}
//             </Text> */}
//             <Text style={styles.description}>Email: {loginUser.email}</Text>
//           </View>
//         </View>
//         <View
//           style={{
//             margin: "10px 0px 0px 0px",
//           }}
//         >
//           <Text style={styles.h3}>Invoice Details: {openData?.inovice}</Text>

//           <View style={styles.tableRow}>
//             <View style={[styles.tableCell, styles.bold]}>
//               <Text>Ingredient</Text>
//             </View>
//             <View style={[styles.tableCell, styles.bold]}>
//               <Text>Calories</Text>
//             </View>
//             <View style={[styles.tableCell, styles.bold]}>
//               <Text>Quantity</Text>
//             </View>
//           </View>
//           {/* Table Data Rows */}
//           {openData?.openData?.length &&
//             openData?.openData?.map((value, index) => (
//               <View style={styles.tableRow} key={index}>
//                 <View style={styles.tableCell}>
//                   <Text>{value?.value}</Text>
//                 </View>
//                 <View style={styles.tableCell}>
//                   <Text>
//                     {value?.totalPrice / openData?.data?.numberOfPortion}
//                   </Text>
//                 </View>
//                 <View style={styles.tableCell}>
//                   <Text>
//                     {value?.totalPrice / openData?.data?.numberOfPortion}
//                   </Text>
//                 </View>
//               </View>
//             ))}
//         </View>
//         {openData?.openData?.length &&
//           openData?.openData?.map((value, index) => (
//             <View style={styles.sectionBottomItems} key={index}>
//               <View style={styles.sectionBottomTitle}>
//                 {/* <View style={styles.sectionBottomHeader}>
//                   <Text style={styles.h3}>
//                     Invoice Details: {openData?.inovice}
//                   </Text>
//                 </View> */}
//                 <Text style={styles.description}>Item: {value?.value}</Text>
//                 <Text style={styles.description}>
//                   Quantity: {value?.quantity}
//                 </Text>
//                 <Text style={styles.description}>
//                   Unit Price: {value?.totalPrice}
//                 </Text>
//                 <Text style={styles.description}>
//                   Tax: {value?.taxTotalPrice - value?.totalPrice}
//                 </Text>
//                 <Text style={styles.h3}>
//                   Invoice Total: {value?.taxTotalPrice}
//                 </Text>
//               </View>
//             </View>
//           ))}

//         <View style={styles.sectionBottomItems}>
//           <View style={styles.sectionBottomTitle}>
//             <View style={styles.sectionBottomHeader}>
//               <Text style={styles.h3}>Additional Notes:</Text>
//             </View>
//             <Text style={styles.description}>
//               {staticInvoiceData.additionalNotes}
//             </Text>
//           </View>
//         </View>
//       </Page>
//     </Document>
//   );

//   return (
//     <PageView>
//       <PDFViewer style={{ width: "100%", height: "600px" }}>
//         {generatePDF()}
//       </PDFViewer>
//     </PageView>
//   );
// };

// export default InvoicePDF;

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
import { Page as PageView } from "../../../../../core/form/styles";
import { getData } from "../../../../../../backend/api";
import { food } from "../../../../../../images";
import { useSelector } from "react-redux";

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
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCell: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 2,
    width: "20%",
    height: "20px", // Adjust the value to your preference
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
    marginBottom: 20,
    marginTop: 20,
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

const CustomTable = ({ data, openData, recipeIngredients, loginUser }) => (
  <View style={styles.table}>
    {/* Table Header */}
    <View style={styles.tableRow}>
      <View style={[styles.tableCell, styles.bold]}>
        <Text>Recipe</Text>
      </View>
      <View style={[styles.tableCell, styles.bold]}>
        <Text>Quantity</Text>
      </View>
      <View style={[styles.tableCell, styles.bold]}>
        <Text>Price</Text>
      </View>
      <View style={[styles.tableCell, styles.bold]}>
        <Text>Tax</Text>
      </View>
      <View style={[styles.tableCell, styles.bold]}>
        <Text>Tax Price</Text>
      </View>
    </View>
    {/* Table Data Rows */}
    {openData?.openData?.length &&
      openData?.openData?.map((value, index) => (
        <View style={styles.tableRow} key={index}>
          <View style={styles.tableCell}>
            <Text>{value?.value}</Text>
          </View>
          <View style={styles.tableCell}>
            <Text>{value?.quantity}</Text>
          </View>
          <View style={styles.tableCell}>
            <Text>{value?.totalPrice}</Text>
          </View>
          <View style={styles.tableCell}>
            <Text>{value?.taxTotalPrice - value?.totalPrice}</Text>
          </View>
          <View style={styles.tableCell}>
            <Text>{value?.taxTotalPrice}</Text>
          </View>
        </View>
      ))}

    {/* <Footer /> Include the Footer component here */}
    <View style={styles.sectionBottomItems}>
      <View style={styles.sectionBottomTitle}>
        {/* Allergens */}
        <View style={styles.sectionBottomHeader}>
          <Text style={styles.h3}>
            Customer Name: {loginUser.userDisplayName}
          </Text>
        </View>
        <View style={styles.sectionBottomHeader}>
          <Text style={styles.h3}>Customer Name: {loginUser.email}</Text>
        </View>

        {/* Ingredients */}

        {/* Storage */}
        {/* <View style={styles.sectionBottomHeader}>
          <Text style={styles.h3}>Storage: </Text>
          <Text style={styles.h3}>{openData?.data?.storage || 0}</Text>
        </View> */}

        {/* Validity */}
        {/* <View style={styles.sectionBottomHeader} id="section-validity">
          <Text style={styles.h3}>Validity: </Text>
          <Text style={styles.h3}>{openData?.data?.validity || 0}</Text>
        </View>
        <View style={styles.sectionBottomHeader}>
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
        <View>
          <Text style={styles.footerTextleft}>
            Euros Bake W.L.L, CR.No:72669-6
          </Text>
          <Text style={styles.footerTextleft}>
            P.O BOX:80304, Sanad, Kingdom of Bahrain
          </Text>
        </View>
        <View>
          <Text style={styles.footerTextright}>
            (+973 17 627777 ) (+973 33 626044)
          </Text>
          <Text style={styles.footerTextright}>(sales@eurobakes.me.com)</Text>
        </View>
      </View>
    </View>
  </View>
);

// InvoicePDF component
// const InvoicePDF = ({ openData, closeModal }) => {
const InvoicePDF = (openData) => {
  const [recipeIngredients, setRecipeIngredients] = useState();
  const user = useSelector((state) => state.login);
  const loginUser = user?.data?.user;

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
    <Document
      author="Tecnocorp Solutions"
      subject={`Number of servings: ${openData?.data?.numberOfPortion}, weight: ${openData?.data?.quantity}`}
      title={openData?.data?.title}
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.headerContainer}>
          <View style={styles.textContainer}>
            {/* <Text style={styles.title}>
              {openData?.data?.title} ({openData?.data?.measurementType})
            </Text> */}
            <Text style={styles.recipetitle}>Invoice: {openData?.inovice}</Text>
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
        <CustomTable
          data={recipeIngredients}
          openData={openData}
          loginUser={loginUser}
        />

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

export default InvoicePDF;
