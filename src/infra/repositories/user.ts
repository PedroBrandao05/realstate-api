import { inject, injectable } from "inversify";
import 'reflect-metadata'
import IUserRepository from "../../domain/repositories/user";
import { IDatabaseDriver } from "../../application/contracts/databaseDriver";
import { User } from "../../domain/entities/user";

@injectable()
export default class UserRepository implements IUserRepository {
    constructor (
        @inject('IDatabaseDriver') private readonly database: IDatabaseDriver
    ){}

    private toModel (data: any): User {
        const user = new User()
        user.id = data.id
        user.email = data.email
        user.name = data.name
        user.phone = data.phone
        user.password = data.password
        return user
    }

    async create(user: User): Promise<void> {
        await this.database.run(`
        insert into user (id, name, email, password, phone)
        values ('${user.id}', '${user.name}', '${user.email}', '${user.password}', ${user.phone})
        `)
    }

    async findByEmail(email: string): Promise<User> {
        const [user] = await this.database.run(`select * from user where email = '${email}'`)
        return this.toModel(user)
    }
}