import store from '@/store';

const storeEmpty = () => store.state.questions.length === 0;
const fetchQuestions = next => {
  fetch('https://opentdb.com/api.php?amount=10&category=27&difficulty=easy')
    .then(response => {
      return response.json();
    })
    .then(jsonRes => {
      store.setQuestionsAction(jsonRes.results);
      next();
    });
};
const beforeEnterGuard = (to, from, next) => {
  if (storeEmpty()) {
    fetchQuestions(next);
  } else {
    next();
  }
};

export { storeEmpty, fetchQuestions, beforeEnterGuard };
