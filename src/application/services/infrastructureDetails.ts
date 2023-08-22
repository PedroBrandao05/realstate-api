import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import IInfrastructureDetailsService, { InfrastructureDetailsDTO } from '../../domain/services/infrastructureDetails'
import IPropertyRepository from '../../domain/repositories/property'
import IInfrastructureDetailsRepository from '../../domain/repositories/infrastructureDetails'
import IUuidGenerator from '../contracts/uuidGenerator'
import { ApplicationError } from '../../domain/error/application'
import { InfrastructureDetails } from '../../domain/entities/infrastructureDetails'

@injectable()
export default class InfrastructureDetailsService implements IInfrastructureDetailsService {
    constructor (
        @inject('IPropertyRepository') private readonly propertyRepository: IPropertyRepository,
        @inject('IInfrastructureDetailsRepository') private readonly infrastructureDetailsRepository: IInfrastructureDetailsRepository,
        @inject('IUuidGenerator') private readonly uuidGenerator: IUuidGenerator
    ){}

    async save(input: InfrastructureDetailsDTO.SaveInfrastructureDetailsInput): Promise<void> {
        const propertyExist = await this.propertyRepository.findById(input.propertyId)
        if (!propertyExist) throw new ApplicationError("This property doesn't exist", 400)
        const infrastructureDetailsAlreadyExist = await this.infrastructureDetailsRepository.findInfrastructureDetails(input.propertyId)
        if (infrastructureDetailsAlreadyExist) throw new ApplicationError("The infrastructure details for this property were already saved", 400)
        const infrastructureDetails = new InfrastructureDetails()
        infrastructureDetails.id = this.uuidGenerator.generate()
        infrastructureDetails.propertyId = input.propertyId
        infrastructureDetails.propertyType = input.propertyType
        infrastructureDetails.propertySubtype = input.propertySubtype
        infrastructureDetails.sleepingRooms = input.sleepingRooms
        infrastructureDetails.garageSpots = input.garageSpots
        infrastructureDetails.bathrooms = input.bathrooms
        infrastructureDetails.area = input.area

        await this.infrastructureDetailsRepository.create(infrastructureDetails)
    }

    async get(input: InfrastructureDetailsDTO.GetInfrastructureDetailsInput): Promise<InfrastructureDetailsDTO.GetInfrastructureDetailsOutput> {
        const propertyExist = await this.propertyRepository.findById(input.propertyId)
        if (!propertyExist) throw new ApplicationError("This property doesn't exist", 400)
        const infrastructureDetails = await this.infrastructureDetailsRepository.findInfrastructureDetails(input.propertyId)
        if (!infrastructureDetails) throw new ApplicationError("The infrastructure details for this property weren't saved", 400)
        return {
            ...infrastructureDetails
        }
    }

    async update(input: InfrastructureDetailsDTO.UpdateInfrastructureDetailsInput): Promise<void> {
        const propertyExist = await this.propertyRepository.findById(input.propertyId)
        if (!propertyExist) throw new ApplicationError("This property doesn't exist", 400)
        const infrastructureDetails = await this.infrastructureDetailsRepository.findInfrastructureDetails(input.propertyId)
        if (!infrastructureDetails) throw new ApplicationError("The infrastructure details for this property weren't saved", 400)
        infrastructureDetails.propertyType = input.propertyType
        infrastructureDetails.propertySubtype = input.propertySubtype
        infrastructureDetails.sleepingRooms = input.sleepingRooms
        infrastructureDetails.garageSpots = input.garageSpots
        infrastructureDetails.bathrooms = input.bathrooms
        infrastructureDetails.area = input.area
        await this.infrastructureDetailsRepository.update(infrastructureDetails)
    }

    async delete(input: InfrastructureDetailsDTO.DeleteInfrastructureDetailsInput): Promise<void> {
        const propertyExist = await this.propertyRepository.findById(input.propertyId)
        if (!propertyExist) throw new ApplicationError("This property doesn't exist", 400)
        const infrastructureDetails = await this.infrastructureDetailsRepository.findInfrastructureDetails(input.propertyId)
        if (!infrastructureDetails) throw new ApplicationError("The infrastructure details for this property weren't saved", 400)
        await this.infrastructureDetailsRepository.delete(input.propertyId)
    }
}