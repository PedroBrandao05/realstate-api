import 'reflect-metadata'
import { inject, injectable } from 'inversify'
import IInfrastructureDetailsRepository from '../../domain/repositories/infrastructureDetails'
import IDatabaseConnection from '../../application/contracts/databaseConnection'
import { InfrastructureDetails } from '../../domain/entities/infrastructureDetails'

@injectable()
export default class InfrastructureDetailsRepository implements IInfrastructureDetailsRepository {
    constructor (
        @inject('IDatabaseConnection') private readonly database: IDatabaseConnection
    ){}

    private toModel(data: any): InfrastructureDetails {
        const infrastructureDetails = new InfrastructureDetails()
        infrastructureDetails.id = data.id
        infrastructureDetails.propertyId = data.property_id
        infrastructureDetails.propertyType = data.property_type
        infrastructureDetails.propertySubtype = data.property_subtype
        infrastructureDetails.sleepingRooms = data.sleeping_rooms
        infrastructureDetails.garageSpots = data.garage_spots
        infrastructureDetails.bathrooms = data.bathrooms
        infrastructureDetails.area = data.area
        return infrastructureDetails
    }

    async findInfrastructureDetails(propertyId: string): Promise<InfrastructureDetails | undefined> {
        const [infrastructureDetails] = await this.database.query('select * from infrastructure_details where property_id = $1', [propertyId])
        if (!infrastructureDetails) return
        return this.toModel(infrastructureDetails)
    }

    async create(infrastructureDetails: InfrastructureDetails): Promise<void> {
        await this.database.query(`insert into infrastructure_details (id, property_id, property_type, property_subtype, sleeping_rooms, garage_spots, bathrooms, area) values 
        ($1, $2, $3, $4, $5, $6, $7, $8)`, [infrastructureDetails.id, infrastructureDetails.propertyId, infrastructureDetails.propertyType, infrastructureDetails.propertySubtype, infrastructureDetails.sleepingRooms, infrastructureDetails.garageSpots, infrastructureDetails.bathrooms, infrastructureDetails.area])
    }

    async update(infrastructureDetails: InfrastructureDetails): Promise<void> {
        await this.database.query(`update infrastructure_details set property_type = $1, property_subtype = $2, sleeping_rooms = $3, garage_spots = $4, bathrooms = $5, area = $6 where property_id = $7`, 
        [infrastructureDetails.propertyType, infrastructureDetails.propertySubtype, infrastructureDetails.sleepingRooms, infrastructureDetails.garageSpots, infrastructureDetails.bathrooms, infrastructureDetails.area, infrastructureDetails.propertyId])
    }

    async delete(propertyId: string): Promise<void> {
        await this.database.query('delete from infrastructure_details where property_id = $1', [propertyId])
    }
}