import React from "react";
import Footer from "../footer";
import { Container, MainContainer } from "./styles";

const Imprint = () => {
  return (
    <div>
      <MainContainer>
        <h1>Imprint</h1>
        <Container>
          <p>This website is operated by Company Name, located at Company Address.</p>
          <p>Contact information: Email: Company Email Phone: Company Phone Number</p>
          <p>The contents of this website have been created with great care and to the best of our knowledge. However, we cannot guarantee the accuracy, completeness and timeliness of the contents.</p>
          <p>
            As a service provider, we are responsible for our own content on these pages according to general laws, in accordance with Section 7, Paragraph 1 of the German Telemedia Act (TMG). However, according to Sections 8 to 10 of the TMG, we are not obliged to monitor transmitted or stored
            third-party information or to investigate circumstances that indicate illegal activity.
          </p>
          <p>
            Obligations to remove or block the use of information in accordance with general laws remain unaffected. However, liability in this regard is only possible from the point in time at which we become aware of a specific legal violation. We will remove this content immediately upon becoming
            aware of any such violations.
          </p>
          <p>
            Our website contains links to external websites of third parties over whose contents we have no influence. Therefore, we cannot assume any liability for these third-party contents. The respective provider or operator of the pages is always responsible for the contents of the linked
            pages. The linked pages were checked for possible legal violations at the time of linking. Illegal contents were not recognizable at the time of linking.
          </p>
          <p>However, a permanent control of the contents of the linked pages is not reasonable without concrete evidence of a violation of the law. We will remove such links immediately upon becoming aware of any legal violations.</p>
          <p>
            The contents and works created by the site operator on these pages are subject to German copyright law. Contributions of third parties are marked as such. Reproduction, editing, distribution and any kind of use outside the limits of copyright law require the written consent of the
            respective author or creator. Downloads and copies of these pages are only permitted for private, non-commercial use.
          </p>
          <p>
            Insofar as the contents on this site were not created by the operator, the copyrights of third parties are respected. In particular, third-party contents are marked as such. Should you nonetheless become aware of a copyright infringement, please inform us accordingly. We will remove such
            contents immediately upon becoming aware of any infringements.
          </p>
        </Container>
      </MainContainer>
      <Footer></Footer>
    </div>
  );
};

export default Imprint;
