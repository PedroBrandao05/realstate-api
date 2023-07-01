import { PropertyFeatures } from "../entities/propertyFeatures";

export default interface IPropertyFeaturesRepository {
    findByProperty (propertyId: string): Promise<PropertyFeatures[]>
    create (propertyFeatures: PropertyFeatures): Promise<void>
    delete (id: string): Promise<void>
}