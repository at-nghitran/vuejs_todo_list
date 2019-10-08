<template>
  <li class="todo-item" @click="updateSTT">
    <input type="checkbox" class="item-check" :checked="ischecked">
    <label for="" class="item-name" :class="{ finished: ischecked }">{{ data.name }}</label>
    <button class="btn-delete" @click="removeItem">x</button>
  </li>
</template>
<script>
export default {
  name: 'Item',
  props: ['data'],
  data: function() {
    return {
      ischecked: this.data.isActive
    }
  },
  methods: {
    removeItem: function() {
      this.$emit('deleteItem', this.data.id);
    },
    updateSTT: function() {
      this.ischecked = !this.ischecked
      this.$emit('updateStatus', this.data.id);
    }
  },
  watch: {
    ischecked: function() {
      this.$emit('itemCheck', this.ischecked);
    }
  }
}
</script>
