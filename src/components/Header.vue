<template>
  <div class="todos-header">
    <input type="text" class="todos-input icon-cross" placeholder="What needs to be done?" @keyup.enter="addItem" v-model="itemName"/>
  </div>
</template>
<script>
import todoAPI from '../services/todos';
export default {
  name: 'Header',
  data: function() {
    return {
      itemName: this.value
    };
  },
  methods: {
    addItem() {
      todoAPI.addNewTodo(this.itemName);
      this.$store.commit('countItem');
      if (this.filterStatus === 'all') {
        this.$store.commit('getListItems');
      } else {
        this.$store.commit('fillter', this.filterStatus);
      }
      this.itemName = '';
    }
  },
  computed: {
    filterStatus: function() {
      return this.$store.getters.filterStatus;
    }
  }
};
</script>
