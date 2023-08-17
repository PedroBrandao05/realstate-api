import sinon from 'sinon'
import IDatabaseConnection from '../../../src/application/contracts/databaseConnection'
import { AuthServiceDTO, IAuthService } from '../../../src/domain/services/auth'
import { iocContainer } from '../../../src/presentation/ioc'
import UserRepository from '../../../src/infra/repositories/user'
import PgPromiseAdapter from '../../../src/infra/db/postgre'

let connection: IDatabaseConnection
let sutAuth: IAuthService

beforeAll(async () => {
    sutAuth = iocContainer.get<IAuthService>('IAuthService')
})

describe("user service related tests", () => {
    it("should signup a user", async () => {
        const spy = sinon.spy(UserRepository.prototype, 'create')
        const input : AuthServiceDTO.signupInput = {
            name: 'Ademir Cavalcante Araújo',
            email: 'ademircorretordeimoveis@gmail.com',
            password: 'senhalegal12',
            phone: 11993397691,
            creci: 'CRECI-F'
        }
        await sutAuth.signup(input)
        expect(spy.calledOnce).toBeTruthy()
        spy.restore()
    })
})

afterAll(async () => {
    await connection.close()
})