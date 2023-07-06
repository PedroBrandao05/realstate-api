import { Owner } from "../entities/owner";

export default interface IOwnerRepository {
    findById (id: string): Promise<Owner>
    create (owner: Owner): Promise<void>
    update (owner: Owner): Promise<void>
    delete (id: string): Promise<void>
}