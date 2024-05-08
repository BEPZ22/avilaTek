import { HttpController } from '../../../../core/http/HttpController';
import { RefreshTokenUseCase } from './RefreshTokenUseCase';
import { refreshTokenDTO } from './RefreshTokenDTO';
import { refreshTokenResponse } from './RefreshTokenResponse';

export class RefreshTokenController extends HttpController{
    private refreshTokenUseCase: RefreshTokenUseCase;

    constructor(useCase: RefreshTokenUseCase){
        super();
        this.refreshTokenUseCase = useCase;
    }

    public async executeImpl():Promise<any>{
                
        const dto = this.req.body as refreshTokenDTO;
        
        const result = await this.refreshTokenUseCase.execute(dto);

        if (result.isWrong()){
            const error = result.value;
            return this.fail(error.errorValue().message);
        }

        return this.ok(
            this.res,
            result.value.getValue() as refreshTokenResponse
        );
    }
}