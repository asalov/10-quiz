<template>
  <article class="question">
    <header>
      <h3 v-html="question.question" />
    </header>
    <section>
      <ul v-if="question.type === 'boolean'">
        <li>
          <input type="radio" id="true" value="True" v-model="picked">
          <label for="true">True</label>
        </li>
        <li>
          <input type="radio" id="false" value="False" v-model="picked">
          <label for="false">False</label>
        </li>
      </ul>
      <ul v-if="question.type === 'multiple'">
        <li v-for="(answer, index) in question.answers" :key="index">
          <input type="radio" :id="index" :value="index" v-model="picked">
          <label :for="index" v-html="answer" />
        </li>
      </ul>
    </section>
    <footer>
      <p>Answer: {{ correctGuess }}</p>
    </footer>
  </article>
</template>

<script>
import { returnQuestionByIdAction } from '@/store';
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
      this.updateQuestion();
    },
    picked: function(newVal) {
      this.correctGuess =
        this.question.answers[newVal] === this.question['correct_answer'];
    }
  },
  created() {
    this.updateQuestion();
  },
  methods: {
    updateQuestion: function() {
      this.question = returnQuestionByIdAction(this.id);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
    font-weight: normal;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
</style>
