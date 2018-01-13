<template>
  <article class="question" :class="{ 'hide': inTransition }">
    <header>
      <h3 v-html="question.question" />
    </header>
    <section>
      <ul>
        <li class="button-wrap" v-for="(answer, index) in question.answers" :key="index">
          <input
            type="radio"
            :id="index"
            :class="{ 'correct': isCorrect, 'incorrect': !isCorrect }"
            class="hidden"
            :checked="picked === index"
            :value="index"
            :disabled="question.userChoice"
            v-model="picked">
          <label :for="index" class="button-label">
            <h5 v-html="answer" />
          </label>
        </li>
      </ul>
    </section>
  </article>
</template>

<script>
import { returnQuestionByIdAction, returnQuestionsLength } from '@/store';
import { goToQuestion } from '@/util/helpers';

export default {
  props: {
    id: {
      type: Number | String,
      default: 1
    }
  },
  data() {
    return {
      question: {},
      picked: null,
      isCorrect: false,
      inTransition: false
    };
  },
  watch: {
    id: function() {
      if (!+this.id || returnQuestionsLength() < this.id) {
        goToQuestion.call(this, 1);
      }
      this.updateQuestion();
      this.inTransition = false;
      this.picked = this.question.hasOwnProperty('userChoice')
        ? this.question.userChoice
        : null;
    },
    picked: function(newVal) {
      if (newVal === null) {
        return;
      } else if (this.question.hasOwnProperty('userChoice')) {
        this.isCorrect = this.isCorrectAnswer(this.question.userChoice);
        return;
      }
      this.question.userChoice = newVal;
      this.isCorrect = this.isCorrectAnswer(newVal);
      setTimeout(() => (this.inTransition = true), 500);
      if (returnQuestionsLength() > this.id) {
        setTimeout(() => goToQuestion.call(this, +this.id + 1), 1000);
      } else {
        setTimeout(
          () =>
            this.$router.push({
              name: 'Result'
            }),
          1000
        );
      }
    }
  },
  created() {
    if (returnQuestionsLength() < +this.id) {
      goToQuestion.call(this, 1);
    } else {
      this.updateQuestion();
    }
  },
  methods: {
    updateQuestion: function() {
      this.question = returnQuestionByIdAction(this.id);
    },
    isCorrectAnswer: function(id) {
      return this.question.answers[id] === this.question['correct_answer'];
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../util/vars';

header {
    background: $light;
}

h3 {
    font-family: Lato;
    font-weight: 400;
    color: $dark;
    padding: 20px;
}

.button-wrap {
    text-align: center;
}

.button-label {
    display: inline-block;
    padding: 1em 2em;
    margin: 0.5em;
    cursor: pointer;
    color: $dark;
    border-radius: 0.25em;
    background: $light;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2),
        inset 0 -3px 0 rgba(0, 0, 0, 0.22);
    user-select: none;
    h5 {
        font-size: 1em;
        font-family: $font-stack;
    }
    &:hover {
        background: darken($light, 10%);
        color: darken($dark, 10%);
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2),
            inset 0 -3px 0 rgba(0, 0, 0, 0.32);
    }
    &:active {
        transform: translateY(2px);
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2),
            inset 0px -1px 0 rgba(0, 0, 0, 0.22);
    }
    @media (max-width: $small) {
        padding: 0em 1em 3px;
        margin: 0.25em;
    }
}

.correct:checked + .button-label {
    background: $green;
    color: $light;
    animation: buttonAnimateCorrect 1s;
    &:hover {
        background: darken($green, 5%);
        color: darken($light, 5%);
    }
}

.incorrect:checked + .button-label {
    background: $red;
    color: $light;
    animation: buttonAnimateIncorrect 1s;
    &:hover {
        background: darken($red, 5%);
        color: darken($light, 5%);
    }
}

.question {
    transition: opacity 0.5s;
}

.hide {
    opacity: 0;
}

@keyframes buttonAnimateCorrect {
    30%,
    99% {
        background: $green;
        color: $light;
    }
    100% {
        color: $dark;
        background: $light;
    }
}

@keyframes buttonAnimateIncorrect {
    30%,
    99% {
        background: $red;
        color: $light;
    }
    100% {
        color: $dark;
        background: $light;
    }
}
</style>
