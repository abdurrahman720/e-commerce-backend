import { PrismaClient } from "@prisma/client";


const prisma =  new PrismaClient();

// if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default prisma;