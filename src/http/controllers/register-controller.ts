// Import necessary modules and objects from their respective packages
import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "src/lib/prisma";
import { z } from "zod";
import { hash } from "bcryptjs";
import { registerUseCase } from "src/services/register-service";

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
        await registerUseCase({
            name,
            email,
            password
        })
    } catch (error) {
        return reply.status(409).send({
            message: error
        })
    }

    // If the registration is successful, send a 201 created status
    return reply.status(201).send();
}
