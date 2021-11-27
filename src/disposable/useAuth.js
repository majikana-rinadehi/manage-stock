import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { firebaseApp } from '../settings/firebase.js'
import { ref } from 'vue'
import useMessage from './useMessage.js'

const { setMessage } = useMessage()
const user = ref(null)
const isAuthenticated = ref(false)

const useAuth = () => {
    const auth = getAuth(firebaseApp)

    const login = async (auth, email, password) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        console.log(userCredential);
        user.value = userCredential.user
        isAuthenticated.value = true
        setMessage("ログインしました","info",3000)
    }

    const logout = async (auth) => {
        await signOut(auth)
        user.value = ""
        isAuthenticated.value = false
        setMessage("ログアウトしました","info",3000)
    }
    return { login, logout, auth, user, isAuthenticated }
}

export { useAuth }