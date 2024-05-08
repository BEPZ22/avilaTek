import { routes } from './routes';
import { ExpressServer } from './ExpressServer';
import { port } from './env';


export class Application{
    private app: ExpressServer;

    constructor(){
        this.app = new ExpressServer(routes);
    }
    public async start(): Promise<void>{
        this.app.build()
        await this.app.start(port);
    }
}
