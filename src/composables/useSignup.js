import { ref } from 'vue';
import { projectAuth } from '../firebase/config';

// refs & signup outside of exported function
// they don't need to be re-created every time we invoke useSignup
const error = ref(null);

// This is the function that i'm going to use to sign people up and it doesn't need to be declared 
//inside useSignup function
                    // when i call this function, i pass each of these values i declared in SignupForm
const signup = async (email, password, displayName) => {
  error.value = null

  try {
    const res = await projectAuth.createUserWithEmailAndPassword(email, password)
    if (!res) {
      throw new Error('Could not complete signup')
    }
    await res.user.updateProfile({ displayName, photoURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/150px-Placeholder_no_text.svg.png' })
    error.value = null;
    
    return res
  }
  catch(err) {
    console.log(err.message)
    error.value = err.message;
  }
}

// The only job of this function is to return the values. The reason for that is there's no need to
//create a new instance of the function above every time I use this composable.
const useSignup = () => {
  return { error, signup }
}

export default useSignup