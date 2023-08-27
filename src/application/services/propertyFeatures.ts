import {inject, injectable} from 'inversify'
import 'reflect-metadata'
import IPropertyFeaturesService, { PropertyFeaturesServiceDTO } from '../../domain/services/propertyFeatures'
import IPropertyFeaturesRepository from '../../domain/repositories/propertyFeatures'
import IFeaturesRepository from '../../domain/repositories/features'
import IUuidGenerator from '../contracts/uuidGenerator'
import { ApplicationError } from '../../domain/error/application'
import { PropertyFeatures } from '../../domain/entities/propertyFeatures'

@injectable()
export default class PropertyFeaturesService implements IPropertyFeaturesService {
    constructor (
        @inject('IPropertyFeaturesRepository') private readonly propertyFeaturesRepository: IPropertyFeaturesRepository,
        @inject('IFeaturesRepository') private readonly featuresRepository: IFeaturesRepository,
        @inject('IUuidGenerator') private readonly uuidGenerator: IUuidGenerator
    ){}

    private async toModel(propertyFeature: PropertyFeatures) {
        const feature = await this.featuresRepository.findById(propertyFeature.featureId)
        return {
            propertyFeatureId: propertyFeature.id,
            type: feature.type,
            description: feature.description
        }
    }

    async save(input: PropertyFeaturesServiceDTO.SavePropertyFeatureInput): Promise<void> {
        const feature = await this.featuresRepository.findById(input.featureId)
        if (!feature) throw new ApplicationError("This feature doesn't exist", 400)
        const propertyFeature = new PropertyFeatures()
        propertyFeature.id = this.uuidGenerator.generate()
        propertyFeature.propertyId = input.propertyId
        propertyFeature.featureId = feature.id

        await this.propertyFeaturesRepository.create(propertyFeature)
    }

    async getAll(input: PropertyFeaturesServiceDTO.GetAllPropertyFeaturesInput): Promise<PropertyFeaturesServiceDTO.GetAllPropertyFeaturesOutput> {
        const propertyFeatures = await this.propertyFeaturesRepository.findByProperty(input.propertyId)
        if (!propertyFeatures.length) throw new ApplicationError("This property doesn't have any features", 400)
        const output = []
        for (const propertyFeature of propertyFeatures){
            output.push(await this.toModel(propertyFeature))
        }
        return output
    }

    async remove(input: PropertyFeaturesServiceDTO.RemovePropertyFeatureInput): Promise<void> {
        await this.propertyFeaturesRepository.delete(input.propertyFeatureId)
    }
}