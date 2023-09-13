import { inject, injectable } from "inversify";
import IDatabaseConnection from "../../application/contracts/databaseConnection";
import { PropertyPresentationUsecaseDTO } from "../../domain/usecases/propertyPresentation";
import 'reflect-metadata'
import IPresentationPropertiesQuery from "../../application/contracts/presentationPropertiesQuery";

@injectable()
export default class GetPresentationPropertiesQuery implements IPresentationPropertiesQuery{

    constructor (
        @inject('IDatabaseConnection') private readonly connection: IDatabaseConnection
    ){}

    async execute(): Promise<PropertyPresentationUsecaseDTO.GetPresentationPropertiesOutput> {
        const properties = await this.connection.query(' select p.id, p.media, a.district, f.sale_cost, f.rent_cost from property p join address a on p.id = a.property_id join financial_details f on p.id = f.property_id', [])
        return properties.map((property) => {return {propertyId: property.id, thumb: property.media.media[0], district: property.district, saleCost: property.sale_cost, rentCost: property.rent_cost}})
    }

}