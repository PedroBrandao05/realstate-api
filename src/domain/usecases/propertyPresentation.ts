import { Address } from "../entities/address"
import { Feature } from "../entities/features"
import { FinancialDetails } from "../entities/financialDetails"
import { InfrastructureDetails } from "../entities/infrastructureDetails"
import { Property } from "../entities/property"
import { User } from "../entities/user"

export default interface IPropertyPresentationUsecase {
    getAllPresentationProperties (): Promise<PropertyPresentationUsecaseDTO.GetPresentationPropertiesOutput>
    getFilteredPresentationProperties (input: PropertyPresentationUsecaseDTO.GetFilteredPresentationPropertiesInput): Promise<PropertyPresentationUsecaseDTO.GetPresentationPropertiesOutput>
    getDetailedProperty (input: PropertyPresentationUsecaseDTO.GetDetailedPropertyInput): Promise<PropertyPresentationUsecaseDTO.GetDetailedPropertyOutput>
}

export enum FilterOptions {
    SALE = 'sale',
    RENT = 'rent', 
    SALE_COST = 'saleCost',
    RENT_COST = 'rentCost',
    ACCEPTS_EXCHANGE = 'acceptsExchange',
    ACCEPTS_FINANCING = 'acceptsFinancing',
    BATHROOMS = 'bathrooms',
    SLEEPING_ROOMS = 'sleepingRooms',
    GARAGE_SPOTS = 'garageSpots',
    AREA = 'area',
    DISTRICT = 'district',
    PROPERTY_TYPE = 'propertyType'
}

export type Filter = {option: FilterOptions, value?: any}

export namespace PropertyPresentationUsecaseDTO {
    export type GetFilteredPresentationPropertiesInput = string[]

    export type GetPresentationPropertiesOutput = {
        propertyId: string
        thumb: string,
        district: string,
        rentCost: number,
        saleCost: number
    }[]

    export type GetDetailedPropertyInput = {
        propertyId: string
    }

    export type GetDetailedPropertyOutput = {
        property: Property,
        infrastructureDetails: Omit<InfrastructureDetails, 'id'>,
        financialDetails: Omit<FinancialDetails, 'id'>,
        address: Omit<Address, 'id'>,
        realtor: Omit<User, 'id' | 'email' | 'password'>,
        features: Omit<Feature, 'id'>[]
    }
}
