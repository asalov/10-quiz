<template>
  <article class="question">
    <header>
      <h3 v-html="question.question" />
    </header>
    <section>
      <ul>
        <li class="button-wrap" v-for="(answer, index) in question.answers" :key="index">
          <input
            type="radio"
            :id="index"
            :class="{ 'correct': correctGuess, 'incorrect': !correctGuess }"
            class="hidden"
            :value="index"
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
      correctGuess: false
    };
  },
  watch: {
    id: function() {
      if (!+this.id || returnQuestionsLength() < this.id) {
        goToQuestion.call(this, 1);
      }
      this.updateQuestion();
      this.picked = null;
    },
    picked: function(newVal) {
      if (newVal === null) {
        return;
      }
      this.correctGuess =
        this.question.answers[newVal] === this.question['correct_answer'];
      if (returnQuestionsLength() > this.id) {
        setTimeout(() => goToQuestion.call(this, +this.id + 1), 1000);
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$dark: #292929;
$light: #efefef;
$red: #d91e18;
$green: #2ecc71;
$blue: #4183d7;
$font-stack: 'Lato', sans-serif;
$small: 40em;

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
    position: relative;
    text-align: center;
    top: 50%;
    margin-top: -2.5em;
    @media (max-width: $small) {
        margin-top: -1.5em;
    }
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
    transition: 0.3s;
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
    &:hover {
        background: darken($green, 5%);
        color: darken($light, 5%);
    }
}

.incorrect:checked + .button-label {
    background: $red;
    color: $light;
    &:hover {
        background: darken($red, 5%);
        color: darken($light, 5%);
    }
}

#maybe-button:checked + .button-label {
    background: $blue;
    color: $light;
    &:hover {
        background: darken($blue, 5%);
        color: darken($light, 5%);
    }
}
</style>
