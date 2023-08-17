import React, { useEffect } from "react";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { postData } from "../../../backend/api";
import AutoForm from "../../elements/form";
import Footer from "../footer";
import { FormContainer, MainContainer } from "./styles";
import banner from "../../../images/public/banner.jpeg";
//using translation
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import withLayout from "../layout";
import { ColumnContainer } from "../../styles/containers/styles";
import Header from "../header";
import { clearLogin, fetchLogin } from "../../../store/actions/login";

const Login = (props) => {
  useEffect(() => {
    document.title = `Diet Food Management System`;
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login);
  const { t } = useTranslation();
  const formInput = [
    {
      type: "text",
      placeholder: "email",
      name: "email",
      validation: "email",
      default: "admin@gmail.com",
      label: "email",
      minimum: 5,
      maximum: 40,
      required: true,
    },
    {
      type: "password",
      placeholder: "password",
      name: "password",
      validation: "password",
      default: "111",
      label: "password",
      minimum: 0,
      maximum: 16,
      required: true,
    },
  ];
  const { setLoaderBox } = props;
  useEffect(() => {
    if (user.data?.token) {
      navigate(user.data?.menu[0]?.path ?? "404");
    }
    console.log("DATA", user.data);
    setLoaderBox(user.isLoading);
    if (user.error !== null) {
      props.setMessage({ type: 1, content: t(user.error), proceed: "Okay" });
      dispatch(clearLogin());
    }
  }, [user, navigate, setLoaderBox, t, props, dispatch]);

  const isCreatingHandler = (value, callback) => {};
  const submitChange = async (post) => {
    dispatch(fetchLogin(post));
  };

  return (
    <MainContainer>
      <Header />
      <ColumnContainer
        className="login"
        style={{
          backgroundImage: `linear-gradient(to right,  #f1f6f8 30%, transparent),url(${banner})`,
          backgroundSize: "cover",
        }}
      >
        <FormContainer>
          <AutoForm
            useCaptcha={false}
            formType={"post"}
            description={t("loginDescription")}
            header={t("loginHead")}
            formInput={formInput}
            submitHandler={submitChange}
            button={t("validate")}
            isOpenHandler={isCreatingHandler}
            isOpen={true}
            plainForm={true}
          ></AutoForm>
        </FormContainer>
      </ColumnContainer>
      <Footer />
    </MainContainer>
  );
};

export default withLayout(Login);
