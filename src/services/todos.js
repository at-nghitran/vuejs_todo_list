import db from '../configs/firebase'
import todoFunctions from '../functions/todos'

var collection = 'todos';
var todoAPI = {
  getListTodo: function () {
    return db.collection(collection).get()
      .then(snapshot => {
        var dataList = []
        snapshot.forEach((todo) => {
          dataList.push(todoFunctions.convertDataFromFB(todo.id, todo.data()))
        })
        return dataList
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
    return db.collection(collection).add(item).then(res => {
      return res
    })
  },
  deletedTodo: function (id) {
    return db.collection(collection).doc(id)
      .delete()
      .then(res => {
        return res
      })
      .catch(err => {
        return err
      })
  },
  deleteAllCompleted: function () {
    return db.collection(collection).where('isActive', '==', false).get()
      .then(function (querySnapshot) {
        // Once we get the results, begin a batch
        var batch = db.batch()
        querySnapshot.forEach(function (doc) {
          // For each doc, add a delete operation to the batch
          batch.delete(doc.ref)
        })
        // Commit the batch
        return batch.commit()
      })
  },
  updateTodo: function (todo) {
    return db.collection(collection).doc(todo.id)
      .update({ isActive: todo.isActive })
      .then((res) => {
        return res
      })
  },
  queryData: function (condition) {
    var qureyPram = condition === 'active' ? true : false
    var dataList = []
    return db.collection(collection).where('isActive', '==', qureyPram)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(function (doc) {
          dataList.push(todoFunctions.convertDataFromFB(doc.id, doc.data()))
        })
        return dataList
      })
      .catch(err => {
        return err
      })
  }
}

export default todoAPI
