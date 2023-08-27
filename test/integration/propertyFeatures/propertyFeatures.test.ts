import Sinon from "sinon";
import IDatabaseConnection from "../../../src/application/contracts/databaseConnection";
import IPropertyFeaturesService, { PropertyFeaturesServiceDTO } from "../../../src/domain/services/propertyFeatures";
import { iocContainer } from "../../../src/presentation/ioc";
import PropertyFeaturesRepository from "../../../src/infra/repositories/propertyFeatures";

let sutPropertyFeatures : IPropertyFeaturesService
const connection = iocContainer.get<IDatabaseConnection>('IDatabaseConnection')

beforeAll(async () => {
    sutPropertyFeatures = iocContainer.get<IPropertyFeaturesService>('IPropertyFeaturesService')
})

describe("Property Features service related tests", () => {
    it("should save a property feature", async () => {
        const spy = Sinon.spy(PropertyFeaturesRepository.prototype, 'create')
        const input : PropertyFeaturesServiceDTO.SavePropertyFeatureInput = {
            propertyId: "9cecf926-5ed9-43ea-a7c6-31a0643132c9",
            featureId: "f51914de-27b1-4ac2-aea8-6fc46d3a687d"
        }
        await sutPropertyFeatures.save(input)
        expect(spy.calledOnce).toBeTruthy()
    })

    it("should get all property features", async () => {
        const spy = Sinon.spy(PropertyFeaturesRepository.prototype, 'findByProperty')
        const input : PropertyFeaturesServiceDTO.GetAllPropertyFeaturesInput = {
            propertyId: "9cecf926-5ed9-43ea-a7c6-31a0643132c9",
        }
        await sutPropertyFeatures.getAll(input)
        expect(spy.calledOnce).toBeTruthy()
    })

    it("should remove a property feature", async () => {
        const spy = Sinon.spy(PropertyFeaturesRepository.prototype, 'delete')
        const input : PropertyFeaturesServiceDTO.RemovePropertyFeatureInput = {
            propertyFeatureId: "7cc51dfb-63b6-4551-97f5-defdebfa0831"
        }
        await sutPropertyFeatures.remove(input)
        expect(spy.calledOnce).toBeTruthy()
    })
})

afterAll(async () => {
    await connection.close()
})