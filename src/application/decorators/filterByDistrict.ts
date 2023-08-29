import { ApplicationError } from "../../domain/error/application";
import IAddressRepository from "../../domain/repositories/address";
import { iocContainer } from "../../presentation/ioc";
import IFilterDecorator from "../contracts/filterDecorator";
import findPropertiesThatMatch from "../utils/findPropertiesThatMatch";

const AddressRepository = iocContainer.get<IAddressRepository>('IAddressRepository')

export default class filterByDistrict implements IFilterDecorator {
    constructor (
        private readonly nextFilter?: IFilterDecorator,
        private readonly nextValues?: any
    ){}

    async leach(value: string, previous?: string[]): Promise<string[]> {
        const filteredAddresses = await AddressRepository.findByDistrict(value)
        const propertiesFound = filteredAddresses.map((address) => address.propertyId)
        if (!filteredAddresses.length) throw new ApplicationError(`There are no properties in ${value}`, 400)
        if (!previous) {
            if (!this.nextFilter) return propertiesFound
            return await this.nextFilter.leach(this.nextValues, propertiesFound)
        }
        const filteredProperties = findPropertiesThatMatch(previous, propertiesFound)
        if (!this.nextFilter) return filteredProperties
        return this.nextFilter.leach(this.nextValues, filteredProperties)
    }
}