export enum PurchaseMethods {
    FINANCING = 'financing',
    CASH = 'cash',
    NONE = 'none'
}

export class FinancialDetails {
    id!: string
    propertyId!: string
    sale!: boolean
    rent!: boolean
    purchaseMethod!: PurchaseMethods
    saleCost!: number
    rentCost!: number
    purchasingDetails!: string
    condominiumCost!: number
    iptuCost!: number
    regularDocumentation!: boolean
    documentationObservation!: string
    acceptsExchange!: boolean
}