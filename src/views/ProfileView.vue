<template>
    <div class="container" v-if="user">
        <div class="card" v-if="showProfile">
                <div class="card-img">
                    <img src="#" alt="#">
                </div>

                <div class="user-data">
                    <h2>{{ user.displayName }}</h2>
                    <span>{{ user.email }}</span>
                    <button @click="showProfile = false">Change password</button>
                </div>

            <button class="back">Back</button>
        </div>
        <div v-else>
            <ChangePassword />
        </div>
    </div>
</template>

<script>
import getUser from '@/composables/getUser'
import { useRouter } from 'vue-router'
import { ref, watch } from '@vue/runtime-core'
import ChangePassword from '../components/ChangePassword.vue'

export default {
    components: { ChangePassword },
    setup() {
        const showProfile = ref(true)
        const { user } = getUser()
        const router = useRouter()

        watch(user, () => {
            if (!user.value) {
                router.push({ name: 'welcome' })
            }
        })

        return { user, showProfilej }
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