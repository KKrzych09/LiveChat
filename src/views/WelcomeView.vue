<template>
    <div class="welcome container">
        <p>Welcome</p>
        <div v-if="showLogin">
            <h2>Login</h2>
            <LoginForm @login="enterChat" />
            <button @click="googleSignIn">Log in with Google</button>
            <p>No account yet? <span @click="showLogin = false">Signup</span> instead</p>
        </div>
        <div v-else>
            <h2>Sign up</h2>
            <SignupForm @signup="enterChat" />
            <p>Already registered? <span @click="showLogin = true">Login</span> instead</p>
        </div>
    </div>
</template>

<script>
import SignupForm from '../components/SignupForm.vue'
import LoginForm from '../components/LoginForm.vue'
import { ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import firebase from 'firebase/app'

export default {
    components: { SignupForm, LoginForm },
    setup() {
        const showLogin = ref(true)
        const router = useRouter()

        // Handling redirection to the chat room with custom event provided by LoginForm.vue
        const enterChat = () => {
            router.push({ name: 'chatroom' })
        }

        // Signing in with Google
        const googleSignIn = () => {
            let provider = new firebase.auth.GoogleAuthProvider()
            firebase.auth().signInWithPopup(provider)
                .then(() => {
                    router.push({ name: 'chatroom' })
                })
            .catch((err) => {
                console.log(err)
            });
        }

        return { showLogin, enterChat, googleSignIn }
    }
 }
</script>

<style>
    .welcome {
        text-align: center;
        padding: 20px 0;
    }
    /* form styles */
    .welcome form {
        width: 300px;
        margin: 20px auto;
    }
    .welcome label {
        display: block;
        margin: 20px 0 10px;
    }
    .welcome input {
        width: 100%;
        padding: 10px;
        border-radius: 20px;
        border: 1px solid #eee;
        outline: none;
        color: #999;
        margin: 10px auto;
        box-sizing: border-box;
    }
    .welcome span {
        font-weight: bold;
        text-decoration: underline;
        cursor: pointer;
    }

</style>