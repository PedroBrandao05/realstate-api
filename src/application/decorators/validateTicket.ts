import { TICKET_SITUATIONS } from "../../domain/entities/ticket";
import { ApplicationError } from "../../domain/error/application";
import ITicketRepository from "../../domain/repositories/ticket";
import { iocContainer } from "../../presentation/ioc";
import { Usecase } from "../contracts/usecase";

export default async function ValidateTicket(input: any, serviceCallback: Usecase) {
    if (input.hash) {
        const ticketRepository = iocContainer.get<ITicketRepository>('ITicketRepository')
        const ticket = await ticketRepository.findByHash(input.hash)
        if (!ticket) throw new ApplicationError("This ticket does not exist", 400)
        await ticketRepository.edit(ticket.id, TICKET_SITUATIONS.CLOSED)
    }

    return await serviceCallback(input)
}