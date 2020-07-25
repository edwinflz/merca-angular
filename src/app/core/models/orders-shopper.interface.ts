export interface OrderShopper {
    id: number;
    status: number;
    subcategoria: {
        id: number,
        name: string,
        img: string
    };
}