// we are storing the token in the local storage its using only when we use auth token instead of bearer token

const GetAccessToken = () => {
  try {
    let accessToken = "";
    if (localStorage.getItem("user")) {
      const obj = JSON.parse(localStorage.getItem("user"));
      accessToken = obj.token;
    }
    return accessToken;
  } catch (error) {
    return "";
  }
};

export { GetAccessToken };
