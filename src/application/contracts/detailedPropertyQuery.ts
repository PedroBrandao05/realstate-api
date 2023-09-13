import { PropertyPresentationUsecaseDTO } from "../../domain/usecases/propertyPresentation";

export default interface IDetailedPropertyQuery {
    execute (propertyId: string): Promise<PropertyPresentationUsecaseDTO.GetDetailedPropertyOutput | undefined>
}