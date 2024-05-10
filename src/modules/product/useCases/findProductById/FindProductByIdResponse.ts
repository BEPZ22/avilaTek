export interface findProductByIdResponse{
    name: string;
    sku: string;
    stock: number;
    description: string;
    price: number;
    active: boolean;
    createdAt: Date;
}