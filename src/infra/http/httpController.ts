import { inject } from "inversify";
import IHTTPServer from "../../application/contracts/httpServer";
import 'reflect-metadata'
import { iocContainer } from "../../presentation/ioc";
import { IAuthService } from "../../domain/services/auth";
import ValidateTicket from "../../application/decorators/validateTicket";

const AuthService = iocContainer.get<IAuthService>('IAuthService')

export default class HTTPController {
    constructor (
        @inject ('IHTTPServer') private readonly httpServer: IHTTPServer
    ){

        httpServer.on("post", "/signup", async (params: any, body: any, headers: any) => {
           const output = AuthService.signup(body)
           return output
        })

        httpServer.on("post", "/signin", async (params: any, body: any, headers: any, query: any) => {
            if (query.hash) {
                const hash = query.hash
                body.hash = hash
            }
            const callback = async (input: any) => { return await AuthService.signin(input) }
            const output = ValidateTicket(body, callback)
            return output
        })
    
    } 
}