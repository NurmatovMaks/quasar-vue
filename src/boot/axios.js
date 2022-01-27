import Vue from "vue";
import axios from "axios";

Vue.prototype.$axios = axios;

const api = axios.create({ baseURL: "http://jservice.io/api" });
Vue.prototype.$api = api;

export { axios, api };
