import { Address } from "../entities/address";

export default interface IAddressRepository {
    findAddressByPropertyId (propertyId: string): Promise<Address | undefined>
    create (address: Address): Promise<void>
    update (address: Address): Promise<void>
    delete (propertyId: string): Promise<void>
}