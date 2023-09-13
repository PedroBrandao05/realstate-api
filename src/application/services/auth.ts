import { injectable, inject } from "inversify";
import 'reflect-metadata'
import { IAuthService, AuthServiceDTO } from "../../domain/services/auth";
import IUserRepository from "../../domain/repositories/user";
import IUuidGenerator from "../contracts/uuidGenerator";
import IHasher from "../contracts/hasher";
import { ApplicationError } from "../../domain/error/application";
import { User } from "../../domain/entities/user";
import IJwt from "../contracts/jwt";
import validateEmail from "../validation/leaves/validateEmail";
import { IMailer } from "../contracts/mailer";
import ITicketRepository from "../../domain/repositories/ticket";
import Ticket, { TICKET_SITUATIONS } from "../../domain/entities/ticket";

@injectable()
export default class AuthService implements IAuthService {
    constructor (
      @inject('IUserRepository') private readonly userRepository: IUserRepository,
      @inject('IUuidGenerator') private readonly uuidGenerator: IUuidGenerator,
      @inject('ITicketRepository') private readonly ticketRepository: ITicketRepository,
      @inject('IHasher') private readonly hasher: IHasher,
      @inject('IJwt') private readonly tokenGenerator: IJwt,
      @inject('IMailer') private readonly mailer: IMailer  
    ){}

    async signup(input: AuthServiceDTO.signupInput): Promise<void> {
        validateEmail(input.email)
        const exists = await this.userRepository.findByEmail(input.email)
        if (exists) throw new ApplicationError('This user already exists', 403)
        const user = new User()
        user.id = this.uuidGenerator.generate()
        user.email = input.email
        user.name = input.name
        user.password = this.hasher.encrypt(input.password)
        user.phone = input.phone
        user.creci = input.creci
        await this.userRepository.create(user)

        const ticket = new Ticket()
        ticket.id = this.uuidGenerator.generate()
        ticket.hash = this.hasher.encrypt(user.email)
        ticket.userId = user.id
        ticket.situation = TICKET_SITUATIONS.OPEN
        await this.ticketRepository.create(ticket)

        await this.mailer.send({
            to: user.email,
            template: 'email-verification',
            data: {
                hash: ticket.hash,
                name: user.name
            },
            subject: 'Verificação de Email'
        })
    }

    async signin(input: AuthServiceDTO.signinInput): Promise<AuthServiceDTO.signinOutput> {
        const exists = await this.userRepository.findByEmail(input.email)
        if (!exists) throw new ApplicationError('Email or password are wrongs', 403)

        const ticket = await this.ticketRepository.findByUser(exists.id)

        if (ticket?.situation == TICKET_SITUATIONS.OPEN) throw new ApplicationError("User must verify his email", 400)
        await this.ticketRepository.delete(ticket?.id!)

        const passwordMatches = this.hasher.compare(input.password, exists.password)
        if (!passwordMatches) throw new ApplicationError('Email or password are wrong', 403)
        
        const token = this.tokenGenerator.generate({email: exists.email, name: exists.name, phone: exists.phone})

        return {token, email: exists.email, phone: exists.phone, name: exists.name}
    }

    async refreshToken(input: AuthServiceDTO.refreshTokenInput): Promise<AuthServiceDTO.refreshTokenOutput> {
        const [ , splitedToken] = input.token.split(' ')
        const pastSession = this.tokenGenerator.verify(splitedToken)
        if (!pastSession) throw new ApplicationError("This token is invalid", 400)
        const exists = await this.userRepository.findByEmail(pastSession.email)
        if (!exists) throw new ApplicationError("User on session does not exist", 400)

        const token = this.tokenGenerator.generate({email: exists.email, name: exists.name, phone: exists.phone})

        return {token, email: exists.email, phone: exists.phone, name: exists.name}
    }
}