import { FinancialDetails } from "../entities/financialDetails";

export default interface IFinancialDetailsRepository {
    findFinancialDetails (propertyId: string) : Promise<FinancialDetails | undefined>
    create (financialDetails: FinancialDetails): Promise<void>
    update (financialDetails: FinancialDetails): Promise<void>
    delete (id: string): Promise<void>
}