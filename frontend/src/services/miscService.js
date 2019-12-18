import jwtDecode from "jwt-decode";
import http from "./httpService";
import cookie from "react-cookies";
import axios from "axios";
const tokenKey = "token";

http.setJwt(getJwt());

function getAllEnquiries() {
  return http.get(`/enquiry`);
}

function createNewEnquiry(enquiry) {
  return http.post(`/enquiry`, enquiry);
}

function getInstagramPhotos() {
  // removing request header as instagram doesn't accept x-auth-token as request header
  delete axios.defaults.headers.common["x-auth-token"];
  const response = axios.get(process.env.REACT_APP_INSTAGRAM_API_URL);
  http.setJwt(getJwt());
  return response;
}

async function login(credentials) {
  const { data: jwt } = await http.post(`/admin`, credentials);
  return cookie.save(tokenKey, jwt, { path: "/" });
}

function getCurrentAdmin() {
  try {
    const jwt = cookie.load(tokenKey);
    return jwtDecode(jwt);
  } catch (error) {
    return undefined;
  }
}

function logout() {
  cookie.remove(tokenKey, { path: "/" });
}

function getJwt() {
  return cookie.load(tokenKey);
}

export default {
  getAllEnquiries,
  createNewEnquiry,
  getInstagramPhotos,
  // getSportsPhoto,
  login,
  getCurrentAdmin,
  logout
};
