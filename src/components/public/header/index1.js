import React from "react";
import { Link } from "react-router-dom";
import { HeaderContainer, Nav, Right } from "./styles";
import { useTranslation } from "react-i18next"; // react-i18next hook for translations
import { logo } from "../../../images";
import LanguageTooltip from "../../elements/tooltip";
const Header = () => {
  // useTranslation hook to get the i18n instance and t function for translations
  const { t } = useTranslation();
  return (
    <HeaderContainer>
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
        <LanguageTooltip></LanguageTooltip>
      </Right>
      {/* Navigation links */}
    </HeaderContainer>
  );
};

// Export Footer component as the default export of the module
export default Header;
