import { IProperty } from "../entities/property";

export interface IPropertyRepository {
    get () : Promise<IProperty[]>
    getById (id: string) : Promise<IProperty>
    create (property: IProperty) : Promise<IProperty>
    update (property: IProperty) : Promise<void>
}