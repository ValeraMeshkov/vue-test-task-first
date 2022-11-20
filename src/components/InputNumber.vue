<template>
    <input
      type="text"
      :placeholder="placeholder"
      v-model="inputText"
      oninput="this.value = this.value.replace(/[^0-9]/g, '')"
    >
</template>

<script>

export default {
  name: 'Input',
  props: {
    placeholder: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
  },
  computed: {
    inputText: {
      get() {
        return this.text;
      },
      set(val) {
        this.$emit('inputNumber', val);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
input{
  border: 1px solid #EAEAEA;
  border-radius: 10px;
  height: 50px;
  padding-left: 10px;
  width: 100%;
}
</style>
