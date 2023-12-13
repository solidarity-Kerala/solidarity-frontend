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
import { useSelector } from "react-redux";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: "2cm 1.5cm 20px 1.5cm",
    fontFamily: "Helvetica",
    fontSize: "12pt",
  },
  headerContainer: {
    flexDirection: "row", // lays out children (text and logo) side by side
    justifyContent: "space-between", // creates space between the text and logo
    alignItems: "center", // vertically centers the text and logo
    marginBottom: 20, // or any other value to give some space below the header
    gap: "200px",
  },
  secondContainer: {
    flexDirection: "row", // lays out children (text and logo) side by side
    justifyContent: "space-between", // creates space between the text and logo
    alignItems: "flex-end", // vertically centers the text and logo
    marginBottom: 20, // or any other value to give some space below the header
    gap: "200px",
  },
  textContainer: {
    width: "65%", // allocates 65% of the space to the text
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  dateContainer: {
    display: "flex",
    flexDirection: "row",
    gap: "40px",
    width: "65%", // allocates 65% of the space to the text
    justifyContent: "flex-end",
  },
  date: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "10px",
    color: "black",
  },
  logoContainer: {
    width: "35%", // allocates 35% of the space to the logo
  },
  logo: {
    width: 50, // or any other value
    height: 50, // or any other value, but should maintain the aspect ratio of your logo
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
  //   address: {
  //     marginBottom: "20px",
  //     marginLeft: "auto",
  //     marginRight: "0",
  //   },

  recipetitle: {
    minHeight: "10px",
    fontSize: "24px",
    textAlign: "right",
  },
  customercontainer: {},
  balance: {
    minHeight: "10px",
    fontSize: "8px",
    textAlign: "right",
    fontWeight: "bold",
    fontFamily: "Helvetica-Bold",
    color: "#474747",
  },
  balanceamount: {
    minHeight: "10px",
    fontSize: "12px",
    textAlign: "right",
    fontWeight: "bold",
    fontFamily: "Helvetica-Bold",
    // color: "#474747",
  },

  address: {
    // minHeight: "10px",
    fontSize: "10px",
    textAlign: "left",
  },
  fullName: {
    minHeight: "10px",
    fontSize: "9px",
    textAlign: "left",
    fontWeight: "bold",
    fontFamily: "Helvetica-Bold",
  },
  invoiceNumber: {
    minHeight: "10px",
    fontSize: "10px",
    fontWeight: "bold",
    fontFamily: "Helvetica-Bold",
    textAlign: "right",
    color: "#474747",
  },
  dateItem: {
    minHeight: "10px",
    fontSize: "10px",
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
    tableLayout: "fixed",
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCellIndex: {
    padding: 2,
    width: "5%",
    backgroundColor: "#59d474",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "10px",
    height: "30px", // Adjust the value to your preference
  },
  tableCellItemName: {
    padding: 2,
    width: "40%",
    backgroundColor: "#59d474",
    color: "white",
    display: "flex",
    justifyContent: "center",
    fontSize: "10px",
    height: "30px", // Adjust the value to your preference
  },
  tableCell: {
    padding: 2,
    width: "11%",
    backgroundColor: "#59d474",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "10px",
    height: "30px", // Adjust the value to your preference
  },
  taxTableCellItemName: {
    padding: 2,
    width: "40%",
    backgroundColor: "#59d474",
    color: "white",
    display: "flex",
    justifyContent: "center",
    fontSize: "10px",
    height: "30px", // Adjust the value to your preference
  },
  taxTableCell: {
    padding: 2,
    width: "20%",
    backgroundColor: "#59d474",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "10px",
    height: "30px", // Adjust the value to your preference
  },
  tableCellIndexValue: {
    padding: 2,
    width: "5%",
    display: "flex",
    alignItems: "center",
    marginTop: "10px",
    fontSize: "10px",
  },
  tableCellItemNameValue: {
    padding: 2,
    width: "40%",
    display: "flex",
    fontSize: "8px",
    marginTop: "10px",
  },
  tableCellValue: {
    padding: 2,
    width: "11%",
    display: "flex",
    alignItems: "center",
    marginTop: "10px",
    fontSize: "10px",
    textAlign: "center",
  },
  taxTableCellItemNameValue: {
    padding: 2,
    width: "40%",
    display: "flex",
    fontSize: "8px",
    marginTop: "10px",
  },
  taxTableCellValue: {
    padding: 2,
    width: "20%",
    display: "flex",
    alignItems: "flex-end",
    marginTop: "10px",
    fontSize: "10px",
    textAlign: "center",
  },

  headerLineBlack: {
    borderTop: 1,
    marginTop: "5px",
    marginBottom: "5px",
    borderColor: "grey",
  },
  taxHeaderLineBlack: {
    borderTop: 1,
    borderColor: "grey",
    marginTop: "5px",
    marginBottom: "-5px",
    // borderColor: "#000",
  },

  subTotal: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    fontSize: "10px",
    gap: "35px",
  },

  balanceContainer: {
    display: "flex",
    flexDirection: "row",
    gap: "50px",
    justifyContent: "flex-end",
  },

  balanceContent: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    alignItems: "flex-end",
    fontSize: "10px",
  },

  colorRed: {
    color: "red",
  },

  taxContainer: {
    fontSize: "11px",
  },
  taxSummary: {
    margin: "20px 0",
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
  totalPricesection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: "5px",
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

  notes:{
    marginTop:"20px",
    fontWeight:"light",
    fontFamily: "Helvetica-light",

  }
});

