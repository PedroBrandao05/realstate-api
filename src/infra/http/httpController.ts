import { inject } from "inversify";
import IHTTPServer from "../../application/contracts/httpServer";
import 'reflect-metadata'
import UsecaseFactory from "../factory/usecaseFactory";
import IMediaHandler from "../../application/contracts/mediaHandler";
import DirectoryHandler from "../directory/directoryHandler";

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

        httpServer.on("get", "/get-property/:propertyId", async (params: any, body: any, headers: any) => {
            const token = headers.authorization
            params.token = token
            const GetProperty = usecaseFactory.createGetProperty()
            const output = await GetProperty(params)
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
            const files = await DirectoryHandler.findFiles('temp')
            const media = files.map((file) => {return {url: file}})
            const input = {...params, token, media}
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

        httpServer.on("post", "/save-infrastructure-details", async (params: any, body: any, headers: any) => {
            const token = headers.authorization
            body.token = token
            const SaveInfrastructureDetails = usecaseFactory.createSaveInfrastructureDetails()
            const output = await SaveInfrastructureDetails(body)
            return {code: 201, response: output}
        })

        httpServer.on("get", "/get-infrastructure-details/:propertyId", async (params: any, body: any, headers: any) => {
            const token = headers.authorization
            params.token = token
            const GetInfrastructureDetails = usecaseFactory.createGetInfrastructureDetails()
            const output = await GetInfrastructureDetails(params)
            return {code: 200, response: output}
        })

        httpServer.on("patch", "/update-infrastructure-details", async (params: any, body: any, headers: any) => {
            const token = headers.authorization
            body.token = token
            const UpdateInfrastructureDetails = usecaseFactory.createUpdateInfrastructureDetails()
            const output = await UpdateInfrastructureDetails(body)
            return {code: 204, response: output}
        })

        httpServer.on("delete", "/delete-infrastructure-details", async (params: any, body: any, headers: any) => {
            const token = headers.authorization
            body.token = token
            const DeleteInfrastructureDetails = usecaseFactory.createDeleteInfrastructureDetails()
            const output = await DeleteInfrastructureDetails(body)
            return {code: 201, response: output}
        })

        httpServer.on("post", "/save-financial-details", async (params: any, body: any, headers: any) => {
            const token = headers.authorization
            body.token = token
            const SaveFinancialDetails = usecaseFactory.createSaveFinancialDetails()
            const output = await SaveFinancialDetails(body)
            return {code: 201, response: output}
        })

        httpServer.on("get", "/get-financial-details/:propertyId", async (params: any, body: any, headers: any) => {
            const token = headers.authorization
            params.token = token
            const GetFinancialDetails = usecaseFactory.createGetFinancialDetails()
            const output = await GetFinancialDetails(params)
            return {code: 200, response: output}
        })

        httpServer.on("patch", "/update-financial-details", async (params: any, body: any, headers: any) => {
            const token = headers.authorization
            body.token = token
            const UpdateFinancialDetails = usecaseFactory.createUpdateFinancialDetails()
            const output = await UpdateFinancialDetails(body)
            return {code: 204, response: output}
        })

        httpServer.on("delete", "/delete-financial-details", async (params: any, body: any, headers: any) => {
            const token = headers.authorization
            body.token = token
            const DeleteFinancialDetails = usecaseFactory.createDeleteFinancialDetails()
            const output = await DeleteFinancialDetails(body)
            return {code: 201, response: output}
        })

        httpServer.on("post", "/save-address", async (params: any, body: any, headers: any) => {
            const token = headers.authorization
            body.token = token
            const SaveAddress = usecaseFactory.createSaveAddress()
            const output = await SaveAddress(body)
            return {code: 201, response: output}
        })

        httpServer.on("get", "/get-address/:propertyId", async (params: any, body: any, headers: any) => {
            const token = headers.authorization
            params.token = token
            const GetAddress = usecaseFactory.createGetAddress()
            const output = await GetAddress(params)
            return {code: 200, response: output}
        })

        httpServer.on("patch", "/update-address", async (params: any, body: any, headers: any) => {
            const token = headers.authorization
            body.token = token
            const UpdateAddress = usecaseFactory.createUpdateAddress()
            const output = await UpdateAddress(body)
            return {code: 204, response: output}
        })

        httpServer.on("delete", "/delete-address", async (params: any, body: any, headers: any) => {
            const token = headers.authorization
            body.token = token
            const DeleteAddress = usecaseFactory.createDeleteAddress()
            const output = await DeleteAddress(body)
            return {code: 201, response: output}
        })

        httpServer.on("post", "/save-feature", async (params: any, body: any, headers: any) => {
            const token = headers.authorization
            body.token = token
            const SaveFeature = usecaseFactory.createSaveFeature()
            const output = await SaveFeature(body)
            return {code: 201, response: output}
        })

        httpServer.on("get", "/get-feature/:featureId", async (params: any, body: any, headers: any) => {
            const token = headers.authorization
            body.token = token
            const GetFeature = usecaseFactory.createGetFeature()
            const output = await GetFeature(body)
            return {code: 200, response: output}
        })

        httpServer.on("get", "/get-features", async (params: any, body: any, headers: any) => {
            const token = headers.authorization
            const GetAllFeatures = usecaseFactory.createGetAllFeatures()
            const output = await GetAllFeatures({token})
            return {code: 200, response: output}
        })

        httpServer.on("patch", "/update-feature", async (params: any, body: any, headers: any) => {
            const token = headers.authorization
            body.token = token
            const UpdateFeature = usecaseFactory.createUpdateFeature()
            const output = await UpdateFeature(body)
            return {code: 204, response: output}
        })

        httpServer.on("delete", "/delete-feature", async (params: any, body: any, headers: any) => {
            const token = headers.authorization
            body.token = token
            const DeleteFeature = usecaseFactory.createDeleteFeature()
            const output = await DeleteFeature(body)
            return {code: 200, response: output}
        })

        httpServer.on("post", "/save-property-feature", async (params: any, body: any, headers: any) => {
            const token = headers.authorization
            body.token = token
            const SavePropertyFeature = usecaseFactory.createSavePropertyFeature()
            const output = await SavePropertyFeature(body)
            return {code: 201, response: output}
        })

        httpServer.on("get", "/get-property-features/:propertyId", async (params: any, body: any, headers: any) => {
            const GetAllPropertyFeatures = usecaseFactory.createGetAllPropertyFeatures()
            const output = await GetAllPropertyFeatures(params)
            return {code: 200, response: output}
        })

        httpServer.on("delete", "/remove-property-feature", async (params: any, body: any, headers: any) => {
            const token = headers.authorization
            body.token = token
            const RemovePropertyFeature = usecaseFactory.createRemovePropertyFeature()
            const output = await RemovePropertyFeature(body)
            return {code: 200, response: output}
        })

        httpServer.on("get", "/detailed-property/:propertyId", async (params: any, body: any, headers: any) => {
            const GetDetailedProperty = usecaseFactory.createGetDetailedProperty()
            const output = await GetDetailedProperty(params)
            return {code: 200, response: output}
        })

        httpServer.on("get", "/presentation-properties", async (params: any, body: any, headers: any) => {
            const GetPresentationProperties = usecaseFactory.createGetPresentationProperties()
            const output = await GetPresentationProperties()
            return {code: 200, response: output}
        })
        
        httpServer.on("post", "/filtered-presentation-properties", async (params: any, body: any, headers: any) => {
            const GetFilteredPresentationProperties = usecaseFactory.createGetFilteredPresentationProperties()
            const output = await GetFilteredPresentationProperties(body.filters)
            return {code: 200, response: output}
        })
    } 
}