import { inject } from "inversify";
import IHTTPServer from "../../application/contracts/httpServer";
import 'reflect-metadata'
import ValidateTicket from "../../application/decorators/validateTicket";
import UsecaseFactory from "../factory/usecaseFactory";

const usecaseFactory = new UsecaseFactory()

export default class HTTPController {
    constructor (
        @inject ('IHTTPServer') private readonly httpServer: IHTTPServer
    ){

        httpServer.on("post", "/signup", async (params: any, body: any, headers: any) => {
           const Signup = usecaseFactory.createSignUp()
           const output = await Signup(body)
           return output
        })

        httpServer.on("post", "/signin", async (params: any, body: any, headers: any, query: any) => {
            const hash = query.hash
            body.hash = hash
            const Signin = usecaseFactory.createSignIn()
            const output = await Signin(body)
            return output
        })
    
        httpServer.on("post", "/refresh-token", async (params: any, body: any, headers: any) => {
            const RefreshToken = usecaseFactory.createRefreshToken()
            const output = await RefreshToken(body)
            return output
        })

        httpServer.on("post", "/save-owner", async (params: any, body: any, headers: any) => {
            const token = headers.authorization
            body.token = token
            const SaveOwner = usecaseFactory.createSaveOwner()
            const output = await SaveOwner(body)
            return output
        })

        httpServer.on("get", "/get-owner/:id", async (params: any, body: any, headers: any) => {
            const token = headers.authorization
            const FindOwner = usecaseFactory.createFindOwner()
            const output = await FindOwner({ownerId: params.id, token: token})
            return output
        })

        httpServer.on("patch", "/update-owner", async (params: any, body: any, headers: any) => {
            const token = headers.authorization
            body.token = token
            const UpdateOwner = usecaseFactory.createUpdateOwner()
            const output = await UpdateOwner(body)
            return output
        })

        httpServer.on("delete", "/delete-owner/:id", async (params: any, body: any, headers: any) => {
            const token = headers.authorization
            const DeleteOwner = usecaseFactory.createDeleteOwner()
            const output = await DeleteOwner({ownerId: params.id, token: token})
            return output
        })
    } 
}