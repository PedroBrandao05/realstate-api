import { AnnouncementType } from "../entities/filters";
import { IFinancial } from "../entities/financial";
import { IProperty } from "../entities/property";

export interface IFinancialRepository {
    getByProperty (id: string) : Promise<IFinancial>
    getPropertyByType (type: string) : Promise<IProperty[]>
    getPropertyByAnnouncementType (type: AnnouncementType) : Promise<IProperty[]>
    getPropertyByPriceRange (max: number, min: number) : Promise<IProperty[]>
}