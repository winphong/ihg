import http from "./httpService";

const apiEndpoint = `/schedule`;

function getUrl(pathParam) {
  return `${apiEndpoint}/${pathParam}/`;
}

function getSchedule(id) {
  return http.get(getUrl(id));
}

function getAllSchedules() {
  return http.get(apiEndpoint);
}

function createSchedule(req) {
  return http.post(apiEndpoint, req);
}

function updateScore(id, req) {
  return http.put(getUrl(`/updateScore/${id}`), req);
}

export default {
  getSchedule,
  getAllSchedules,
  createSchedule,
  updateScore
};
