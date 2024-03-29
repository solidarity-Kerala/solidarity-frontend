import { clearLogin } from "../../store/actions/login";
import { GetAccessToken } from "../authentication";
import axios from "axios";

// You can now use the formData object as needed, such as sending it via AJAX or submitting a form

const postData = async (fields, ulr, dispatch, navigate) => {
  const data = new Promise(async (resolve, reject) => {
    try {
      let token = GetAccessToken();
      const formData = new FormData();

      let isUplaoding = false;
      Object.entries(fields).forEach(([key, value]) => {
        if (typeof value === "object") {
          if (value[0] instanceof File) {
            formData.append(key, value[0]);
            isUplaoding = true;
          } else {
            value.forEach((item, index) => {
              formData.append(`${key}[${index}]`, item);
            });
          }
        } else {
          formData.append(key, value);
        }
      });

      const response = await axios.post(`${process.env.REACT_APP_API}${ulr}`, formData, {
        headers: {
          "Content-Type": isUplaoding ? "multipart/form-data" : "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (response.status === 440 || response.status === 401) {
        try {
          dispatch(clearLogin());
          navigate("/");
          return resolve({ status: response.status, data: [] });
        } catch (error) {
          console.log(error);
        }
      }

      resolve({ status: response.status, data: response.data });
    } catch (error) {
      // console.log("error", error);
      resolve({
        status: error?.response?.status,
        customMessage: error?.response?.data?.customMessage ?? "Something went wrong!",
      });
    }
  });

  return data;
};

const putData = async (fields, ulr, dispatch, navigate) => {
  try {
    console.log(fields);
    let token = GetAccessToken();
    let formData = new FormData();
    const apiUrl = process.env.REACT_APP_API;
    let isUplaoding = false;
    Object.entries(fields).forEach(([key, value]) => {
      if (typeof value === "object") {
        if (value[0] instanceof File) {
          isUplaoding = true;
          console.log(value[0] instanceof File);
          formData.append(key, value[0]);
        } else {
          value.forEach((item, index) => {
            formData.append(`${key}[${index}]`, item);
          });
        }
      } else {
        formData.append(key, value);
      }
    });
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const response = await axios.put(`${apiUrl}${ulr}`, formData, {
      headers: {
        "Content-Type": isUplaoding ? "multipart/form-data" : "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (response.status === 440 || response.status === 401) {
      try {
        dispatch(clearLogin());
        navigate("/");
        navigate(0);
        return { status: response.status, data: [] };
      } catch (error) {
        console.log(error);
      }
    }
    return { status: response.status, data: response.data };
  } catch (error) {
    console.log(error);
    return {
      status: error.response?.status,
      customMessage: error.response?.data?.customMessage ?? "Something went wrong!",
    };
  }
};
const getData = async (fields, ulr, dispatch, navigate) => {
  const data = new Promise(async (resolve, reject) => {
    try {
      let queryString = Object.keys(fields)
        .map((key) => key + "=" + fields[key])
        .join("&");
      let token = GetAccessToken();
      const response = await axios.get(`${process.env.REACT_APP_API}${ulr}?${queryString}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      if (response.status === 440 || response.status === 401) {
        try {
          localStorage.removeItem("user");
          navigate("/");
          navigate(0);
        } catch (error) {
          console.log(error);
        }
      }
      resolve({ status: response.status, data: response.data });
    } catch (error) {
      if (error.response?.status) {
        if (error.response?.status === 440 || error.response?.status === 401) {
          try {
            localStorage.removeItem("user");
            navigate("/");
            navigate(0);
          } catch (error) {
            console.log(error);
          }
        }
      }
      resolve({
        status: error.response?.status,
        data: error.response?.data?.message,
      });
    }
  });
  return data;
};
const deleteData = async (fields, ulr, dispatch, navigate) => {
  const data = new Promise(async (resolve, reject) => {
    try {
      let token = GetAccessToken();
      let queryString = Object.keys(fields)
        .map((key) => key + "=" + fields[key])
        .join("&");
      const response = await axios.delete(`${process.env.REACT_APP_API}${ulr}?${queryString}`, {
        headers: { Authorization: "Bearer " + token },
      });
      if (response.status === 440 || response.status === 401) {
        try {
          localStorage.removeItem("user");
          navigate("/");
          navigate(0);
        } catch (error) {
          console.log(error);
        }
      }
      resolve({ status: response.status, data: response.data });
    } catch (error) {
      console.log("API Eror", error.message);
      resolve({
        status: error.response.status,
        customMessage: error.response?.data?.customMessage ?? "Something went wrong!",
      });
    }
  });

  return data;
};
export { getData, postData, putData, deleteData };
