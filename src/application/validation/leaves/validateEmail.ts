import { ApplicationError } from "../../../domain/error/application";

export default function validateEmail(email: string){
    const regExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regExp.test(email)) throw new ApplicationError("Invalid email", 409)
}