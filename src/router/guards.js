import store from '@/store/store';

const globalBeforeEnterGuard = (to, from, next) => {
  const { isStoreEmpty } = store.getters;

  if (isStoreEmpty) {
    store.dispatch('getQuestions').then(() => {
      next();
    });
  } else {
    next();
  }
};

const beforeAccessResult = (to, from, next) => {
  const { quizCompleted, currentlyActiveId } = store.getters;

  if (!quizCompleted) {
    store.commit('selectQuestion', currentlyActiveId);

    next({
      name: 'Question',
      params: { id: currentlyActiveId },
    });
  } else {
    next();
  }
};

const beforeAccessQuestion = (to, from, next) => {
  const { currentlyActiveId, quizCompleted } = store.getters;
  const { id, reload } = to.params;

  if (reload) {
    store.commit('restartQuiz');

    store.dispatch('getQuestions').then(() => {
      next();
    });
  } else if (quizCompleted) {
    next({
      name: 'Result',
    });
  } else if (Number(id) > currentlyActiveId) {
    next({
      name: 'Question',
      params: { id: currentlyActiveId },
    });
  } else {
    next();
  }
};

export { globalBeforeEnterGuard, beforeAccessQuestion, beforeAccessResult };
