import http from "./httpService";

const apiEndpoint = `/hall`;

function getAllHalls() {
  return http.get(apiEndpoint);
}

function updateStandings(halls) {
  return http.put(apiEndpoint, halls);
}

export default {
  getAllHalls,
  updateStandings,
};
