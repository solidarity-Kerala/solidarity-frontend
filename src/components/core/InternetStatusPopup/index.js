import React, { useState, useEffect } from "react";
import styled from "styled-components";
const InternetStatusPopup = () => {
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    !isOnline && (
      <Popup>
        <p>No internet connection. Please check your connection.</p>
      </Popup>
    )
  );
};

const Popup = styled.div`
  position: fixed;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #ff00001f;
  z-index: 2000;
  p {
    background-color: red;
    margin: auto;
    color: white;
    padding: 10px;
    border-radius: 5px;
  }
`;

export default InternetStatusPopup;
