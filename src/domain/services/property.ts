import { Media } from "../entities/property"

export default interface PropertyService {
    create (input: PropertyServiceDTO.CreatePropertyInput): Promise<PropertyServiceDTO.CreatePropertyOutput>
    populateMedia (input: PropertyServiceDTO.PopulatePropertyMediaInput): Promise<void>
    update (input: PropertyServiceDTO.UpdatePropertyInput): Promise<void>
    getProperty (id: string): Promise<PropertyServiceDTO.GetPropertyOutput>
    delete (id: string): Promise<void>
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
        propertyId: string
        media: Media[]
    }

    export type UpdatePropertyInput = {
        title: string,
        privateTitle: string,
        description: string,
        privateDescription: string,
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
}