export interface IAuthService {
    signup (input: AuthServiceDTO.signupInput): Promise<void>
    signin (input: AuthServiceDTO.signinInput): Promise<AuthServiceDTO.signinOutput>
    refreshToken (input: AuthServiceDTO.refreshTokenInput): Promise<AuthServiceDTO.refreshTokenOutput>
}

export namespace AuthServiceDTO {
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
        token: string,
        email: string,
        name: string,
        phone: number
    }

    export type refreshTokenInput = {
        token: string
    }

    export type refreshTokenOutput = {
        token: string,
        email: string,
        name: string,
        phone: number
    }
}