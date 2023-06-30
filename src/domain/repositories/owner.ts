import { Owner } from "../entities/owner";

export default interface IOwnerRepository {
    findByEmail (email: string): Promise<Owner>
    create (owner: Owner): Promise<Owner>
    update (owner: Owner): Promise<Owner>
    delete (id: string): Promise<void>
}