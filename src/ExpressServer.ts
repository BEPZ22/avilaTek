import { Server } from 'http';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import { acceptedOrigins } from './env';
import express, {
  Express,
  Router,
} from 'express';

export class ExpressServer{
    private server!: Express;

    public http?: Server;
    
    private router: Router;

    constructor(router: Router){
        this.router = router;
    }

    public build(): void {
        this.server = express();   
        this.setupSecurity();
        this.setupStandards();

        this.server.use(this.router);
    }

    public async start(port: number): Promise<void> {
        return new Promise((resolve, reject) => {
          this.http = this.server?.listen(port, () => {
            console.log(`🚀 App started in port : ${port}`)
            resolve();
          });
        });
    }

    private setupSecurity() {
        this.server.use(
          cors({
            origin: (origin, callback) => {
              if (acceptedOrigins?.includes(origin || '')) { // 👀 CHECK THIS
                return callback(null, true)
              }
          
              if (!origin) {
                return callback(null, true)
              }
              console.log(`NOT ALLOWED BY CORS: ${origin}`)
              return callback(new Error('Not allowed by CORS'))
            }
          })
        );
    }


    private setupStandards() {
        this.server.use(bodyParser.json({ limit: '50mb' }));
        this.server.use(bodyParser.text({ limit: '50mb', type: ['text/plain', 'text/xml'] }));
        this.server.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
        this.server.use(compression());
        // this.server.use(multer().any());
    }
}