import { injectable, inject } from "inversify";
import 'reflect-metadata'
import IFeatureRepository from "../../domain/repositories/feature";
import { IDatabaseDriver } from "../../application/contracts/databaseDriver";
import { Feature } from "../../domain/entities/features";

@injectable()
export default class FeatureRepository implements IFeatureRepository {
    constructor (
        @inject('IDatabaseDriver') private readonly database: IDatabaseDriver
    ){}

    private toModel (data: any): Feature {
        const feature = new Feature()
        feature.id = data.id
        feature.description = data.description
        feature.type = data.type
        return feature
    }

    async findAllFeatures(): Promise<Feature[]> {
        const data = await this.database.get('select * from feature')
        let features : Feature[] = []
        for (const feature of data) {
            features.push(this.toModel(feature))
        }
        return features
    }

    async findById(id: string): Promise<Feature> {
        const [feature] = await this.database.get(`select * from feature where id = '${id}'`)
        return this.toModel(feature)
    }

    async create(feature: Feature): Promise<void> {
        await this.database.run(`
        insert into feature (id, type, description)
        values ('${feature.id}', '${feature.type}', '${feature.description}')
        `)
    }

    async update(feature: Feature): Promise<void> {
        await this.database.run(`
        update feature
        set type = '${feature.type}',
        set description = '${feature.description}'
        where id = '${feature.id}'
        `)
    }

    async delete(id: string): Promise<void> {
        await this.database.run(`delete from feature where id = '${id}'`)
    }
}