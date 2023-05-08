// Import necessary modules and objects from their respective packages
import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "src/lib/prisma";
import { z } from "zod";
import { hash } from "bcryptjs";

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
        return reply.status(409).send();
    }

    // Create a new user in the database with the provided name, email, and hashed password
    await prisma.user.create({
        data: {
            name,
            email,
            password_hash,
        },
    });

    // If the registration is successful, send a 201 created status
    return reply.status(201).send();
}
