import {
  setQuestionsAction,
  returnQuestionByIdAction,
  returnQuestionsLength,
  returnCurrentlyActiveQuestionId
} from '@/store';

const storeEmpty = () => returnQuestionsLength() === 0;
const fetchQuestions = () => {
  return fetch('https://opentdb.com/api.php?amount=10&difficulty=easy')
    .then(response => {
      return response.json();
    })
    .catch(() => Location.reload());
};
const globalBeforeEnterGuard = (to, from, next) => {
  if (storeEmpty()) {
    fetchQuestions().then(jsonRes => {
      setQuestionsAction(jsonRes.results);
      document.getElementsByClassName('spinner')[0].classList.add('hidden');
      next();
    });
  } else {
    next();
  }
};

const beforeAccessResult = (to, from, next) => {
  if (returnQuestionsLength() !== returnCurrentlyActiveQuestionId()) {
    next({
      name: 'Question',
      params: { id: returnCurrentlyActiveQuestionId() }
    });
  } else {
    next();
  }
};

const beforeAccessQuestion = (to, from, next) => {
  if (to.params.reload) {
    document.getElementById('app').classList.add('hidden');
    document.getElementsByClassName('spinner')[0].classList.remove('hidden');
    fetchQuestions().then(jsonRes => {
      setQuestionsAction(jsonRes.results);
      document.getElementsByClassName('spinner')[0].classList.add('hidden');
      setTimeout(
        () => document.getElementById('app').classList.remove('hidden'),
        500
      );
      next();
    });
  } else if (+to.params.id !== returnCurrentlyActiveQuestionId()) {
    next({
      name: 'Question',
      params: { id: returnCurrentlyActiveQuestionId() }
    });
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

export {
  storeEmpty,
  fetchQuestions,
  globalBeforeEnterGuard,
  shuffle,
  goToQuestion,
  beforeAccessQuestion,
  beforeAccessResult
};
