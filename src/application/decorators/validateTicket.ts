import { TICKET_SITUATIONS } from "../../domain/entities/ticket";
import { ApplicationError } from "../../domain/error/application";
import ITicketRepository from "../../domain/repositories/ticket";
import { iocContainer } from "../../presentation/ioc";

export default async function ValidateTicket(input: any, serviceCallback: (input: any) => Promise<any>) {
    console.log(input)
    if (input.hash) {

        const ticketRepository = iocContainer.get<ITicketRepository>('ITicketRepository')
        const ticket = await ticketRepository.findByHash(input.hash)
        if (!ticket) throw new ApplicationError("This ticket does not exist", 400)
        await ticketRepository.edit(ticket.id, TICKET_SITUATIONS.CLOSED)
    }

    return await serviceCallback(input)
}