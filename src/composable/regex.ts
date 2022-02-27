/** メールアドレス 
 * OK:mail@example.com
 * NG:.a@example.com
*/
export const REGEXP_MAIL = /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9]+[a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/

/** 半角英数記号(スペースなし) 
 * OK:azAZ09!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]
*/
export const REGEXP_PASSWORD = /^[a-zA-Z0-9!-/:-@¥[-`{-~]+$/