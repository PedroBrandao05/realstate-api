import { Infrastructure } from "../entities/infrastructure";

export default interface IInfrastructureRepository {
    findInfrastructureInfo (propertyId: string) : Promise<Infrastructure>
    create (infrastructure: Infrastructure): Promise<Infrastructure>
    update (infrastructure: Infrastructure): Promise<Infrastructure>
    delete (id: string): Promise<void>
}