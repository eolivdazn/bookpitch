import MenuNavBar from "@/app/be/componenets/MenuNavBar";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();
const fetchByLocation = async (): Promise<string[]> => {
    const locations = await prisma.location.findMany({
        select: {
            name: true
        }
    })
    return locations.map((location) => location.name)

}
const fetchBySports = async (): Promise<string[]> => {
    const sports = await prisma.sport.findMany({
        select: {
            name: true
        }
    })
    return sports.map((sport) => sport.name)
}

const fetchBySurface = async (): Promise<string[]> => {
    const surfaces = await prisma.surface.findMany({
        select: {
            name: true
        }
    })
    return surfaces.map((surface) => surface.name)
}
const fetchBySize = async (): Promise<string[]> => {
    const sizes = await prisma.size.findMany({
        select: {
            name: true
        }
    })
    return sizes.map((size) => size.name)
}

export default async function Page() {
    const locations = await fetchByLocation();
    const sports = await fetchBySports();
    const surfaces = await fetchBySurface();
    const sizes = await fetchBySize();
    return (
        <div>
        <MenuNavBar data={{
            sport: sports,
            location: locations,
            surface: surfaces,
            size: sizes
        }}   />
        </div>
    );
}
