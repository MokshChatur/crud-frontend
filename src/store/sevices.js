import axios from "axios";

const BASE_URL = "http://localhost:8000";

export const getWithoutToken = async (apiPath) => {
  try {
    let res = await axios.get(BASE_URL + apiPath);
    let data = res.data;
    
    return data;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
};

export const getWithToken = async (apiPath) => {
  const headers = {
    Authorization: "Bearer " + localStorage.getItem("accessToken"),
    "Content-Type": "application/json",
  };

  try {
    let res = await axios.get(BASE_URL + apiPath, { headers: headers });
    let data = res.data;
    return data;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
};

export const postWithoutToken = async (apiPath, bodyData) => {
  try {
    let res = await axios.post(BASE_URL + apiPath, bodyData);
    let data = res.data;
    return data;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const postWithToken = async (apiPath, bodyData) => {
  const headers = {
    Authorization: "Bearer " + localStorage.getItem("accessToken"),
    "Content-Type": "application/json",
  };

  try {
    let res = await axios.post(BASE_URL + apiPath, bodyData, {
      headers: headers,
    });
    let data = res.data;
    return data;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
};

export const putWithoutToken = async (apiPath, bodyData) => {
  console.log("bodydata", bodyData)
  try {
    let res = await axios.put(BASE_URL + apiPath+"/"+bodyData.id, bodyData);
    let data = res.data;
    return data;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
};

export const putWithToken = async (apiPath, bodyData) => {
  const headers = {
    Authorization: "Bearer " + localStorage.getItem("accessToken"),
    "Content-Type": "application/json",
  };

  try {
    let res = await axios.put(BASE_URL + apiPath, bodyData, {
      headers: headers,
    });
    let data = res.data;
    return data;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
};
