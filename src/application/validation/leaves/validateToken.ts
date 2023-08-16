import { ApplicationError } from "../../../domain/error/application";
import { UserServiceDTO } from "../../../domain/services/user";
import { iocContainer } from "../../../presentation/ioc";
import IJwt from "../../contracts/jwt";

export default function validateToken(token: string) {
    const tokenGenerator = iocContainer.get<IJwt>('IJwt')
    const session = tokenGenerator.verify(token)

    if (!session) throw new ApplicationError('Invalid token', 400)

    return session
}