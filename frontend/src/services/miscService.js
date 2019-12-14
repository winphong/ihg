import jwtDecode from "jwt-decode";
import http from "./httpService";
import cookie from "react-cookies";
const tokenKey = "token";

http.setJwt(getJwt());

function getAllEnquiries() {
  return http.get(`/enquiry`);
}

function createNewEnquiry(enquiry) {
  return http.post(`/enquiry`, enquiry);
}

function getInstagramPhotos() {
  return http.get(
    "https://api.instagram.com/v1/users/self/media/recent/?access_token=4266605993.3124899.34fb563d2eba4265978964ad63c24cf2"
    // {
    //   headers: {
    //     "Access-Control-Allow-Origin": "http://localhost:3000"
    //   }
    // }
  );
}

// function getSportsPhoto(path) {
//   return http.get(`/images/${path}`, {
//     responseType: "blob"
//   });
// }

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
