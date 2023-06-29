import { PropertyFeatures } from "../entities/propertyFeatures";

export default interface IPropertyFeaturesRepository {
    findByProperty (propertyId: string): Promise<PropertyFeatures[]>
    create (propertyFeatures: PropertyFeatures): Promise<PropertyFeatures>
    update (propertyFeatures: PropertyFeatures): Promise<PropertyFeatures>
    delete (id: string): Promise<void>
}