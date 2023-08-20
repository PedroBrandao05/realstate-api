import { Owner } from "../entities/owner"

export interface IOwnerService {
    findById (id: OwnerServiceDTO.findOwnerInput): Promise<Owner>
    createOwner (input: OwnerServiceDTO.createOwnerInput): Promise<OwnerServiceDTO.createOwnerOutput>
    updateOwner (input: OwnerServiceDTO.updateOwnerInput): Promise<void>
    delete (id: OwnerServiceDTO.deleteOwnerInput): Promise<void>
}

export namespace OwnerServiceDTO {
    export type createOwnerInput = {
        name: string,
        email: string,
        phone: string
    }

    export type findOwnerInput = {
        ownerId: string
    }

    export type deleteOwnerInput = {
        ownerId: string
    }

    export type createOwnerOutput = {
        ownerId: string
    }

    export type updateOwnerInput = {
        id: string,
        name: string,
        phone: string,
        email: string
    }
}