import { Address } from "../entities/address"
import { FinancialDetails } from "../entities/financialDetails"
import { InfrastructureDetails } from "../entities/infrastructureDetails"
import { Media, Property } from "../entities/property"
import { PropertyFeatures } from "../entities/propertyFeatures"
import { User } from "../entities/user"

export enum FilterOptions {
    SALE = 'sale',
    RENT = 'rent', 
    SALE_COST = 'saleCost',
    RENT_COST = 'rentCost',
    ACCEPTS_EXCHANGE = 'acceptsExchange',
    PURCHASE_METHOD = 'purchaseMethods',
    BATHROOMS = 'bathrooms',
    SLEEPING_ROOMS = 'sleepingRooms',
    GARAGE_SPOTS = 'garageSpots',
    AREA = 'area',
    DISTRICT = 'district',
    PROPERTY_TYPE = 'propertyType'
}

export type Filter = {option: FilterOptions, value: {max: number, min: number} | boolean}

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
        features: PropertyFeatures
    }
}