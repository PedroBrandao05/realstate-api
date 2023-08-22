import { inject } from "inversify";
import IHTTPServer from "../../application/contracts/httpServer";
import 'reflect-metadata'
import UsecaseFactory from "../factory/usecaseFactory";
import IMediaHandler from "../../application/contracts/mediaHandler";
import findFilesInDirectory from "../../application/utils/findFilesInDirectory";

const usecaseFactory = new UsecaseFactory()

export default class HTTPController {
    constructor (
        @inject ('IHTTPServer') private readonly httpServer: IHTTPServer,
        @inject ('IMediaHandler') private readonly mediaHandler: IMediaHandler
    ){

        httpServer.on("post", "/signup", async (params: any, body: any, headers: any) => {
           const Signup = usecaseFactory.createSignUp()
           const output = await Signup(body)
           return {code: 201, response: output}
        })

        httpServer.on("post", "/signin", async (params: any, body: any, headers: any, query: any) => {
            const hash = query.hash
            body.hash = hash
            const Signin = usecaseFactory.createSignIn()
            const output = await Signin(body)
            return {code: 200, response: output}
        })
    
        httpServer.on("post", "/refresh-token", async (params: any, body: any, headers: any) => {
            const RefreshToken = usecaseFactory.createRefreshToken()
            const output = await RefreshToken(body)
            return {code: 200, response: output}
        })

        httpServer.on("post", "/save-owner", async (params: any, body: any, headers: any) => {
            const token = headers.authorization
            body.token = token
            const SaveOwner = usecaseFactory.createSaveOwner()
            const output = await SaveOwner(body)
            return {code: 201, response: output}
        })

        httpServer.on("get", "/get-owner/:id", async (params: any, body: any, headers: any) => {
            const token = headers.authorization
            const FindOwner = usecaseFactory.createFindOwner()
            const output = await FindOwner({ownerId: params.id, token: token})
            return {code: 200, response: output}
        })

        httpServer.on("patch", "/update-owner", async (params: any, body: any, headers: any) => {
            const token = headers.authorization
            body.token = token
            const UpdateOwner = usecaseFactory.createUpdateOwner()
            const output = await UpdateOwner(body)
            return {code: 204, response: output}
        })

        httpServer.on("delete", "/delete-owner/:id", async (params: any, body: any, headers: any) => {
            const token = headers.authorization
            const DeleteOwner = usecaseFactory.createDeleteOwner()
            const output = await DeleteOwner({ownerId: params.id, token: token})
            return {code: 200, response: output}
        })

        httpServer.on("post", "/save-property", async (params: any, body: any, headers: any) => {
            const token = headers.authorization
            body.token = token
            const SaveProperty = usecaseFactory.createSaveProperty()
            const output = await SaveProperty(body)
            return {code: 201, response: output}
        })

        httpServer.on("get", "/get-property", async (params: any, body: any, headers: any) => {
            const token = headers.authorization
            body.token = token
            const GetProperty = usecaseFactory.createGetProperty()
            const output = await GetProperty(body)
            return {code: 200, response: output}
        })

        httpServer.on("patch", "/update-property", async (params: any, body: any, headers: any) => {
            const token = headers.authorization
            body.token = token
            const UpdateProperty = usecaseFactory.createUpdateProperty()
            const output = await UpdateProperty(body)
            return {code: 204, response: output}
        })

        httpServer.on("delete", "/delete-property", async (params: any, body: any, headers: any) => {
            const token = headers.authorization
            body.token = token
            const DeleteProperty = usecaseFactory.createDeleteProperty()
            const output = await DeleteProperty(body)
            return {code: 200, response: output}
        })

        httpServer.middleware("patch", "/upload-property-media/:id", this.mediaHandler.save('array', 'images'), async (params: any, body: any, headers: any) => {
            const token = headers.authorization
            const files = await findFilesInDirectory('temp')
            const media = files.map((file) => {return {url: file}})
            const input = {token, id: params.id, media}
            const PopulatePropertyMedia = usecaseFactory.createPopulatePropertyMedia()
            const output = await PopulatePropertyMedia(input)
            return {code: 204, response: output}
        })

        httpServer.on("patch", "/remove-property-media",  async (params: any, body: any, headers: any) => {
            const token = headers.authorization
            body.token = token
            const RemovePropertyMedia = usecaseFactory.createRemovePropertyMedia()
            const output = await RemovePropertyMedia(body)
            return {code: 200, response: output}
        })
    } 
}