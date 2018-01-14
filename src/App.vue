<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app'
};
</script>

<style lang="scss">
@import './util/vars';

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
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2),
        inset 0 -3px 0 rgba(0, 0, 0, 0.22);
    user-select: none;
    &:hover {
        background: darken($blue, 10%);
        color: darken($light, 10%);
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2),
            inset 0 -3px 0 rgba(0, 0, 0, 0.32);
    }
    &:active {
        transform: translateY(2px);
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2),
            inset 0px -1px 0 rgba(0, 0, 0, 0.22);
    }
}
</style>