const CustomTable = ({ data, openData, invoiceSetting }) => {
  console.log(openData, "logginggggggggggggggggggggggggg");
  const startDate = openData.startDate;
  const receivedDate = new Date(startDate);
  const options = {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  };

  const formattedDate = receivedDate
    .toLocaleDateString("en-US", options)
    .replace(/,/g, ""); // Remove commas from the formatted string

  return (
    <View style={styles.table}>
      {/* Table Header */}
      <View style={styles.tableRow}>
        <View style={[styles.tableCellIndex]}>
          <Text>#</Text>
        </View>
        <View style={[styles.tableCellItemName]}>
          <Text>Item & Description</Text>
        </View>
        <View style={[styles.tableCell]}>
          <Text>Qty</Text>
        </View>
        <View style={[styles.tableCell]}>
          <Text>Rate</Text>
        </View>
        <View style={[styles.tableCell]}>
          <Text>Taxable Amount</Text>
        </View>
        <View style={[styles.tableCell]}>
          <Text>Tax</Text>
        </View>
        <View style={[styles.tableCell]}>
          <Text>Amount</Text>
        </View>
      </View>
      {/* Table Data Rows */}
      <View style={styles.tableRow}>
        <View style={[styles.tableCellIndexValue]}>
          <Text>1</Text>
        </View>
        <View style={[styles.tableCellItemNameValue]}>
          <Text>Diet: {openData.diet.title}</Text>
          <Text>Package: {openData.package.packageName}</Text>
          <Text>Start Date: {formattedDate}</Text>
          <Text>Number Of Days: {openData.package.days}</Text>
        </View>
        <View style={[styles.tableCellValue]}>
          <Text>1</Text>
        </View>
        <View style={[styles.tableCellValue]}>
          <Text>200</Text>
        </View>
        <View style={[styles.tableCellValue]}>
          <Text>200</Text>
        </View>
        <View style={[styles.tableCellValue]}>
          <Text>20.000 10.00%</Text>
        </View>
        <View style={[styles.tableCellValue]}>
          <Text>220</Text>
        </View>
      </View>

      <View style={styles.headerLineBlack} />
      <View style={styles.subTotal}>
        <Text style={styles.bold}>Sub Total</Text>
        <Text>200.00</Text>
        <Text>20.000</Text>
        <Text>220.00</Text>
      </View>
      <View style={styles.headerLineBlack} />

      <View style={styles.balanceContainer}>
        <View style={styles.balanceContent}>
          <Text style={styles.bold}>Total</Text>
          <Text>Payment Made</Text>
          <Text style={styles.bold}>Balance Due</Text>
        </View>
        <View style={styles.balanceContent}>
          <Text style={styles.bold}>BHD220.00</Text>
          <Text style={styles.colorRed}>(-) 55.00</Text>
          <Text style={[styles.bold]}>BHD0.000</Text>
        </View>
      </View>
      {/* <Footer /> Include the Footer component here */}

      <View style={styles.taxContainer}>
        <Text style={styles.taxSummary}>Tax Summary</Text>
        {/* Second Table */}
        <View style={styles.tableRow}>
          <View style={[styles.taxTableCellItemName]}>
            <Text>Tax Details</Text>
          </View>
          <View style={[styles.taxTableCell]}>
            <Text>Taxable Amount (BHD)</Text>
          </View>
          <View style={[styles.taxTableCell]}>
            <Text>Tax Amount (BHD)</Text>
          </View>
          <View style={[styles.taxTableCell]}>
            <Text>Total Amount (BHD)</Text>
          </View>
        </View>
      </View>
      {/* Table Values */}
      <View style={styles.tableRow}>
        <View style={[styles.taxTableCellItemNameValue]}>
          <Text>Standard Rate (10%)</Text>
        </View>
        <View style={[styles.taxTableCellValue]}>
          <Text>200.00</Text>
        </View>
        <View style={[styles.taxTableCellValue]}>
          <Text>20.000</Text>
        </View>
        <View style={[styles.taxTableCellValue]}>
          <Text>220.00</Text>
        </View>
      </View>
      {/* Second Table values */}
      <View style={styles.taxHeaderLineBlack} />
      <View style={styles.tableRow}>
        <View style={[styles.taxTableCellItemNameValue]}>
          <Text style={styles.bold}>Total</Text>
        </View>
        <View style={[styles.taxTableCellValue]}>
          <Text style={styles.bold}>BHD200.00</Text>
        </View>
        <View style={[styles.taxTableCellValue]}>
          <Text style={styles.bold}>BHD20.000</Text>
        </View>
        <View style={[styles.taxTableCellValue]}>
          <Text style={styles.bold}>BHD220.00</Text>
        </View>
      </View>
      <View style={styles.taxHeaderLineBlack} />

      <View style={styles.notes}>
        <Text>Notes</Text>
        <Text>Thanks for being so awesome! </Text>
      </View>
    </View>
  );
};

