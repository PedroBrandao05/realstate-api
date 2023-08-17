import 'reflect-metadata'
import { inject, injectable } from 'inversify'
import ITicketRepository from '../../domain/repositories/ticket'
import IDatabaseConnection from '../../application/contracts/databaseConnection'
import Ticket, { TICKET_SITUATIONS } from '../../domain/entities/ticket'

@injectable()
export default class TicketRepository implements ITicketRepository {
    constructor (
        @inject('IDatabaseConnection') private readonly database: IDatabaseConnection
    ){}

    private toModel(data: any): Ticket {
        const ticket = new Ticket()
        ticket.id = data.id 
        ticket.hash = data.hash
        ticket.userId = data.user_id
        ticket.situation = data.situation
        return ticket
    }

    async create(ticket: Ticket): Promise<void> {
        await this.database.query('insert into tickets (id, hash, user_id, situation) values ($1, $2, $3, $4)', [ticket.id, ticket.hash, ticket.userId, ticket.situation])
    }

    async findByHash(hash: string): Promise<Ticket | undefined> {
        const [ticket] = await this.database.query('select * from tickets where hash = $1', [hash])
        if (!ticket) return
        return this.toModel(ticket)
    }

    async findAll(): Promise<Ticket[]> {
        const tickets = await this.database.query('select * from tickets', [])
        if (!tickets.length) return []
        return tickets.map(ticket => this.toModel(ticket))
    }

    async findByUser(userId: string): Promise<Ticket | undefined> {
        const [ticket] = await this.database.query('select * from tickets where user_id = $1', [userId])
        if (!ticket) return
        return this.toModel(ticket)
    }

    async edit(id: string, situation: TICKET_SITUATIONS): Promise<void> {
        await this.database.query('update tickets set situation = $1 where id = $2', [situation, id])
    }

    async delete(id: string): Promise<void> {
        await this.database.query('delete from tickets where id = $1', [id])
    }
}