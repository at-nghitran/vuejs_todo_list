<template>
  <section class="todos-main">
    <div class="main-message">
      <div v-if="!listItems.length" class="no-item">
        <p class="icon-file-text2"></p>
        <p>You don't have any task!!!</p>
      </div>
      <ul class="todo-list" v-else>
        <transition-group name="item-fade">
          <Item
            v-for="item in listItems"
            :key="item.id"
            :data="item"
            @deleteItem="deleteItem"
            @updateStatus="updateStatus"
            @itemCheck="itemCheck"
          ></Item>
        </transition-group>
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
  props: ["listItems"],
  methods: {
    deleteItem: function(id) {
      this.$emit("deleteItem", id);
    },
    updateStatus: function(id) {
      this.$emit("updateStatus", id);
    },
    itemCheck: function(isCheck) {
      this.$emit("itemCheck", isCheck);
    }
  }
};
</script>
