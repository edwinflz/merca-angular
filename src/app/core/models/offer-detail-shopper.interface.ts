export interface OfferDetailShopper {
    id: number;
    commentary: string;
    date: Date;
    visibilityPrice: number;
    total: number;
    details: [{
        id: number;
        product: string;
        brand: string;
        amount: number;
        measure: string;
        price: number;
    }];
}