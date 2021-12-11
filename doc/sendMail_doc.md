# sendMail

# 概要
買い物メモ => テキスト => メール送信

# データ
## 買い物メモ
MemoItem_2.vue
memoItems_1
=
{
    category_id
    category_name
    id
    name
    period
    unit_name
    value
}

## テキスト
```
買い物ヨロシクゥ！
===

・${name}...${value}${unit_name}
・きゅうり...2本
・卵...2パック

```

## メール送信
from: 'rudyrudy2103@gmail.com',
to: data.to,
subject: data.subject,
text: data.text,