<template>
  <div id="app">
    <h1 class="title">todos</h1>
    <section class="todos">
      <Header @sendItem="addItem"></Header>
      <Main :listItems="dataDisplay" @deleteItem="deleteItem" @updateStatus="updateStatus" :isLoading="isLoading"></Main>
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
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCpahgG6i3is2xLqOdltK51fyS0fwc-HLM',
  authDomain: 'todolist-5cbf0.firebaseapp.com',
  databaseURL: 'https://todolist-5cbf0.firebaseio.com',
  projectId: 'todolist-5cbf0',
  storageBucket: 'todolist-5cbf0.appspot.com',
  messagingSenderId: '1003891563359',
  appId: '1:1003891563359:web:083dba9300d0465bd5b4ea',
  measurementId: 'G-TZ9CJBTYZH'
};
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore().collection('todos');
export default {
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
      let that = this;
      that.isLoading = true;
      db.get()
        .then(snapshot => {
          if (snapshot) {
            that.listItems = [];
            snapshot.forEach(todo => {
              that.listItems.push(that.convertDataFromFB(todo.id, todo.data()));
            });
            if (that.filterStatus === 'all') {
              that.dataDisplay = [...that.listItems];
            } else {
              that.filterData(that.filterStatus);
            }
          }
          that.countItem();
          that.getDisabled();
        })
        .catch(err => {
          // console.log('err: ', err);
        }).finally(() => {
        });
    },
    addItem: function(name) {
      if (name) {
        let item = {};
        item.name = name;
        item.isActive = true;
        let that = this;
        db.add(item).then(function(res) {
          that.getAllDataFromFB();
        });
      } else {
        return false;
      }
    },
    deleteItem: function(id) {
      var that = this;
      db.doc(id)
        .delete()
        .then(function() {
          that.getAllDataFromFB();
        })
        .catch(function(error) {
          // console.error('Error removing document: ', error);
        });
    },
    updateStatus: function(todo) {
      let that = this;
      db.doc(todo.id)
        .update({ isActive: todo.isActive })
        .then(function() {
          const index = that.listItems.findIndex(i => i.id === todo.id);
          if (index !== -1) {
            that.listItems[index].isActive = todo.isActive;
          }
          that.countItem();
          that.getDisabled();
          that.filterData(that.filterStatus);
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
      let that = this;
      let listDel = this.listItems.filter(i => !i.isActive);
      listDel.forEach(function(item) {
        that.deleteItem(item.id);
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
