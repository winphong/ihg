import http from "./httpService";

const apiEndpoint = `/schedule`;

function getUrl(pathParam) {
  return `${apiEndpoint}/${pathParam}/`;
}

function getAllSchedules() {
  return http.get(apiEndpoint);
}

export default {
  getAllSchedules
};
