
import { ApplicationError } from "../../domain/error/application";
import IFinancialDetailsRepository from "../../domain/repositories/financialDetails";
import { iocContainer } from "../../presentation/ioc";
import IFilterDecorator from "../contracts/filterDecorator";
import findPropertiesThatMatch from "../utils/findPropertiesThatMatch";

const financialDetailsRepository = iocContainer.get<IFinancialDetailsRepository>('IFinancialDetailsRepository')

export default class filterOnesOnRent implements IFilterDecorator {
    constructor (
        private readonly nextFilter?: IFilterDecorator,
        private readonly nextValues?: {max: number, min: number}
    ){}

    async leach(values?:  {max: number, min: number}, previous?: string[]): Promise<string[]> {
        const filteredFinancialDetails = await financialDetailsRepository.findOnesOnRent()
        const propertiesFound = filteredFinancialDetails.map((financialDetail) => financialDetail.propertyId)
        if (!filteredFinancialDetails.length) throw new ApplicationError("There are no properties on rent", 400)
        if (!previous) {
            if (!this.nextFilter) return propertiesFound
            return await this.nextFilter.leach(this.nextValues, propertiesFound)
        }
        const filteredProperties = findPropertiesThatMatch(previous, propertiesFound)
        if (!this.nextFilter) return filteredProperties
        return this.nextFilter.leach(this.nextValues, filteredProperties)
    }
}