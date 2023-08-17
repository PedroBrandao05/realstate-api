export enum TICKET_SITUATIONS {
    OPEN = 'open',
    CLOSED = 'closed'
}

export default class Ticket {
    id!: string
    userId!: string
    situation!: TICKET_SITUATIONS
    hash!: string
}