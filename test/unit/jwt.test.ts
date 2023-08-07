import IJwt from "../../src/application/contracts/jwt"
import { iocContainer } from "../../src/presentation/ioc"

describe('jwt related tests', () => {

    it('should generate a token', () => {
        const TokenGenerator = iocContainer.get<IJwt>('IJwt')
        const payload = {
            name: 'Antonio fernandes',
            email: 'antoniofernandes@email.com',
            phone: 11998445677
        }

        const token = TokenGenerator.generate(payload)

        expect(token).toBeTruthy()
    })

    it('should return a payload', () => {
        const TokenGenerator = iocContainer.get<IJwt>('IJwt')
        const payload = {
            name: 'Antonio fernandes',
            email: 'antoniofernandes@email.com',
            phone: 11998445677
        }

        const token = TokenGenerator.generate(payload)

        const session = TokenGenerator.verify(token)

        expect({email: session.email, name: session.name, phone: session.phone}).toStrictEqual(payload)
    })
})