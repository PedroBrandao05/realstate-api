import { PurchaseMethods } from "../entities/financialDetails"

export default interface IFinancialDetailsService {
    save (input: FinancialDetailsDTO.SaveFinancialDetailsInput): Promise<void>
    get (input: FinancialDetailsDTO.GetFinancialDetailsInput): Promise<FinancialDetailsDTO.GetFinancialDetailsOutput>
    update (input: FinancialDetailsDTO.UpdateFinancialDetailsInput): Promise<void>
    delete (input: FinancialDetailsDTO.DeleteFinancialDetailsInput): Promise<void>
}

export namespace FinancialDetailsDTO {
    export type SaveFinancialDetailsInput = {
        propertyId: string
        sale: boolean
        rent: boolean
        purchaseMethod: PurchaseMethods
        saleCost: number
        rentCost: number
        purchasingDetails: string
        condominiumCost: number
        iptuCost: number
        regularDocumentation: boolean
        documentationObservation: string
        acceptsExchange: boolean
    }

    export type GetFinancialDetailsInput = {
        propertyId: string
    }

    export type GetFinancialDetailsOutput = {
        propertyId: string
        sale: boolean
        rent: boolean
        purchaseMethod: PurchaseMethods
        saleCost: number
        rentCost: number
        purchasingDetails: string
        condominiumCost: number
        iptuCost: number
        regularDocumentation: boolean
        documentationObservation: string
        acceptsExchange: boolean
    }

    export type UpdateFinancialDetailsInput = {
        propertyId: string
        sale: boolean
        rent: boolean
        purchaseMethod: PurchaseMethods
        saleCost: number
        rentCost: number
        purchasingDetails: string
        condominiumCost: number
        iptuCost: number
        regularDocumentation: boolean
        documentationObservation: string
        acceptsExchange: boolean
    }

    export type DeleteFinancialDetailsInput = {
        propertyId: string
    }
}