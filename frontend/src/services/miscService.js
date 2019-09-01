import http from "./httpService";

function getAllEnquiries() {
  return http.get(`/enquiry`);
}

function createNewEnquiry(enquiry) {
  return http.post(`/enquiry`, enquiry);
}

function getInstagramPhotos() {
  return http.get(
    "https://api.instagram.com/v1/users/self/media/recent/?access_token=4266605993.3124899.34fb563d2eba4265978964ad63c24cf2"
  );
}

function getSportsPhoto(path) {
  return http.get(`/images/${path}`, {
    responseType: "blob"
  });
}

export default {
  getAllEnquiries,
  createNewEnquiry,
  getInstagramPhotos,
  getSportsPhoto
};
