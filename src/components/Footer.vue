<template>
  <div class="todos-footer">
    <ul class="todos-footer-toolbar">
      <li class="toolbar-item counter"><strong>{{ itemCount }}</strong> item(s) left </li>
      <li class="toolbar-item">
        <button :class="['btn btn-toolbar', {'active': isActive === 'all'}]" @click="filter('all')">All Task</button>
      </li>
      <li class="toolbar-item">
        <button :class="['btn btn-toolbar', {'active': isActive === 'active'}]" @click="filter('active')">Active</button>
      </li>
      <li class="toolbar-item">
        <button :class="['btn btn-toolbar', {'active': isActive === 'completed'}]" @click="filter('completed')">Completed</button>
      </li>
      <li class="toolbar-item cleaner">
        <button class="btn btn-cleaner" disabled> Clear completed </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  props: ['itemCount'],
  data: function() {
    return {
      isActive: 'all'
    }
  },
  methods: {
    filter: function(value) {
      this.isActive = value
      this.$emit('filterData', value);
    }
  }
}
</script>
