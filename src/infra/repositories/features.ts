import { injectable, inject } from "inversify";
import 'reflect-metadata'
import IFeaturesRepository from "../../domain/repositories/features";
import { Feature } from "../../domain/entities/features";
import IDatabaseConnection from "../../application/contracts/databaseConnection";

@injectable()
export default class FeaturesRepository implements IFeaturesRepository {
    constructor (
        @inject('IDatabaseConnection') private readonly database: IDatabaseConnection
    ){}

    private toModel (data: any): Feature {
        const feature = new Feature()
        feature.id = data.id
        feature.description = data.description
        feature.type = data.type
        return feature
    }

    async findAllFeatures(): Promise<Feature[]> {
        const features = await this.database.query('select * from features', [])
        return features.map((feature: any) => this.toModel(feature))
    }

    async findById(id: string): Promise<Feature> {
        const [feature] = await this.database.query(`select * from features where id = $1`, [id])
        return this.toModel(feature)
    }

    async create(feature: Feature): Promise<void> {
        await this.database.query(`
        insert into features (id, type, description)
        values ($1, $2, $3)
        `, [feature.id, feature.type, feature.description])
    }

    async update(feature: Feature): Promise<void> {
        await this.database.query(`
        update features
        set type = $1,
        description = $2
        where id = $3
        `, [feature.type, feature.description, feature.id])
    }

    async delete(id: string): Promise<void> {
        await this.database.query(`delete from features where id = $1`, [id])
    }
}