<template>
  <div class="post">
    <div class="content">
      <h2>Result</h2>
      {{ correctAnswerCount }} out of {{ questionsLength }}
    </div>
  </div>
</template>

<script>
import { returnCorrectAnswerCount, returnQuestionsLength } from '@/store';
export default {
  data() {
    return {
      correctAnswerCount: 0,
      questionsLength: 0
    };
  },
  created() {
    this.questionsLength = returnQuestionsLength();
    this.correctAnswerCount = returnCorrectAnswerCount();
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
