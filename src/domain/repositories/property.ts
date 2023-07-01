import { Property } from "../entities/property";

export default interface IPropertyRepository {
    findAll (): Promise<Property[]>
    findById (id: string): Promise<Property>
    create (property: Property): Promise<void>
    update (property: Property): Promise<void>
    delete (id: string): Promise<void>
}