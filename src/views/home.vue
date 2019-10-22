<template>
  <div id="app">
    <h1 class="title">todos</h1>
    <section class="todos">
      <Header @sendItem="addItem"></Header>
      <Main :listItems="dataDisplay" @deleteItem="deleteItem" @updateStatus="updateStatus"></Main>
      <Footer
        :itemCount="itemCount"
        @filterData="filterData"
        @clearCompleted="clearCompleted"
        :isDisabled="isDisabled"
        :filterStatus="filterStatus"
      ></Footer>
    </section>
  </div>
</template>

<script>
import Header from '../components/Header';
import Footer from '../components/Footer';
import Main from '../components/Main';
import todoAPI from '../services/todos';

export default {
  name: 'Home',
  mounted() {
    this.getAllDataFromFB();
  },
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
    getAllDataFromFB: function() {
      todoAPI.getListTodo()
      .then((snapshot) => {
        if (snapshot) {
          this.listItems = [];
          snapshot.forEach(todo => {
            this.listItems.push(this.convertDataFromFB(todo.id, todo.data()));
          });
          if (this.filterStatus === 'all') {
            this.dataDisplay = [...this.listItems];
          } else {
            this.filterData(this.filterStatus);
          }
        }
        this.countItem();
        this.getDisabled();
      });
    },
    addItem: function(name) {
      if (name) {
        todoAPI.addNewTodo(name).then(() => {
          this.getAllDataFromFB();
        });
      } else {
        return false;
      }
    },
    deleteItem: function(id) {
      todoAPI.deletedTodo(id).then(() => {
        this.getAllDataFromFB();
      });
    },
    updateStatus: function(todo) {
      todoAPI.updateTodo(todo).then(() => {
        const index = this.listItems.findIndex(i => i.id === todo.id)
        if (index !== -1) {
          this.listItems[index].isActive = todo.isActive
        }
        this.countItem()
        this.getDisabled()
        this.filterData(this.filterStatus)
      });
    },
    filterData: function(value) {
      this.getAllDataFromFB();
      if (value === 'active') {
        this.dataDisplay = this.listItems.filter(i => i.isActive);
        this.filterStatus = 'active';
      } else if (value === 'completed') {
        this.dataDisplay = this.listItems.filter(i => !i.isActive);
        this.filterStatus = 'completed';
      } else {
        this.dataDisplay = this.listItems;
        this.filterStatus = 'all';
      }
    },
    clearCompleted: function() {
      let listDel = this.listItems.filter(i => !i.isActive);
      listDel.forEach((item) => {
        this.deleteItem(item.id);
      });
      this.getAllDataFromFB();
      this.getDisabled();
      this.filterData('all');
    },
    countItem: function() {
      this.itemCount = this.listItems.filter(i => i.isActive).length;
    },
    convertDataFromFB: function(id, data) {
      return {
        id: id,
        name: data.name,
        isActive: data.isActive
      };
    },
    getDisabled: function() {
      let listCompleted = this.listItems.filter(i => !i.isActive);
      if (listCompleted.length) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
    },
  }
};
</script>
