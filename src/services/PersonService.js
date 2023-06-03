import axios from "@/plugins/axios";

const RESOURCE_NAME = "/person";

export default {
  list() {
    return axios.get(`${RESOURCE_NAME}/list`);
  },
  addItem(params) {
    return axios.post(`${RESOURCE_NAME}`, params);
  },
  updateItem(params) {
    return axios.put(`${RESOURCE_NAME}`, params);
  },
  remove(id) {
    return axios.delete(`${RESOURCE_NAME}/${id}`);
  },
};
