<template>
  <div class="todos-footer">
    <ul class="todos-footer-toolbar">
      <li class="toolbar-item counter"><strong>2</strong> item(s) left </li>
      <li class="toolbar-item">
        <button class="btn btn-toolbar active">All Task</button>
      </li>
      <li class="toolbar-item">
        <button class="btn btn-toolbar">Active</button>
      </li>
      <li class="toolbar-item">
        <button class="btn btn-toolbar">Completed</button>
      </li>
      <li class="toolbar-item cleaner">
        <button class="btn btn-cleaner" disabled> Clear completed </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>
