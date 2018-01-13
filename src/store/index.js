import { shuffle } from '@/util/helpers';

const store = {
  state: {
    questions: []
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

export {
  setQuestionsAction,
  returnQuestionByIdAction,
  returnQuestionsLength,
  returnCorrectAnswerCount
};
