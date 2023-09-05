import { inject, injectable } from 'inversify'
import 'reflect-metadata'
import IAddressRepository from '../../domain/repositories/address'
import IDatabaseConnection from '../../application/contracts/databaseConnection'
import { Address } from '../../domain/entities/address'

@injectable()
export default class AddressRepository implements IAddressRepository {
    constructor(
        @inject('IDatabaseConnection') private readonly database: IDatabaseConnection
    ){}

    private toModel(data: any): Address {
        const address = new Address()
        address.id = data.id
        address.propertyId = data.property_id
        address.cep = data.cep
        address.city = data.city
        address.complement = data.complement
        address.state = data.state
        address.street = data.street
        address.number = data.number
        address.district = data.district

        return address
    }

    async findAddressByPropertyId(propertyId: string): Promise<Address | undefined> {
        const [address] = await this.database.query('select * from address where property_id = $1', [propertyId])
        if (!address) return
        return this.toModel(address)
    }

    async findByDistrict(district: string): Promise<Address[]> {
        const addresses = await this.database.query('select * from address where district = $1', [district])
        if (!addresses.length) return []
        return addresses.map(address => this.toModel(address))
    }

    async create(address: Address): Promise<void> {
        await this.database.query('insert into address (id, property_id, cep, city, complement, state, street, number, district) values ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
        [address.id, address.propertyId, address.cep, address.city, address.complement, address.state, address.street, address.number, address.district])
    }

    async update(address: Address): Promise<void> {
        await this.database.query(`update address
        set cep = $1, city = $2, complement = $3, state = $4, street = $5, number = $6, district = $7
        where property_id = $8
        `, [address.cep, address.city, address.complement, address.state, address.street, address.number, address.district, address.propertyId])
    }

    async delete(propertyId: string): Promise<void> {
        await this.database.query('delete from address where property_id = $1', [propertyId])
    }
}