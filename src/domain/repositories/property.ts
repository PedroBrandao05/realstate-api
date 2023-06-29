import { Property } from "../entities/property";

export default interface IPropertyRepository {
    findAll (): Promise<Property[]>
    findById (id: string): Promise<Property>
    create (property: Property): Promise<Property>
    update (property: Property): Promise<Property>
    delete (id: string): Promise<void>
}