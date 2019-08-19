import http from "./httpService";

const apiEndpoint = `/hall`;

function getUrl(pathParam) {
  return `${apiEndpoint}/${pathParam}/`;
}

function getAllHalls() {
  return http.get(apiEndpoint);
}

export default {
  getAllHalls
};
