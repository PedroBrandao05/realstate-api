import { ApplicationError } from "../../../domain/error/application";
import IInfrastructureDetailsRepository from "../../../domain/repositories/infrastructureDetails";
import { iocContainer } from "../../../presentation/ioc";
import IFilterDecorator from "../../contracts/filterDecorator";
import findPropertiesThatMatch from "../../utils/findPropertiesThatMatch";

const infrastructureDetailsRepository = iocContainer.get<IInfrastructureDetailsRepository>('IInfrastructureDetailsRepository')

export default class filterByPropertyType implements IFilterDecorator {
    constructor (
        private readonly nextFilter?: IFilterDecorator,
        private readonly nextValues?: any
    ){}

    async leach(value: string, previous?: string[]): Promise<string[]> {
        const filteredInfrastructureDetails = await infrastructureDetailsRepository.findByPropertyType(value)
        const propertiesFound = filteredInfrastructureDetails.map((infrastructureDetail) => infrastructureDetail.propertyId)
        if (!filteredInfrastructureDetails.length) throw new ApplicationError(`There are no properties of type ${value}`, 400)
        if (!previous) {
            if (!this.nextFilter) return propertiesFound
            return await this.nextFilter.leach(this.nextValues, propertiesFound)
        }
        const filteredProperties = findPropertiesThatMatch(previous, propertiesFound)
        if (!this.nextFilter) return filteredProperties
        return this.nextFilter.leach(this.nextValues, filteredProperties)
    }
}