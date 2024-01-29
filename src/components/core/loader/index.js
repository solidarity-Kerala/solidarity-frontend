import styled, { keyframes } from "styled-components";

/**
 * Loader is a reusable component that can be used to display a loader animation when data is being processed or requested.
 *
 * It renders a full-page overlay with a centered loader animation.
 *
 * Usage: <Loader />
 */
const Loader = (props) => {
  return (
    <Overlay>
      <Page>
        <Content></Content>
      </Page>
    </Overlay>
  );
};
export default Loader;

/* 
*  In the code above, the Loader component is a reusable component that displays a loader animation while data is being processed or requested. It renders a full-page overlay with a centered loader animation.
*  To use the Loader component, simply import it and use it as a JSX element:

  <Loader />

*  The Loader component is composed of three styled components:

*  Overlay: A full-page overlay that covers the entire page and has a semi-transparent background color.
*  Page: A container element that centers its content vertically and horizontally.
*  Content: A loader animation that is centered inside the Page container.
*  This component can be further customized by modifying the styling of these three components.
*/
const fadeIn = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 25px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
  overflow: auto;
  z-index: 1001;
  @media (max-width: 768px) {
    width: 100%;
    padding: 0;
    top: 0;
    bottom: 0;
    border-top: 1px solid rgb(224, 224, 227);
  }
`;
const Page = styled.div`
  display: flex;
  flex-direction: column;
  display: flex;
  border-radius: 10px;
  height: auto;
  animation-duration: 0.2s;
  margin: auto;
  padding: 1em;
  @media (max-width: 768px) {
    width: 100%;
    position: relative;
    top: 0;
    padding: 0;
    justify-content: center;
    align-items: center;
  }
`;

const Content = styled.div`
  text-align: center;
  width: 30px;
  height: 30px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #08225f;
  border-radius: 50%;
  animation: ${fadeIn} 1.5s linear infinite;
`;
