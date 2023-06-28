import { IFeatures } from "../entities/features";
import { IProperty } from "../entities/property";
import { IPropertyFeatures } from "../entities/propertyFeatures";

export interface IFeatureRepository {
    getByType (type: string) : Promise<IFeatures>
    getPropertyByType (type: string) : Promise<IProperty[]>
    getPropertyByFeatures (features: Omit<IFeatures, 'id'>[]) : Promise<IProperty[]>
    getByProperty (id: string) : Promise<IPropertyFeatures[]>
}