<template>
  <div>
    <router-view/>
  </div>
</template>
<script>
// import Home from './views/home'
export default {
  // components: {
  //   Home
  // }
  // data: function() {
  //   return {
  //     isLoggedIn: localStorage.getItem('isLogin') ? true : false
  //   };
  // }
  mounted() {
    localStorage.removeItem('isLogin')
  }
}
</script>
