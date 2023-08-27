export default interface IPropertyFeaturesService {
    save (input: PropertyFeaturesServiceDTO.SavePropertyFeatureInput): Promise<void>
    getAll (input: PropertyFeaturesServiceDTO.GetAllPropertyFeaturesInput): Promise<PropertyFeaturesServiceDTO.GetAllPropertyFeaturesOutput>
    remove (input: PropertyFeaturesServiceDTO.RemovePropertyFeatureInput): Promise<void>
}

export namespace PropertyFeaturesServiceDTO {
    export type SavePropertyFeatureInput = {
        featureId: string,
        propertyId: string
    }

    export type GetAllPropertyFeaturesInput = {
        propertyId: string
    }

    export type GetAllPropertyFeaturesOutput = {
        propertyFeatureId: string,
        type: string,
        description: string
    }[]

    export type RemovePropertyFeatureInput = {
        propertyFeatureId: string,
    }
}