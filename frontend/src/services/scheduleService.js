import http from "./httpService";

const apiEndpoint = `/schedule`;

function getUrl(pathParam) {
  return `${apiEndpoint}/${pathParam}/`;
}

function getSchedule() {
  return http.get(apiEndpoint);
}

export default {
  getSchedule
};
