<template>
  <div class="post">
    <div class="content">
      <h2>Questions</h2>
      <ul id="progress-bar">
        <li v-for="index in questionsLength" :key="index">
          <router-link :to="{ name: 'Question', params: { id: index }}">{{ index }}</router-link>
        </li>
      </ul>
      <router-view/>
    </div>
  </div>
</template>

<script>
import { returnQuestionsLength } from '@/store';
export default {
  data() {
    return {
      questionsLength: 0
    };
  },
  created() {
    this.questionsLength = returnQuestionsLength();
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
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
