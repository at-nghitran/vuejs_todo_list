<template>
  <div id="app">
    <h1 class="title">todos</h1>
    <section class="todos">
      <Header @sendItem="addItem"></Header>
      <Main :listItems="dataDisplay" @deleteItem="deleteItem" @updateStatus="updateStatus" @itemCheck="updateStatus"></Main>
      <Footer :itemCount="itemCount" @filterData="filterData" @clearCompleted="clearCompleted" :isDisabled="isDisabled" :filterStatus="filterStatus"></Footer>
    </section>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
export default {
  components: {
    Header,
    Footer,
    Main
  },
  data: function() {
    return {
      dataDisplay: [],
      listItems: [],
      itemCount: 0,
      isCheck: false,
      filterStatus: 'all',
      isDisabled: true,
    };
  },
  methods: {
    addItem: function(name) {
      if (name) {
        let item = {};
        item.id = Math.floor(Math.random() * 1000000000);
        item.name = name;
        item.isActive = false;
        this.listItems.push(item);
        if (this.filterStatus === 'all') {
          this.dataDisplay = this.listItems
        }
        this.countItem()
      } else {
        return false;
      }
    },
    deleteItem: function(id) {
      const index1 = this.listItems.findIndex(i => i.id === id);
      if (index1 !== -1) {
        this.listItems.splice(index1, 1);
        this.countItem()
      }
      this.filterData(this.filterStatus)
    },
    updateStatus: function(id) {
      const index = this.listItems.findIndex(i => i.id === id);
      if (index !== -1) {
        this.listItems[index].isActive = !this.listItems[index].isActive;
        this.countItem();
        this.filterData(this.filterStatus)
      }
      let listCompleted = this.listItems.filter(i => i.isActive);
      if (listCompleted.length) {
        this.isDisabled = false
      } else {
        this.isDisabled = true
      }
    },
    itemCheck: function(id) {
      this.updateStatus(id);
    },
    filterData: function(value) {
      if (value === 'active') {
        this.dataDisplay = this.listItems.filter(i => !i.isActive);
        this.filterStatus = 'active'
      } else if (value === 'completed') {
        this.dataDisplay = this.listItems.filter(i => i.isActive);
        this.filterStatus = 'completed'
      } else {
        this.dataDisplay = this.listItems
        this.filterStatus = 'all'
      }
    },
    clearCompleted: function() {
      this.listItems = this.listItems.filter(i => {
        return !i.isActive;
      });
      this.isDisabled = true
      this.filterData('all')
    },
    countItem: function() {
      this.itemCount = this.listItems.filter(i => !i.isActive).length;
    }
  },
};
</script>

<style lang="scss">
@import "./stylling/styles.scss";
</style>
