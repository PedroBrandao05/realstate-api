import Sinon from "sinon";
import IInfrastructureDetailsService, { InfrastructureDetailsDTO } from "../../../src/domain/services/infrastructureDetails";
import { iocContainer } from "../../../src/presentation/ioc";
import InfrastructureDetailsRepository from "../../../src/infra/repositories/infrastructureDetails";
import IDatabaseConnection from "../../../src/application/contracts/databaseConnection";

let sutInfrastructureDetails: IInfrastructureDetailsService
let connection: IDatabaseConnection

beforeAll(async () => {
    sutInfrastructureDetails = iocContainer.get<IInfrastructureDetailsService>('IInfrastructureDetailsService')
    connection = iocContainer.get<IDatabaseConnection>('IDatabaseConnection')
})

describe("InfrastructureDetailsService related tests", () => {
    it("should save an infrastructure detail", async () => {
        const spy = Sinon.spy(InfrastructureDetailsRepository.prototype, 'create')
        const input : InfrastructureDetailsDTO.SaveInfrastructureDetailsInput = {
            propertyId: '9cecf926-5ed9-43ea-a7c6-31a0643132c9',
            propertyType: 'Casa',
            propertySubtype: 'Sobrado',
            bathrooms: 2,
            sleepingRooms: 2,
            garageSpots: 1,
            area: 62
        }

        await sutInfrastructureDetails.save(input)
        expect(spy.calledOnce).toBeTruthy()
    })

    it("should get an infrastructure detail", async () => {
        const spy = Sinon.spy(InfrastructureDetailsRepository.prototype, 'findInfrastructureDetails')
        const input : InfrastructureDetailsDTO.GetInfrastructureDetailsInput = {
            propertyId: '9cecf926-5ed9-43ea-a7c6-31a0643132c9',
        }

        await sutInfrastructureDetails.get(input)
        expect(spy.calledOnce).toBeTruthy()
    })

    it("should update an infrastructure detail", async () => {
        const spy = Sinon.spy(InfrastructureDetailsRepository.prototype, 'update')
        const input : InfrastructureDetailsDTO.UpdateInfrastructureDetailsInput = {
            propertyId: '9cecf926-5ed9-43ea-a7c6-31a0643132c9',
            propertyType: 'Casa',
            propertySubtype: 'Sobrado',
            bathrooms: 2,
            sleepingRooms: 2,
            garageSpots: 1,
            area: 62
        }

        await sutInfrastructureDetails.update(input)
        expect(spy.calledOnce).toBeTruthy()
    })

    it("should delete an infrastructure detail", async () => {
        const spy = Sinon.spy(InfrastructureDetailsRepository.prototype, 'delete')
        const input : InfrastructureDetailsDTO.DeleteInfrastructureDetailsInput = {
            propertyId: '9cecf926-5ed9-43ea-a7c6-31a0643132c9',
        }

        await sutInfrastructureDetails.delete(input)
        expect(spy.calledOnce).toBeTruthy()
    })
})

afterAll(async () => {
    await connection.close()
})