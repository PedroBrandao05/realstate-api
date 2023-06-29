export class Property {
    constructor (
        private readonly id: string,
        private readonly title: string,
        private readonly privateTitle: string,
        private readonly description: string,
        private readonly privateDescription: string,
        private readonly userId: string,
        private readonly ownerId: string,
        private readonly publishDate: string
    ){}
}

export interface IProperty {
    id: string,
    title: string,
    privateTitle: string,
    description: string,
    privateDescription: string,
    userId: string,
    ownerId: string,
    publishDate: string
}