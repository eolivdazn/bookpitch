import {NextApiRequest, NextApiResponse} from "next";

import {OUTDOOR, PrismaClient} from "@prisma/client";
import {pitchProps} from "@/app/be/componenets/CreatePitch";


const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {name, sport, location,
        openTime, closeTime, size,
        surface, price, outdoor} = req.body.props as pitchProps

    if (!name || sport === '' || location === '' ||
        openTime === '' || closeTime === '' || size === '' ||
        surface === '' || price === null || outdoor === null) {

        res.status(400).json({message: 'Please fill all the fields'})
    }
    const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
    const checkSlug = await prisma.pitch.findMany({where: {slug: slug}})
    if (checkSlug.length > 0) {
        res.status(400).json({message: 'Pitch name already exists'})
    }


    const locations = await prisma.location.findMany();
    const sports = await prisma.sport.findMany();
    const surfaces = await prisma.surface.findMany();
    const sizes = await prisma.size.findMany();

    const sport_id = sports.find((el) => el.name === sport )?.id as number ;
    const size_id = sizes.find((el) => el.name === size )?.id as number ;
    const surface_id = surfaces.find((el) => el.name === surface )?.id as number ;
    const location_id = locations.find((el) => el.name === location )?.id as number ;

    const outdoorData = outdoor ? OUTDOOR.YES : OUTDOOR.NO

    const data = {
        name: location,
        slug,
        open_time: openTime,
        close_time: closeTime,
        sport_id: sport_id,
        size_id: size_id,
        surface_id: surface_id,
        price: price,
        outdoor: outdoorData,
        location_id: location_id,
        main_image: "https://picsum.photos/200/300?image=2",
        images: ["https://picsum.photos/200/300?image=2", "https://picsum.photos/200/300?image=2"],
        description: "A well-maintained football pitch with synthetic turf. The pitch is located in the city center of Guimaraes.",
    }



console.log(data)
    let newPitch
    try {

        newPitch = await prisma.pitch.create({
            data: {
                name,
                slug,
                open_time: openTime,
                close_time: closeTime,
                sport_id,
                size_id,
                surface_id,
                price,
                outdoor: outdoorData,
                location_id,
                main_image: "https://picsum.photos/200/300?image=2",
                images: ["https://picsum.photos/200/300?image=2", "https://picsum.photos/200/300?image=2"],
                description: "A well-maintained football pitch with synthetic turf. The pitch is located in the city center of Guimaraes.",
            }
        })
    } catch (error: any) {
        res.status(400).json({message: error.message})
    }finally {
        await prisma.$disconnect()
        res.status(200).json(newPitch)
    }

}


// http://localhost:3000/api/restaurant/vivaan-fine-indian-cuisine-ottawa/availability?partySize=1&day=2023-11-21&time=15:30:00.000Z