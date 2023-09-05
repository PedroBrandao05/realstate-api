import { FinancialDetails } from "../entities/financialDetails";

export default interface IFinancialDetailsRepository {
    findFinancialDetails (propertyId: string) : Promise<FinancialDetails | undefined>
    findOnesOnSale (): Promise<FinancialDetails[]>
    findOnesOnRent (): Promise<FinancialDetails[]>
    findBySaleCost (max: number, min: number): Promise<FinancialDetails[]>
    findByRentCost (max: number, min: number): Promise<FinancialDetails[]>
    findFinanciableOnes (): Promise<FinancialDetails[]>
    findExchangeableOnes (): Promise<FinancialDetails[]>
    create (financialDetails: FinancialDetails): Promise<void>
    update (financialDetails: FinancialDetails): Promise<void>
    delete (id: string): Promise<void>
}