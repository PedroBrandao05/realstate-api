import { injectable } from "inversify";
import IJwt, { TokenPayload } from "../../application/contracts/jwt";
import { sign, verify } from "jsonwebtoken";
import dotenv from 'dotenv'
import 'reflect-metadata'

dotenv.config()

@injectable()
export default class Jwt implements IJwt {
    private readonly EXPIRES_IN = "1d"
    private key: string

    constructor () {
        this.key = process.env.JWT_SECRET!
    }

    generate(payload: TokenPayload, date: Date = new Date()): string {
        return sign({...payload, iat: date.getTime(), expiresIn: this.EXPIRES_IN}, this.key)
    }

    verify(token: string): TokenPayload {
        return verify(token, this.key) as TokenPayload
    }
}