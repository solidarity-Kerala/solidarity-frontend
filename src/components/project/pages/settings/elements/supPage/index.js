import { useState } from "react";
import { Button, ElementContainer, Info, Switch, TabButtons, Title } from "../../../../../core/elements";
export const Tab1 = (props) => {
  const [tabs] = useState([
    { key: 1, title: "Message Box Samples", icon: "user" },
    { key: 2, title: "Tab Button 2" },
  ]);
  const [selectedTab, setSelectedTab] = useState(1);
  const [switchStatus, setSwitchStatus] = useState(false);
  const { setMessage, setLoaderBox } = props;
  return (
    <ElementContainer className="column">
      <ElementContainer>
        <TabButtons
          selectedTab={selectedTab}
          selectedChange={(value) => {
            //how to use loader it will be only available when of thread or long running function is running!
            setLoaderBox(true);
            console.log("Cliked Tab", value);
            //turn off loader when it end the use
            setSelectedTab(value);
            setLoaderBox(false);
          }}
          tabs={tabs}
        ></TabButtons>
        <Switch title="Expand" switchChange={(value) => setSwitchStatus(value)} switchValue={switchStatus}></Switch>
      </ElementContainer>
      {/* <div>Tab button {selectedTab} selected</div> */}
      {selectedTab === 1 && (
        <ElementContainer className="column">
          <Title title="Message Box Samples, You can use this as Title!"></Title>
          <Info content="Click below button to see confirm message box!"></Info>
          <Button
            ClickEvent={() => {
              setMessage({
                type: 2,
                content: "Did you see the confirm box?",
                proceed: "Yes, I saw",
                okay: "No, I didn't see",
                onClose: async () => {
                  try {
                    setMessage({
                      type: 1,
                      content: "No, You are lying! 🤣",
                      okay: "Hmm",
                    });
                    //return false if this second message to show..
                    return false;
                  } catch (error) {}
                },
                onProceed: async () => {
                  try {
                    setMessage({
                      type: 1,
                      content: "Thank you for confirming!",
                      okay: "Welcome",
                    });
                    //return false if this second message to show..
                    return false;
                  } catch (error) {}
                },
                data: { id: 1 },
              });
            }}
            icon={"next"}
            value="Click me to See Confrim Box"
          ></Button>
          <Info content="Click below button to see alert message box!"></Info>
          <Button
            icon={"next"}
            ClickEvent={() => {
              setMessage({
                type: 1,
                content: "You have asked to show the alert!",
                okay: "Yes, Am I",
              });
            }}
            value="Click me to See Alert Box"
          ></Button>
        </ElementContainer>
      )}
      {selectedTab === 2 && (
        <ElementContainer>
          <Title title="You can use this as Title!"></Title>
        </ElementContainer>
      )}
    </ElementContainer>
  );
};
