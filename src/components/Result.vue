<template>
  <div class="post">
    <div class="content">
      <h2>Correct answers</h2>
      <h3>{{ correctAnswerCount }} out of {{ questionsLength }}</h3>
    </div>
    <div class="container">
      <div class="progress">
        <div class="bar" :style="{ 'width': correctAnswerCount * 10 + '%' }"/>
      </div>
    </div>
    <router-link :to="{ name: 'Question', params: { id: 1, reload: true } }" class="cta">Go again</router-link>
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
    setTimeout(
      () => (this.correctAnswerCount = returnCorrectAnswerCount()),
      200
    );
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../util/vars';

h2,
h3 {
    font-family: Lato;
    color: $light;
}
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
