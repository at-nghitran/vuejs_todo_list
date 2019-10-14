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
      this.$emit('deleteItem', this.data.id);
    },
    updateSTT: function() {
      this.data.isActive = this.ischecked === 'yes' ? true : false;
      this.isFinished = this.data.isActive;
      this.$emit('updateStatus', this.data);
    }
  },
};
</script>
