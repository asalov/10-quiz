<template>
  <div id="app">
    <div class="spinner" v-show="isLoading">
      <div class="rect1" />
      <div class="rect2" />
      <div class="rect3" />
      <div class="rect4" />
      <div class="rect5" />
    </div>
    <transition appear name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  computed: {
    isLoading() {
      return this.$store.getters.isStoreEmpty;
    },
  },
};
</script>

<style lang="scss">
@import './util/vars';
@import './util/mixins';

* {
  box-sizing: border-box;
}

.spinner {
  margin: 100px auto;
  width: 50px;
  height: 40px;
  text-align: center;
  font-size: 10px;
}

.spinner > div {
  background-color: #efefef;
  height: 100%;
  width: 6px;
  display: inline-block;

  -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
  animation: sk-stretchdelay 1.2s infinite ease-in-out;
}

.spinner > div:not(:first-child) {
  margin-left: 2px;
}

.spinner .rect2 {
  -webkit-animation-delay: 0.1s;
  animation-delay: 0.1s;
}

.spinner .rect3 {
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
}

.spinner .rect4 {
  -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s;
}

.spinner .rect5 {
  -webkit-animation-delay: 0.4s;
  animation-delay: 0.4s;
}

.hidden {
  display: none;
}

@-webkit-keyframes sk-stretchdelay {
  0%,
  40%,
  100% {
    -webkit-transform: scaleY(0.4);
  }
  20% {
    -webkit-transform: scaleY(1);
  }
}

@keyframes sk-stretchdelay {
  0%,
  40%,
  100% {
    transform: scaleY(0.4);
    -webkit-transform: scaleY(0.4);
  }
  20% {
    transform: scaleY(1);
    -webkit-transform: scaleY(1);
  }
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0 auto;
  max-width: 800px;
  @media screen and (min-width: $small) {
    margin-top: 60px;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.cta {
  text-decoration: none;
  display: inline-block;
  padding: 1em 2em;
  margin: 0.5em;
  margin-top: 50px;
  cursor: pointer;
  color: $light;
  border-radius: 0.25em;
  background: $blue;
  @include button-shadow($inset: -3px);
  user-select: none;

  &:hover {
    background: darken($blue, 10%);
    color: darken($light, 10%);
    @include button-shadow($inset: -3px);
  }

  &:active {
    transform: translateY(2px);
    @include button-shadow($inset: -1px);
  }
}
</style>
