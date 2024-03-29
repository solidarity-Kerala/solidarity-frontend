import React from "react";
import { Link } from "react-router-dom";
import { Copy, FooterContainer, Nav } from "./styles";
import { useTranslation } from "react-i18next"; // react-i18next hook for translations
import { ColumnContainer } from "../../styles/containers/styles";
import { projectSettings } from "../../project/brand/project";

const Footer = ({ fixed = true }) => {
  // useTranslation hook to get the i18n instance and t function for translations
  const { t } = useTranslation();
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentDomain = window.location.origin;

  return (
    <FooterContainer className={fixed && "fixed"}>
      <ColumnContainer className="container">
        {/* Copyright information */}
        <Copy>
          ©{currentYear} {projectSettings.title}
        </Copy>
        {/* Navigation links */}
        <Nav>
          {/* Link to the privacy page */}
          <Link to={`${currentDomain}/privacy`}>{t("privacy")}</Link>
          {/* Link to the imprint page */}
          <Link to={`${currentDomain}/imprint`}>{t("imprint")}</Link>
        </Nav>
      </ColumnContainer>
    </FooterContainer>
  );
};

// Export Footer component as the default export of the module
export default Footer;
