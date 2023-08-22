
export default interface IInfrastructureDetailsService {
    save (input: InfrastructureDetailsDTO.SaveInfrastructureDetailsInput): Promise<void>
    get (input: InfrastructureDetailsDTO.GetInfrastructureDetailsInput): Promise<InfrastructureDetailsDTO.GetInfrastructureDetailsOutput>
    update (input: InfrastructureDetailsDTO.UpdateInfrastructureDetailsInput): Promise<void>
    delete (input: InfrastructureDetailsDTO.DeleteInfrastructureDetailsInput): Promise<void>
}

export namespace InfrastructureDetailsDTO {
    export type SaveInfrastructureDetailsInput = {
        propertyId: string
        propertyType: string
        propertySubtype: string
        bathrooms: number
        sleepingRooms: number
        garageSpots: number
        area: number
    }

    export type GetInfrastructureDetailsInput = {
        propertyId: string
    }

    export type GetInfrastructureDetailsOutput = {
        propertyId: string
        propertyType: string
        propertySubtype: string
        bathrooms: number
        sleepingRooms: number
        garageSpots: number
        area: number
    }

    export type UpdateInfrastructureDetailsInput = {
        propertyId: string
        propertyType: string
        propertySubtype: string
        bathrooms: number
        sleepingRooms: number
        garageSpots: number
        area: number
    }

    export type DeleteInfrastructureDetailsInput = {
        propertyId: string
    }
}