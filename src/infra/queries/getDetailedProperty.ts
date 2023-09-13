import { inject, injectable } from "inversify";
import IDatabaseConnection from "../../application/contracts/databaseConnection";
import { PropertyPresentationUsecaseDTO } from "../../domain/usecases/propertyPresentation";
import IDetailedPropertyQuery from "../../application/contracts/detailedPropertyQuery";
import 'reflect-metadata'

@injectable()
export default class GetDetailedPropertyQuery implements IDetailedPropertyQuery{

    constructor (
        @inject('IDatabaseConnection') private readonly connection: IDatabaseConnection
    ){}

    async execute (propertyId: string): Promise<PropertyPresentationUsecaseDTO.GetDetailedPropertyOutput | undefined>  {
        const [property] = await this.connection.query('select p.id, p.title, p.description, p.media, p.publish_date, a.district, f.sale, f.rent, f.purchase_method, f.sale_cost, f.rent_cost, f.condominium_cost, f.iptu_cost, f.accepts_exchange, i.bathrooms, i.sleeping_rooms, i.garage_spots, i.area, u.id as user_id, u.name, u.phone, u.creci from property p join address a on p.id = a.property_id join financial_details f on p.id = f.property_id join infrastructure_details i on p.id = i.property_id join users u on u.id = p.user_id where p.id = $1 order by p.publish_date desc', [propertyId])
        if (!property) return
        const features = await this.connection.query('select f.description, f.type from property_features p join features f on p.feature_id = f.id where p.property_id = $1', [propertyId])
        property.features = features

        return {
            propertyId,
            title: property.title,
            description: property.description,
            media: property.media.media,
            publishDate: property.publish_date,
            district: property.district,
            sale: property.sale,
            rent: property.rent,
            purchaseMethod: property.purchase_method,
            saleCost: property.sale_cost,
            rentCost: property.rent_cost,
            condominiumCost: property.condominium_cost,
            iptuCost: property.iptu_cost,
            acceptsExchange: property.accepts_exchange,
            bathrooms: property.bathrooms,
            sleepingRooms: property.sleeping_rooms,
            garageSpots: property.garage_spots,
            area: property.area,
            userId: property.user_id,
            userName: property.name,
            userPhone: property.phone,
            userCreci: property.creci
        }
    }
}