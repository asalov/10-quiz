<template>
  <div class="post">
    <div class="loading" v-if="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="questions" class="content">
      <h2>POST</h2>
      <ul id="example-1">
        <li v-for="questionObj in questions">
          {{ questionObj['question'] }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      questions: null,
      error: null
    };
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData();
  },
  watch: {
    // call again the method if the route changes
    $route: 'fetchData'
  },
  methods: {
    fetchData() {
      this.error = this.questions = null;
      this.loading = true;
      fetch('https://opentdb.com/api.php?amount=10&category=27&difficulty=easy')
        .then(response => {
          return response.json();
        })
        .then(jsonRes => {
          this.loading = false;
          this.questions = jsonRes.results;
        });
    }
  }
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
