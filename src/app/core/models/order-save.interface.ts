import { DetailOrder } from './details.interface';

export interface SaveOrder {
    subcategoryId: number;
    commentary: string;
    payment: string;
    details: DetailOrder[];
}