<template>
    <div class="container">
        <div class="card">
                <div class="card-img">
                    <img :src="`${user.photoURL}`">
                </div>

                <div class="user-data">
                    <h2>{{ user.displayName }}</h2>
                    <span>{{ user.email }}</span>
                </div>

            <button class="back">Back</button>
        </div>
    </div>
</template>

<script>
import getUser from '@/composables/getUser'
import { useRouter } from 'vue-router'
import { ref, watch } from '@vue/runtime-core'

export default {
    setup() {
        const { user } = getUser()
        const router = useRouter()

        watch(user, () => {
            if (!user.value) {
                router.push({ name: 'welcome' })
            }
        })

        return { user }
    }
}
</script>

<style>
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