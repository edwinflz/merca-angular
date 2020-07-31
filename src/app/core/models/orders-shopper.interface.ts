export interface OrderShopper {
    id: number;
    status: number;
    date: Date;
    subcategory: {
        id: number,
        nameSubcategory: string,
        description: string,
        img: string
    };
}