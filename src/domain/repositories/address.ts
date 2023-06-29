import { Address } from "../entities/address";

export default interface IAddressRepository {
    findAddressInfo (propertyId: string): Promise<Address>
    create (address: Address): Promise<Address>
    update (address: Address): Promise<Address>
    delete (id: string): Promise<void>
}