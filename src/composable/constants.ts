import moment from 'moment'
import { MemoFilterType, MemoItem, CategoryItemsSorterType, Item } from './types'

/** firebase認証エラーコードに対応するエラーメッセージ */
export const FIREBASE_ERROR_MAP: { [index: string]: string } = {
    "auth/invalid-email": "メールアドレスの形式が不正です",
    "auth/user-disabled": "無効なユーザーです",
    "auth/user-not-found": "ユーザーが見つかりません",
    "auth/wrong-password": "パスワードが間違っています",
    "auth/email-already-in-use": "すでに使われているメールアドレスです",
    "auth/network-request-failed": "ネットワークエラーが発生しました"
}

/** `MemoCategories.vue` で使うフィルター一覧*/
export const MEMO_FILTER_MAP: {[index in MemoFilterType]: null | {filterType: MemoFilterType, filter: ((item: MemoItem) => boolean)}} = {
    // 数量残り1
    'value': {filterType: 'value', filter: (item: MemoItem) => item.value === 1},
    // 期限残り1日
    'period':{filterType: 'period', filter: (item: MemoItem) => item.period === 1},
    // フィルターなし
    'all': null
}

/** `CategoryItems.vue` で使うソーター一覧*/
export const CATEGORY_ITEMS_SORTER_MAP: {[index in CategoryItemsSorterType]: null | {sorterType: CategoryItemsSorterType, sorter: ((a: Item, b: Item) => number)}}= {
    /** 残り期限日数の昇順で並び替え */
    'period': {
        sorterType: 'period', 
        sorter: (itemA: Item, itemB: Item) => {
            const periodA = itemA.period
            const periodB = itemB.period
            return periodA - periodB
        },
    },
    /** 残り個数の昇順で並び替え */
    'value':{
        sorterType: 'value', 
        sorter: (itemA: Item, itemB: Item) => {
            const valueA = itemA.value
            const valueB = itemB.value
            return valueA - valueB
          },
    },
    /**  作成日時の昇順で並び替え */
    'addDate':{
        sorterType: 'addDate', 
        sorter: (itemA: Item, itemB: Item) => {
            const valueA = itemA.add_date
            const valueB = itemB.add_date
            return moment(valueA).isAfter(valueB) ? 1 : -1 
          }
    },
    // フィルターなし
    'all': null
}