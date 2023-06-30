import { injectable, inject } from "inversify";
import 'reflect-metadata'
import IUuidGenerator from "../contracts/uuidGenerator";
import { IOwnerService, OwnerServiceDTO } from "../../domain/services/owner";
import IOwnerRepository from "../../domain/repositories/owner";
import { Owner } from "../../domain/entities/owner";
import { ApplicationError } from "../../domain/error/application";

@injectable()
export default class OwnerService implements IOwnerService{
    constructor (
        @inject('IUuidGenerator') private readonly uuidGenerator: IUuidGenerator,
        @inject('IOwnerRepository') private readonly ownerRepository: IOwnerRepository
    ){}

    async findByEmail(email: string): Promise<Owner> {
        const owner = this.ownerRepository.findByEmail(email)
        return owner
    }

    async createOwner(input: OwnerServiceDTO.createOwnerInput): Promise<void> {
        const exists = await this.findByEmail(input.email)
        if (exists) throw new ApplicationError('This owner was already registered', 403)
        const id = this.uuidGenerator.generate()
        const owner = new Owner()
        owner.id = id
        owner.document = input.document
        owner.email = input.email
        owner.name = input.name
        owner.phone = input.phone
        await this.ownerRepository.create(owner)
    }

    async updateOwner(input: OwnerServiceDTO.updateOwnerInput): Promise<void> {
        const exists = await this.findByEmail(input.email)
        if (!exists) throw new ApplicationError('This owner is not registered', 403)
        const owner = new Owner()
        owner.id = input.id
        owner.document = input.document
        owner.email = input.email
        owner.name = input.name
        owner.phone = input.phone
        await this.ownerRepository.update(owner)
    }

    async deleteOne(email: string): Promise<void> {
        const exists = await this.findByEmail(email)
        if (!exists) throw new ApplicationError('This owner is not registered', 403)
        await this.ownerRepository.delete(exists.id)
    }
}