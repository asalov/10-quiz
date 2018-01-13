import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/components/Main';
import Question from '@/components/Question';
import { storeEmpty, fetchQuestions, beforeEnterGuard } from '@/util/helpers';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      beforeEnter: beforeEnterGuard,
      children: [
        {
          path: '/question/:id',
          name: 'Question',
          component: Question,
          props: true,
          beforeEnter: beforeEnterGuard
        }
      ]
    }
  ]
});
