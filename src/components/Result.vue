<template>
  <div class="post" v-if="showResults">
    <div class="content">
      <h2>Correct answers</h2>
      <h3>{{ totalCorrectAnswers }} out of {{ totalQuestions }}</h3>
    </div>
    <div class="container">
      <div class="progress">
        <div class="bar" :style="{ 'width': totalCorrectAnswers * 10 + '%' }"/>
      </div>
    </div>
    <router-link
      :to="{ name: 'Question', params: { id: 1, reload: true } }"
      @click.native="hideResults"
      class="cta">Go again</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      totalCorrectAnswers: 0,
      showResults: true,
    };
  },
  computed: {
    totalQuestions() {
      return this.$store.getters.totalQuestions;
    },
  },
  mounted() {
    setTimeout(() => {
      this.totalCorrectAnswers = this.$store.getters.totalCorrectAnswers;
    }, 250);
  },
  methods: {
    hideResults() {
      this.showResults = false;
    },
  },
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
  transition: width 0.8s ease;
}
</style>
