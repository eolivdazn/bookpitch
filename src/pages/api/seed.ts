// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {PrismaClient, OUTDOOR} from "@prisma/client";
const prisma = new PrismaClient();
type Data = {
    name: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    await prisma.pitch.deleteMany();
    await prisma.location.deleteMany();
    await prisma.sport.deleteMany();
    await prisma.surface.deleteMany();
    await prisma.size.deleteMany();

    await prisma.location.createMany({
        data: [{ name: "Guimaraes" }, { name: "Braga" }, { name: "Fafe" }],
    });

    await prisma.surface.createMany({
        data: [{ name: "Synthetic Turf" }, { name: "Concrete" }, { name: "wood" }],
    });

    await prisma.sport.createMany({
        data: [{ name: "football" }, { name: "paddle" }, { name: "volleyball" }],
    });

    await prisma.size.createMany({
        data: [{ name: "5 vs 5" }, { name: "2 vs 2" }, { name: "7 vs 7" }, { name: "11 vs 11" }],
    });

    const locations = await prisma.location.findMany();
    const sports = await prisma.sport.findMany();
    const surfaces = await prisma.surface.findMany();
    const sizes = await prisma.size.findMany();

    const footballSportId =
        sports.find((sport) => sport.name === "football")?.id || 1;
    const paddleSportId =
        sports.find((sport) => sport.name === "paddle")?.id || 1;
    const volleyballSportsId =
        sports.find((sport) => sport.name === "volleyball")?.id || 1;

    const guimaraesLocationId =
        locations.find((location) => location.name === "Guimaraes")?.id || 1;
    const bragaLocationId =
        locations.find((location) => location.name === "Braga")?.id || 1;
    const fafeLocationId =
        locations.find((location) => location.name === "Fafe")?.id || 1;

    const syntheticId =
        surfaces.find((surface) => surface.name === "Synthetic Turf")?.id || 1;
    const woodId =
        surfaces.find((surface) => surface.name === "wood")?.id || 1;

    const fiveSizeId =
        sizes.find((size) => size.name === "5 vs 5")?.id || 1;
    const sevenSizeId =
        sizes.find((size) => size.name === "7 vs 7")?.id || 1;


    await prisma.pitch.createMany({
        data: [
            // SARC //
            {
                name: "SARC - simple the best",
                main_image:
                    "https://picsum.photos/200/300?image=1",
                price: 40,
                description:
                    "A well-maintained football pitch with synthetic turf. The pitch is located in the city center of Guimaraes.",
                images: [
                    "https://picsum.photos/200/300?image=2",
                    "https://picsum.photos/200/300?image=3",
                ],
                open_time: "12:30:00.000Z",
                close_time: "23:30:00.000Z",
                slug: "sarc-simple-the-best",
                location_id: guimaraesLocationId,
                sport_id: footballSportId,
                surface_id: syntheticId,
                size_id: sevenSizeId,
                outdoor: OUTDOOR.YES,
            },
            {
                name: "braga - volleyball",
                main_image:
                    "https://picsum.photos/200/300?image=4",
                price: 45,
                description:
                    "Great to play your fav sport game",
                images: [
                    "https://picsum.photos/200/300?image=5",
                    "https://picsum.photos/200/300?image=6",
                ],
                open_time: "08:30:00.000Z",
                close_time: "23:30:00.000Z",
                slug: "braga-volley-ball",
                location_id: bragaLocationId,
                sport_id: volleyballSportsId,
                surface_id: woodId,
                size_id: fiveSizeId,
                outdoor: OUTDOOR.NO,
            },
            {
                name: "Fafe - footy",
                main_image:
                    "https://picsum.photos/200/300?image=7",
                price: 35,
                description:
                    "Com fafe ningúem fanfe",
                images: [
                    "https://picsum.photos/200/300?image=8",
                    "https://picsum.photos/200/300?image=9",
                ],
                open_time: "08:30:00.000Z",
                close_time: "14:30:00.000Z",
                slug: "fafe-footy",
                location_id: fafeLocationId,
                sport_id: footballSportId,
                surface_id: syntheticId,
                size_id: fiveSizeId,
                outdoor: OUTDOOR.YES,
            }
        ],
    });


    res.status(200).json({ name: "hello" });
}