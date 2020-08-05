export interface OrderDetailShopper {
    id: number;
    commentary: string;
    date: Date;
    paymentEfective: number;
    paymentTarjeta: number;
    details: [{
        id: number;
        product: string;
        brand: string;
        amount: number;
        measure: string;
    }];
}