<template>
  <article class="question">
    <header>{{ question.question }}</header>
  </article>
</template>

<script>
import store from '@/store';
export default {
  props: {
    id: {
      type: String,
      default: '1'
    }
  },
  data() {
    return {
      question: {}
    };
  },
  created() {
    this.question = store.returnQuestionByIdAction(this.id);
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
