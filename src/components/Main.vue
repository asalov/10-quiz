<template>
  <section>
    <h1>10 Quiz</h1>
    <h3>Answer questions from different areas, enrich your common knowledge and have fun!</h3>
    <router-link :to="{ name: 'Question', params: { id: 1 } }" class="cta">I am ready!</router-link>
  </section>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '../util/vars';
h1,
h3 {
    font-weight: 400;
    font-family: Lato;
    color: $light;
}
h1 {
    font-weight: 900;
}
</style>
