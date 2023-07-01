import { Owner } from "../entities/owner"

export interface IOwnerService {
    findByEmail (email: string): Promise<Owner>
    createOwner (input: OwnerServiceDTO.createOwnerInput): Promise<void>
    updateOwner (input: OwnerServiceDTO.updateOwnerInput): Promise<void>
    deleteOne (email: string): Promise<void>
}

export namespace OwnerServiceDTO {
    export type createOwnerInput = Omit<Owner, 'id'>
    export type updateOwnerInput = {
        id: string,
        name: string,
        phone: number,
        email: string
    }
}