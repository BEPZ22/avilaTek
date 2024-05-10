import { HttpController } from '../../../../core/http/HttpController';
import { ListProductsUseCase } from './ListProductsUseCase';
import { listProductsDTO } from './ListProductsDTO';
import { listProductsResponse } from './ListProductsResponse';

export class ListProductsController extends HttpController{
    private ListProductsUseCase: ListProductsUseCase;

    constructor(useCase: ListProductsUseCase){
        super();
        this.ListProductsUseCase = useCase;
    }

    public async executeImpl():Promise<any>{

        this.req.body.name = this.req.query?.name;
        this.req.body.sku = this.req.query?.sku;
        this.req.body.stock = this.req.query?.stock;
        this.req.body.active = this.req.query?.active;
        this.req.body.currentPage = this.req.query?.currentPage;
        this.req.body.perPage = this.req.query?.perPage;
        
        const dto = this.req.body as listProductsDTO;
        
        const result = await this.ListProductsUseCase.execute(dto);

        if (result.isWrong()){
            const error = result.value;
            return this.fail(error.errorValue().message);
        }

        return this.ok(
            this.res,
            result.value.getValue() as listProductsResponse
        );
    }
}