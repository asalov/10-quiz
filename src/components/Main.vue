<template>
  <section>
    <h1>10 Quiz</h1>
    <h3>Answer questions from different areas, enrich your common knowledge and have fun!</h3>
    <router-link :to="{ name: 'Question', params: { id: currentQuestion } }" class="cta">{{ linkText }}</router-link>
  </section>
</template>

<script>
export default {
  computed: {
    currentQuestion() {
      return this.$store.getters.currentlyActiveId;
    },
    linkText() {
      return this.currentQuestion > 1 ? 'Resume progress' : 'I am ready!';
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '../util/vars';
h1,
h3 {
  font-family: Lato;
  color: $light;
}

h1 {
  font-weight: 900;
}

h3 {
  font-weight: 400;
}
</style>
