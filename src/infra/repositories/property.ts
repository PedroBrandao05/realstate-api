import { injectable, inject } from "inversify";
import 'reflect-metadata'
import IPropertyRepository from "../../domain/repositories/property";
import { IDatabaseDriver } from "../../application/contracts/databaseDriver";
import { Property } from "../../domain/entities/property";

@injectable()
export default class PropertyRepository implements IPropertyRepository {
    constructor (
        @inject('IDatabaseDriver') private readonly database: IDatabaseDriver
    ){}

    private toModel (data: any): Property {
        const property = new Property()
        property.id = data.id
        property.title = data.title 
        property.privateTitle = data.privateTitle
        property.description = data.description
        property.privateDescription = data.privateDescription
        property.ownerId = data.ownerId
        property.userId = data.userId
        property.publishDate = data.publishDate
        return property
    }

    async create(property: Property): Promise<void> {
        await this.database.run(`
        insert into property (id, title, privateTitle, description, privateDescription, userId, ownerId, publishDate) 
        values ('${property.id}', '${property.title}', '${property.privateTitle}', '${property.description}',
        '${property.privateDescription}', '${property.userId}', '${property.ownerId}', '${property.publishDate}')
        `)
    }

    async findAll(): Promise<Property[]> {
        const data = await this.database.run('select * from property')
        let properties : Property[] = []
        for (const property of data) {
            properties.push(this.toModel(property))
        }
        return properties
    }

    async findById(id: string): Promise<Property> {
        const [property] = await this.database.run(`select * from property where id = '${id}'`)
        return this.toModel(property)
    }

    async update(property: Property): Promise<void> {
        await this.database.run(`
        update property
        set title = '${property.title}' 
        set privateTitle = '${property.privateTitle}'
        set description = '${property.description}'
        set privateDescription = '${property.privateDescription}'
        set ownerId = '${property.ownerId}'
        set userId = '${property.userId}'
        where id = '${property.id}'
        `)
    }

    async delete(id: string): Promise<void> {
        await this.database.run(`delete from property where id = '${id}'`)
    }
}