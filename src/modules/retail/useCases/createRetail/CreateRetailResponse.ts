export interface createRetailResponse{
    bill: {
        name: string;
        qty: number;
        unitPrice: number;
        totalPrice: number;
    }[];
    total: number;
}