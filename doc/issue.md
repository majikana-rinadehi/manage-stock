### 20220206 15:30~
- //カテゴリの並び順 add_date, upd_date追加 15:30~16:13
    - //追加、更新処理変更
    - //既存データ
    - //並び替えメソッド
- //カテゴリ編集ボタン 16:15~
    - //名前変更
    - //削除
- カテゴリ削除、全削除のときの確認ボタン「ほんとにいいの？？？」
    - カテゴリ複数ある時、カテゴリ削除のポップアップ出たときに二番目のカテゴリボックス？がアクティブになってる
        - aaa, bbb, cccとある時、aaaでカテゴリ削除のポップアップを出すとbbb, cccがアクティブになる

### 20220205-2
node v14.16.1
npm 8.3.0
"eslint": "^8.8.0"
"parser": "@typescript-eslint/parser"

```
npm i eslint@latest
```  

のあとに以下エラー

```
ERROR  Failed to compile with 1 error                                         15:07:31

Syntax Error: TypeError: eslint.CLIEngine is not a constructor
```

[](https://github.com/eslint/eslint/issues/15175)

```
 ERROR  Failed to compile with 1 error                                         15:17:11

Syntax Error: Error: Error while loading rule '@typescript-eslint/no-loss-of-precision': @typescript-eslint/no-loss-of-precision requires at least ESLint v7.1.0
Occurred while linting /Users/nakajimahidenari/Documents/app/manage-stock/src/main.ts
    at Array.forEach (<anonymous>)
```

```
1:8  error  Parsing error: '>' expected
```

```.eslintrc
"parser": "vue-eslint-parser",
    "parserOptions": {
        "parser": "@typescript-eslint/parser"
    },
```

=> 解決

### 20220205
作成日付or更新日付によって並び替える
(YYYYMMDD HH:MM:SS)
- //Item定義変更
- //登録・更新処理変更
- //既存データに追加
- フィルター機能追加
    - view
    - useFilter

### 20220109
アイテム更新モーダルで個数、数量を変更しても即座にfilteredDisplayItemsに反映され
ない(filterボタンを押すと反映される)
<!-- - Item.vueの+ ,- ボタンを押してもItem.vueのitem.valueに反映されない
    - 初期状態では反映される
    - フィルターしたあと、アイテム追加してもfilteredDisplayItemsに反映されない
    - アイテム削除後、filteredItemsが空 => computedItemsが返される
- 他のfilterボタンを押すと反映される
- 更新Modalで残り日数を変更してもItem.vueのitem.periodに反映されない
- 他のfilterボタンを押すと反映される -->  
=> useFilters.tsですごい遠回りな処理してたのでスッキリさせた
(category => computedItems => filteredItems => filteredDisplayItemsから、
category => filteredDisplayItemsへ )  
<!-- - 作成日フィルターを押しても正しく並び替えられない -->

```log
value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.
Arguments: 
[0] _isAMomentObject: true, _isUTC: false, _useUTC: false, _l: undefined, _i: 20220206 12:02:40, _f: undefined, _strict: undefined, _locale: [object Object]
Error
```
2022-02-SuT12:30:01  
=>moment().toISOString()
2022-02-06T03:53:08.174Z