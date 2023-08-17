import { useTranslation } from "react-i18next";
import FormInput from "../input";
import { Content, Footer, Overlay, Page } from "./styles";

const Message = (props) => {
  const closeModal = () => {
    typeof props.meessage.onClose === "function" && props.meessage.onClose();
    props.closeMessage();
  };
  const { t } = useTranslation();
  return (
    <Overlay>
      <Page>
        <Content>{props.meessage.content}</Content>
        <Footer>
          <FormInput type="close" value={props.meessage.type === 2 ? t("cancel") : props.meessage.okay ? props.meessage.okay : "Okay"} onChange={closeModal} />
          {props.meessage.type === 2 && (
            <FormInput
              type="submit"
              name="submit"
              value={props.meessage.proceed ? props.meessage.proceed : "Proceed"}
              onChange={() => {
                closeModal();
                try {
                  props.meessage.onProceed(props.meessage.data, props.meessage.data._id);
                } catch {}
              }}
            />
          )}
        </Footer>
      </Page>
    </Overlay>
  );
};
export default Message;
