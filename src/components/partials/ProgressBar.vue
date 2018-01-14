<template>
  <ul class="progress-bar">
    <li v-for="index in questionsLength" :class="{ 'passed': activeId >= index }" :key="index">
      <span>{{ index }}</span>
    </li>
  </ul>
</template>

<script>
import { returnQuestionsLength } from '@/store';
export default {
  props: {
    activeId: {
      type: Number | String,
      default: 1
    }
  },
  data() {
    return {
      questionsLength: 0
    };
  },
  created() {
    this.questionsLength = returnQuestionsLength();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '../../util/vars';
.progress-bar {
    list-style-type: none;
    width: 100%;
    display: inline-flex;
    padding: 0;
    margin-bottom: 20px;
    justify-content: space-between;
    li {
        flex-basis: 8%;
        background-color: $dark;
        color: $light;
        transition: 0.3s;
        &.passed {
            background-color: $light;
            color: $dark;
            position: relative;
            &:not(:first-child) {
                &:before {
                    content: '';
                    width: 25%;
                    height: 1px;
                    background-color: $light;
                    position: absolute;
                    left: -26%;
                    top: 50%;
                }
            }
        }
        @media screen and (max-width: 420px) {
            span {
                visibility: hidden;
            }
        }
    }
}
</style>
