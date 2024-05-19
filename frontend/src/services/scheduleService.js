import http from "./httpService";

const apiEndpoint = `/schedule`;

function getUrl(pathParam) {
  return `${apiEndpoint}/${pathParam}`;
}

function getSchedule(id) {
  return http.get(getUrl(id));
}

function getUpcomingSchedules(date) {
  return http.get(getUrl(`upcomingSchedules/${date}`));
}

function getAscendingSchedules() {
  return http.get(getUrl("asc"));
}

function getDescendingSchedulesForAdmin() {
  return http.get(getUrl("admin"));
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

function deleteSchedule(id) {
  return http.delete(getUrl(id));
}

export default {
  getSchedule,
  getUpcomingSchedules,
  getAscendingSchedules,
  getDescendingSchedulesForAdmin,
  getDescendingSchedules,
  createSchedule,
  updateScore,
  updateSchedule,
  deleteSchedule,
};
