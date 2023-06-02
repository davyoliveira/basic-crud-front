// import Vue from "vue";
import axios from "axios";

const API_URL = "http://localhost:8081";

export default axios.create({
  baseURL: API_URL,
  headers: headers(),
});

function headers() {
  var headers = {
    "Content-Type": "application/json",
  };
  return headers;
}

// Vue.prototype.$http = axios;
