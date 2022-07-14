<template>
  <div class="container" v-if="user">
    <Navbar />
    <ChatWindow />
    <NewChatForm />
  </div>
</template>

<script>
import { watch } from '@vue/runtime-core'
import Navbar from '../components/Navbar.vue'
import NewChatForm from '../components/NewChatForm.vue'
import ChatWindow from '../components/ChatWindow.vue'
import getUser from '../composables/getUser'
import { useRouter } from 'vue-router'
import getCollection from '@/composables/getCollection'

export default {
    components: { Navbar, NewChatForm, ChatWindow },
    setup() {
      const { user } = getUser()
      const router = useRouter()
      const { error, documents } = getCollection('messages')

      watch(user, () => {
        if (!user.value) {
          router.push({ name: 'welcome' })
        }
      })

      return { user, error, documents }
    }
}
</script>

<style>

</style>