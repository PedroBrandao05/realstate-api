import { FeatureType } from "../entities/features"

export default interface IFeaturesService {
    save (input: FeaturesServiceDTO.SaveFeatureInput): Promise<void>
    getAll (): Promise<FeaturesServiceDTO.GetFeatureOutput[]>
    getById (input: FeaturesServiceDTO.GetFeatureInput): Promise<FeaturesServiceDTO.GetFeatureOutput> 
    update (input: FeaturesServiceDTO.UpdateFeatureInput): Promise<void>
    delete (input: FeaturesServiceDTO.DeleteFeatureInput): Promise<void>
}

export namespace FeaturesServiceDTO {
    export type SaveFeatureInput = {
        type: FeatureType
        description: string 
    }

    export type GetFeatureInput = {
        featureId: string
    }

    export type GetFeatureOutput = {
        id: string,
        type: FeatureType,
        description: string
    }

    export type UpdateFeatureInput = {
        id: string
        type: FeatureType
        description: string
    }

    export type DeleteFeatureInput = {
        id: string
    }
}