import axios from "axios";
import { Filter, FilterOptions } from "../../../src/domain/usecases/propertyPresentation";

axios.defaults.validateStatus = function () {
    return true
}

describe("API tests", () => {

    it("should get a detailed property", async () => {
        const propertyId = "9cecf926-5ed9-43ea-a7c6-31a0643132c9"
        const response = await axios.get(`http://localhost:3000/detailed-property/${propertyId}`)
        console.log(response.data)
        expect(response.status).toBe(200)
    })

    it("should get all presentation properties", async () => {
        const response = await axios.get(`http://localhost:3000/presentation-properties`)
        console.log(response.data)
        expect(response.status).toBe(200)
    })

    it("should get filtered presentation properties", async () => {
        const filters : Filter[] = [] 
        filters.push({option: FilterOptions.DISTRICT, value: "Vila Taquari"})
        const response = await axios.post(`http://localhost:3000/filtered-presentation-properties`, {filters})
        console.log(response.data)
        expect(response.status).toBe(200)
    })
})