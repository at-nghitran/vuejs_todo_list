<template>
  <li class="todo-item">
    <input type="checkbox" class="item-check" :checked="ischecked" @change="updateSTT" />
    <label for class="item-name" :class="{ finished: ischecked }">{{ data.name }}</label>
    <span class="icon-cross btn-delete" @click="removeItem"></span>
  </li>
</template>
<script>
export default {
  name: "Item",
  props: ["data"],
  data: function() {
    return {
      ischecked: this.data.isActive
    };
  },
  methods: {
    removeItem: function() {
      this.$emit("deleteItem", this.data.id);
    },
    updateSTT: function() {
      this.ischecked = !this.ischecked;
      this.$emit("updateStatus", this.data.id);
    }
  },
  watch: {
    ischecked: function() {
      this.$emit("itemCheck", this.ischecked);
    }
  }
};
</script>
