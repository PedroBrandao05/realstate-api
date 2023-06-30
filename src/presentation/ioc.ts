import { Container } from "inversify";
import 'reflect-metadata'
import IUuidGenerator from "../application/contracts/uuidGenerator";
import IdGenerator from "../infra/utils/uuid";
import { IOwnerService } from "../domain/services/owner";
import OwnerService from "../application/services/owner";

const iocContainer = new Container()
iocContainer.bind<IUuidGenerator>('IUuidGenerator').to(IdGenerator)
iocContainer.bind<IOwnerService>('IOwnerService').to(OwnerService)

export { iocContainer }