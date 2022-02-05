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
export interface EditForm extends Item{}

/**
 * memoItems
 */
export interface MemoItem extends Item {}

/**
 * category
 */
export interface Category{
    id: string;
    name: string;
}

/**
 * displayCategory
 */
export interface DisplayCategory extends Category {
    items: Item[];
}