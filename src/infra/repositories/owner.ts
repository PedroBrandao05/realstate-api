import { inject, injectable } from "inversify";
import 'reflect-metadata'
import IOwnerRepository from "../../domain/repositories/owner";
import { Owner } from "../../domain/entities/owner";
import IDatabaseConnection from "../../application/contracts/databaseConnection";

@injectable()
export default class OwnerRepository implements IOwnerRepository {
    constructor (
        @inject('IDatabaseConnection') private readonly database: IDatabaseConnection
    ){}

    private toModel (data: any): Owner {
        const owner = new Owner()
        owner.id = data.id
        owner.email = data.email
        owner.name = data.name
        owner.phone = data.phone
        return owner
    }

    async findById(id: string): Promise<Owner> {
        const [data] = await this.database.query(`select * from owner where id = $1`, [id])
        return this.toModel(data)
    }

    async create(owner: Owner): Promise<void> {
        await this.database.query(`
        insert into owner (id, name, email, phone) 
        values ($1, $2, $3, $4)
        `, [owner.id, owner.name, owner.email, owner.phone])
    }

    async update(owner: Owner): Promise<void> {
        await this.database.query(`
        update owner
        set name = $1,
        email = $2,
        phone = $3
        where id = $4
        `, [owner.name, owner.email, owner.phone, owner.id])
    }

    async delete(id: string): Promise<void> {
        await this.database.query(`delete from owner where id = $1`, [id])
    }
}