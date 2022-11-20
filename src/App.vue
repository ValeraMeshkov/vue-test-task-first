<template>
  <div class="wrapper">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
};
</script>

<style lang="scss">
@import "@/styles/app.scss";

body{
  margin: 0;
  color: $dark;
}

#app {
  font-family: 'comic sans ms', Helvetica, Arial, sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
