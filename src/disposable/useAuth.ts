import { getAuth, signInWithEmailAndPassword, signOut, User, createUserWithEmailAndPassword  } from 'firebase/auth'
import { firebaseApp } from '../settings/firebase.js'
import { ref } from 'vue'
import useMessage from './useMessage'

const { setMessage } = useMessage()
const user = ref<User | null>()
const isAuthenticated = ref(false)

const useAuth = () => {
    const auth = getAuth(firebaseApp)

    const login = async (auth: any, email: string, password: string) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        console.log(userCredential);
        user.value = userCredential.user
        isAuthenticated.value = true
        setMessage("ログインしました","info",3000)
    }

    const logout = async (auth: any) => {
        await signOut(auth)
        user.value = null
        isAuthenticated.value = false
        setMessage("ログアウトしました","info",3000)
    }

    const addUser = async(email: string, password: string) => {
        await createUserWithEmailAndPassword(auth, email, password)
        setMessage("ユーザーを作成しました","info",3000)
    }
    return { login, logout, auth, user, isAuthenticated, addUser }
}

export { useAuth }