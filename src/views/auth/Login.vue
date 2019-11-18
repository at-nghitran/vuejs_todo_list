<template>
  <div id="login">
    <h1 class="title">Login</h1>
    <el-container>
      <el-row>
        <el-button type="primary" icon="el-icon-edit" circle></el-button>
        <el-button type="primary" :loading="true" circle></el-button>
      </el-row>
    </el-container>
  </div>
</template>

<script>

export default {
  name: 'Login',
  components: {
  },
  methods: {
  }
};
</script>
