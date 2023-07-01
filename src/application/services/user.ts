import { injectable, inject } from "inversify";
import 'reflect-metadata'
import { IUserService, UserServiceDTO } from "../../domain/services/user";
import IUserRepository from "../../domain/repositories/user";
import IUuidGenerator from "../contracts/uuidGenerator";
import IHasher from "../contracts/hasher";
import { ApplicationError } from "../../domain/error/application";
import { User } from "../../domain/entities/user";

@injectable()
export default class UserService implements IUserService {
    constructor (
      @inject('IUserRepository') private readonly userRepository: IUserRepository,
      @inject('IUuidGenerator') private readonly uuidGenerator: IUuidGenerator,
      @inject('IHasher') private readonly hasher: IHasher  
    ){}

    async signup(input: UserServiceDTO.signupInput): Promise<void> {
        const exists = await this.userRepository.findByEmail(input.email)
        if (exists) throw new ApplicationError('This user already exists', 403)
        const user = new User()
        user.id = this.uuidGenerator.generate()
        user.email = input.email
        user.name = input.name
        user.password = this.hasher.encrypt(input.password)
        user.phone = input.phone
        await this.userRepository.create(user)
    }

    async signin(input: UserServiceDTO.signupInput): Promise<UserServiceDTO.signinOutput> {
        const exists = await this.userRepository.findByEmail(input.email)
        if (!exists) throw new ApplicationError('Email or password are wrongs', 403)
        const passwordMatches = this.hasher.compare(input.password, exists.password)
        if (!passwordMatches) throw new ApplicationError('Email or password are wrong', 403)
        return {
            email: exists.email,
            name: exists.name,
            phone: exists.phone,
        }
    }
}