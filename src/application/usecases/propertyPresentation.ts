import {inject, injectable} from 'inversify'
import 'reflect-metadata'
import IPropertyPresentationUsecase, { PropertyPresentationUsecaseDTO } from '../../domain/usecases/propertyPresentation'
import IPropertyService from '../../domain/services/property'
import IFinancialDetailsService from '../../domain/services/financialDetails'
import IInfrastructureDetailsService from '../../domain/services/infrastructureDetails'
import IAddressService from '../../domain/services/address'
import IPropertyFeaturesService from '../../domain/services/propertyFeatures'
import IUserRepository from '../../domain/repositories/user'
import { ApplicationError } from '../../domain/error/application'

@injectable() 
export default class PropertyPresentationUsecase implements IPropertyPresentationUsecase {
    constructor (
        @inject('IPropertyService') private readonly propertyService: IPropertyService,
        @inject('IFinancialDetailsService') private readonly financialDetailsService: IFinancialDetailsService,
        @inject('IInfrastructureDetailsService') private readonly infrastructureDetailsService : IInfrastructureDetailsService,
        @inject('IAddressService') private readonly addressService : IAddressService,
        @inject('IPropertyFeaturesService') private readonly propertyFeaturesService : IPropertyFeaturesService,
        @inject('IUserRepository') private readonly userRepository: IUserRepository
    ){}

    async getFilteredProperties(input: PropertyPresentationUsecaseDTO.GetFilteredPropertiesInput): Promise<PropertyPresentationUsecaseDTO.GetFilteredPropertiesOutput> {
        const output : PropertyPresentationUsecaseDTO.GetFilteredPropertiesOutput = []
        for (const propertyId of input) {
            const property = await this.propertyService.get({propertyId})
            const propertyAddress = await this.addressService.get({propertyId})
            const propertyFinancialDetails = await this.financialDetailsService.get({propertyId})
            output.push({
                propertyId,
                thumb: property.media[0].url,
                rentCost: propertyFinancialDetails.rentCost,
                saleCost: propertyFinancialDetails.saleCost,
                district: propertyAddress.district
            })
        }
        return output
    }

    async getDetailedProperty(input: PropertyPresentationUsecaseDTO.GetDetailedPropertyInput): Promise<PropertyPresentationUsecaseDTO.GetDetailedPropertyOutput> {
        const property = await this.propertyService.get({...input})
        const infrastructureDetails = await this.infrastructureDetailsService.get({...input})
        const financialDetails = await this.financialDetailsService.get({...input})
        const address = await this.addressService.get({...input})
        const features = await this.propertyFeaturesService.getAll({...input})
        const user = await this.userRepository.findById(property.userId)
        if (!user) throw new ApplicationError("The user in the property doesn't exist", 400)
        return {
            property,
            infrastructureDetails,
            financialDetails,
            address,
            features,
            realtor: user
        }
    }
}