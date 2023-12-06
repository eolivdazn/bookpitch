import {NextApiRequest, NextApiResponse} from "next";
import {times} from "../../../../data/times";

import {PrismaClient} from "@prisma/client";


const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    const {sport,day,time} = req.query as {sport:string,day:string,time:string}

    if (!sport  || !day || !time) {
        return res.status(400).json({
            message: 'Missing query parameters'
        })
    }
    const pitches = await prisma.pitch.findMany({
        where: {
            sport: {    name: sport}
        },
        select: {
            name: true,
            open_time: true,
            close_time: true

        }
    })
    if(!pitches){
        return res.status(404).json({
            message: 'pitch not found'
        })
    }

    const openPitches = pitches.filter(pitch => {
       return (pitch.open_time < time && pitch.close_time > time);
    })



    return res.status(200).json(openPitches)



}
// {
//         "name": "SARC - simple the best",
//         "open_time": "12:30:00.000Z",
//         "close_time": "23:30:00.000Z"
//     },
//     {
//         "name": "Fafe - footy",
//         "open_time": "08:30:00.000Z",
//         "close_time": "14:30:00.000Z"
//     }
// ]


// http://localhost:3000/api/restaurant/vivaan-fine-indian-cuisine-ottawa/availability?partySize=1&day=2023-11-21&time=15:30:00.000Z