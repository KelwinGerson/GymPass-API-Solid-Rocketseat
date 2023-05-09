import { hash } from "bcryptjs";
import { prisma } from "src/lib/prisma";

interface RegisterUseCaseRequest {
    name: string;
    email: string;
    password: string
}

// Dependency Inversion Principle - Unlike of intance dependecy, we will receive 

export class RegisterUseCase {

    constructor(private usersReporsitory: any) { }

    async execute({ name, email, password }: RegisterUseCaseRequest) {
        // Hash the password using bcryptjs
        const password_hash = await hash(password, 6);

        // Check if there is already a user with the same email in the database
        const userWithSameEmail = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        // If a user with the same email exists, send a 409 conflict status and exit the function
        if (userWithSameEmail) {
            throw Error('Email already exists!')
        }

        // const prismaUsersRepository = new PrismaUserRepository

        await this.usersReporsitory.create({
            name,
            email,
            password_hash
        })

    }
}