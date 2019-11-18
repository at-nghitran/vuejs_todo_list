<template>
  <div id="app">
    <section class="todos">
      <div class="title-wraper">
        <h1 class="title">todos</h1>
        <img class="user-img" src="@/assets/logout.png" @click="handleLogout"/>
      </div>
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
import * as firebase from 'firebase';
// import todoAPI from '../services/todos';

export default {
  name: 'Home',
  components: {
    Header,
    Footer,
    Main
  },
  mounted() {
    if(!localStorage.getItem('USER')) {
      this.$router.push('/login')
    }
  },
  methods : {
    handleLogout() {
      firebase.auth().signOut();
      localStorage.clear();
      this.$router.push('/login')
    }
  },
};
</script>
