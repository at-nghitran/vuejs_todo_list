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
import Header from './components/Header'
import Footer from './components/Footer'
import Main from './components/Main'
export default {
  components: {
    Header,
    Footer,
    Main
  }
};
</script>

<style lang="scss">
@import "./stylling/styles.scss";
</style>
