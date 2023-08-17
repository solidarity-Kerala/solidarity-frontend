import React from "react";
import { Link } from "react-router-dom";
import { HeaderContainer, Nav, Right } from "./styles";
import { useTranslation } from "react-i18next"; // react-i18next hook for translations
import { ColumnContainer } from "../../styles/containers/styles";
import { logo } from "../../../images";
const Header = () => {
  // useTranslation hook to get the i18n instance and t function for translations
  const { t } = useTranslation();
  return (
    <HeaderContainer>
      <ColumnContainer className="container header">
        {/* Copyright information */}
        <img src={logo} alt="logo" />
        {/* Component for language selection */}
        <Right>
          <Nav className="hm">
            {/* Link to the privacy page */}
            <Link to="https://www.example.com/help">{t("help")}</Link>
            {/* Link to the imprint page */}
            <Link to="https://www.example.com/faq">{t("faq")}</Link>
          </Nav>
          {/* <LanguageTooltip></LanguageTooltip> */}
        </Right>
        {/* Navigation links */}
      </ColumnContainer>
    </HeaderContainer>
  );
};

// Export Footer component as the default export of the module
export default Header;
