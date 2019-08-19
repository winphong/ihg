import http from "./httpService";

const apiEndpoint = `/sport`;

function getUrl(pathParam) {
  return `${apiEndpoint}/${pathParam}/`;
}

function getAllSports() {
  return http.get(apiEndpoint);
}

export default {
  getAllSports
};
