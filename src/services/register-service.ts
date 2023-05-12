import { hash } from "bcryptjs";
import { prisma } from "src/lib/prisma";
import { IUsersRepository } from "src/repositories/users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

interface RegisterUseCaseRequest {
    name: string;
    email: string;
    password: string
}

// Dependency Inversion Principle - Unlike of intance dependecy, we will receive 
export class RegisterUseCase {

    constructor(private usersReporsitory: IUsersRepository) { }

    async execute({ name, email, password }: RegisterUseCaseRequest) {
        // Hash the password using bcryptjs
        const password_hash = await hash(password, 6);

        const userWithSameEmail = await this.usersReporsitory.findByEmail(email)

        // If a user with the same email exists, send a 409 conflict status and exit the function
        if (userWithSameEmail) {
            throw new UserAlreadyExistsError
        }

        await this.usersReporsitory.create({
            name,
            email,
            password_hash
        })

    }
}