import { inject, injectable } from "inversify";
import 'reflect-metadata'
import IUserRepository from "../../domain/repositories/user";
import { IDatabaseDriver } from "../../application/contracts/databaseDriver";
import { User } from "../../domain/entities/user";

@injectable()
export default class UserRepository implements IUserRepository {
    constructor (
        @inject('IDatabaseDriver') private readonly database: IDatabaseDriver
    ){
        database.initQuery = `create table user ( 
            id varchar(36) not null primary key, 
            name varchar(50) not null, 
            email varchar(50) not null, 
            password varchar(50) not null,
            creci varchar(15) not null,
            phone int not null
            );`
        database.dropQuery = 'drop table user'
        database.connect()
    }

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
        await this.database.run(`
        insert into user (id, name, email, password, phone)
        values ('${user.id}', '${user.name}', '${user.email}', '${user.password}', ${user.phone})
        `)
    }

    async findByEmail(email: string): Promise<User | null> {
        const [user] = await this.database.get(`select * from user where email = '${email}'`)
        if (!user) return null
        return this.toModel(user)
    }
}