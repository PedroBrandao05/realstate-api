import { inject, injectable } from 'inversify'
import 'reflect-metadata'
import IFeaturesService, { FeaturesServiceDTO } from '../../domain/services/features'
import IUuidGenerator from '../contracts/uuidGenerator'
import IFeaturesRepository from '../../domain/repositories/features'
import { Feature } from '../../domain/entities/features'
import { ApplicationError } from '../../domain/error/application'

@injectable()
export default class FeaturesService implements IFeaturesService {
    constructor (
        @inject('IUuidGenerator') private readonly uuidGenerator: IUuidGenerator,
        @inject('IFeaturesRepository') private readonly featuresRepository: IFeaturesRepository
    ){}

    async save(input: FeaturesServiceDTO.SaveFeatureInput): Promise<void> {
        const feature = new Feature()
        feature.id = this.uuidGenerator.generate()
        feature.type = input.type
        feature.description = input.description

        await this.featuresRepository.create(feature)
    }

    async update(input: FeaturesServiceDTO.UpdateFeatureInput): Promise<void> {
        const feature = await this.featuresRepository.findById(input.id)
        if (!feature) throw new ApplicationError("This feature doesn't exist", 400)
        feature.type = input.type
        feature.description = input.description
        await this.featuresRepository.update(feature)
    }

    async getById(input: FeaturesServiceDTO.GetFeatureInput): Promise<FeaturesServiceDTO.GetFeatureOutput> {
        const feature = await this.featuresRepository.findById(input.featureId)
        if (!feature) throw new ApplicationError("This feature doesn't exist", 400)
        return {...feature}
    }

    async getAll(): Promise<FeaturesServiceDTO.GetFeatureOutput[]> {
        const features = await this.featuresRepository.findAllFeatures()
        return features
    }

    async delete(input: FeaturesServiceDTO.DeleteFeatureInput): Promise<void> {
        const feature = await this.featuresRepository.findById(input.id)
        if (!feature) throw new ApplicationError("This feature doesn't exist", 400)
        await this.featuresRepository.delete(feature.id)
    }
}