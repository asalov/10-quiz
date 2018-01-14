import { shuffle } from '@/util/helpers';

const store = {
  state: {
    questions: [],
    currentlyActive: 1
  }
};

function setAnswers(questions) {
  store.state.questions = questions.map(item => {
    item.answers = item['incorrect_answers'];
    item.answers.push(item['correct_answer']);
    questions.answers = shuffle(item.answers);
    return item;
  });
}

const setQuestionsAction = function(questions) {
  // reset, in case of user restart of quiz
  store.state.currentlyActive = 1;
  setAnswers(questions);
};
const returnQuestionByIdAction = function(qId) {
  return store.state.questions[qId - 1];
};
const returnQuestionsLength = function() {
  return store.state.questions.length;
};
const returnCorrectAnswerCount = function() {
  return store.state.questions.filter(
    item => item['correct_answer'] === item.answers[item.userChoice]
  ).length;
};
const handleUserSelection = function(questionId, answerId) {
  if (returnQuestionsLength() > questionId) {
    store.state.currentlyActive = +questionId + 1;
  }
  returnQuestionByIdAction(questionId)['userChoice'] = answerId;
};
const returnCurrentlyActiveQuestionId = function() {
  return store.state.currentlyActive;
};

export {
  setQuestionsAction,
  returnQuestionByIdAction,
  returnQuestionsLength,
  returnCorrectAnswerCount,
  handleUserSelection,
  returnCurrentlyActiveQuestionId
};
