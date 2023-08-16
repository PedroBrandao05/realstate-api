import { inject, injectable } from "inversify";
import 'reflect-metadata'
import IPropertyFeaturesRepository from "../../domain/repositories/propertyFeatures";
import { PropertyFeatures } from "../../domain/entities/propertyFeatures";
import IDatabaseConnection from "../../application/contracts/databaseConnection";

@injectable()

export default class PropertyFeaturesRepository implements IPropertyFeaturesRepository {
    constructor (
        @inject('IDatabaseConnection') private readonly database: IDatabaseConnection
    ){}

    private toModel (data: any): PropertyFeatures {
        const propertyFeature = new PropertyFeatures()
        propertyFeature.id = data.id
        propertyFeature.featureId = data.feature_id
        propertyFeature.propertyId = data.property_id
        return propertyFeature 
    }

    async create(propertyFeatures: PropertyFeatures): Promise<void> {
        await this.database.query(`insert into property_features (id, property_id, feature_id)
        values ($1, $2, $3)
        `, [propertyFeatures.id, propertyFeatures.propertyId, propertyFeatures.featureId])
    }

    async findByProperty(propertyId: string): Promise<PropertyFeatures[]> {
        const propertyFeatures = await this.database.query(`select * from property_features where property_id = $1`, [propertyId])
        return propertyFeatures.map((propertyFeature: any) => this.toModel(propertyFeature))
    }

    async delete(id: string): Promise<void> {
        await this.database.query(`delete from property_features where id = $1`, [id])
    }
}