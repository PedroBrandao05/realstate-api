import { inject, injectable } from "inversify";
import 'reflect-metadata'
import IPropertyFeaturesRepository from "../../domain/repositories/propertyFeatures";
import { IDatabaseDriver } from "../../application/contracts/databaseDriver";
import { PropertyFeatures } from "../../domain/entities/propertyFeatures";

@injectable()

export default class PropertyFeaturesRepository implements IPropertyFeaturesRepository {
    constructor (
        @inject('IDatabaseDriver') private readonly database: IDatabaseDriver
    ){}

    private toModel (data: any): PropertyFeatures {
        const propertyFeature = new PropertyFeatures()
        propertyFeature.id = data.id
        propertyFeature.featureId = data.featureId
        propertyFeature.propertyId = data.propertyId
        return propertyFeature 
    }

    async create(propertyFeatures: PropertyFeatures): Promise<void> {
        await this.database.run(`insert into propertyFeatures (id, propertyId, featureId)
        values ('${propertyFeatures.id}', '${propertyFeatures.propertyId}', '${propertyFeatures.featureId}')
        `)
    }

    async findByProperty(propertyId: string): Promise<PropertyFeatures[]> {
        const data = await this.database.run(`select * from propertyFeatures where propertyId = '${propertyId}'`)
        let propertyFeatures: PropertyFeatures[] = []
        for (const propertyFeature of data) {
            propertyFeatures.push(this.toModel(propertyFeature))
        }
        return propertyFeatures
    }

    async delete(id: string): Promise<void> {
        await this.database.run(`delete from propertyFeatures where id = '${id}'`)
    }
}