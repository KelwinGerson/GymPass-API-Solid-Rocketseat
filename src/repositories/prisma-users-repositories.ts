import { prisma } from "src/lib/prisma";
import { Prisma } from '@prisma/client'

export class PrismaUserRepository {
    
    async create(data: Prisma.UserCreateInput) {
        // Create a new user in the database with the provided name, email, and hashed password
        const user = await prisma.user.create({
            data,
        });

        return user
    }
}