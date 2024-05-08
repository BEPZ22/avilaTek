import { HttpController } from '../../../../core/http/HttpController';
import { RegisterUseCase } from './RegisterUseCase';
import { registerDTO } from './RegisterDTO';
import { registerResponse } from './RegisterResponse';

export class RegisterController extends HttpController{
    private registerUseCase: RegisterUseCase;

    constructor(useCase: RegisterUseCase){
        super();
        this.registerUseCase = useCase;
    }

    public async executeImpl():Promise<any>{
                
        const dto = this.req.body as registerDTO;
        
        const result = await this.registerUseCase.execute(dto);

        if (result.isWrong()){
            const error = result.value;
            return this.fail(error.errorValue().message);
        }

        return this.ok(
            this.res,
            result.value.getValue() as registerResponse
        );
    }
}