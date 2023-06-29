export class Financial {
    constructor (
        private readonly id: string,
        private readonly propertyId: string,
        private readonly sale: boolean,
        private readonly rent: boolean,
        private readonly financing: boolean,
        private readonly saleCost: number,
        private readonly rentCost: number,
        private readonly financingDetails: string,
        private readonly condominiumCost: number,
        private readonly iptuCost: number,
        private readonly contributor: string,
        private readonly register: string,
        private readonly registration: string,
        private readonly transcription: string,
        private readonly regularDocumentation: boolean,
        private readonly documentationObservation: string,
        private readonly acceptsExchange: boolean
    ){}
}