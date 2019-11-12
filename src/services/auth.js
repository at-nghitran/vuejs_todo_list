import db from '../configs/firebase'

var accountCollection = 'accounts';
var authAPI ={
  registerNewUser: function (params) {
    // let item = {}
    // item.email = params.email
    // item.password = params.password
    // item.name = params.name
    return db.collection(accountCollection).add(params).then(res => {
      return res
    })
  },
  login: function (params) {
    return db.collection(accountCollection).where('email', '==', params.email)
      .where('password', '==', params.password).get()
      .then(function (res) {
        return res
      })
  }
}

export default authAPI
