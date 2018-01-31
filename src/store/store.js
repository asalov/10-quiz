import Vue from 'vue';
import Vuex from 'vuex';

import { fetchQuestions } from '@/util/helpers';

import getters from './getters';
import mutations from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    questions: [],
    currentlyActive: 1,
    selected: 1,
    quizCompleted: false,
  },
  getters,
  mutations,
  actions: {
    getQuestions({ commit }) {
      return new Promise((resolve, reject) => {
        fetchQuestions().then(
          res => {
            commit('setQuestions', res.results);
            resolve();
          },
          error => {
            reject(error);
          }
        );
      });
    },
  },
});
