import { hash } from "bcryptjs";
import { prisma } from "src/lib/prisma";
import { FastifyRequest, FastifyReply } from "fastify";

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

    // Create a new user in the database with the provided name, email, and hashed password
    await prisma.user.create({
        data: {
            name,
            email,
            password_hash,
        },
    });
}