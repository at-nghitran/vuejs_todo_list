<template>
  <div>
    <router-view/>
  </div>
</template>
<script>
export default {
  mounted() {
    localStorage.removeItem('isLogin');
  }
}
</script>
