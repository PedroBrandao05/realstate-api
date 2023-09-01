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
import { IAuthService } from "../domain/services/auth";
import AuthService from "../application/services/auth";
import IUserRepository from "../domain/repositories/user";
import UserRepository from "../infra/repositories/user";
import IPropertyRepository from "../domain/repositories/property";
import PropertyRepository from "../infra/repositories/property";
import IFeaturesRepository from "../domain/repositories/features";
import FeaturesRepository from "../infra/repositories/features";
import IPropertyFeaturesRepository from "../domain/repositories/propertyFeatures";
import PropertyFeaturesRepository from "../infra/repositories/propertyFeatures";
import IJwt from "../application/contracts/jwt";
import Jwt from "../infra/utils/jwt";
import IDatabaseConnection from "../application/contracts/databaseConnection";
import PgPromiseAdapter from "../infra/db/postgre";
import IHTTPServer from "../application/contracts/httpServer";
import ExpressAdapter from "../infra/http/express";
import ITicketRepository from "../domain/repositories/ticket";
import TicketRepository from "../infra/repositories/ticket";
import { IMailer } from "../application/contracts/mailer";
import Mailer from "../infra/mailer/nodemailer";
import IMediaHandler from "../application/contracts/mediaHandler";
import Multer from "../infra/mediaHandler/multer";
import IStorage from "../application/contracts/storage";
import S3Storage from "../infra/storage/S3";
import IPropertyService from "../domain/services/property";
import PropertyService from "../application/services/property";
import IInfrastructureDetailsRepository from "../domain/repositories/infrastructureDetails";
import InfrastructureDetailsRepository from "../infra/repositories/infrastructureDetails";
import IInfrastructureDetailsService from "../domain/services/infrastructureDetails";
import InfrastructureDetailsService from "../application/services/infrastructureDetails";
import IFinancialDetailsRepository from "../domain/repositories/financialDetails";
import FinancialDetailsRepository from "../infra/repositories/financialDetails";
import IFinancialDetailsService from "../domain/services/financialDetails";
import FinancialDetailsService from "../application/services/financialDetails";
import IAddressRepository from "../domain/repositories/address";
import AddressRepository from "../infra/repositories/address";
import IAddressService from "../domain/services/address";
import AddressService from "../application/services/address";
import IFeaturesService from "../domain/services/features";
import FeaturesService from "../application/services/features";
import IPropertyFeaturesService from "../domain/services/propertyFeatures";
import PropertyFeaturesService from "../application/services/propertyFeatures";
import IPropertyPresentationUsecase from "../domain/usecases/propertyPresentation";
import PropertyPresentationUsecase from "../application/usecases/propertyPresentation";

const iocContainer = new Container()
iocContainer.bind<IUuidGenerator>('IUuidGenerator').to(IdGenerator)
iocContainer.bind<IHasher>('IHasher').to(Hasher)
iocContainer.bind<IOwnerRepository>('IOwnerRepository').to(OwnerRepository)
iocContainer.bind<IOwnerService>('IOwnerService').to(OwnerService)
iocContainer.bind<IDatabaseConnection>('IDatabaseConnection').to(PgPromiseAdapter)
iocContainer.bind<IUserRepository>('IUserRepository').to(UserRepository)
iocContainer.bind<IAuthService>('IAuthService').to(AuthService)
iocContainer.bind<IPropertyRepository>('IPropertyRepository').to(PropertyRepository)
iocContainer.bind<IPropertyService>('IPropertyService').to(PropertyService)
iocContainer.bind<IFeaturesRepository>('IFeaturesRepository').to(FeaturesRepository)
iocContainer.bind<IPropertyFeaturesRepository>('IPropertyFeaturesRepository').to(PropertyFeaturesRepository)
iocContainer.bind<IJwt>('IJwt').to(Jwt)
iocContainer.bind<IHTTPServer>('IHTTPServer').to(ExpressAdapter)
iocContainer.bind<ITicketRepository>('ITicketRepository').to(TicketRepository)
iocContainer.bind<IMailer>('IMailer').to(Mailer)
iocContainer.bind<IMediaHandler>('IMediaHandler').to(Multer)
iocContainer.bind<IStorage>('IStorage').to(S3Storage)
iocContainer.bind<IInfrastructureDetailsRepository>('IInfrastructureDetailsRepository').to(InfrastructureDetailsRepository)
iocContainer.bind<IInfrastructureDetailsService>('IInfrastructureDetailsService').to(InfrastructureDetailsService)
iocContainer.bind<IFinancialDetailsRepository>('IFinancialDetailsRepository').to(FinancialDetailsRepository)
iocContainer.bind<IFinancialDetailsService>('IFinancialDetailsService').to(FinancialDetailsService)
iocContainer.bind<IAddressRepository>('IAddressRepository').to(AddressRepository)
iocContainer.bind<IAddressService>('IAddressService').to(AddressService)
iocContainer.bind<IFeaturesService>('IFeaturesService').to(FeaturesService)
iocContainer.bind<IPropertyFeaturesService>('IPropertyFeaturesService').to(PropertyFeaturesService)
iocContainer.bind<IPropertyPresentationUsecase>('IPropertyPresentationUsecase').to(PropertyPresentationUsecase)

export { iocContainer }