<template>
  <div class="post">
    <div v-if="questionsLength" class="content">
      <h2>Questions</h2>
      <ul id="progress-bar">
        <li v-for="index in questionsLength" :key="index">
          <span>{{ index }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import store from '@/store';
export default {
  data() {
    return {
      questionsLength: 0
    };
  },
  created() {
    this.questionsLength = store.returnQuestionsLength();
  },
  methods: {}
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
