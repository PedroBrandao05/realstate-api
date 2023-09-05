import { InfrastructureDetails } from "../entities/infrastructureDetails";

export default interface IInfrastructureDetailsRepository {
    findInfrastructureDetails (propertyId: string) : Promise<InfrastructureDetails | undefined>
    findByBathroomsNumber (bathrooms: number): Promise<InfrastructureDetails[]>
    findBySleepingRoomsNumber (sleepingRooms: number): Promise<InfrastructureDetails[]>
    findByGarageSpotsNumber (garageSpots: number): Promise<InfrastructureDetails[]>
    findByArea (area: number): Promise<InfrastructureDetails[]>
    findByPropertyType (propertyType: string): Promise<InfrastructureDetails[]>
    create (infrastructureDetails: InfrastructureDetails): Promise<void>
    update (infrastructureDetails: InfrastructureDetails): Promise<void>
    delete (propertyId: string): Promise<void>
}