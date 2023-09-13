import { Address } from "../entities/address"
import { Feature } from "../entities/features"
import { FinancialDetails, PurchaseMethods } from "../entities/financialDetails"
import { InfrastructureDetails } from "../entities/infrastructureDetails"
import { Media, Property } from "../entities/property"
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
        propertyId: string, 
        title: string, 
        description: string, 
        media: Media[], 
        publishDate: string, 
        district: string, 
        sale: boolean, 
        rent: boolean, 
        purchaseMethod: PurchaseMethods, 
        saleCost: number, 
        rentCost: number, 
        condominiumCost: number, 
        iptuCost: number, 
        acceptsExchange: boolean, 
        bathrooms: number, 
        sleepingRooms: number, 
        garageSpots: number, 
        area: number, 
        userId: number, 
        userName: string, 
        userPhone: number, 
        userCreci: string
    }
}
