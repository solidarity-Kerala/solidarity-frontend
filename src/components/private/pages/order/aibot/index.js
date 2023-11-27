import React, { useEffect, useState } from "react";
import { postData } from "../../../../../backend/api"; // Update this import according to your project structure
import styled, { keyframes } from "styled-components";
import { marked } from "marked";

// Keyframes for the blinking animation
const blink = keyframes`
  0% { opacity: 0.2; }
  20% { opacity: 1; }
  100% { opacity: 0.2; }
`;

// Styled component for the spinner container
const SpinnerContainer = styled.div`
  text-align: left;
  font-size: 24px;
  line-height: 24px;
  margin: 15px;
`;

// Styled component for the dots
const Dot = styled.span`
  display: inline-block;
  margin-right: ${(props) => (props.last ? "0" : "8px")};
  animation: ${blink} 1.4s infinite both;
  animation-delay: ${(props) => props.delay};
  background-color: black;
  height: 10px;
  width: 10px;
  border-radius: 10px;
`;

const Spinner = () => (
  <SpinnerContainer>
    <Dot delay="0s" />
    <Dot delay="0.2s" />
    <Dot delay="0.4s" last />
  </SpinnerContainer>
);

// WhatsApp-like Styling
const chatStyles = {
  app: {
    fontFamily: "'Helvetica Neue', sans-serif",
    fontSize: "14px",
    lineHeight: "1.42857",
    color: "#333",
    backgroundColor: "#EDEDED",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "80vh",
    padding: "20px",
    width: "100%",
  },
  chatMessages: {
    width: "95%",
    backgroundColor: "#fff",
    borderRadius: "8px",
    overflowY: "auto",
    maxHeight: "70vh",
    height: "60vh",
    padding: "15px",
    marginBottom: "20px",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.15)",
  },
  message: {
    margin: "5px",
    padding: "8px 10px",
    borderRadius: "7.5px",
    display: "inline-block",
    clear: "both",
    fontSize: "16px",
    wordWrap: "break-word",
  },
  question: {
    backgroundColor: "#DCF8C6",
    marginLeft: "auto",
  },
  response: {
    backgroundColor: "#fff",
    alignSelf: "flex-start",
    boxShadow: "0 1px 0.5px rgba(0, 0, 0, 0.13)",
  },
  form: {
    width: "95%",
    maxWidth: "600px",
    display: "flex",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "20px",
    border: "none",
    marginRight: "10px",
    outline: "none",
  },
  input1: {
    flex: 1,
    padding: "10px",
    borderRadius: "20px",
    border: "none",
    marginRight: "0px",
    outline: "none",
    marginTop: "10px",
    maxHeight: "10px",
  },
  button: {
    padding: "10px 20px",
    borderRadius: "20px",
    border: "none",
    backgroundColor: "#075E54",
    color: "white",
    cursor: "pointer",
  },
};
const ChatMessageBox = styled.div`
  &.response {
    margin: 5px 0;
    padding: 10px 15px;
    border-radius: 7.5px;
    display: inline-block;
    clear: both;
    font-size: 16px;
    overflow-wrap: break-word;
    background-color: rgb(248 248 248);
    align-self: flex-start;
    box-shadow: rgba(0, 0, 0, 0.13) 0px 1px 0px 0px;
  }
  &.question {
    margin: 5px 5px 5px auto;
    padding: 10px 15px;
    border-radius: 7.5px;
    display: inline-block;
    clear: both;
    font-size: 16px;
    overflow-wrap: break-word;
    background-color: rgb(220, 248, 198);
  }
  p {
    text-align: left;
  }
`;
// ChatMessages Component
function ChatMessages({ chat, loading }) {
  return (
    <div style={chatStyles.chatMessages}>
      <h3 style={{ borderBottomWidth: "1px", borderBottomStyle: "solid", borderBottomColor: "lightgray" }}>Ask Malabar AI</h3>
      {chat.map((msg, index) => (
        <ChatMessageBox key={index} className={msg.type === "question" ? "question" : "response"} dangerouslySetInnerHTML={{ __html: marked(msg.text) }}></ChatMessageBox>
      ))}
      {loading && <Spinner />}
    </div>
  );
}

// QuestionBox Component
function QuestionBox({ onSubmit }) {
  const [question, setQuestion] = useState("");
  const [assistantId, setAssistantId] = useState("asst_fbr6MuWLmlnRZkscJecc3ZTl");
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(question, assistantId);
    setQuestion("");
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={chatStyles.form}>
        <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Type a message" style={chatStyles.input} />
        <button type="submit" style={chatStyles.button}>
          Send
        </button>
      </form>
      <input type="text" value={assistantId} onChange={(e) => setAssistantId(e.target.value)} placeholder="Assistant ID" style={chatStyles.input1} />
    </>
  );
}

// Aibot Component
const Aibot = () => {
  useEffect(() => {
    document.title = `Chat - Diet Food Management Portal`;
  }, []);
  const [loading, setLoading] = useState(false);
  const [chat, setChat] = useState([]);

  const handleQuestionSubmit = async (message, assistantId) => {
    setLoading(true);
    setChat((prevChat) => [...prevChat, { type: "question", text: message }]);

    const result = await postData({ message, assistantId }, "ask");
    console.log(result);
    setLoading(false);

    // Assuming you want to display some text from the result
    // Update this line according to the structure of your response
    const displayText = result.data ? result.data.answer.replace(/\n/g, "<br>") : "No response";

    setChat((prevChat) => [...prevChat, { type: "response", text: displayText }]);
  };

  return (
    <div style={chatStyles.app}>
      <ChatMessages loading={loading} chat={chat} />
      <QuestionBox onSubmit={handleQuestionSubmit} />
    </div>
  );
};

export default Aibot;
