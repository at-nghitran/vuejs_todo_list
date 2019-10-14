<template>
  <section class="todos-main">
    <div class="main-message">
      <p v-if="!listItems.length" class="no-item">You don't have any task!!!</p>
      <ul class="todo-list" v-else>
        <Item v-for="item in listItems" :key="item.id" :data="item" @deleteItem="deleteItem" @updateStatus="updateStatus"></Item>
      </ul>
    </div>
  </section>
</template>
<script>
import Item from "./Item";
export default {
  name: "Main",
  components: {
    Item
  },
  props: ['listItems'],
  methods: {
    deleteItem: function(id) {
      this.$emit('deleteItem', id);
    },
    updateStatus: function(todo) {
      this.$emit('updateStatus', todo);
    },
  }
};
</script>
