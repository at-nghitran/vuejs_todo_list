<template>
  <div id="app">
    <h1 class="title">todos</h1>
    <section class="todos">
      <Header></Header>
      <Main></Main>
      <Footer></Footer>
    </section>
  </div>
</template>

<script>
import Header from '../components/Header';
import Footer from '../components/Footer';
import Main from '../components/Main';
// import todoAPI from '../services/todos';

export default {
  name: 'Home',
  components: {
    Header,
    Footer,
    Main
  },
  mounted() {
    if(localStorage.getItem('isLogin') != 'true') {
      this.$router.push('/login')
    }
  }
};
</script>
