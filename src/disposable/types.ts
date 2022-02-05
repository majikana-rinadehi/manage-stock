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
 * item 
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