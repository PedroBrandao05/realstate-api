import { PropertyPresentationUsecaseDTO } from "../../domain/usecases/propertyPresentation";

export default interface IPresentationPropertiesQuery {
    execute (): Promise<PropertyPresentationUsecaseDTO.GetPresentationPropertiesOutput>
}