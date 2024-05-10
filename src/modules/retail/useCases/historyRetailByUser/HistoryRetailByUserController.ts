import { HttpController } from '../../../../core/http/HttpController';
import { HistoryRetailByUserUseCase } from './HistoryRetailByUserUseCase';
import { historyRetailByUserDTO } from './HistoryRetailByUserDTO';
import { historyRetailByUserResponse } from './HistoryRetailByUserResponse';

export class HistoryRetailByUserController extends HttpController{
    private historyRetailByUserUseCase: HistoryRetailByUserUseCase;

    constructor(useCase: HistoryRetailByUserUseCase){
        super();
        this.historyRetailByUserUseCase = useCase;
    }

    public async executeImpl():Promise<any>{
        
        this.req.body.currentPage = this.req.query.currentPage;
        this.req.body.perPage = this.req.query.perPage;
        
        const dto = this.req.body as historyRetailByUserDTO;
        
        const result = await this.historyRetailByUserUseCase.execute(dto);

        if (result.isWrong()){
            const error = result.value;
            return this.fail(error.errorValue().message);
        }

        return this.ok(
            this.res,
            result.value.getValue() as historyRetailByUserResponse
        );
    }
}