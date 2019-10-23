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
            v-for="item in this.$store.state.items"
            :key="item.id"
            :data="item"
          ></Item>
        </transition-group>
      </ul>
    </div>
  </section>
</template>
<script>
import Item from './Item';

export default {
  name: 'Main',
  components: {
    Item
  },
  mounted: function() {
    this.$store.commit('getListItems');
  },
  computed: {
    listItems: function() {
      return this.$store.getters.items;
    },
  },
};
</script>
