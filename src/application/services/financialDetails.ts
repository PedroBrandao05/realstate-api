import {inject, injectable} from 'inversify'
import 'reflect-metadata'
import IFinancialDetailsService, { FinancialDetailsDTO } from '../../domain/services/financialDetails'
import IFinancialDetailsRepository from '../../domain/repositories/financialDetails'
import IPropertyRepository from '../../domain/repositories/property'
import IUuidGenerator from '../contracts/uuidGenerator'
import { ApplicationError } from '../../domain/error/application'
import { FinancialDetails } from '../../domain/entities/financialDetails'

@injectable()
export default class FinancialDetailsService implements IFinancialDetailsService {
    constructor(
        @inject('IFinancialDetailsRepository') private readonly financialDetailsRepository: IFinancialDetailsRepository,
        @inject('IPropertyRepository') private readonly propertyRepository: IPropertyRepository,
        @inject('IUuidGenerator') private readonly uuidGenerator: IUuidGenerator
    ){}

    async save(input: FinancialDetailsDTO.SaveFinancialDetailsInput): Promise<void> {
        const propertyExists = await this.propertyRepository.findById(input.propertyId)
        if (!propertyExists) throw new ApplicationError("This property doesn't exist", 400)
        const financialDetailsAlreadyExists = await this.financialDetailsRepository.findFinancialDetails(input.propertyId)
        if (financialDetailsAlreadyExists) throw new ApplicationError("The financial details for this property were already registered", 400)
        const financialDetails = new FinancialDetails()
        financialDetails.id = this.uuidGenerator.generate()
        financialDetails.propertyId = input.propertyId
        financialDetails.sale = input.sale
        financialDetails.rent = input.rent
        financialDetails.purchaseMethod = input.purchaseMethod
        financialDetails.saleCost = input.saleCost
        financialDetails.rentCost = input.rentCost
        financialDetails.purchasingDetails = input.purchasingDetails
        financialDetails.condominiumCost = input.condominiumCost
        financialDetails.iptuCost = input.iptuCost
        financialDetails.regularDocumentation = input.regularDocumentation
        financialDetails.documentationObservation = input.documentationObservation
        financialDetails.acceptsExchange = input.acceptsExchange

        await this.financialDetailsRepository.create(financialDetails)
    }

    async get(input: FinancialDetailsDTO.GetFinancialDetailsInput): Promise<FinancialDetailsDTO.GetFinancialDetailsOutput> {
        const propertyExists = await this.propertyRepository.findById(input.propertyId)
        if (!propertyExists) throw new ApplicationError("This property doesn't exist", 400)
        const financialDetails = await this.financialDetailsRepository.findFinancialDetails(input.propertyId)
        if (!financialDetails) throw new ApplicationError("The financial details for this property weren't already registered", 400)
        
        return {
            ...financialDetails
        }
    }

    async update(input: FinancialDetailsDTO.UpdateFinancialDetailsInput): Promise<void> {
        const propertyExists = await this.propertyRepository.findById(input.propertyId)
        if (!propertyExists) throw new ApplicationError("This property doesn't exist", 400)
        const financialDetails = await this.financialDetailsRepository.findFinancialDetails(input.propertyId)
        if (!financialDetails) throw new ApplicationError("The financial details for this property weren't already registered", 400)
 
        financialDetails.sale = input.sale
        financialDetails.rent = input.rent
        financialDetails.purchaseMethod = input.purchaseMethod
        financialDetails.saleCost = input.saleCost
        financialDetails.rentCost = input.rentCost
        financialDetails.purchasingDetails = input.purchasingDetails
        financialDetails.condominiumCost = input.condominiumCost
        financialDetails.iptuCost = input.iptuCost
        financialDetails.regularDocumentation = input.regularDocumentation
        financialDetails.documentationObservation = input.documentationObservation
        financialDetails.acceptsExchange = input.acceptsExchange

        await this.financialDetailsRepository.update(financialDetails)
    }

    async delete(input: FinancialDetailsDTO.DeleteFinancialDetailsInput): Promise<void> {
        const propertyExists = await this.propertyRepository.findById(input.propertyId)
        if (!propertyExists) throw new ApplicationError("This property doesn't exist", 400)
        const financialDetails = await this.financialDetailsRepository.findFinancialDetails(input.propertyId)
        if (!financialDetails) throw new ApplicationError("The financial details for this property weren't already registered", 400)
        
        await this.financialDetailsRepository.delete(input.propertyId)
    }
}