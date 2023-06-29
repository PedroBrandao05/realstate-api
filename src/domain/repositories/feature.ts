import { Feature } from "../entities/features";

export default interface IFeatureRepository {
    findAllFeatures (): Promise<Feature[]>
    findById (id: string): Promise<Feature>
    create (feature: Feature): Promise<Feature>
    update (feature: Feature): Promise<Feature>
    delete (id: string): Promise<void>
}