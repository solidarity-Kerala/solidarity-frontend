import React from "react";
import Footer from "../footer";
import { Container, MainContainer } from "./styles";

const Privacy = () => {
  return (
    <div>
      <MainContainer>
        <h1>Privacy Policy</h1>
        <Container>
          <p>Our parking system is committed to protecting the privacy of our users. This Privacy Policy explains the types of information we collect, how we use it, and the steps we take to ensure that it is protected.</p>
          <h2>Information Collection</h2>
          <p>We collect information from users in several ways, including when users register for an account, make a reservation, or contact customer support. This information may include name, email address, phone number, and payment information.</p>
          <h2>Use of Information</h2>
          <p>We use the information we collect to provide and improve our services, to communicate with users, and to resolve any issues that may arise. We may also use the information for marketing purposes, but only with the user's consent.</p>
          <h2>Protection of Information</h2>
          <p>We take all necessary steps to ensure the security of our users' information, including the use of encryption technology and secure servers.</p>
          <h2>Disclosure of Information</h2>
          <p>We may disclose user information if required by law or if we believe it is necessary to protect our rights or the rights of others.</p>
          <h2>Changes to Privacy Policy</h2>
          <p>We reserve the right to modify this Privacy Policy at any time. If we make any changes, we will update this page to reflect those changes.</p>
          <h2>Contact Us</h2>
          <p>If you have any questions or concerns about our Privacy Policy, please contact us at [insert contact information].</p>
        </Container>
      </MainContainer>
      <Footer></Footer>
    </div>
  );
};

export default Privacy;
