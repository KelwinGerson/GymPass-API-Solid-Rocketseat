import { prisma } from "src/lib/prisma";
import { Prisma, User } from '@prisma/client'
import { IUsersRepository } from "../users-repository";

export class PrismaUserRepository implements IUsersRepository {

    async findByEmail(email: string) {
        // Check if there is already a user with the same email in the database
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        return user
    }

    async create(data: Prisma.UserCreateInput) {
        // Create a new user in the database with the provided name, email, and hashed password
        const user = await prisma.user.create({
            data,
        });

        return user
    }
}