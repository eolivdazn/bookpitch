import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();
export const fetchByLocation = async (): Promise<string[]> => {
    const locations = await prisma.location.findMany({
        select: {
            name: true
        }
    })
    return locations.map((location) => location.name)

}