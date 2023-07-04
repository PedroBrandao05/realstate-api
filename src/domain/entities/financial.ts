export class Financial {
    id!: string
    propertyId!: string
    sale!: boolean
    rent!: boolean
    purchaseMethod!: 'financing' | 'cash'
    saleCost!: number
    rentCost!: number
    purchasingDetails!: string
    condominiumCost!: number
    iptuCost!: number
    regularDocumentation!: boolean
    documentationObservation!: string
    acceptsExchange!: boolean
}