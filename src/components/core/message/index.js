import { useTranslation } from "react-i18next";
import FormInput from "../input";
import { Content, Footer, Overlay, Page } from "./styles";

const Message = (props) => {
  const closeModal = async () => {
    try {
      if (typeof props.message.onClose === "function") {
        await props.message.onClose().then((status) => {
          (status ?? true) && props.closeMessage();
        });
      } else {
        props.closeMessage();
      }
    } catch (error) {
      console.error("Error in onClose:", error);
    }
  };

  const proceedAction = async () => {
    try {
      if (typeof props.message.onProceed === "function") {
        await props.message.onProceed(props.message?.data, props.message?.data?._id).then((status) => {
          (status ?? true) && props.closeMessage();
        });
      } else {
        props.closeMessage();
      }
    } catch (error) {
      console.error("Error in onProceed:", error);
    }
  };

  const { t } = useTranslation();

  return (
    <Overlay className={props.showMessage ? "" : "hidden"}>
      <Page>
        <Content>{props.message.content}</Content>
        {props.message.type === 2 ? (
          <Footer>
            <FormInput type="close" value={props.message.type === 2 ? (props.message.okay ? props.message.okay : t("cancel")) : props.message.okay ? props.message.okay : "Okay"} onChange={closeModal} />
            <FormInput type="submit" name="submit" value={props.message.proceed ? props.message.proceed : "Proceed"} onChange={proceedAction} />
          </Footer>
        ) : (
          <Footer>
            <FormInput type="submit" name="submit" value={props.message.okay ? props.message.okay : "Okay"} onChange={closeModal} />
          </Footer>
        )}
      </Page>
    </Overlay>
  );
};

export default Message;
