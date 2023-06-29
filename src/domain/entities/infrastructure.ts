export class Infrastructure {
    constructor (
       private readonly id: string,
       private readonly propertyId: string,
       private readonly type: string,
       private readonly subtype: string,
       private readonly bathrooms: number,
       private readonly sleepingRooms: number,
       private readonly garageSpots: number,
       private readonly area: number
    ){}
}