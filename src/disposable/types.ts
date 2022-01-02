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
 * modal form object for editing items
 */
export interface EditForm {
    [key: string] : string | number;
    id: string;
    category_id: string;
    category_name:string;
    name: string;
    value: number;
    period: number;
    unit_name: string;
}