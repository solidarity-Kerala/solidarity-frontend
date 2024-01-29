import React from "react";
import { Footer, Form, Header, Page, Overlay, TabContainer, TabHeader, TabLink, Tab } from "./styles";
import FormInput from "../../input";
import { ColumnContainer, RowContainer } from "../../../styles/containers/styles";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { addAddedActionList, addNewActionList } from "../../../../store/actions/manage";
import { Button, Table, Td, Tr } from "../styles";
import { deleteData, postData } from "../../../../backend/api";
import { clearLogin } from "../../../../store/actions/login";
const Manage = ({ setMessage, setLoaderBox, data, item, onClose }) => {
  const { t } = useTranslation();
  const themeColors = useSelector((state) => state.themeColors);
  const closeModal = () => {
    onClose();
  };
  const dispatch = useDispatch();
  useEffect(() => {
    setLoaderBox(false);
  }, [setLoaderBox]);
  const [activeTab, setActiveTab] = useState("added-list");
  const actionNewList = useSelector((state) =>
    state.actionNewList[`${item.SelectionListApi}-${data._id}`]
      ? state.actionNewList[`${item.SelectionListApi}-${data._id}`]
      : {
          data: null,
          isLoading: false,
          error: null,
        }
  );

  const actionAddedList = useSelector((state) =>
    state.actionAddedList[`${item.crudApi}-${data._id}`]
      ? state.actionAddedList[`${item.crudApi}-${data._id}`]
      : {
          data: null,
          isLoading: false,
          error: null,
        }
  );
  useEffect(() => {
    setLoaderBox(actionNewList.isLoading || actionAddedList.isLoading);
  }, [actionNewList, actionAddedList, setLoaderBox]);

  useEffect(() => {
    setLoaderBox(true);
    dispatch(addAddedActionList(item.crudApi, data._id));
    dispatch(addNewActionList(item.SelectionListApi, data._id));
  }, [item, setLoaderBox, data, dispatch]);
  useEffect(() => {
    setLoaderBox(false);
  }, [actionAddedList, actionNewList, setLoaderBox]);
  const addData = async (dataitem) => {
    setLoaderBox(true);
    const post = { [item.id]: data._id, [item.ref]: dataitem._id };
    const response = await postData(post, item.crudApi, dispatch);
    if (response.status === 200) {
      dispatch(addAddedActionList(item.crudApi, data._id));
      dispatch(addNewActionList(item.SelectionListApi, data._id));
    } else {
      if (response.status === 400) {
        setMessage({ type: 1, content: `The ${item.title} you are trying to add is already exist!`, proceed: "Okay" });
      } else if (response.status === 401) {
        dispatch(clearLogin());
      } else {
        setMessage({ type: 1, content: response.data, proceed: "Okay" });
      }
    }
    setLoaderBox(false);
  };
  const deleteitem = async (id) => {
    setLoaderBox(true);
    await deleteData({}, item.crudApi, id);
    dispatch(addAddedActionList(item.crudApi, data._id));
  };
  return (
    <Overlay>
      <Page>
        <Header>{t(data.title ? `${data.title} / ${item.title}` : item.title)}</Header>
        <Form>
          <TabContainer>
            <TabHeader>
              <TabLink theme={themeColors} className={activeTab === "added-list" && "active"} onClick={() => setActiveTab("added-list")}>
                {t("addedList", { title: item.title })}
              </TabLink>
              <TabLink theme={themeColors} className={activeTab === "new-list" && "active"} onClick={() => setActiveTab("new-list")}>
                {t("newList", { title: item.title })}
              </TabLink>
            </TabHeader>
            {/* tab for parking process */}
            <Tab active={activeTab === "added-list"}>
              <RowContainer>
                <ColumnContainer>
                  <Table>
                    <tbody>
                      {actionAddedList.data?.data.length > 0 ? (
                        actionAddedList.data?.data.map((dataitem) => (
                          <Tr key={`actionAddedList-${dataitem._id}`}>
                            <Td>{dataitem[item.ref]?.title?.toString()}</Td>
                            <Td className="actions">
                              <Button
                                className="delete"
                                onClick={() => {
                                  deleteitem(dataitem._id);
                                }}
                              >
                                Delete
                              </Button>
                            </Td>
                          </Tr>
                        ))
                      ) : (
                        <Tr key="no-data">
                          <Td>{`No ${item.title} added!`}</Td>
                        </Tr>
                      )}
                    </tbody>
                  </Table>
                </ColumnContainer>
              </RowContainer>
            </Tab>
            {/* tab for parking rules */}
            <Tab active={activeTab === "new-list"}>
              <RowContainer>
                <ColumnContainer>
                  <Table>
                    <tbody>
                      {actionNewList.data?.length > 0 ? (
                        actionNewList.data?.map((dataitem) => (
                          <Tr key={`actionNewList-${dataitem._id}`}>
                            <Td>{dataitem[item.displaySelect]?.toString()}</Td>
                            <Td className="actions">
                              <Button
                                className="add"
                                onClick={() => {
                                  addData(dataitem);
                                }}
                              >
                                Select
                              </Button>
                            </Td>
                          </Tr>
                        ))
                      ) : (
                        <Tr key="no-data">
                          <Td>{`No ${item.title} remaning!`}</Td>
                        </Tr>
                      )}
                    </tbody>
                  </Table>
                </ColumnContainer>
              </RowContainer>
            </Tab>
          </TabContainer>
        </Form>
        <Footer>
          <FormInput type="close" value={t("cancel")} onChange={closeModal} />
        </Footer>
      </Page>
    </Overlay>
  );
};
export default Manage;
