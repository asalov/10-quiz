import Vue from 'vue';

import { shuffle } from '@/util/helpers';

export default {
  setQuestions(state, payload) {
    state.currentlyActive = 1;
    state.selected = 1;

    state.questions = payload.map(item => {
      const newItem = { ...item };

      newItem.answers = shuffle([...newItem['incorrect_answers'], newItem['correct_answer']]);

      return newItem;
    });
  },
  setAnswer(state, payload) {
    const { questionId, answerId } = payload;

    if (state.questions.length > questionId) {
      const nextId = Number(questionId) + 1;
      state.currentlyActive = nextId;
      state.selected = nextId;
    } else {
      state.quizCompleted = true;
    }

    const index = questionId - 1;
    const question = state.questions[index];
    question.userChoice = answerId;

    Vue.set(state.questions, index, question);
  },
  selectQuestion(state, payload) {
    state.selected = Number(payload);
  },
  restartQuiz(state) {
    state.questions = [];
    state.quizCompleted = false;
  },
};
