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
    register!: string
    registration!: string
    transcription!: string
    regularDocumentation!: boolean
    documentationObservation!: string
    acceptsExchange!: boolean
}