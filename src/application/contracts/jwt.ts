export type TokenPayload = {
    name: string,
    email: string,
    phone: number
}

export default interface IJwt {
    generate (payload: TokenPayload): string
    verify (token: string): TokenPayload
}