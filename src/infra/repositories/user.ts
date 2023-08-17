import { inject, injectable } from "inversify";
import 'reflect-metadata'
import IUserRepository from "../../domain/repositories/user";
import { User } from "../../domain/entities/user";
import IDatabaseConnection from "../../application/contracts/databaseConnection";

@injectable()
export default class UserRepository implements IUserRepository {
    constructor (
        @inject('IDatabaseConnection') private readonly database: IDatabaseConnection
    ){}

    private toModel (data: any): User {
        const user = new User()
        user.id = data.id
        user.email = data.email
        user.name = data.name
        user.phone = data.phone
        user.password = data.password
        user.creci = data.creci
        return user
    }

    async create(user: User): Promise<void> {
        await this.database.query('insert into users (id, name, email, password, phone, creci ) values ($1, $2, $3, $4, $5, $6)', [user.id, user.name, user.email, user.password, user.phone, user.creci])
    }

    async findByEmail(email: string): Promise<User | null> {
        const [user] = await this.database.query('select * from users where email = $1', [email])
        if (!user) return null
        return this.toModel(user)
    }
}