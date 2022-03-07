import { ref } from 'vue'
import { FIREBASE_ERROR_MAP } from './constants'
import { MessageType } from './types'

const messageRef = ref<{ message: string, kind: MessageType }>({ message: "", kind: "" })
const timeoutId = ref()
// ↑これをuseMessageスコープの中に入れると
// messageRef.value = message が反映されない

export default function useMessage() {
    
    /**
     * エラーメッセージ( `message` )を `displaySec` ミリ秒表示
     * @param message 
     * @param kind
     * @param displaySec 
     */
    const setMessage = (message: string, kind: MessageType, displaySec?: number) => {
        const newMessage = {
            message,
            kind
        }
        messageRef.value = newMessage

        // displaySecミリ秒後にメッセージを空にする
        if (displaySec) {
            clearTimeout(timeoutId.value)
            console.log("wait");
            timeoutId.value = setTimeout(() => {
                messageRef.value = { message: "", kind: "" }
            }, displaySec)
        }
    }

    /**
     * firebaseエラーに対応するエラーメッセージ、またはキャッチされなかったエラーメッセージをセット
     * @param err 
     */
    const errorHandler = (err: any) => {
        const errorCode = err.code;

        const errorMessage: string = FIREBASE_ERROR_MAP[errorCode] 
                            ? FIREBASE_ERROR_MAP[errorCode] 
                            : "エラーが発生しました"
        setMessage(errorMessage, "error")
        console.log(err);
    }
    
    return { messageRef, setMessage, errorHandler }
}