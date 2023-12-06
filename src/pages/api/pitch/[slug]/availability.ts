import {NextApiRequest, NextApiResponse} from "next";
import {times} from "../../../../../data/times";

import {PrismaClient} from "@prisma/client";


const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    const {slug,day,time} = req.query as {slug:string,day:string,time:string}

    if (!slug  || !day || !time) {
        return res.status(400).json({
            message: 'Missing query parameters'
        })
    }
    const pitch = await prisma.pitch.findUnique({
        where: {
            slug
        },
        select: {
            open_time: true,
            close_time: true

        }
    })
    if(!pitch){
        return res.status(404).json({
            message: 'pitch not found'
        })
    }

    const searchTimes = times.find(t => t.time === time)?.searchTimes || []

    if(!searchTimes){
        return res.status(400).json({
            message: 'pitch is closed'
        })
    }



    // //number of available seats
    // const availableSeats = searchTimeTables.map(t => {
    //     const numberOfSeats =t.tables.reduce((total, table) => {
    //         return total + table.seats
    //     }, 0)
    //     return{
    //         time: t.time,
    //         seats: parseInt(partySize) <= numberOfSeats
    //     }
    // })//remove closed times
    //     .filter(t => t.time >= restaurant.open_time && t.time <= restaurant.close_time)


    return res.status(200).json(searchTimes)



}


// http://localhost:3000/api/restaurant/vivaan-fine-indian-cuisine-ottawa/availability?partySize=1&day=2023-11-21&time=15:30:00.000Z