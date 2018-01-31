<template>
  <section>
    <progress-bar :selected-id="selectedItem" />
    <article class="question" :class="{ 'hide': inTransition }">
      <header>
        <h3 v-html="question.question" />
        <h6>Category: <span v-html="question.category"/></h6>
      </header>
      <section>
        <ul>
          <li class="button-wrap" v-for="(answer, index) in question.answers" :key="index">
            <input
              type="radio"
              :id="index"
              :class="{ 'correct': isCorrect === true, 'incorrect': isCorrect === false }"
              class="hidden"
              :checked="picked === index"
              :value="index"
              :disabled="question.userChoice"
              @change="checkAnswer"
              v-model="picked">
            <label :for="index" class="button-label">
              <h5 v-html="answer" />
            </label>
          </li>
        </ul>
      </section>
    </article>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

import ProgressBar from './partials/ProgressBar';

export default {
  components: {
    'progress-bar': ProgressBar,
  },
  props: {
    id: {
      type: Number | String,
      default: 1,
    },
  },
  data() {
    return {
      question: {},
      picked: null,
      isCorrect: null,
      inTransition: false,
    };
  },
  computed: {
    ...mapGetters(['totalQuestions', 'currentlyActiveId', 'getQuestionById', 'selectedItem']),
  },
  watch: {
    id() {
      const self = this;
      const questionId = Number(self.id);

      if (!questionId || self.totalQuestions < questionId || questionId > self.currentlyActiveId) {
        self.goToQuestion(self.currentlyActiveId);
        return;
      }

      self.showQuestion();

      self.inTransition = false;
      self.picked = self.question.hasOwnProperty('userChoice') ? self.question.userChoice : null;
      self.isCorrect = self.picked !== null ? this.isCorrectAnswer(self.picked) : null;
    },
  },
  created() {
    this.showQuestion();
  },
  methods: {
    isCorrectAnswer(id) {
      return this.question.answers[id] === this.question['correct_answer'];
    },
    checkAnswer() {
      const self = this;
      self.$store.commit('setAnswer', {
        questionId: self.id,
        answerId: self.picked,
      });
      self.isCorrect = self.isCorrectAnswer(self.picked);

      setTimeout(() => (self.inTransition = true), 300);

      if (self.totalQuestions > self.id) {
        setTimeout(() => self.goToQuestion(Number(self.id) + 1), 750);
      } else {
        setTimeout(() => {
          self.$router.push({
            name: 'Result',
          });
        }, 300);
      }
    },
    showQuestion() {
      const self = this;

      self.$store.commit('selectQuestion', self.id);
      self.question = self.getQuestionById(self.id);
    },
    goToQuestion(questionId) {
      this.$router.push({
        name: 'Question',
        params: {
          id: questionId,
        },
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../util/vars';
@import '../util/mixins';

header {
  background: $blue;
  padding: 20px;
}

h3,
h6 {
  font-family: Lato;
  font-weight: 400;
  color: $light;
}

ul {
  padding: 0;
  list-style-type: none;
}

.button-wrap {
  text-align: center;
}

.button-label {
  width: 100%;
  display: inline-block;
  margin: 0.5em 0;
  cursor: pointer;
  color: $dark;
  border-radius: 0.25em;
  background: $light;
  @include button-shadow($inset: -3px);
  user-select: none;

  h5 {
    font-size: 1em;
    font-family: $font-stack;
  }

  &:hover {
    background: darken($light, 10%);
    color: darken($dark, 10%);
    @include button-shadow($inset: -3px);
  }

  &:active {
    transform: translateY(2px);
    @include button-shadow($inset: -1px);
  }

  @media (max-width: $small) {
    margin: 0.25em 0;
  }
}

input[type='radio']:disabled + .button-label {
  cursor: not-allowed;

  &:hover {
    background: $light;
  }

  &:active {
    transform: none;
    @include button-shadow($inset: -3px);
  }
}

input[type='radio']:checked {
  + .button-label {
    color: $light;
    transition: 0.3s;
  }

  &.correct + .button-label {
    background: $green;
  }

  &.incorrect + .button-label {
    background: $red;
  }

  &:not([disabled]) + .button-label {
    &:hover {
      background: darken($light, 10%);
      color: darken($dark, 10%);
      @include button-shadow($inset: -3px);
    }

    &:active {
      transform: translateY(2px);
      @include button-shadow($inset: -1px);
    }
  }
}

.question {
  transition: opacity 0.5s;
}

.hide {
  opacity: 0;
}
</style>
