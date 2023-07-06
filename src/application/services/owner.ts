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

    async findById(id: string): Promise<Owner> {
        const owner = this.ownerRepository.findById(id)
        return owner 
    }

    async createOwner(input: OwnerServiceDTO.createOwnerInput): Promise<void> {
        const id = this.uuidGenerator.generate()
        const owner = new Owner()
        owner.id = id
        owner.email = input.email
        owner.name = input.name
        owner.phone = input.phone
        await this.ownerRepository.create(owner)
    }

    async updateOwner(input: OwnerServiceDTO.updateOwnerInput): Promise<void> {
        const owner = new Owner()
        owner.id = input.id
        owner.email = input.email
        owner.name = input.name
        owner.phone = input.phone
        await this.ownerRepository.update(owner)
    }

    async deleteOne(id: string): Promise<void> {
        await this.ownerRepository.delete(id)
    }
}