import React, { useState } from "react";
import i18n from "i18next"; // i18n library for internationalization
import { ToolTip, ToolTipContainer } from "../../styles/list/styles";
import { LanguageIcon, Languages } from "./styles";
function LanguageTooltip() {
  // State to store the selected language
  const [selectedLanguage, setSelectedLanguage] = useState(
    // If a language is stored in local storage, use it, otherwise use "de"
    localStorage.getItem("_lang") !== null ? localStorage.getItem("_lang") : "de"
  );
  const [showTooltip, setShowTooltip] = useState(false);

  // Function to handle language change
  const handleLanguageChange = (language) => {
    // Change the language in the i18n library
    i18n.changeLanguage(language);
    // Store the selected language in local storage
    localStorage.setItem("_lang", language);
    // Update the selectedLanguage state
    setSelectedLanguage(language);
    setShowTooltip(false);
  };

  return (
    <ToolTipContainer onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
      <LanguageIcon>{selectedLanguage}</LanguageIcon>
      {showTooltip && (
        <ToolTip className="language">
          <Languages>
            {/* Language option for English */}
            <div className={selectedLanguage === "en" ? "active" : ""} onClick={() => handleLanguageChange("en")}>
              English
            </div>
            {/* Language option for German */}
            <div className={selectedLanguage === "de" ? "active" : ""} onClick={() => handleLanguageChange("de")}>
              German
            </div>
          </Languages>
        </ToolTip>
      )}
    </ToolTipContainer>
  );
}

export default LanguageTooltip;
