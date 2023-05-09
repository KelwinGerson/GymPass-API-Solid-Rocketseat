import { hash } from "bcryptjs";
import { prisma } from "src/lib/prisma";
import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaUserRepository } from "src/repositories/prisma-users-repositories";

interface RegisterUseCaseRequest {
    name: string;
    email: string;
    password: string
}

export async function registerUseCase({ name, email, password }: RegisterUseCaseRequest) {
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

    const prismaUsersRepository = new PrismaUserRepository

    prismaUsersRepository.create({
        name,
        email,
        password_hash
    })

}