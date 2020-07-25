import { SubCategory } from './subcategories.interface';

export interface Category {
    id: number;
    nombre_categoria: string;
    subcategorias: SubCategory[];
}