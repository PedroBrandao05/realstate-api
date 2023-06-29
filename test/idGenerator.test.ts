import IdGenerator from "../src/infra/utils/uuid"

describe('Uuid generator validations', () => {

    it('must return a valid string', () => {
        const generator = new IdGenerator()
        expect(typeof generator.generate()).toBe(typeof '')
    })
})