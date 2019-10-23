<template>
  <li class="todo-item">
    <input
      type="checkbox"
      class="item-check"
      v-model="ischecked"
      true-value="yes"
      false-value="no"
      :checked="!this.data.isActive"
      @click="updateSTT"
    />
    <label for class="item-name" :class="{ finished: !isFinished }">{{ data.name }}</label>
    <span class="icon-cross btn-delete" @click="removeItem"></span>
  </li>
</template>
<script>
import todoAPI from '../services/todos';
export default {
  name: 'Item',
  props: ['data'],
  data: function() {
    return {
      ischecked: this.data.isActive ? 'no' : 'yes',
      isFinished: this.data.isActive
    };
  },
  methods: {
    removeItem: function() {
      todoAPI.deletedTodo(this.data.id).then(() => {
        this.reloadData();
      });
      this.$store.commit('countItem');
    },
    updateSTT: function() {
      this.data.isActive = this.ischecked === 'yes' ? true : false;
      this.isFinished = this.data.isActive;
      todoAPI.updateTodo(this.data).then((data) => {
        this.$store.commit('countItem');
        this.reloadData();
      });
    },
    reloadData: function() {
      if (this.filterStatus === 'all') {
        this.$store.commit('getListItems');
      } else {
        this.$store.commit('fillter', this.filterStatus);
      }
    }
  },
  computed: {
    filterStatus: function() {
      return this.$store.getters.filterStatus;
    }
  }
};
</script>
