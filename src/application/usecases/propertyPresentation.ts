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
import IPropertyRepository from '../../domain/repositories/property'
import IDetailedPropertyQuery from '../contracts/detailedPropertyQuery'
import IPresentationPropertiesQuery from '../contracts/presentationPropertiesQuery'

@injectable() 
export default class PropertyPresentationUsecase implements IPropertyPresentationUsecase {
    constructor (
        @inject('IDetailedPropertyQuery') private readonly detailedPropertyQuery: IDetailedPropertyQuery,
        @inject('IPresentationPropertiesQuery') private readonly presentationPropertiesQuery: IPresentationPropertiesQuery
    ){}

    async getFilteredPresentationProperties(input: PropertyPresentationUsecaseDTO.GetFilteredPresentationPropertiesInput): Promise<PropertyPresentationUsecaseDTO.GetPresentationPropertiesOutput> {
        const properties = await this.presentationPropertiesQuery.execute()
        const filteredProperties = []
        for (const propertyId of input){
            const filteredProperty = properties.find(property => property.propertyId === propertyId)
            if (!filteredProperty) throw new ApplicationError("Invalid propertyId on filters", 400)
            filteredProperties.push(filteredProperty)
        }
        return filteredProperties
    }

    async getAllPresentationProperties(): Promise<PropertyPresentationUsecaseDTO.GetPresentationPropertiesOutput> {
        const properties = await this.presentationPropertiesQuery.execute()
        return properties
    }

    async getDetailedProperty(input: PropertyPresentationUsecaseDTO.GetDetailedPropertyInput): Promise<PropertyPresentationUsecaseDTO.GetDetailedPropertyOutput> {
        const property = await this.detailedPropertyQuery.execute(input.propertyId)
        if (!property) throw new ApplicationError("This property does not exist", 400)
        return property
    }
}