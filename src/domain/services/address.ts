export default interface IAddressService {
    save (input: AddressServiceDTO.SaveAddressInput): Promise<void>
    get (input: AddressServiceDTO.GetAddressInput): Promise<AddressServiceDTO.GetAddressOutput>
    update (input: AddressServiceDTO.UpdateAddressInput): Promise<void>
    delete (input: AddressServiceDTO.DeleteAddressInput): Promise<void>
}

export namespace AddressServiceDTO {
    export type SaveAddressInput = {
        propertyId: string
        cep: string
        state: string
        city: string
        district: string
        street: string
        number: string
        complement: string
    }

    export type GetAddressInput = {
        propertyId: string
    }

    export type GetAddressOutput = {
        id: string
        propertyId: string
        cep: string
        state: string
        city: string
        district: string
        street: string
        number: string
        complement: string
    }

    export type UpdateAddressInput = {
        propertyId: string
        cep: string
        state: string
        city: string
        district: string
        street: string
        number: string
        complement: string
    }

    export type DeleteAddressInput = {
        propertyId: string
    }
}