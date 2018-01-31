<template>
  <ul class="progress-bar">
    <li
      v-for="index in totalQuestions"
      :class="{ 'passed': currentlyActiveId >= index, 'selected': selectedId === index }"
      :key="index"
      @click="selectQuestion(index)"
    >
      <span>{{ index }}</span>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    selectedId: {
      type: Number | String,
      default: 1,
    },
  },
  computed: {
    ...mapGetters(['totalQuestions', 'currentlyActiveId']),
  },
  methods: {
    selectQuestion(ind) {
      if (this.currentlyActiveId >= ind) {
        this.$store.commit('selectQuestion', ind);

        this.$router.push({
          name: 'Question',
          params: {
            id: ind,
          },
        });
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '../../util/vars';

.progress-bar {
  width: 100%;
  display: flex;
  margin-bottom: 20px;
  justify-content: space-between;

  li {
    flex-basis: 8%;
    background: $dark;
    color: $light;
    transition: 0.8s;
    cursor: not-allowed;

    &.passed {
      cursor: pointer;
      background: $light;
      color: $dark;
      position: relative;

      &:not(:first-child) {
        &:before {
          content: '';
          width: 25%;
          height: 1px;
          background: $light;
          position: absolute;
          left: -26%;
          top: 50%;
        }
      }
    }

    &.selected {
      background: $blue;
      color: $light;
    }

    @media screen and (max-width: 420px) {
      span {
        visibility: hidden;
      }
    }
  }
}
</style>
