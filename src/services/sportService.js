import http from "./httpService";

const apiEndpoint = `/sport`;

function getAllSports() {
  return http.get(apiEndpoint);
}

export default {
  getAllSports,
};
