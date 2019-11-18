<template>
    <div class="auth-wraper">
        <div class="auth-header-wraper">
            <h3 class="auth-header">Sign up</h3>
        </div>
        <form class="auth-form">
            <div>
                <input id="name" type="text" v-model="name" required autofocus placeholder="Name">
            </div>

            <div>
                <input id="email" type="email" v-model="email" required placeholder="E-Mail">
            </div>

            <div>
                <input id="password" type="password" v-model="password" required placeholder="Password">
            </div>

            <div>
                <input id="password-confirm" type="password" v-model="password_confirmation" required placeholder="Confirm Password">
            </div>

            <div>
                <button class="auth-submit" type="submit" @click="handleSubmit">
                    <strong>Sign up</strong>
                </button>
                <router-link class="direct-link" to="/login">Sign in</router-link>
            </div>
        </form>
    </div>
</template>
<script>
import authAPI from '../services/auth';
export default {
    name: 'Register',
    data(){
        return {
            name : "",
            email : "",
            password : "",
            password_confirmation : "",
        }
    },
    methods : {
        handleSubmit(e) {
            e.preventDefault()

            if (this.email.length > 0 && this.password === this.password_confirmation && this.password.length > 0)
            {
                let params = {
                    displayName: this.name,
                    email: this.email,
                    password: this.password
                }
                authAPI.registerNewUser(params).then(() => {
                    this.$router.push('/home');
                });
            } else {
                this.password = ""
                this.passwordConfirm = ""

                return alert("Passwords do not match")
            }
        }
    }
}
</script>
