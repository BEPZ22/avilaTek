import { Request } from './Request';
import { Response } from './Response';

export abstract class HttpController {
  protected req!: Request;

  protected res!: Response;

  protected abstract executeImpl(): Promise<void | any>;

  public execute(req: Request, res: Response): void {
    this.req = req;
    this.res = res;

    this.executeImpl();
  }

  public queryParamToBoolean(param: any): boolean | undefined {
    if (param === 'true') {
      return true;
    }
    if (param === 'false') {
      return false;
    }
    return undefined;
  }

  public queryParamToNumber(param: any): number | undefined {
    const number = Number(param);
    return isNaN(number) ? undefined : number;
  }

  public jsonErrorResponse<T>(res: Response, code: number, error: T) {
    const responseBody = {
      timestamp: new Date().getTime(),
      error
    };
    res.status(code).json(responseBody);
    // HttpLogger.log(this.req, res, responseBody);
    return res;
  }

  public ok<T>(
    res: Response,
    dto?: T,
    attachment?: { filename: string; content: string | Buffer }
  ) {
    if (dto) {
      res.status(200).json({ timestamp: new Date().getTime(), data: dto });
    } else if (attachment) {
      res
        .status(200)
        .attachment(attachment.filename)
        .send(attachment.content);
    } else {
      res.sendStatus(200);
    }
    // HttpLogger.log(this.req, res, dto || {});
    return res;
  }

  public created(res: Response) {
    return res.sendStatus(201);
  }

  public unprocessableEntity(message?: string) {
    return this.jsonErrorResponse(
      this.res,
      422,
      message || 'Unprocessable entity'
    );
  }

  public clientError(message?: string) {
    return this.jsonErrorResponse(this.res, 400, message || 'Unauthorized');
  }

  public unauthorized(message?: string) {
    return this.jsonErrorResponse(this.res, 401, message || 'Unauthorized');
  }

  public paymentRequired(message?: string) {
    return this.jsonErrorResponse(this.res, 402, message || 'Payment required');
  }

  public forbidden(message?: string) {
    return this.jsonErrorResponse(this.res, 403, message || 'Forbidden');
  }

  public notFound(message?: string) {
    return this.jsonErrorResponse(this.res, 404, message || 'Not found');
  }

  public conflict(message?: string) {
    return this.jsonErrorResponse(this.res, 409, message || 'Conflict');
  }

  public tooMany(message?: string) {
    return this.jsonErrorResponse(
      this.res,
      429,
      message || 'Too many requests'
    );
  }

  public todo() {
    return this.jsonErrorResponse(this.res, 400, 'TODO');
  }

  public fail<T>(error: T) {
    return this.jsonErrorResponse(this.res, 500, error);
  }

  public error(code: number, errorMessage: string, data:{[key:string]:string} = {}) {
    return this.res
      .status(code)
      .json({ timestamp: new Date().getTime(), error: errorMessage, data: data });
  }
}
