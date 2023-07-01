import { Financial } from "../entities/financial";

export default interface IFinancialRepository {
    findFinancialInfo (propertyId: string) : Promise<Financial>
    create (financial: Financial): Promise<void>
    update (financial: Financial): Promise<void>
    delete (id: string): Promise<void>
}