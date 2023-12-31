import { ApplicationError } from "../../../domain/error/application";
import IFinancialDetailsRepository from "../../../domain/repositories/financialDetails";
import { iocContainer } from "../../../presentation/ioc";
import IFilterDecorator from "../../contracts/filterDecorator";
import PropertiesMatcher from "../../../domain/services/propertiesMatcher";

const financialDetailsRepository = iocContainer.get<IFinancialDetailsRepository>('IFinancialDetailsRepository')

export default class filterByRentCost implements IFilterDecorator {
    constructor (
        private readonly nextFilter?: IFilterDecorator,
        private readonly nextValues?: any
    ){}

    async leach(values:  {max: number, min: number}, previous?: string[]): Promise<string[]> {
        const filteredFinancialDetails = await financialDetailsRepository.findByRentCost(values.max, values.min)
        const propertiesFound = filteredFinancialDetails.map((financialDetail) => financialDetail.propertyId)
        if (!filteredFinancialDetails.length) throw new ApplicationError("There are no properties available for this cost range", 400)
        if (!previous) {
            if (!this.nextFilter) return propertiesFound
            return await this.nextFilter.leach(this.nextValues, propertiesFound)
        }
        const filteredProperties = PropertiesMatcher.match(previous, propertiesFound)
        if (!this.nextFilter) return filteredProperties
        return this.nextFilter.leach(this.nextValues, filteredProperties)
    }
}