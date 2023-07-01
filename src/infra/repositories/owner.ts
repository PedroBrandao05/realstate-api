import { inject, injectable } from "inversify";
import 'reflect-metadata'
import IOwnerRepository from "../../domain/repositories/owner";
import { Owner } from "../../domain/entities/owner";
import { IDatabaseDriver } from "../../application/contracts/databaseDriver";

@injectable()
export default class OwnerRepository implements IOwnerRepository {
    constructor (
        @inject('IDatabaseDriver') private readonly database: IDatabaseDriver
    ){}

    private toModel (data: any): Owner {
        const owner = new Owner()
        owner.id = data.id
        owner.email = data.email
        owner.name = data.name
        owner.phone = data.phone
        return owner
    }

    async findByEmail(email: string): Promise<Owner> {
        const [data] = await this.database.run(`select * from owner where email = '${email}'`)
        return this.toModel(data)
    }

    async create(owner: Owner): Promise<Owner> {
        const [data] = await this.database.run(`
        insert into owner (id, name, email, phone) 
        values ('${owner.id}', '${owner.name}', '${owner.email}', ${owner.phone})
        `)
        return this.toModel(data)
    }

    async update(owner: Owner): Promise<Owner> {
        const [data] = await this.database.run(`
        update owner
        set name = '${owner.name}',
        set email = '${owner.email}',
        set phone = ${owner.phone}
        where id = '${owner.id}'
        `)
        return this.toModel(data)
    }

    async delete(id: string): Promise<void> {
        await this.database.run(`delete from owner where id = '${id}'`)
    }
}