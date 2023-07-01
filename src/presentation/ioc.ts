import { Container } from "inversify";
import 'reflect-metadata'
import IUuidGenerator from "../application/contracts/uuidGenerator";
import IdGenerator from "../infra/utils/uuid";
import { IOwnerService } from "../domain/services/owner";
import OwnerService from "../application/services/owner";
import { IDatabaseDriver } from "../application/contracts/databaseDriver";
import DatabaseDriver from "../infra/db/driver";
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

const iocContainer = new Container()
iocContainer.bind<IUuidGenerator>('IUuidGenerator').to(IdGenerator)
iocContainer.bind<IHasher>('IHasher').to(Hasher)
iocContainer.bind<IOwnerRepository>('IOwnerRepository').to(OwnerRepository)
iocContainer.bind<IOwnerService>('IOwnerService').to(OwnerService)
iocContainer.bind<IDatabaseDriver>('IDatabaseDrive').to(DatabaseDriver)
iocContainer.bind<IUserRepository>('IUserRepository').to(UserRepository)
iocContainer.bind<IUserService>('IUserService').to(UserService)
iocContainer.bind<IPropertyRepository>('IPropertyRepository').to(PropertyRepository)
iocContainer.bind<IFeatureRepository>('IFeatureRepository').to(FeatureRepository)

export { iocContainer }