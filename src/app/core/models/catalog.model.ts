export interface Category {
    id: number;
    name: string;
}
export interface Status {
    id: number;
    name: string;
}
export interface Condition {
    id: number;
    name: string;
}
export interface Product {
    id: number;
    name: string;
    description: string;
    publicationDate: Date;
    latitude: string;
    longitude: string;
    category: Category;
    status: Status;
    condition: Condition
}
