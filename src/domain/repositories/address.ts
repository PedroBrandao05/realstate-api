import { Address } from "../entities/address";

export default interface IAddressRepository {
    findAddressInfo (propertyId: string): Promise<Address>
    create (address: Address): Promise<void>
    update (address: Address): Promise<void>
    delete (id: string): Promise<void>
}