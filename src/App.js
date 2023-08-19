import "./App.css";
import PageRouter from "./components/router";
import { I18nextProvider } from "react-i18next";
import i18n from "i18next";
function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <PageRouter />
    </I18nextProvider>
  );
}
export default App;
