<template>
    <div class="container">
        <div class="card">
                <div class="card-img">
                    <img :src="`${user.photoURL}`">
                </div>

                <div class="user-data">
                    <h2>{{ user.displayName }}</h2>
                    <span>{{ user.email }}</span>
                    <button @click="handleClick">Logout</button>
                </div>

            <button @click="handleBack" class="back">Back</button>
        </div>
    </div>
</template>

<script>
import getUser from '@/composables/getUser'
import { useRouter } from 'vue-router'
import { ref, watch } from '@vue/runtime-core'
import useLogout from '@/composables/useLogout'

export default {
    setup() {
        const { user } = getUser()
        const router = useRouter()
        const { logout, error } = useLogout()

        const handleBack = () => {
            router.push({ name: 'chatroom' })
        }

        watch(user, () => {
            if (!user.value) {
                router.push({ name: 'welcome' })
            }
        })

        const handleClick = async () => {
            await logout()
            if (!error.value) {
                console.log('user logged out')
            }
        }

        return { user, handleBack, handleClick }
    }
}
</script>

<style scoped>
    body {
        background: #dddfdf;
        color: #444;
    }
    .container {
        width: 90%;
        max-width: 100%;
        margin: 20px auto;
        border-radius: 20px;
        box-shadow: 2px 4px 6px rgba(28, 6, 49, 0.1);
        background: white;
    }
    button {
        text-decoration: none;
        background: #5ae4ca;
        color: white;
        font-weight: bold;
        border: 0;
        border-radius: 20px;
        padding: 10px 20px;
    }
    button:hover {
        cursor: pointer;
        background: #9af6e5;
    }
    .card {
        padding: 20px;
        border-bottom: 1px solid #eee;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        position: relative;
        
    }
    .back {
        position: absolute;
        top: 0;
        left: 0;
        margin: 15px 20px;
    }
    .card-img {
        height: 116px;
        width: 116px;
        border-radius: 50%;
        background-color: #eee;
        margin: 15px auto 10px;
        overflow: hidden;
    }
    .card-img img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position:70% 0%;
    }
    .user-data {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .user-data button {
        margin-top: 20px;
    }
</style>