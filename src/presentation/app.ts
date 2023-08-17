import 'reflect-metadata'
import { iocContainer } from './ioc'
import IHTTPServer from '../application/contracts/httpServer'
import HTTPController from '../infra/http/httpController'

const httpServer = iocContainer.get<IHTTPServer>('IHTTPServer')
const controller = new HTTPController(httpServer)
httpServer.listen(3000, () => {console.log("Server listening at http://localhost:3000")})