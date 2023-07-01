import { Infrastructure } from "../entities/infrastructure";

export default interface IInfrastructureRepository {
    findInfrastructureInfo (propertyId: string) : Promise<Infrastructure>
    create (infrastructure: Infrastructure): Promise<void>
    update (infrastructure: Infrastructure): Promise<void>
    delete (id: string): Promise<void>
}