<template>
  <form @submit.prevent="handleSubmit">
    <input type="email" required placeholder="email" v-model="email">
    <input type="password" required placeholder="password" v-model="password">
    <div class="error">{{ error }}</div>
    <button>Log in</button>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import useLogin from '../composables/useLogin'

export default {
    setup(props, context) {
        // refs
        const email = ref('')
        const password = ref('')

        const { error, login } = useLogin()

        const handleSubmit = async () => {
            await login(email.value, password.value)
            if (!error.value) {
                // After the user has logged in and there's no errors, I want to emit a custom event
                //that will redirect from login form to the chatroom.
                // Emitting a custom event is different in composition api though. It's done by context
                //the second prop setup() function uses and it works the same way that in options api.
                context.emit('login')
            }
        }

        return { email, password, handleSubmit, error }
    }
}
</script>

<style>

</style>