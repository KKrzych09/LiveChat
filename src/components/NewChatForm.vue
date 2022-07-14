<template>
  <form>
    <div class="sendText">
        <textarea placeholder="Type a message and click enter to send..." 
            v-model="message" 
            @keypress.enter.prevent="handleSubmit"
            >
        </textarea>
        <label>Upload image</label>
        <input type="file" @change="handleChange">
    </div>
    
    <div class="error">{{ fileError }}</div>
    <div class="error" >{{ error }}</div>
    <!-- <button @click="handleSubmit">Send a message</button> -->
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import getUser from '@/composables/getUser'
import useCollection from '@/composables/useCollection'
import { timestamp } from '@/firebase/config'
import useStorage from '@/composables/useStorage'

export default {
    setup() {
        const { user } = getUser()
        const { addDoc, error } = useCollection('messages')
        const { url, filePath, uploadImage } = useStorage()

        const file = ref(null)
        const fileError = ref(null)

        const message = ref('')


        // Allowed file types
        const types = ['image/png', 'image/jpeg']

        const handleSubmit = async () => {
            if (file.value) {
                await uploadImage(file.value)
                await addDoc({
                    name: user.value.displayName,
                    message: message.value,
                    createdAt: timestamp(),
                    imageUrl: url.value,
                    filePath: filePath.value //in case of delete img
                })
            } else {
                await addDoc({
                    name: user.value.displayName,
                    message: message.value,
                    createdAt: timestamp(),
                })
            }

            if (!error.value) {
                message.value = ''
            }
        }

        const handleChange = (e) => {
            const selected = e.target.files[0]
            console.log(selected)
            // Tracking if file was selected
            if (selected && types.includes(selected.type)) {
                file.value = selected
                fileError.value = null
            } else {
                file.value = null
                fileError.value = 'Please select an image file (png or jpg)'
            }
        }

        return { message, handleSubmit, error, handleChange, fileError }
    }
}
</script>

<style scoped>
    form {
        margin: 10px;
    }
    textarea {
        width: 100%;
        max-width: 100%;
        margin-bottom: 6px;
        padding: 10px;
        box-sizing: border-box;
        border: 0;
        border-radius: 20px;
        font-family: inherit;
        outline: none;
    }
    /* .sendText {
        margin-bottom: 20px;
    } */
    input[type="file"] {
    border: 0;
    margin-bottom: 20px;
    padding: 10px;
    }
    label {
        display: block;
        margin-top: 30px;
        padding-left: 10px;
    }
</style>