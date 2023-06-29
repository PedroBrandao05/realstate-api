import { injectable } from 'inversify'
import 'reflect-metadata'
import { v4 as uuid } from 'uuid'
import IUuidGenerator from '../../application/contracts/uuidGenerator'

@injectable()
export default class IdGenerator implements IUuidGenerator {
    generate(): string {
        return uuid()
    }
}