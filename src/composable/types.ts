/**
 * line message
 */
export type LineData = {
    text: string
}

/**
 * mail object
 */
export type MailData = {
    from: string;
    to: string;
    subject: string; 
    text: string;
}


/**
 * item for frontend
 */
export interface Item {
    [index: string] : string | number;
    
    id: string;
    category_id: string;
    category_name:string;
    name: string;
    value: number;
    period: number;
    /**単位 */
    unit_name: string;
    /**追加日時・更新日時 */
    add_date: string;
    upd_date: string;
}

/**
 * item for database
 */
 export interface DBItem {
    [index: string] : string | number;
    
    category_id: string;
    category_name:string;
    name: string;
    value: number;
    period: number;
    /**単位 */
    unit_name: string;
    /**追加日時・更新日時 */
    add_date: string;
    upd_date: string;
}

/**
 * modal form object for editing items
 */
export interface EditForm extends Item{} /* eslint-disable-line @typescript-eslint/no-empty-interface */

/**
 * memoItems
 */
export interface MemoItem extends Item {} /* eslint-disable-line @typescript-eslint/no-empty-interface */

/**
 * category
 */
export interface Category{
    id: string;
    name: string;
    add_date: string;
    upd_date: string;
}

/**
 * displayCategory
 */
export interface DisplayCategory extends Category {
    items: Item[];
}

/**
 * type of message to set to `setMessage()`
 */
export type MessageType = "error" | "info" | ""

/**
 * type of filters to use in MemoCategories.vue  
 * `'value'` 数量残り1  
 * `'period'` 期限残り1日  
 * `'all'` フィルターなし  
 */
export type MemoFilterType = 'value' | 'period' | 'all'

/**
 * type of **sorters** to use in CategoryItems.vue  
 * `'value'` 数量  
 * `'period'` 期限    
 * `'all'` フィルターなし  
 * `'addDate'` 作成日  
 */
 export type CategoryItemsSorterType = MemoFilterType | 'addDate'
