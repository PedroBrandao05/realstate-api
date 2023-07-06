import { User } from "../entities/user";

export default interface IUserRepository {
    findByEmail (email: string): Promise<User | null>
    create (user: User): Promise<void>
}