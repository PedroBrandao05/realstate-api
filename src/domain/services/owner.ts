import { Owner } from "../entities/owner"

export interface IOwnerService {
    findById (id: string): Promise<Owner>
    createOwner (input: OwnerServiceDTO.createOwnerInput): Promise<OwnerServiceDTO.createOwnerOutput>
    updateOwner (input: OwnerServiceDTO.updateOwnerInput): Promise<void>
    deleteOne (id: string): Promise<void>
}

export namespace OwnerServiceDTO {
    export type createOwnerInput = {
        name: string,
        email: string,
        phone: number
    }

    export type createOwnerOutput = {
        ownerId: string
    }

    export type updateOwnerInput = {
        id: string,
        name: string,
        phone: number,
        email: string
    }
}