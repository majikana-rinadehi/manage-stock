import { ref } from 'vue'

const messageRef = ref("")
const timeoutId = ref(null)
// ↑これをuseMessageスコープの中に入れると
// messageRef.value = message が反映されない

// firebase認証エラーコードに対応するエラーメッセージ
const firebaseErrorMap = {
    "auth/invalid-email": "メールアドレスの形式が不正です",
    "auth/user-disabled": "無効なユーザーです",
    "auth/user-not-found": "ユーザーが見つかりません",
    "auth/wrong-password": "パスワードが間違っています"
}

export default function useMessage() {
    
    const setMessage = (message, kind, displaySec) => {
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
                messageRef.value = ""
            }, displaySec)
        }
    }

    // firebaseの認証エラーコード、またはその他キャッチされなかった
    // エラーに対応するエラーメッセージをセット
    function errorHandler (err){
        const errorCode = err.code;

        const errorMessage = firebaseErrorMap[errorCode] 
                            ? firebaseErrorMap[errorCode] 
                            : "エラーが発生しました"
        setMessage(errorMessage, "error")
        console.log(err);
    }
    
    return { messageRef, setMessage, errorHandler }
}