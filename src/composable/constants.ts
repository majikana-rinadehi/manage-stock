/** firebase認証エラーコードに対応するエラーメッセージ */
export const FIREBASE_ERROR_MAP: { [index: string]: string } = {
    "auth/invalid-email": "メールアドレスの形式が不正です",
    "auth/user-disabled": "無効なユーザーです",
    "auth/user-not-found": "ユーザーが見つかりません",
    "auth/wrong-password": "パスワードが間違っています",
    "auth/email-already-in-use": "すでに使われているメールアドレスです"
}