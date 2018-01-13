<template>
  <div class="post">
    <div class="content">
      <h2>Result</h2>
      {{ correctAnswerCount }} out of {{ questionsLength }}
    </div>
    <div class="container">
      <div class="progress">
        <div class="bar" :style="{ 'width': correctAnswerCount * 10 + '%' }"/>
      </div>
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
<style lang="scss" scoped>
@import '../util/vars';

.container {
    width: 300px;
    margin: 30px auto 0;
}

.progress {
    overflow: hidden;
    height: 18px;

    background-color: $light;
}

.progress .bar {
    height: 18px;

    background-color: $green;
    transition: width 0.6s ease;
}
</style>
