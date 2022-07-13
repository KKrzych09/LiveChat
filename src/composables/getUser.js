import { ref } from 'vue';
import { projectAuth } from '../firebase/config';

const user = ref(projectAuth.currentUser)

// Listening for authentication changes
projectAuth.onAuthStateChanged(_user => {
    console.log('User state change. Current user is:', _user)
    user.value = _user // _user is a actual state that is changed with every fire of this callback function
}) 

const getUser = () => {
    return { user }
}

export default getUser