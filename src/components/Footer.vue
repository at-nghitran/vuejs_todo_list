<template>
  <div class="todos-footer">
    <ul class="todos-footer-toolbar">
      <li class="toolbar-item counter">
        <strong v-responsive.lg.xl.md>{{ itemsLeft }}</strong>
        <div v-responsive.sm.xs class="counter-number">
          <strong>{{ itemsLeft }}</strong>
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
        <button class="btn btn-toolbar btn-cleaner" @click="clearCompleted" :disabled="!isDisabled">
          <div v-responsive.sm.xs class="footer-icon">
            <span class="icon-cross"></span>
          </div>Clear completed
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import todoAPI from '../services/todos'
export default {
  name: 'Footer',
  mounted: function() {
    this.$store.commit('countItem');
  },
  methods: {
    filter: function(value) {
      this.$store.commit('updateStatus', value);
      this.$store.commit('fillter', value);
    },
    clearCompleted: function() {
      todoAPI.deleteAllCompleted().then(() => {
        this.$store.commit('getListItems');
        this.$store.commit('updateStatus', 'all');
      });
    }
  },
  computed: {
    itemsLeft: function() {
      return this.$store.getters.itemsLeft;
    },
    filterStatus: function() {
      return this.$store.getters.filterStatus;
    },
    isDisabled: function() {
      return this.$store.getters.isDisabled;
    }
  }
};
</script>
