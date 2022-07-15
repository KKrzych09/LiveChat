<template>
  <form>
    <div class="text-area">
        <textarea placeholder="Type a message and click a button to send..." v-model="message"></textarea>
            <div class="send-text">
                <label>
                    <span class="material-icons">photo_camera</span>
                    <span v-if="file !== null" class="material-icons done">done</span>
                    <input hidden type="file" @change="handleChange">
                </label>
                <button @click.prevent="handleSubmit">Send</button>
            </div>
    </div>
    
    <div class="error">{{ fileError }}</div>
    <div class="error" >{{ error }}</div>
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

            navigator.vibrate(200)

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

        return { message, handleSubmit, error, handleChange, fileError, file}
    }
}
</script>

<style scoped>
    .text-area {
        display: flex;
    }
    .send-text {
        display: flex;
        flex-direction: column;
    }
    .send-text button {
        margin-bottom: 10px;
    }
    .send-text label {
        display: flex;
        max-width: 24px;
        margin: 0 0 5px 20px;
        padding: 0;
    }
    .send-text label:hover {
        cursor: pointer;
    }
    .material-icons.done {
        margin-left: 10px;
    }
    form {
        margin: 10px;
    }
    textarea {
        width: 75%;
        max-width: 100%;
        margin-bottom: 6px;
        padding: 10px;
        box-sizing: border-box;
        border: 0;
        border-radius: 20px;
        font-family: inherit;
        outline: none;
    }
    button {
        margin-left: 20px;
    }
    input[type="file"] {
        border: 0;
        padding: 10px;
        margin-left: 10px;
        margin-left: 2;
    }
    label {
        display: block;
        margin-top: 10px;
        padding-left: 10px;
    }
</style>