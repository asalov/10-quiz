import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/components/Main';
import Question from '@/components/Question';
import Result from '@/components/Result';
import {
  globalBeforeEnterGuard,
  beforeAccessQuestion,
  beforeAccessResult
} from '@/util/helpers';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [
        {
          path: '/question/:id',
          name: 'Question',
          component: Question,
          props: true,
          beforeEnter: beforeAccessQuestion
        }
      ]
    },
    {
      path: '/result',
      name: 'Result',
      component: Result,
      beforeEnter: beforeAccessResult
    },
    { path: '*', redirect: { name: 'Main' } }
  ]
});

router.beforeEach(globalBeforeEnterGuard);

export default router;
