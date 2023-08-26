import Sinon from "sinon";
import IDatabaseConnection from "../../../src/application/contracts/databaseConnection";
import IFeaturesService, { FeaturesServiceDTO } from "../../../src/domain/services/features";
import { iocContainer } from "../../../src/presentation/ioc";
import FeaturesRepository from "../../../src/infra/repositories/features";
import { FeatureType } from "../../../src/domain/entities/features";

let sutFeatures: IFeaturesService
const connection = iocContainer.get<IDatabaseConnection>('IDatabaseConnection')

beforeAll(async () => {
    sutFeatures = iocContainer.get<IFeaturesService>('IFeaturesService')
})

describe("features service related tests", () => {
    it("should save a new feature", async () => {
        const spy = Sinon.spy(FeaturesRepository.prototype, 'create')
        const input : FeaturesServiceDTO.SaveFeatureInput = {
            type: FeatureType.REAL_STATE,
            description: 'playground'
        }
        await sutFeatures.save(input)
        expect(spy.calledOnce).toBeTruthy()
    })

    it("should update a feature", async () => {
        const spy = Sinon.spy(FeaturesRepository.prototype, 'update')
        const input : FeaturesServiceDTO.UpdateFeatureInput = {
            id: "12fb07f3-cdad-4a76-9959-22874371f8e5",
            type: FeatureType.REAL_STATE,
            description: 'barbecue place'
        }
        await sutFeatures.update(input)
        expect(spy.calledOnce).toBeTruthy()
    })

    it("should get all features", async () => {
        const spy = Sinon.spy(FeaturesRepository.prototype, 'findAllFeatures')
        await sutFeatures.getAll()
        expect(spy.calledOnce).toBeTruthy()
    })

    it("should get a feature", async () => {
        const spy = Sinon.spy(FeaturesRepository.prototype, 'findById')
        const input : FeaturesServiceDTO.GetFeatureInput = {
            featureId: "12fb07f3-cdad-4a76-9959-22874371f8e5",
        }
        await sutFeatures.getById(input)
        expect(spy.calledOnce).toBeTruthy()
    })

    it("should delete a feature", async () => {
        const spy = Sinon.spy(FeaturesRepository.prototype, 'delete')
        const input : FeaturesServiceDTO.DeleteFeatureInput = {
            id: "12fb07f3-cdad-4a76-9959-22874371f8e5",
        }
        await sutFeatures.delete(input)
        expect(spy.calledOnce).toBeTruthy()
    })
})

afterAll(async () => {
    await connection.close()
})