import { SubCategory } from './subcategories.interface';

export interface Category {
    id: number;
    name: string;
    subcategories: SubCategory[];
}