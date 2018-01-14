<template>
  <div class="post">
    <div class="content">
      <ul class="progress-bar">
        <li v-for="index in questionsLength" :class="{ 'passed': currentlyActive() >= index }" :key="index">
          <span>{{ index }}</span>
        </li>
      </ul>
      <div>
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import {
  returnQuestionsLength,
  returnCurrentlyActiveQuestionId
} from '@/store';
export default {
  data() {
    return {
      questionsLength: 0
    };
  },
  created() {
    this.questionsLength = returnQuestionsLength();
  },
  methods: {
    currentlyActive: returnCurrentlyActiveQuestionId
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '../util/vars';
h1,
h2 {
    font-weight: normal;
}
.progress-bar {
    list-style-type: none;
    width: 100%;
    display: inline-flex;
    padding: 0;
    justify-content: space-between;
    li {
        flex-basis: 8%;
        background-color: $light;
        transition: 0.3s;
        &.passed {
            background-color: $blue;
            color: $light;
        }
    }
}
</style>