// InvoicePDF component
// const InvoicePDF = ({ openData, closeModal }) => {
const InvoicePDF = (openData) => {
  const [invoiceSetting, setInvoiceSetting] = useState();
  const user = useSelector((state) => state.login);
  const loginUser = user?.data?.user;
  console.log(invoiceSetting, "invoice");
  // Fetch recipe ingredients data
  useEffect(() => {
    getData({}, "invoice-setting").then((response) => {
      setInvoiceSetting(response?.data?.response);
    });
  }, [openData]);

  // Function to generate the PDF document
  const generatePDF = () => {
    const values = openData?.openData?.data;
    console.log(values, "opendata");
    const createdDate = values.createdAt;
    const receivedDate = new Date(createdDate);
    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    };

    const formattedDate = receivedDate
      .toLocaleDateString("en-US", options)
      .replace(/,/g, ""); // Remove commas from the formatted string

    return (
      <Document author="DFMS" title={openData?.openData?.invoice}>
        <Page size="A4" style={styles.page}>
          <View style={styles.headerContainer}>
            {invoiceSetting?.map((invoice, index) => (
              <View style={styles.logoContainer} key={`${index}`}>
                <Image
                  source={process.env.REACT_APP_CDN + invoice?.logo} // Adjusted the way of specifying source // Adjusted the way of specifying source
                  style={styles.logo}
                />
                <Text style={styles.addressText}>{invoice?.address}</Text>
              </View>
            ))}
            <View style={styles.textContainer}>
              <View>
                <Text style={styles.recipetitle}>TAX INVOICE</Text>
                <Text style={styles.invoiceNumber}># INVOICENO</Text>
              </View>
              <View>
                <Text style={styles.balance}>Balance Due</Text>
                <Text style={styles.balanceamount}>BHD0.000</Text>
              </View>
            </View>
          </View>
          <View style={styles.secondContainer}>
            <View style={styles.customercontainer}>
              <Text style={styles.addressText}>Bill To</Text>
              <Text style={styles.fullName}>
                {values?.user?.fullName} ({values?.user?.mobile})
              </Text>
              <Text style={styles.address}>Here comes the address</Text>
            </View>
            <View style={styles.dateContainer}>
              <View style={styles.date}>
                <Text style={styles.dateItem}>Invoice Date:</Text>
                <Text style={styles.dateItem}>Terms:</Text>
                <Text style={styles.dateItem}>Due Date:</Text>
              </View>
              <View style={styles.date}>
                <Text style={styles.dateItem}>{formattedDate}</Text>
                <Text style={styles.dateItem}>Due On Receipt</Text>
                <Text style={styles.dateItem}>{formattedDate}</Text>
              </View>
            </View>
          </View>

          {/* Render the custom table component */}
          <CustomTable
            data={invoiceSetting}
            openData={values}
            loginUser={loginUser}
          />
        </Page>
      </Document>
    );
  };

  return (
    <PageView>
      <PDFViewer style={{ width: "100%", height: "600px" }}>
        {generatePDF()}
      </PDFViewer>
    </PageView>
  );
};

export default InvoicePDF;
