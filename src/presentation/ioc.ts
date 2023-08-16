import { Container } from "inversify";
import 'reflect-metadata'
import IUuidGenerator from "../application/contracts/uuidGenerator";
import IdGenerator from "../infra/utils/uuid";
import { IOwnerService } from "../domain/services/owner";
import OwnerService from "../application/services/owner";
import IHasher from "../application/contracts/hasher";
import { Hasher } from "../infra/cryptograph/hasher";
import IOwnerRepository from "../domain/repositories/owner";
import OwnerRepository from "../infra/repositories/owner";
import { IUserService } from "../domain/services/user";
import UserService from "../application/services/user";
import IUserRepository from "../domain/repositories/user";
import UserRepository from "../infra/repositories/user";
import IPropertyRepository from "../domain/repositories/property";
import PropertyRepository from "../infra/repositories/property";
import IFeatureRepository from "../domain/repositories/feature";
import FeatureRepository from "../infra/repositories/features";
import IPropertyFeaturesRepository from "../domain/repositories/propertyFeatures";
import PropertyFeaturesRepository from "../infra/repositories/propertyFeatures";
import IJwt from "../application/contracts/jwt";
import Jwt from "../infra/utils/jwt";
import IDatabaseConnection from "../application/contracts/databaseConnection";
import PgPromiseAdapter from "../infra/db/postgre";

const iocContainer = new Container()
iocContainer.bind<IUuidGenerator>('IUuidGenerator').to(IdGenerator)
iocContainer.bind<IHasher>('IHasher').to(Hasher)
iocContainer.bind<IOwnerRepository>('IOwnerRepository').to(OwnerRepository)
iocContainer.bind<IOwnerService>('IOwnerService').to(OwnerService)
iocContainer.bind<IDatabaseConnection>('IDatabaseConnection').to(PgPromiseAdapter)
iocContainer.bind<IUserRepository>('IUserRepository').to(UserRepository)
iocContainer.bind<IUserService>('IUserService').to(UserService)
iocContainer.bind<IPropertyRepository>('IPropertyRepository').to(PropertyRepository)
iocContainer.bind<IFeatureRepository>('IFeatureRepository').to(FeatureRepository)
iocContainer.bind<IPropertyFeaturesRepository>('IPropertyFeaturesRepository').to(PropertyFeaturesRepository)
iocContainer.bind<IJwt>('IJwt').to(Jwt)

export { iocContainer }