import { IAddress } from "../entities/address";
import { IFeatures } from "../entities/features";
import { AddressFilter, AnnouncementType } from "../entities/filters";
import { IFinancial } from "../entities/financial";
import { IPhoto } from "../entities/photo";
import { IProperty } from "../entities/property";
import { IPropertyFeatures } from "../entities/propertyFeatures";

export interface IPropertyService {

}

export namespace PropertyServiceDTO {
    export type getPropertiesOutput = {
        property: IProperty, 
        financial: IFinancial, 
        address: IAddress, 
        features: IPropertyFeatures[], 
        photos: IPhoto[]}[]

    export type getPropertiesByAddressInput = AddressFilter
    export type getPropertiesByAnnouncementInput = AnnouncementType
    export type getPropertiesByPriceRange = {max: number, min: number}
    export type getPropertiesByType = string
    export type getPropertiesByFeatureType = string
    export type getPropertiesByFeatures = Omit<IFeatures, 'id'>[]

}