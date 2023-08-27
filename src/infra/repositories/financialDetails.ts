import 'reflect-metadata'
import {inject, injectable} from 'inversify'
import IFinancialDetailsRepository from '../../domain/repositories/financialDetails'
import IDatabaseConnection from '../../application/contracts/databaseConnection'
import { FinancialDetails, PurchaseMethods } from '../../domain/entities/financialDetails'

@injectable()
export default class FinancialDetailsRepository implements IFinancialDetailsRepository {
    constructor(
        @inject('IDatabaseConnection') private readonly database: IDatabaseConnection
    ){}

    private toModel(data: any): FinancialDetails{
        const financialDetails = new FinancialDetails()
        financialDetails.id = data.id
        financialDetails.propertyId = data.property_id
        financialDetails.sale = data.sale
        financialDetails.rent = data.rent
        financialDetails.purchaseMethod = data.purchase_method
        financialDetails.saleCost = data.sale_cost
        financialDetails.rentCost = data.rent_cost
        financialDetails.purchasingDetails = data.purchasing_details
        financialDetails.condominiumCost = data.condominium_cost
        financialDetails.iptuCost = data.iptu_cost
        financialDetails.regularDocumentation = data.regular_documentation
        financialDetails.documentationObservation = data.documentation_observation
        financialDetails.acceptsExchange = data.accepts_exchange
        return financialDetails
    }

    async create(financialDetails: FinancialDetails): Promise<void> {
        await this.database.query(`
        insert into financial_details (id, property_id, sale, rent, purchase_method, sale_cost, rent_cost, purchasing_details, condominium_cost, iptu_cost, regular_documentation, documentation_observation, accepts_exchange) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`, 
        [financialDetails.id, financialDetails.propertyId, financialDetails.sale, financialDetails.rent, financialDetails.purchaseMethod, financialDetails.saleCost, financialDetails.rentCost, financialDetails.purchasingDetails, financialDetails.condominiumCost, financialDetails.iptuCost, financialDetails.regularDocumentation, financialDetails.documentationObservation, financialDetails.acceptsExchange]
        )
    }

    async findFinancialDetails(propertyId: string): Promise<FinancialDetails | undefined> {
        const [financialDetails] = await this.database.query('select * from financial_details where property_id = $1', [propertyId])
        if (!financialDetails) return
        return this.toModel(financialDetails)
    }

    async findOnesOnSale(): Promise<FinancialDetails[]> {
        const financialDetails = await this.database.query('select * from financial_details where sale = $1', [true])
        if (!financialDetails.length) return []
        return financialDetails.map(financialDetail => this.toModel(financialDetail))
    }

    async findOnesOnRent(): Promise<FinancialDetails[]> {
        const financialDetails = await this.database.query('select * from financial_details where rent = $1', [true])
        if (!financialDetails.length) return []
        return financialDetails.map(financialDetail => this.toModel(financialDetail))
    }

    async findByRentCost(max: number, min: number): Promise<FinancialDetails[]> {
        const financialDetails = await this.database.query('select * from financial_details where rent_cost >= $1 and rent_cost <= $2', [min, max])
        if (!financialDetails.length) return []
        return financialDetails.map(financialDetail => this.toModel(financialDetail))
    }

    async findBySaleCost(max: number, min: number): Promise<FinancialDetails[]> {
        const financialDetails = await this.database.query('select * from financial_details where sale_cost >= $1 and sale_cost <= $2', [min, max])
        if (!financialDetails.length) return []
        return financialDetails.map(financialDetail => this.toModel(financialDetail))
    }

    async findExchangeableOnes(): Promise<FinancialDetails[]> {
        const financialDetails = await this.database.query('select * from financial_details where accepts_exchange = $1', [true])
        if (!financialDetails.length) return []
        return financialDetails.map(financialDetail => this.toModel(financialDetail))
    }

    async findFinanciableOnes(): Promise<FinancialDetails[]> {
        const financialDetails = await this.database.query('select * from financial_details where purchase_method = $1', [PurchaseMethods.FINANCING])
        if (!financialDetails.length) return []
        return financialDetails.map(financialDetail => this.toModel(financialDetail))
    }

    async update(financialDetails: FinancialDetails): Promise<void> {
        await this.database.query(`update financial_details
        set sale = $1, rent = $2, purchase_method = $3, sale_cost = $4, rent_cost = $5, purchasing_details = $6, condominium_cost = $7, iptu_cost = $8, regular_documentation = $9, documentation_observation = $10, accepts_exchange = $11
        where property_id = $12`, [financialDetails.sale, financialDetails.rent, financialDetails.purchaseMethod, financialDetails.saleCost, financialDetails.rentCost, financialDetails.purchasingDetails, financialDetails.condominiumCost, financialDetails.iptuCost, financialDetails.regularDocumentation, financialDetails.documentationObservation, financialDetails.acceptsExchange, financialDetails.propertyId])
    }

    async delete(id: string): Promise<void> {
        await this.database.query('delete from financial_details where property_id = $1', [id])
    }
}