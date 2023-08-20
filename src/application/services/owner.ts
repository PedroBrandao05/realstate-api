import { injectable, inject } from "inversify";
import 'reflect-metadata'
import IUuidGenerator from "../contracts/uuidGenerator";
import { IOwnerService, OwnerServiceDTO } from "../../domain/services/owner";
import IOwnerRepository from "../../domain/repositories/owner";
import { Owner } from "../../domain/entities/owner";

@injectable()
export default class OwnerService implements IOwnerService{
    constructor (
        @inject('IUuidGenerator') private readonly uuidGenerator: IUuidGenerator,
        @inject('IOwnerRepository') private readonly ownerRepository: IOwnerRepository
    ){}

    async findById(input: OwnerServiceDTO.findOwnerInput): Promise<Owner> {
        const owner = this.ownerRepository.findById(input.ownerId)
        return owner 
    }

    async createOwner(input: OwnerServiceDTO.createOwnerInput): Promise<OwnerServiceDTO.createOwnerOutput> {
        const id = this.uuidGenerator.generate()
        const owner = new Owner()
        owner.id = id
        owner.email = input.email
        owner.name = input.name
        owner.phone = input.phone
        await this.ownerRepository.create(owner)
        return {
            ownerId: id
        }
    }

    async updateOwner(input: OwnerServiceDTO.updateOwnerInput): Promise<void> {
        const owner = new Owner()
        owner.id = input.id
        owner.email = input.email
        owner.name = input.name
        owner.phone = input.phone
        await this.ownerRepository.update(owner)
    }

    async delete(input: OwnerServiceDTO.deleteOwnerInput): Promise<void> {
        await this.ownerRepository.delete(input.ownerId)
    }
}