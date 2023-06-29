import { injectable } from 'inversify'
import { v4 as uuid } from 'uuid'
import IUuidGenerator from '../../application/contracts/uuidGenerator'
import 'reflect-metadata'

@injectable()
export default class IdGenerator implements IUuidGenerator {
    generate(): string {
        return uuid()
    }
}