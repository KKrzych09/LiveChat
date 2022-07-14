import { projectStorage } from "@/firebase/config";
import { ref } from "vue";
import getUser from "./getUser";

const { user } = getUser()

const useStorage = () => {
    const error = ref(null)
    const url = ref(null) // to access the image from the frontend and download it from firebase storage
    const filePath = ref(null)
    const cleanUrl = null

    // Uploading an image // i need to pass file later on from component i'll be using it
    const uploadImage = async (file) => {
        // Choosing a file path in storage
        filePath.value = `profile-pic/${user.value.uid}/${file.name}`
        const storageRef = projectStorage.ref(filePath.value)

        // trying to upload the file
        try {
            const res = await storageRef.put(file)
            url.value = await res.ref.getDownloadURL() // it gets me public URL for the file i just uploaded
        } catch (err) {
            console.log(err.message)
            error.value = err.message
        }
    }

    return { error, url, filePath, uploadImage }
}

export default useStorage;