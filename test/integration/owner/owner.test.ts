import Sinon from "sinon";
import IDatabaseConnection from "../../../src/application/contracts/databaseConnection";
import { IOwnerService, OwnerServiceDTO } from "../../../src/domain/services/owner";
import { iocContainer } from "../../../src/presentation/ioc";
import OwnerRepository from "../../../src/infra/repositories/owner";

let sutOwner : IOwnerService
let connection : IDatabaseConnection

beforeAll(async () => {
  sutOwner = iocContainer.get<IOwnerService>('IOwnerService')
  connection = iocContainer.get<IDatabaseConnection>('IDatabaseConnection')
})

describe.skip('Owner service related tests', () => {
    it('should create an owner', async () => {
        const spy = Sinon.spy(OwnerRepository.prototype, 'create')
        const owner : OwnerServiceDTO.createOwnerInput = {
            name: 'Sergio Barrios',
            email: 'sergiaobarrosmassa@gmail.com',
            phone: '11945587222'
        }  
        await sutOwner.createOwner(owner)
        expect(spy.calledOnce).toBeTruthy()
    })

    it('should return an owner', async () => {
        const spy = Sinon.spy(OwnerRepository.prototype, 'findById') 
        await sutOwner.findById({ownerId: 'a3b81d63-136e-4323-b494-a75fa055d559'})
        expect(spy.calledOnce).toBeTruthy()
    })

    it('should update an owner', async () => {
        const spy = Sinon.spy(OwnerRepository.prototype, 'update')
        const owner : OwnerServiceDTO.updateOwnerInput = {
            id: 'a3b81d63-136e-4323-b494-a75fa055d559',
            name: 'Sergio Barrios do Amaral',
            email: 'sergiaobarrosmassa@gmail.com',
            phone: '11945587222'
        }  
        await sutOwner.updateOwner(owner)
        expect(spy.calledOnce).toBeTruthy()
    })

    it('should delete an owner', async () => {
        const spy = Sinon.spy(OwnerRepository.prototype, 'delete') 
        await sutOwner.delete({ownerId: 'a3b81d63-136e-4323-b494-a75fa055d559'})
        expect(spy.calledOnce).toBeTruthy()
    })
})

afterAll(async () => {
    await connection.close()
})