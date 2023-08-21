import convertDateToString from "../../src/application/utils/convertDateToString"

it('should convert it to the right format', () => {
    const date = new Date('2023-08-21')
    expect(convertDateToString(date)).toBe("21/08/2023")
})