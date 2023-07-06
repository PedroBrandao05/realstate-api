export interface IUserService {
    signup (input: UserServiceDTO.signupInput): Promise<void>
    signin (input: UserServiceDTO.signinInput): Promise<UserServiceDTO.signinOutput>
}

export namespace UserServiceDTO {
    export type signupInput = {
        name: string,
        email: string,
        password: string,
        phone: number
    }
    export type signinInput = {
        email: string,
        password: string
    }
    export type signinOutput = {
        name: string,
        email: string,
        phone: number
    }
}