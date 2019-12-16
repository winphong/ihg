import http from "./httpService";

const apiEndpoint = `/schedule`;

function getUrl(pathParam) {
  return `${apiEndpoint}/${pathParam}/`;
}

function getSchedule(id) {
  return http.get(getUrl(id));
}

function getUpcomingSchedules(date) {
  return http.get(getUrl(`upcomingSchedules/${date}`));
}

function getAscendingSchedules() {
  return http.get(getUrl("/asc"));
}

function getDescendingSchedules() {
  return http.get(apiEndpoint);
}

function createSchedule(req) {
  return http.post(apiEndpoint, req);
}

function updateSchedule(id, req) {
  return http.put(getUrl(id), req);
}

function updateScore(id, req) {
  return http.put(getUrl(`updateScore/${id}`), req);
}

export default {
  getSchedule,
  getUpcomingSchedules,
  getAscendingSchedules,
  getDescendingSchedules,
  createSchedule,
  updateScore,
  updateSchedule
};
