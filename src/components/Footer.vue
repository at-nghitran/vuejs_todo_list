<template>
  <div class="todos-footer">
    <ul class="todos-footer-toolbar">
      <li class="toolbar-item counter">
        <strong v-responsive.lg.xl.md>{{ itemCount }}</strong>
        <div v-responsive.sm.xs class="counter-number">
          <strong>{{ itemCount }}</strong>
        </div> item(s) left
      </li>
      <li class="toolbar-item">
        <button
          :class="['btn btn-toolbar', {'active': filterStatus === 'all'}]"
          @click="filter('all')"
        >
          <div v-responsive.sm.xs class="footer-icon">
            <span class="icon-glass2"></span>
          </div>All Task
        </button>
      </li>
      <li class="toolbar-item">
        <button
          :class="['btn btn-toolbar', {'active': filterStatus === 'active'}]"
          @click="filter('active')"
        >
          <div v-responsive.sm.xs class="footer-icon">
            <span class="icon-clipboard"></span>
          </div>Active
        </button>
      </li>
      <li class="toolbar-item">
        <button
          :class="['btn btn-toolbar', {'active': filterStatus === 'completed'}]"
          @click="filter('completed')"
        >
          <div v-responsive.sm.xs class="footer-icon">
            <span class="icon-folder-open"></span>
          </div>Completed
        </button>
      </li>
      <li class="toolbar-item cleaner">
        <button class="btn btn-toolbar btn-cleaner" @click="clearCompleted">
          <div v-responsive.sm.xs class="footer-icon">
            <span class="icon-cross"></span>
          </div>Clear completed
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Footer",
  props: ["itemCount", "isDisabled", "filterStatus"],
  methods: {
    filter: function(value) {
      this.$emit("filterData", value);
    },
    clearCompleted: function() {
      this.$emit("clearCompleted");
    }
  }
};
</script>
