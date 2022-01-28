import { api } from "../boot/axios";
import Vue from "vue";
import Vuex from "vuex";

// import example from './module-example'

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

const store = new Vuex.Store({
  modules: {
    // example
  },
  state: {
    questions: [],
    player: "",
    points: 0,
    trueAnswers: [],
    wrongAnswers: [],
    history: [],
    totalTrueAnswers: 0,
    totalWrongAnswers: 0,
  },
  actions: {
    async GET_QUESTIONS({ commit }) {
      let questions = [];
      try {
        const response = await api.get(`/categories?count=5&offset=9`);
        response.data.forEach(async (item) => {
          let responseFromData = await api.get(`/clues?category=${item.id}`);
          questions.push({
            id: item.id,
            title: item.title,
            clues: responseFromData.data,
          });
        });
        commit("SET_QUESTIONS_TO_STATE", questions);
      } catch (error) {
        console.log(error);
      }
    },
    setTrueAnswers({ commit }, id) {
      commit("SET_TRUE_ANSWERS", id);
    },
    setWrongAnswers({ commit }, id) {
      commit("SET_WRONG_ANSWERS", id);
    },
    setPoints({ commit }, value) {
      commit("SET_POINTS", value);
    },
    takePoints({ commit }, value) {
      commit("TAKE_POINTS", value);
    },
    setPlayer({ commit }, player) {
      commit("SET_PLAYER", player);
    },
    clearState({ commit }) {
      commit("CLEAR_STATE");
    },
  },

  mutations: {
    SET_QUESTIONS_TO_STATE: (state, questions) => {
      state.questions = questions;
    },
    SET_TRUE_ANSWERS: (state, id) => {
      state.trueAnswers.push(id);
      state.totalTrueAnswers += 1;
    },
    SET_WRONG_ANSWERS: (state, id) => {
      state.wrongAnswers.push(id);
      state.totalWrongAnswers += 1;
    },

    SET_POINTS: (state, value) => {
      state.points += value;
    },
    TAKE_POINTS: (state, value) => {
      state.points -= value;
    },

    SET_PLAYER: (state, player) => {
      state.player = player;
    },
    CLEAR_STATE: (state) => {
      state.questions = [];
      state.player = "";
      state.points = 0;
      state.trueAnswers = [];
      state.wrongAnswers = [];
      state.totalTrueAnswers = 0;
      state.totalWrongAnswers = 0;
    },
  },
  getters: {
    QUESTIONS(state) {
      return state.questions;
    },
    TRUE_ANSWERS(state) {
      return state.trueAnswers;
    },
    WRONG_ANSWERS(state) {
      return state.wrongAnswers;
    },
    POINTS(state) {
      return state.points;
    },
    PLAYER(state) {
      return state.player;
    },
    TOTAL_TRUE(state) {
      return state.totalTrueAnswers;
    },
    TOTAL_WRONG(state) {
      return state.totalWrongAnswers;
    },
    HISTORY(state) {
      return state.history;
    },
  },

  // enable strict mode (adds overhead!)
  // for dev mode only
  // strict: process.env.DEBUGGING
});

export default store;
