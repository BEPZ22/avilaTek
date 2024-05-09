export interface listProductsDTO{
    sku?: string;
    name?: string;
    stock?: number;
    active?: boolean;
    currentPage?: number;
    perPage?: number;
}