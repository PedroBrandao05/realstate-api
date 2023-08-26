import { Feature } from "../entities/features";

export default interface IFeaturesRepository {
    findAllFeatures (): Promise<Feature[]>
    findById (id: string): Promise<Feature>
    create (feature: Feature): Promise<void>
    update (feature: Feature): Promise<void>
    delete (id: string): Promise<void>
}