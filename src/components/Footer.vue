<template>
  <div class="todos-footer">
    <ul class="todos-footer-toolbar">
      <li class="toolbar-item counter"><strong>{{ itemCount }}</strong> item(s) left </li>
      <li class="toolbar-item">
        <button :class="['btn btn-toolbar', {'active': filterStatus === 'all'}]" @click="filter('all')">All Task</button>
      </li>
      <li class="toolbar-item">
        <button :class="['btn btn-toolbar', {'active': filterStatus === 'active'}]" @click="filter('active')">Active</button>
      </li>
      <li class="toolbar-item">
        <button :class="['btn btn-toolbar', {'active': filterStatus === 'completed'}]" @click="filter('completed')">Completed</button>
      </li>
      <li class="toolbar-item cleaner">
        <button class="btn btn-cleaner" :disabled="isDisabled" @click="clearCompleted"> Clear completed </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  props: ['itemCount', 'isDisabled', 'filterStatus'],
  methods: {
    filter: function(value) {
      this.$emit('filterData', value);
    },
    clearCompleted: function() {
      this.$emit('clearCompleted')
    }
  }
}
</script>
