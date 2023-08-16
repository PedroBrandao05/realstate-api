import Sinon from "sinon";
import validateEmail from "../../src/application/validation/leaves/validateEmail";
import { ApplicationError } from "../../src/domain/error/application";

it("should throw an error", () => {
    const email = 'somewrongemail.com'
    expect(() => validateEmail(email)).toThrow(new ApplicationError("Invalid email", 409))
})