<template>
  <nav v-if="user">
    <div>
        <p>Hey there {{ user.displayName }}</p>
        <p class="email">Currently logged in as {{ user.email }}</p>
    </div>
    <div class="profile">
        <button @click="handleProfile">Profile</button>
    </div>
  </nav>
</template>

<script>
import getUser from '../composables/getUser'
import { useRouter } from 'vue-router'

export default {
    setup() {
        const { user } = getUser()
        const router = useRouter()

        const handleProfile = () => {
            router.push({ name: 'profile' })
        }


        return { handleProfile, user }
    }
}
</script>

<style>
    nav {
        padding: 20px;
        border-bottom: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    nav p {
        margin: 2px auto;
        font-size: 16px;
        color: #444;
    }
    nav p.email {
        font-size: 14px;
        color: #999;
    }
    .profile button {
        margin: 0 10px;
    }
</style>