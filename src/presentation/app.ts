import 'reflect-metadata'
import { iocContainer } from './ioc'
import IHTTPServer from '../application/contracts/httpServer'
import HTTPController from '../infra/http/httpController'
import IDatabaseConnection from '../application/contracts/databaseConnection'
import IMediaHandler from '../application/contracts/mediaHandler'

const init = async () => {
    const httpServer = iocContainer.get<IHTTPServer>('IHTTPServer')
    const mediaHandler = iocContainer.get<IMediaHandler>('IMediaHandler')
    const controller = new HTTPController(httpServer, mediaHandler)
    httpServer.listen(3000, () => {console.log("Server listening at http://localhost:3000")})
}

init()

