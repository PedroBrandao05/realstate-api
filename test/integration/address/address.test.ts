import Sinon from "sinon";
import IAddressService, { AddressServiceDTO } from "../../../src/domain/services/address";
import { iocContainer } from "../../../src/presentation/ioc";
import AddressRepository from "../../../src/infra/repositories/address";
import IDatabaseConnection from "../../../src/application/contracts/databaseConnection";

let sutAddress: IAddressService
let connection: IDatabaseConnection

beforeAll(async () => {
    sutAddress = iocContainer.get<IAddressService>('IAddressService')
    connection = iocContainer.get<IDatabaseConnection>('IDatabaseConnection')
})

describe("AddressService related tests", () => {
    it("should save an address", async () => {
        const spy = Sinon.spy(AddressRepository.prototype, 'create')
        const input : AddressServiceDTO.SaveAddressInput = {
            propertyId: '9cecf926-5ed9-43ea-a7c6-31a0643132c9',
            cep: "08230020",
            state: "São Paulo",
            city: "São Paulo",
            street: "Rua Francisco Rodrigues Seckler",
            district: "Vila Taquari",
            number: "111",
            complement: "Apto 91B",
        }

        await sutAddress.save(input)
        expect(spy.calledOnce).toBeTruthy()
    })

    it("should get an address", async () => {
        const spy = Sinon.spy(AddressRepository.prototype, 'findAddressByPropertyId')
        const input : AddressServiceDTO.GetAddressInput = {
            propertyId: '9cecf926-5ed9-43ea-a7c6-31a0643132c9',
        }

        await sutAddress.get(input)
        expect(spy.calledOnce).toBeTruthy()
    })

    it("should update an address", async () => {
        const spy = Sinon.spy(AddressRepository.prototype, 'update')
        const input : AddressServiceDTO.UpdateAddressInput = {
            propertyId: '9cecf926-5ed9-43ea-a7c6-31a0643132c9',
            cep: "08230020",
            state: "São Paulo",
            city: "São Paulo",
            street: "Rua Francisco Rodrigues Seckler",
            district: "Vila Taquari",
            number: "111",
            complement: "Apto 91B",
        }

        await sutAddress.update(input)
        expect(spy.calledOnce).toBeTruthy()
    })

    it.skip("should delete an address", async () => {
        const spy = Sinon.spy(AddressRepository.prototype, 'delete')
        const input : AddressServiceDTO.DeleteAddressInput = {
            propertyId: '9cecf926-5ed9-43ea-a7c6-31a0643132c9',
        }

        await sutAddress.delete(input)
        expect(spy.calledOnce).toBeTruthy()
    })
})

afterAll(async () => {
    await connection.close()
})