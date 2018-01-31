export default {
  isStoreEmpty(state) {
    return state.questions.length === 0;
  },
  totalQuestions(state) {
    return state.questions.length;
  },
  currentlyActiveId(state) {
    return state.currentlyActive;
  },
  getQuestionById(state) {
    return id => state.questions[id - 1];
  },
  totalCorrectAnswers(state) {
    return state.questions.filter(item => item['correct_answer'] === item.answers[item.userChoice]).length;
  },
  quizCompleted(state) {
    return state.quizCompleted;
  },
  selectedItem(state) {
    return state.selected;
  },
};
