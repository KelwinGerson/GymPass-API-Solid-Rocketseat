// Import necessary modules and objects from their respective packages
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { RegisterUseCase } from "src/services/register-service";
import { PrismaUserRepository } from "src/repositories/prisma/prisma-users-repositories";
import { UserAlreadyExistsError } from "src/services/errors/user-already-exists-error";

// Define the 'register' route handler function as an asynchronous function
export async function register(request: FastifyRequest, reply: FastifyReply) {
    // Define a zod schema for input validation
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string(),
        password: z.string().min(6),
    });

    // Validate and parse the request body using the defined schema
    const { name, email, password } = registerBodySchema.parse(request.body);

    try {
        const prismaUsersRepository = new PrismaUserRepository()
        const registerUseCase = new RegisterUseCase(prismaUsersRepository)

        await registerUseCase.execute({
            name,
            email,
            password
        })
    } catch (err) {
        if (err instanceof UserAlreadyExistsError) {
            return reply.status(409).send({
                error: err.message
            })
        }

        throw err
        
        // return reply.status(500).send()
    }

    // If the registration is successful, send a 201 created status
    return reply.status(201).send();
}
