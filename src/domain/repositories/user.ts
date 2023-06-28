import { IUser } from "../entities/user";

export interface IUserRepository {
    getById (id: string) : Promise<IUser>
    create (user: IUser) : Promise<IUser>
    update (user: IUser) : Promise<void>
}