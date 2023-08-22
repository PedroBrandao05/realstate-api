import { Usecase } from "../../application/contracts/usecase";
import ValidateTicket from "../../application/decorators/validateTicket";
import ValidateToken from "../../application/decorators/validateToken";
import { AuthServiceDTO, IAuthService } from "../../domain/services/auth";
import IInfrastructureDetailsService, { InfrastructureDetailsDTO } from "../../domain/services/infrastructureDetails";
import { IOwnerService, OwnerServiceDTO } from "../../domain/services/owner";
import IPropertyService, { PropertyServiceDTO } from "../../domain/services/property";
import { iocContainer } from "../../presentation/ioc";

const AuthService = iocContainer.get<IAuthService>('IAuthService')
const OwnerService = iocContainer.get<IOwnerService>('IOwnerService')
const PropertyService = iocContainer.get<IPropertyService>('IPropertyService')
const InfrastructureDetailsService = iocContainer.get<IInfrastructureDetailsService>('IInfrastructureDetailsService')

export default class UsecaseFactory {

    createSignUp () {
        const usecase : Usecase = async (input: AuthServiceDTO.signupInput) => await AuthService.signup(input)
        return usecase 
    }

    createSignIn () {
        const usecase = async (input: any) => {return await ValidateTicket(input, async (input: AuthServiceDTO.signinInput) => {return await AuthService.signin(input)})}
        return usecase
    }

    createRefreshToken () {
        const usecase : Usecase = async (input: AuthServiceDTO.refreshTokenInput) => await AuthService.refreshToken(input)
        return usecase
    }

    createSaveOwner () {
        const usecase = async (input: any) => {return await ValidateToken(input, async (input: OwnerServiceDTO.createOwnerInput) => {return await OwnerService.createOwner(input)})}
        return usecase
    }

    createFindOwner () {
        const usecase = async (input: any) => {return await ValidateToken(input, async (input: OwnerServiceDTO.findOwnerInput) => {return await OwnerService.findById(input)})}
        return usecase
    }

    createUpdateOwner () {
        const usecase = async (input: any) => {return await ValidateToken(input, async (input: OwnerServiceDTO.updateOwnerInput) => {return await OwnerService.updateOwner(input)})}
        return usecase
    }

    createDeleteOwner () {
        const usecase = async (input: any) => {return await ValidateToken(input, async (input: OwnerServiceDTO.deleteOwnerInput) => {return await OwnerService.delete(input)})}
        return usecase
    }

    createSaveProperty () {
        const usecase = async (input: any) => {return await ValidateToken(input, async (input: PropertyServiceDTO.CreatePropertyInput) => {return await PropertyService.create(input)})}
        return usecase
    }

    createPopulatePropertyMedia () {
        const usecase = async (input: any) => {return await ValidateToken(input, async (input: PropertyServiceDTO.PopulatePropertyMediaInput) => {return await PropertyService.populateMedia(input)})}
        return usecase
    }

    createRemovePropertyMedia () {
        const usecase = async (input: any) => {return await ValidateToken(input, async (input: PropertyServiceDTO.RemovePropertyMediaInput) => {return await PropertyService.removeMedia(input)})}
        return usecase
    }

    createGetProperty () {
        const usecase = async (input: any) => {return await ValidateToken(input, async (input: PropertyServiceDTO.GetPropertyInput) => {return await PropertyService.get(input)})}
        return usecase
    }

    createUpdateProperty () {
        const usecase = async (input: any) => {return await ValidateToken(input, async (input: PropertyServiceDTO.UpdatePropertyInput) => {return await PropertyService.update(input)})}
        return usecase
    }

    createDeleteProperty () {
        const usecase = async (input: any) => {return await ValidateToken(input, async (input: PropertyServiceDTO.DeletePropertyInput) => {return await PropertyService.delete(input)})}
        return usecase
    }

    createSaveInfrastructureDetails (){
        const usecase = async (input: any) => {return await ValidateToken(input, async (input: InfrastructureDetailsDTO.SaveInfrastructureDetailsInput) => {return await InfrastructureDetailsService.save(input)})}
        return usecase
    }

    createGetInfrastructureDetails (){
        const usecase = async (input: any) => {return await ValidateToken(input, async (input: InfrastructureDetailsDTO.GetInfrastructureDetailsInput) => {return await InfrastructureDetailsService.get(input)})}
        return usecase
    }

    createUpdateInfrastructureDetails (){
        const usecase = async (input: any) => {return await ValidateToken(input, async (input: InfrastructureDetailsDTO.UpdateInfrastructureDetailsInput) => {return await InfrastructureDetailsService.update(input)})}
        return usecase
    }

    createDeleteInfrastructureDetails (){
        const usecase = async (input: any) => {return await ValidateToken(input, async (input: InfrastructureDetailsDTO.DeleteInfrastructureDetailsInput) => {return await InfrastructureDetailsService.delete(input)})}
        return usecase
    }
}