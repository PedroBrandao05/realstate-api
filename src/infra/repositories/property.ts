import { injectable, inject } from "inversify";
import 'reflect-metadata'
import IPropertyRepository from "../../domain/repositories/property";
import { Property } from "../../domain/entities/property";
import IDatabaseConnection from "../../application/contracts/databaseConnection";

@injectable()
export default class PropertyRepository implements IPropertyRepository {
    constructor (
        @inject('IDatabaseConnection') private readonly database: IDatabaseConnection
    ){}

    private toModel (data: any): Property {
        const property = new Property()
        property.id = data.id
        property.title = data.title 
        property.privateTitle = data.private_title
        property.description = data.description
        property.privateDescription = data.private_description
        property.ownerId = data.owner_id
        property.userId = data.user_id
        property.media = data.media.media
        property.publishDate = new Date(data.publish_date)
        return property
    }

    async create(property: Property): Promise<void> {
        await this.database.query(`
        insert into property (id, title, private_title, description, private_description, media, user_id, owner_id, publish_date) 
        values ($1, $2, $3, $4, $5, $6, $7, $8, $9)`, [property.id, property.title, property.privateTitle, property.description, {media: []}, property.privateDescription, property.userId, property.ownerId, property.publishDate])
    }

    async findAll(): Promise<Property[]> {
        const properties = await this.database.query('select * from property', [])
        return properties.map((property: any) => this.toModel(property))
    }

    async findById(id: string): Promise<Property> {
        const [property] = await this.database.query(`select * from property where id = $1`, [id])
        return this.toModel(property)
    }

    async update(property: Property): Promise<void> {
        await this.database.query(`
        update property
        set title = $1 
        private_title = $2
        description = $3
        private_description = $4
        media = $5
        where id = $6
        `, [property.title, property.privateTitle, property.description, property.privateDescription, property.ownerId, {media: property.media}, property.id])
    }

    async delete(id: string): Promise<void> {
        await this.database.query(`delete from property where id = $1`, [id])
    }
}