import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./store";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
//   navigator.serviceWorker
//     .register("/service-worker.js")
//     .then(function (registration) {
//     })
//     .catch(function (error) {
//       console.error("Service worker registration failed: ", error);
//     });
// }
navigator.serviceWorker.getRegistrations().then((registrations) => {
  for (let registration of registrations) {
    registration.unregister();
  }
});
i18n.use(initReactI18next).init({
  fallbackLng: "en",
  lng:
    localStorage.getItem("_lang") !== null
      ? localStorage.getItem("_lang")
      : "en", // default language
  resources: {
    en: { translation: require("./locales/en.json") },
    de: { translation: require("./locales/de.json") },
    es: { translation: require("./locales/es.json") },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
