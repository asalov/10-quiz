const store = {
  state: {
    questions: []
  },
  setQuestionsAction(questions) {
    this.state.questions = questions;
  },
  returnQuestionByIdAction(qId) {
    return this.state.questions[qId];
  },
  returnQuestionsLength() {
    return this.state.questions.length;
  }
};

export default store;
