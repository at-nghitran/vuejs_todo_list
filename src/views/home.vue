<template>
  <div id="app">
    <section class="todos">
      <div class="title-wraper">
        <h1 class="title">todos</h1>
        <img class="user-img" src="" :alt="userName"/>
        <div class="side-bar">
          <div class="user-image-wraper">
            <img id="user-img" src="" :alt="userName">
          </div>
          <div class="logout-wraper">
            <button class="logout-button" @click="handleLogout">Sign out</button>
          </div>
        </div>
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
  props: ['userName'],
  components: {
    Header,
    Footer,
    Main
  },
  mounted() {
    if(localStorage.getItem('isLogin') != 'true') {
      this.$router.push('/login')
    } else {
      this.userName = localStorage.getItem('displayName')
    }
  },
  methods : {
    handleLogout() {
      firebase.auth().signOut();
      localStorage.removeItem("isLogin");
      this.$router.push('/login')
    }
  }
};
</script>
