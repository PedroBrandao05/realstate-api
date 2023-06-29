import { Hasher } from "../src/infra/cryptograph/hasher"

describe('Cryptograph related validations', () => {
    it('Must return false', () => {
        const hasher = new Hasher()
        const password = "test123"
        const encryptedPassowrd = hasher.encrypt(password)
        expect(hasher.compare("test1234", encryptedPassowrd)).toBeFalsy()
    })
    it('Must return true', () => {
        const hasher = new Hasher()
        const password = "test123"
        const encryptedPassowrd = hasher.encrypt(password)
        expect(hasher.compare(password, encryptedPassowrd)).toBeTruthy()
    })
})