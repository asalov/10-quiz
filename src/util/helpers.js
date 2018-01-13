import {
  setQuestionsAction,
  returnQuestionByIdAction,
  returnQuestionsLength
} from '@/store';

const storeEmpty = () => returnQuestionsLength() === 0;
const fetchQuestions = next => {
  fetch('https://opentdb.com/api.php?amount=10&difficulty=easy')
    .then(response => {
      return response.json();
    })
    .then(jsonRes => {
      setQuestionsAction(jsonRes.results);
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

// Shamelessly stolen from https://bost.ocks.org/mike/shuffle/
// StackOverflow answer https://stackoverflow.com/a/2450976/5396280
const shuffle = function(array) {
  let m = array.length,
    t,
    i;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
};

const goToQuestion = function(idToGo) {
  this.$router.push({
    name: 'Question',
    params: {
      id: idToGo
    }
  });
};

export { storeEmpty, fetchQuestions, beforeEnterGuard, shuffle, goToQuestion };
