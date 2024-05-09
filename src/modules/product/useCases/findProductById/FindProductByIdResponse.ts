export interface findProductByIdResponse{
    name: string;
    sku: string;
    stock: number;
    description: string;
    price: string;
    active: boolean;
    createdAt: Date;
}