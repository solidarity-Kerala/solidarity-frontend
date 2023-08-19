import { useTranslation } from "react-i18next";
// import FormInput from "../../input";
import ListTable from "../list";
import { Header, Overlay, Page } from "./../manage/styles";
import { getValue } from "../functions";
import { GetIcon } from "../../../../icons";
import { CloseButton } from "../popup/styles";
const SubPage = ({ parents , themeColors, subAttributes, setLoaderBox, setMessage, closeModal, itemTitle }) => {
  const [t] = useTranslation();
  const titleValue = (itemTitle.collection?.length > 0 ? subAttributes?.data?.[itemTitle.collection]?.[itemTitle.name] ?? "" : subAttributes?.data?.[itemTitle.name]) || "Please update the itemTitle.";
  const viewMode = subAttributes.item.type ?? "subList";
  // console.log(subAttributes?.item?.params?.parentReference)
  return (
    <Overlay>
      <Page className={subAttributes?.item?.params?.customClass ?? ""}>
        <Header>
          <span>{`${getValue(itemTitle, titleValue)} / ${t(subAttributes?.item?.title)}`}</span>
          <CloseButton theme={themeColors} onClick={closeModal}>
            <GetIcon icon={"Close"} />
          </CloseButton>
        </Header>
        <ListTable viewMode={viewMode} setMessage={setMessage} setLoaderBox={setLoaderBox} parents={{ ...parents, [subAttributes?.item?.params?.parentReference]: subAttributes?.data?._id }} parentReference={subAttributes?.item?.params?.parentReference} referenceId={subAttributes?.data?._id} attributes={subAttributes.item.attributes} {...subAttributes.item.params}></ListTable>
        {/* <Footer>
          <FormInput type="close" value={"Cancel"} onChange={closeModal} />
        </Footer> */}
      </Page>
    </Overlay>
  );
};
export default SubPage;
