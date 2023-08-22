import 'reflect-metadata'
import { inject, injectable } from 'inversify'
import IPropertyService, { PropertyServiceDTO } from '../../domain/services/property'
import IUserRepository from '../../domain/repositories/user'
import IOwnerRepository from '../../domain/repositories/owner'
import IPropertyRepository from '../../domain/repositories/property'
import IUuidGenerator from '../contracts/uuidGenerator'
import IStorage from '../contracts/storage'
import { ApplicationError } from '../../domain/error/application'
import { Property } from '../../domain/entities/property'
import convertDateToString from '../utils/convertDateToString'

@injectable()
export default class PropertyService implements IPropertyService {
    constructor(
       @inject('IOwnerRepository') private readonly ownerRepository: IOwnerRepository,
       @inject('IPropertyRepository') private readonly propertyRepository: IPropertyRepository,
       @inject('IUuidGenerator') private readonly uuidGenerator: IUuidGenerator,
       @inject('IStorage') private readonly storage: IStorage 
    ){}

    async create(input: PropertyServiceDTO.CreatePropertyInput): Promise<PropertyServiceDTO.CreatePropertyOutput> {
        const owner = await this.ownerRepository.findById(input.ownerId)
        if (!owner) throw new ApplicationError("This owner does not exist", 400)
        const property = new Property()
        const propertyId = this.uuidGenerator.generate()
        property.id = propertyId,
        property.title = input.title,
        property.privateTitle = input.privateTitle,
        property.description = input.description,
        property.privateDescription = input.privateDescription,
        property.ownerId = owner.id,
        property.userId = input.userId,
        property.publishDate = new Date()
        await this.propertyRepository.create(property)
        return {
            propertyId
        }
    }

    async populateMedia(input: PropertyServiceDTO.PopulatePropertyMediaInput): Promise<void> {
        const property = await this.propertyRepository.findById(input.id)
        if (!property) throw new ApplicationError("This property doesn't exist", 400)
        console.log(input.media)
        for (const media of input.media) {
            await this.storage.send(media.url)
            await this.storage.dispatch(media.url)
            property.media.push(media)
        }
        await this.propertyRepository.update(property)
    }

    async removeMedia(input: PropertyServiceDTO.RemovePropertyMediaInput): Promise<void> {
        const property = await this.propertyRepository.findById(input.propertyId)
        if (!property) throw new ApplicationError("This property doesn't exist", 400)
        for (const media of input.media) {
            await this.storage.remove(media.url)
            const index = property.media.findIndex(mediaInProperty => mediaInProperty.url === media.url)
            property.media.splice(index, 1)
        }
        await this.propertyRepository.update(property)
    }

    async get(input: PropertyServiceDTO.GetPropertyInput): Promise<PropertyServiceDTO.GetPropertyOutput> {
        const property = await this.propertyRepository.findById(input.propertyId)
        if (!property) throw new ApplicationError("This property doesn't exist", 400)
        return {
            ...property,
            publishDate: convertDateToString(property.publishDate)
        }
    }

    async update(input: PropertyServiceDTO.UpdatePropertyInput): Promise<void> {
        const property = await this.propertyRepository.findById(input.propertyId)
        if (!property) throw new ApplicationError("This property doesn't exist", 400)
        property.title = input.title
        property.description = input.description
        property.privateTitle = input.privateTitle
        property.privateDescription = input.privateDescription
        await this.propertyRepository.update(property)
    }

    async delete(input: PropertyServiceDTO.DeletePropertyInput): Promise<void> {
        const property = await this.propertyRepository.findById(input.propertyId)
        if (!property) throw new ApplicationError("This property doesn't exist", 400)
        for (const media of property.media) {
            await this.storage.remove(media.url)
        }
        await this.propertyRepository.delete(property.id)
    }
}