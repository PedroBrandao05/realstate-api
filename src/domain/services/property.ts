import { Feature } from "typeorm"
import { Address } from "../entities/address"
import { Financial } from "../entities/financial"
import { Infrastructure } from "../entities/infrastructure"
import { Owner } from "../entities/owner"
import { Picture } from "../entities/picture"
import { Property } from "../entities/property"
import { OwnerServiceDTO } from "./owner"

export default interface IPropertyService {
    getAllProperties (): Promise<PropertyServiceDTO.getPropertiesOutput>
    getFilteredProperties (input: PropertyServiceDTO.getFilteredPropertiesInput): Promise<PropertyServiceDTO.getPropertiesOutput>
}


export namespace PropertyServiceDTO {
    export type getPropertiesOutput = {
        mainInfo: Property
        financial: Financial,
        infrastructure: Infrastructure,
        address: Address,
        features: Feature[],
        owner: Owner,
        pictures: Picture[],
    }[]

    export type getFilteredPropertiesInput = {
        announcementType: {active: boolean, value: 'sale' | 'rent'}
        purchaseMethod: {active: boolean, value: 'financing' | 'cash'}
        salePriceRange: {active: boolean, value: {max: number, min: number}}
        rentPriceRange: {active: boolean, value: {max: number, min: number}}
        address: {active: boolean, value: string}
        sleepingRooms: {active: boolean, value: number}
        bathrooms: {active: boolean, value: number}
        garageSpots: {active: boolean, value: number}
        area: {active: boolean, value: number}
        type: {active: boolean, value: string}
        subtype: {active: boolean, value: string}
        owner: {active: boolean, emailValue: string}
        feature: {active: boolean, value: string[]}
    }

    export type createPropertyInput = {
        mainInfo: Omit<Property, 'id' | 'ownerId'>
        financial: Omit<Financial, 'id' | 'propertyId'>
        infrastructure: Omit<Infrastructure, 'id' | 'propertyId'>
        address: Omit<Address, 'id' | 'propertyId'>
        features: string[]
        pictures: string[]
        owner: OwnerServiceDTO.createOwnerInput
    }

    export type updatePropertyInput = {
        mainInfo: Property
        financial: Financial,
        infrastructure: Infrastructure,
        address: Address,
        features: string[],
        pictures: string[],
    }

    export type deletePropertyInput = {
        id: string
    }
}