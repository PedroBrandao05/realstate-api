export interface IUserService {
    signup (input: UserServiceDTO.signupInput): Promise<void>
    signin (input: UserServiceDTO.signinInput): Promise<UserServiceDTO.signinOutput>
    refreshToken (input: UserServiceDTO.refreshTokenInput): Promise<UserServiceDTO.refreshTokenOutput>
}

export namespace UserServiceDTO {
    export type signupInput = {
        name: string,
        email: string,
        password: string,
        phone: number,
        creci: string
    }
    export type signinInput = {
        email: string,
        password: string
    }
    export type signinOutput = {
        token: string
    }

    export type refreshTokenInput = {
        token: string
    }

    export type refreshTokenOutput = {
        token: string
    }
}