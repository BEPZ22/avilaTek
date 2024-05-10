export interface createRetailDTO{
    userId: string;
    product: {
        productId: string;
        productQty: number;
    }[]
}