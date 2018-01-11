import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/components/Main';
import Question from '@/components/Question';
import store from '@/store';

Vue.use(Router);

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
  if (storeEmpty) {
    fetchQuestions(next);
  } else {
    next();
  }
};

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      beforeEnter: beforeEnterGuard
    },
    {
      path: '/question/:id',
      component: Question,
      props: true,
      beforeEnter: beforeEnterGuard
    }
  ]
});
