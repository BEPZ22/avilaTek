import { HttpController } from '../../../../core/http/HttpController';
import { LoginUseCase } from './LoginUseCase';
import { loginDTO } from './LoginDTO';
import { loginResponse } from './LoginResponse';

export class LoginController extends HttpController{
    private loginUseCase: LoginUseCase;

    constructor(useCase: LoginUseCase){
        super();
        this.loginUseCase = useCase;
    }

    public async executeImpl():Promise<any>{
                
        const dto = this.req.body as loginDTO;
        
        const result = await this.loginUseCase.execute(dto);

        if (result.isWrong()){
            const error = result.value;
            return this.fail(error.errorValue().message);
        }

        return this.ok(
            this.res,
            result.value.getValue() as loginResponse
        );
    }
}