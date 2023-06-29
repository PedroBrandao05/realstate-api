import { Container } from "inversify";
import 'reflect-metadata'
import IUuidGenerator from "../application/contracts/uuidGenerator";
import IdGenerator from "../infra/utils/uuid";

const iocContainer = new Container()
iocContainer.bind<IUuidGenerator>('IUuidGenerator').to(IdGenerator)

export { iocContainer }