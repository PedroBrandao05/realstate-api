import { InfrastructureDetails } from "../entities/infrastructureDetails";

export default interface IInfrastructureDetailsRepository {
    findInfrastructureDetails (propertyId: string) : Promise<InfrastructureDetails | undefined>
    create (infrastructureDetails: InfrastructureDetails): Promise<void>
    update (infrastructureDetails: InfrastructureDetails): Promise<void>
    delete (propertyId: string): Promise<void>
}