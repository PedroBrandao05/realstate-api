import { ApplicationError } from "../../domain/error/application";
import { iocContainer } from "../../presentation/ioc";
import IJwt from "../contracts/jwt";

export default async function ValidateToken(input: any, serviceCallback: (input: any) => Promise<any>) {
    if (!input.token) throw new ApplicationError ("This actions requires an authorization token", 400)
    const tokenGenerator = iocContainer.get<IJwt>('IJwt')
    const session = tokenGenerator.verify(input.token)
    if (!session) throw new ApplicationError('Invalid token', 400)
    return await serviceCallback(input)
}