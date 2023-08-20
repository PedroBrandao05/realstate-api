import { Usecase } from "../../application/contracts/usecase";
import ValidateTicket from "../../application/decorators/validateTicket";
import ValidateToken from "../../application/decorators/validateToken";
import { AuthServiceDTO, IAuthService } from "../../domain/services/auth";
import { IOwnerService, OwnerServiceDTO } from "../../domain/services/owner";
import { iocContainer } from "../../presentation/ioc";

const AuthService = iocContainer.get<IAuthService>('IAuthService')
const OwnerService = iocContainer.get<IOwnerService>('IOwnerService')

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
}