import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { firebaseApp } from '../settings/firebase.js'
import { ref } from 'vue'

const user = ref(null)
const isAuthenticated = ref(false)

const useAuth = () => {
    const auth = getAuth(firebaseApp)

    const login = async (auth, email, password) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        console.log(userCredential);
        user.value = userCredential.user
        isAuthenticated.value = true
    }

    const logout = async (auth) => {
        await signOut(auth)
        user.value = ""
        isAuthenticated.value = false
    }
    return { login, logout, auth, user, isAuthenticated }
}

export { useAuth }