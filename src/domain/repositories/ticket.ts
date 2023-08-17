import Ticket, { TICKET_SITUATIONS } from "../entities/ticket";

export default interface ITicketRepository {
    create (ticket: Ticket): Promise<void>
    findByHash (hash: string): Promise<Ticket | undefined>
    findAll (): Promise<Ticket[]>
    findByUser (userId: string): Promise<Ticket | undefined>
    edit (id: string, situation: TICKET_SITUATIONS): Promise<void>
    delete (id: string): Promise<void>
}