import db from '../configs/firebase'

var todoAPI = {
  getListTodo: function () {
    return db.collection('todos').get()
      .then(snapshot => {
        return snapshot
      })
      .catch(err => {
        return err
      }).finally(() => {
    })
  },
  addNewTodo: function (name) {
    let item = {}
    item.name = name
    item.isActive = true
    return db.collection('todos').add(item).then(function (res) {
      return res
    })
  },
  deletedTodo: function (id) {
    return db.collection('todos').doc(id)
      .delete()
      .then(function (res) {
        return res
      })
      .catch(function (err) {
        return err
      })
  },
  updateTodo: function (todo) {
    return db.collection('todos').doc(todo.id)
      .update({ isActive: todo.isActive })
      .then(function (res) {
        return res;
      })
  }
}

export default todoAPI
