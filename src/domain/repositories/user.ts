import { User } from "../entities/user";

export default interface IUserRepository {
    findByEmail (email: string): Promise<User | undefined>
    findById (id: string): Promise<User | undefined>
    create (user: User): Promise<void>
}