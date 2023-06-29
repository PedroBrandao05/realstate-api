import { Financial } from "../entities/financial";

export default interface IFinancialRepository {
    findFinancialInfo (propertyId: string) : Promise<Financial>
    create (financial: Financial): Promise<Financial>
    update (financial: Financial): Promise<Financial>
    delete (id: string): Promise<void>
}