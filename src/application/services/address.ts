import { inject, injectable } from 'inversify'
import 'reflect-metadata'
import IAddressService, { AddressServiceDTO } from '../../domain/services/address'
import IAddressRepository from '../../domain/repositories/address'
import IPropertyRepository from '../../domain/repositories/property'
import IUuidGenerator from '../contracts/uuidGenerator'
import { ApplicationError } from '../../domain/error/application'
import { Address } from '../../domain/entities/address'

@injectable()
export default class AddressService implements IAddressService {
    constructor (
        @inject('IAddressRepository') private readonly addressRepository: IAddressRepository,
        @inject('IPropertyRepository') private readonly propertyRepository: IPropertyRepository,
        @inject('IUuidGenerator') private readonly uuidGenerator: IUuidGenerator
    ){}

    async save(input: AddressServiceDTO.SaveAddressInput): Promise<void> {
        const propertyExists = await this.propertyRepository.findById(input.propertyId)
        if (!propertyExists) throw new ApplicationError("This property doesn't exist", 400)
        const addressAlreadyExists = await this.addressRepository.findAddressByPropertyId(propertyExists.id)
        if (addressAlreadyExists) throw new ApplicationError("This property address was already registered", 400)
        const address = new Address()
        address.id = this.uuidGenerator.generate()
        address.propertyId = input.propertyId
        address.cep = input.cep
        address.city = input.city
        address.complement = input.complement
        address.state = input.state
        address.street = input.street
        address.number = input.number
        address.district = input.district

        await this.addressRepository.create(address)
    }

    async update(input: AddressServiceDTO.UpdateAddressInput): Promise<void> {
        const propertyExists = await this.propertyRepository.findById(input.propertyId)
        if (!propertyExists) throw new ApplicationError("This property doesn't exist", 400)
        const address = await this.addressRepository.findAddressByPropertyId(propertyExists.id)
        if (!address) throw new ApplicationError("This property address wasn't registered", 400)
        address.cep = input.cep
        address.city = input.city
        address.complement = input.complement
        address.state = input.state
        address.street = input.street
        address.number = input.number
        address.district = input.district

        await this.addressRepository.update(address)
    }

    async get(input: AddressServiceDTO.GetAddressInput): Promise<AddressServiceDTO.GetAddressOutput> {
        const propertyExists = await this.propertyRepository.findById(input.propertyId)
        if (!propertyExists) throw new ApplicationError("This property doesn't exist", 400)
        const address = await this.addressRepository.findAddressByPropertyId(propertyExists.id)
        if (!address) throw new ApplicationError("This property address wasn't registered", 400)
        return {...address}
    }

    async delete(input: AddressServiceDTO.DeleteAddressInput): Promise<void> {
        const propertyExists = await this.propertyRepository.findById(input.propertyId)
        if (!propertyExists) throw new ApplicationError("This property doesn't exist", 400)
        const address = await this.addressRepository.findAddressByPropertyId(propertyExists.id)
        if (!address) throw new ApplicationError("This property address wasn't registered", 400)
        await this.addressRepository.delete(input.propertyId)
    }
}