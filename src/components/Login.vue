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
    </div>
    
</template>
<script>
import authAPI from '../services/auth';
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
        }
    }
}
</script>
