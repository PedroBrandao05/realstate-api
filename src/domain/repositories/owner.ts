import { IOwner } from "../entities/owner";

export interface IOwnerRepository{
    get () : Promise<IOwner[]>
    getById (id: string) : Promise<IOwner>
    update (owner: IOwner) : Promise<IOwner>
    delete (owner: IOwner) : Promise<void>
    create (owner: IOwner) : Promise<IOwner>
}