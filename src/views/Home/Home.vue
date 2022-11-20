<template>
  <div class="home">

    <Filters/>

    <Hotels/>

  </div>
</template>

<script>
// @ is an alias to /src
import Filters from './Filters/Filters.vue';
import Hotels from './Hotels/Hotels.vue';

export default {
  name: 'Home',
  components: {
    Filters,
    Hotels,
  },
};
</script>

<style lang="scss" scoped>
.home{
  display: flex;
  justify-content: center;
  padding: 50px;
}
</style>
