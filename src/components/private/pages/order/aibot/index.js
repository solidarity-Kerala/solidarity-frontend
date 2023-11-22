import React, { useEffect, useState } from "react";
import Layout from "../../../common/layout";
import QuestionBox from "./QuestionBox";
import ResponseBox from "./ResponseBox";
import { getData } from "../../../../../backend/api";

const Aibot = (props) => {
  useEffect(() => {
    document.title = `Today Order - Diet Food Management Portal`;
  }, []);
  const [response, setResponse] = useState("");

  const handleQuestionSubmit = async (question) => {
    const result = await getData({ question }, "ask");
    setResponse(result);
  };

  return (
    <div className="App">
      <QuestionBox onSubmit={handleQuestionSubmit} />
      <ResponseBox response={response} />
    </div>
  );
};
export default Layout(Aibot);
