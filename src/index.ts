import { Application } from './Application';
import { ConnectDatabase } from './infrastructure/mongoose';


async function startServer(): Promise<void> { 

	await ConnectDatabase();
	const app = new Application()
	await app.start()
}

startServer();