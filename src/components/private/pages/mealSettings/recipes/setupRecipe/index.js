import React, { useEffect, useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./print.css";
import { getData } from "../../../../../../backend/api";

function EuroCake({ openData }) {
  const pdfContentRef = useRef(null);
  const [recipeIngredients, setRecipeIngredients] = useState();

  console.log({ openData });
  console.log({ recipeIngredients });

  useEffect(() => {
    getData({ recipe: openData?.data?._id }, "recipe-ingredients").then(
      (response) => {
        console.log({ response });
        setRecipeIngredients(response?.data?.response);
      }
    );
  }, [openData]);

  const generatePDF = async () => {
    const pdf = new jsPDF("p", "mm", "a4");

    if (pdfContentRef.current) {
      const page = pdfContentRef.current;

      html2canvas(page).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");

        // Add an image to the PDF
        pdf.addImage(imgData, "PNG", 0, 0, 210, 297);

        // Save the PDF
        pdf.save("sample.pdf");
      });
    } else {
      console.error("Element with ID 'pdf-content' not found or not rendered.");
    }
  };

  return (
    <div className="App">
      <div id="pdf-content" ref={pdfContentRef}>
        <header>
          <div className="header-page">
            <div className="header-logo">
              <img
                src="https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img/https://foodcitybahrain.com/wp-content/uploads/2020/07/EuroBake_LogoSize_600x600.png"
                alt="Euro Bake"
              />
            </div>
            <div className="header-title">
              <img src="" alt="" />
            </div>
          </div>
          <div>
            <div className="header-line">
              <hr className="header-line-green" />
              <hr className="header-line-grey" />
            </div>
          </div>
        </header>
        <div className="section-milkbread">
          <div className="section-milkbread-header">
            <h1>
              {openData?.data?.title} ({openData?.data?.measurementType})
            </h1>
            {/* <p>Number of servings:60.82(25g per slice)</p> */}
            <p>Number of servings: {openData?.data?.numberOfPortion}</p>
            {/* <p> weight:1850g (yield:1520.59g)</p> */}
          </div>
          <div className="section-milkbread-data">
            <table className="section-milkbread-table">
              <thead>
                <tr className="section-milkbread-row">
                  <th>Ingredient</th>
                  <th>Clories</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {/* Map over the tableData array to render rows */}
                {recipeIngredients?.length &&
                  recipeIngredients.map((row, index) => (
                    <tr className="section-milkbread-row" key={index}>
                      <td>{row.ingredient?.ingredientsName}</td>
                      <td>{row?.calories / openData?.data?.numberOfPortion}</td>
                      <td>{row?.quantity / openData?.data?.numberOfPortion}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <hr className="header-line-blue" />
          </div>
        </div>

        <div className="section-milksmall-data">
          <div className="section-milksmall-tableone">
            <table className="table-resp">
              <tbody className="section-milksmall-body">
                <tr>
                  <td className="milkbread-data">{openData?.data?.title}</td>
                </tr>
                <tr>
                  <td className="nutrition-data">Nutrition facts</td>
                </tr>
                <tr>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "20px",
                        fontWeight: "600",
                      }}
                    >
                      <span>serving size</span>
                      <span>(25g)</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <hr className="header-line-black" />
                    <h5 style={{ float: "right" }}>%Daily value</h5>
                  </td>
                </tr>
                <tr>
                  <td>Amount per serving</td>
                </tr>
                <tr>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "23px",
                        fontWeight: "600",
                      }}
                    >
                      <span>Calories</span>
                      <span>
                        {openData?.data?.calories /
                          openData?.data?.numberOfPortion}
                      </span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <hr className="header-line-blacksmall" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "20px",
                        fontWeight: "600",
                      }}
                    >
                      <span>Total Fat 1.5g</span>
                      <span>
                        {openData?.data?.totalFat /
                          openData?.data?.numberOfPortion}
                      </span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "20px",
                        fontWeight: "600",
                      }}
                    >
                      <span>Saturated Fat 0g</span>
                      <span>
                        {openData?.data?.satFat /
                          openData?.data?.numberOfPortion}
                      </span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "20px",
                        fontWeight: "600",
                      }}
                    >
                      <span>Trans Fat 0g</span>
                      <span>
                        {openData?.data?.unSatFat /
                          openData?.data?.numberOfPortion}
                      </span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "20px",
                        fontWeight: "600",
                      }}
                    >
                      <span>Total carbohydrate 12g</span>
                      <span>
                        {openData?.data?.carbohydrate /
                          openData?.data?.numberOfPortion}
                      </span>
                    </div>
                  </td>
                </tr>
                {/* <tr>
                  <td>
                    <hr className="header-line-black" />
                  </td>
                </tr> */}
                <tr>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "20px",
                        fontWeight: "600",
                      }}
                    >
                      <span>Total Fiber 0g</span>
                      <span>
                        {openData?.data?.fiber /
                          openData?.data?.numberOfPortion}
                      </span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "20px",
                        fontWeight: "600",
                      }}
                    >
                      <span>Total Sugar 0g</span>
                      <span>
                        {openData?.data?.sugars /
                          openData?.data?.numberOfPortion}
                      </span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <hr className="header-line-blacksmall" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "23px",
                        fontWeight: "600",
                      }}
                    >
                      <span>Protein 2g</span>
                      <span>
                        {openData?.data?.calories /
                          openData?.data?.numberOfPortion}
                      </span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <hr className="header-line-blacksmall" />
                  </td>
                </tr>
                {/* <tr>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "20px",
                        fontWeight: "600",
                      }}
                    >
                      <span>Vitamin D 0mcg</span>
                      <span>
                        {openData?.data?.vitaminD /
                          openData?.data?.numberOfPortion}
                      </span>
                    </div>
                  </td>
                </tr> */}
                <tr>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "20px",
                        fontWeight: "600",
                      }}
                    >
                      <span>Calcium 15mg</span>
                      <span>
                        {openData?.data?.calcium /
                          openData?.data?.numberOfPortion}
                      </span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "20px",
                        fontWeight: "600",
                      }}
                    >
                      <span>Iron 1mg</span>
                      <span>
                        {openData?.data?.iron / openData?.data?.numberOfPortion}
                      </span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p style={{ width: "350px", fontSize: "14px" }}>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Molestiae nam, odio mollitia, repellendus quo commodi quas
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="section-milksmall-tabletwo">
            <table className="table-resp">
              <tbody className="section-milksmall-body">
                <tr>
                  <td className="milkbread-data">Milk bread small</td>
                </tr>
                <tr>
                  <td className="nutrition-data">Nutrition facts</td>
                </tr>
                <tr>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "20px",
                        fontWeight: "600",
                      }}
                    >
                      <span>serving size</span>
                      <span>(25g)</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <hr className="header-line-black" />
                    <h5 style={{ float: "right" }}>%Daily value</h5>
                  </td>
                </tr>
                <tr>
                  <td>The Shadow</td>
                </tr>
                <tr>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "23px",
                        fontWeight: "600",
                      }}
                    >
                      <span>Calories</span>
                      <span>70</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <hr className="header-line-blacksmall" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "20px",
                        fontWeight: "600",
                      }}
                    >
                      <span>serving size</span>
                      <span>(25g)</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "20px",
                        fontWeight: "600",
                      }}
                    >
                      <span>Trans fat</span>
                      <span>0</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "20px",
                        fontWeight: "600",
                      }}
                    >
                      <span>Total carbohydrate</span>
                      <span>4%</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <hr className="header-line-black" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "20px",
                        fontWeight: "600",
                      }}
                    >
                      <span>chelostrol</span>
                      <span>4%</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "20px",
                        fontWeight: "600",
                      }}
                    >
                      <span>sodium</span>
                      <span>2%</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "20px",
                        fontWeight: "600",
                      }}
                    >
                      <span>Chelostrol</span>
                      <span>2%</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <hr className="header-line-blacksmall" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <p style={{ width: "350px", fontSize: "14px" }}>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Molestiae nam, odio mollitia, repellendus quo commodi quas
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="section-bottom-items">
          <div className="section-bottom-title">
            <span className="section-bottom-header">
              <h2>Allergens: </h2>
              <h2>{openData?.data?.allergy || 0}</h2>
            </span>
            <span className="section-bottom-header">
              <h2>Ingredients: </h2>
              {/* <h2>
                Wheat Flour, Water, Rye Flour, Extra Virgin Olive Oil, Salt,
                Yeast, Rice Flour, Wheat Gluten, Malted Barley Flour,
                Deactivated Yeast, Guar Gum, Fava Bean Flour */}
              {recipeIngredients?.length &&
                recipeIngredients.map((data, key) => (
                  <>
                    <h2>{data.ingredient?.ingredientsName}</h2>
                  </>
                ))}
              {/* </h2> */}
            </span>
            <span className="section-bottom-header">
              <h2>Storage: </h2>
              <h2>{openData?.data?.storage || 0}</h2>
            </span>
            <span className="section-bottom-header" id="section-validity">
              <h2>Validity: </h2>
              <h2>{openData?.data?.validity || 0}</h2>
            </span>
            <span className="section-bottom-header">
              <h2>Produced By: </h2>
              <h2>EUROS BAKE, Bahrain</h2>
            </span>
            <span className="section-bottom-header">
              <h2>MADE IN BAHRAIN </h2>
            </span>
            <div className="section-bottom-timings">
              <div>12/27/2021</div>
              <div>3:45:35pm</div>
            </div>
          </div>
        </div>

        <footer>
          <div className="footer">
            <div className="footer-items">
              <div className="footer-items-data">
                <p>Euros Bake W.L.L, CR.No:72669-6</p>
                <p>P.O BOX:80304, Sanad, Kingdom of Bahrain</p>
              </div>
              <div>
                <p>(+973 17 627777 ) (+973 33 626044)</p>
                <p>(sales@eurobakes.me.com) (www.eurobakes.com)</p>
              </div>
            </div>
          </div>
        </footer>
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
      </div>
    </div>
  );
}

export default EuroCake;
