<template>
    <div class="auth-wraper">
        <div class="auth-header-wraper">
            <h4 class="auth-header">Sign in</h4>
        </div>
        <form class="auth-form">
            <div>
                <input id="email" type="email" v-model="email" required autofocus placeholder="E-Mail">
            </div>
            <div>
                <input id="password" type="password" v-model="password" required placeholder="Password">
            </div>
            <div>
                <button class="auth-submit" type="submit" @click="handleSubmit">
                    <strong>Sign in</strong>
                </button>
                <router-link class="direct-link" to="/register">Sign up</router-link>
            </div>
        </form>
				<div class="socail-wraper">
					<button class="google-button"><img src="" alt="Google Login" @click="handleGoogleLogin"/></button>
					<button class="facebook-button"><img src="" alt="Facebook Login" @click="handleFacebookLogin"/></button>
				</div>
    </div>
    
</template>
<script>
import authAPI from '../services/auth';
import * as firebase from 'firebase';
export default {
    name: 'Login',
    data(){
        return {
            email : "",
            password : ""
        }
    },
    methods : {
        handleSubmit(e){
            e.preventDefault()
            if (this.email.length >0 && this.password.length > 0) {
                let params = {
                    email: this.email,
                    password: this.password
                }
                authAPI.login(params).then((res) => {
                    if(!res.empty){
                        localStorage.setItem('isLogin', 'true')
                        this.$router.push('/home')
                    }
                    else
                    alert('password wrong!!')
                    //clear
                })
            }
				},
				handleGoogleLogin() {
					var provider = new firebase.auth.GoogleAuthProvider();
					provider.addScope('profile');
					provider.addScope('email');
					firebase.auth().signInWithPopup(provider).then((result) => {
						// This gives you a Google Access Token.
						var token = result.credential.accessToken;
						// The signed-in user info.
						var user = result.user;
						// console.log(user);
						// user {displayName, email, photoURL}
						localStorage.setItem('displayName', user.displayName)
						localStorage.setItem('isLogin', 'true')
						this.$router.push('/home');
					});
				},
				handleFacebookLogin() {
					var provider = new firebase.auth.FacebookAuthProvider();
					// provider.addScope('user_birthday');
					firebase.auth().signInWithPopup(provider).then(function(result) {
						// This gives you a Facebook Access Token.
						var token = result.credential.accessToken;
						// The signed-in user info.
						var user = result.user;
						console.log(user);
						// localStorage.setItem('displayName', user.displayName)
						localStorage.setItem('isLogin', 'true')
						history.push('/home');
					});
				}
    }
}
</script>
