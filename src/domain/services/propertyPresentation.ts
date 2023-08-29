import { Address } from "../entities/address"
import { Feature } from "../entities/features"
import { FinancialDetails } from "../entities/financialDetails"
import { InfrastructureDetails } from "../entities/infrastructureDetails"
import { Property } from "../entities/property"
import { User } from "../entities/user"

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

export namespace PropertyPresentationServiceDTO {
    export type GetFilteredPropertiesInput = Filter[]
    export type GetFilteredPropertiesOutput = {
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
        infrastructureDetails: InfrastructureDetails,
        financialDetails: FinancialDetails,
        address: Address,
        realtor: User,
        features: Feature[]
    }
}