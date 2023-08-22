import { Media } from "../entities/property"

export default interface IPropertyService {
    create (input: PropertyServiceDTO.CreatePropertyInput): Promise<PropertyServiceDTO.CreatePropertyOutput>
    populateMedia (input: PropertyServiceDTO.PopulatePropertyMediaInput): Promise<void>
    removeMedia (input: PropertyServiceDTO.RemovePropertyMediaInput): Promise<void>
    update (input: PropertyServiceDTO.UpdatePropertyInput): Promise<void>
    get (input: PropertyServiceDTO.GetPropertyInput): Promise<PropertyServiceDTO.GetPropertyOutput>
    delete (input: PropertyServiceDTO.DeletePropertyInput): Promise<void>
}

export namespace PropertyServiceDTO {
    export type CreatePropertyInput = {
        title: string,
        privateTitle: string,
        description: string,
        privateDescription: string,
        userId: string,
        ownerId: string
    }

    export type CreatePropertyOutput = {
        propertyId: string
    }

    export type PopulatePropertyMediaInput = {
        id: string
        media: Media[]
    }

    export type RemovePropertyMediaInput = {
        propertyId: string,
        media: Media[]
    }

    export type UpdatePropertyInput = {
        propertyId: string,
        title: string,
        privateTitle: string,
        description: string,
        privateDescription: string,
    }

    export type GetPropertyInput = {
        propertyId: string
    }

    export type GetPropertyOutput = {
        id: string,
        title: string,
        privateTitle: string,
        description: string,
        privateDescription: string,
        media: Media[],
        userId: string,
        ownerId: string,
        publishDate: string
    }

    export type DeletePropertyInput = {
        propertyId: string
    }
}