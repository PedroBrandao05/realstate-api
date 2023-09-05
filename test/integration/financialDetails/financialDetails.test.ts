import Sinon from "sinon";
import IFinancialDetailsService, { FinancialDetailsDTO } from "../../../src/domain/services/financialDetails";
import { iocContainer } from "../../../src/presentation/ioc";
import FinancialDetailsRepository from "../../../src/infra/repositories/financialDetails";
import IDatabaseConnection from "../../../src/application/contracts/databaseConnection";
import { PurchaseMethods } from "../../../src/domain/entities/financialDetails";

let sutFinancialDetails: IFinancialDetailsService
let connection: IDatabaseConnection

beforeAll(async () => {
    sutFinancialDetails = iocContainer.get<IFinancialDetailsService>('IFinancialDetailsService')
    connection = iocContainer.get<IDatabaseConnection>('IDatabaseConnection')
})

describe("FinancialDetailsService related tests", () => {
    it("should save an financial detail", async () => {
        const spy = Sinon.spy(FinancialDetailsRepository.prototype, 'create')
        const input : FinancialDetailsDTO.SaveFinancialDetailsInput = {
            propertyId: '9cecf926-5ed9-43ea-a7c6-31a0643132c9',
            sale: true,
            rent: true,
            purchaseMethod: PurchaseMethods.CASH,
            saleCost: 300,
            rentCost: 300,
            purchasingDetails: "some detail",
            condominiumCost: 300,
            iptuCost: 300,
            regularDocumentation: true,
            documentationObservation: "some observation",
            acceptsExchange: true,
        }

        await sutFinancialDetails.save(input)
        expect(spy.calledOnce).toBeTruthy()
    })

    it("should get an financial detail", async () => {
        const spy = Sinon.spy(FinancialDetailsRepository.prototype, 'findFinancialDetails')
        const input : FinancialDetailsDTO.GetFinancialDetailsInput = {
            propertyId: '9cecf926-5ed9-43ea-a7c6-31a0643132c9',
        }

        await sutFinancialDetails.get(input)
        expect(spy.calledOnce).toBeTruthy()
    })

    it("should update an financial detail", async () => {
        const spy = Sinon.spy(FinancialDetailsRepository.prototype, 'update')
        const input : FinancialDetailsDTO.UpdateFinancialDetailsInput = {
            propertyId: '9cecf926-5ed9-43ea-a7c6-31a0643132c9',
            sale: true,
            rent: false,
            purchaseMethod: PurchaseMethods.CASH,
            saleCost: 0,
            rentCost: 0,
            purchasingDetails: "some detail",
            condominiumCost: 300,
            iptuCost: 300,
            regularDocumentation: true,
            documentationObservation: "some observation",
            acceptsExchange: true,
        }

        await sutFinancialDetails.update(input)
        expect(spy.calledOnce).toBeTruthy()
    })

    it.skip("should delete an financial detail", async () => {
        const spy = Sinon.spy(FinancialDetailsRepository.prototype, 'delete')
        const input : FinancialDetailsDTO.DeleteFinancialDetailsInput = {
            propertyId: '9cecf926-5ed9-43ea-a7c6-31a0643132c9',
        }

        await sutFinancialDetails.delete(input)
        expect(spy.calledOnce).toBeTruthy()
    })
})

afterAll(async () => {
    await connection.close()
})