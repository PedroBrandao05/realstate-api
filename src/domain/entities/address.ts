export class Address {
    constructor (
        private readonly id: string,
        private readonly propertyId: string,
        private readonly cep: number,
        private readonly state: string,
        private readonly city: string,
        private readonly district: string,
        private readonly street: string,
        private readonly number: number,
        private readonly complement: string
    ){}
}
