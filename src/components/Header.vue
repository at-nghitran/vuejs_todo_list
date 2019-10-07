<template>
  <div
    class="todos-header"
  ><input type="text" class="todos-input" placeholder="What needs to be done?" @keyup.enter="inputItem" v-model="itemName"/></div>
</template>
<script>
export default {
  name: "Header",
  data: function() {
    return {
      itemName: this.value
    };
  },
  methods: {
    inputItem: function() {
      this.$emit('sendItem', this.itemName);
      this.itemName = ''
    }
  }
};
</script>
