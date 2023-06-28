import { IAddress } from "../entities/address";
import { AddressFilter } from "../entities/filters";
import { IProperty } from "../entities/property";

export interface IAddressRepository {
    getByProperty (id: string) : Promise<IAddress>
    getByDistrict (district: string) : Promise<IProperty[]>
    getByFilter (filter: AddressFilter, value: any) : Promise<IProperty[]>
    getExact (cep: number, number: number) : Promise<IProperty>
}