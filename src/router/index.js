import Router from 'vue-router'
import Home from '../views/home'
import Login from '../components/Login'
import Register from '../components/Register'

const router = new Router({
    base: '/',
    routes:[
        {
            path: '/',
            redirect: {
                name: "Login"
            }
        },
        {
            path: '/home',
            name: 'Home',
            component: Home,
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
        },
        {
            path: '/register',
            name: 'Register',
            component: Register,
        }
    ]
});
export default router;
