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

    const availableSlots = searchTimes.filter(time => {
        return (pitch.open_time <= time && pitch.close_time >= time);
    })
    if(!availableSlots){
        return res.status(400).json({
            message: 'pitch is closed'
        })
    }

    const pitchId = await prisma.pitch.findUnique({
        where: {
            slug
        },
        select: {
            id: true
        }
    })
    if (!pitchId){
        return res.status(404).json({
            message: 'pitch not found'
        })
    }


    const bookingsTimes = await prisma.booking.findMany({
        where: {
            booking_time: {
                gt:  new Date(`${day}T00:00:00.000Z`).toISOString(),
                lte:  new Date(`${day}T23:00:00.000Z`).toISOString(),

            },
            pitch_id: {
                equals: pitchId.id
            },
        },
        select: {
            booking_time: true
        }

    }).then((bookings) => bookings.map((booking) => booking.booking_time.toISOString().split('T')[1]))

const result =  availableSlots.map((slot) =>
    !bookingsTimes.includes(slot))
    .map((available, index) => ({time: availableSlots[index], available}))
    return res.status(200).json(result)}


// http://localhost:3000/api/restaurant/vivaan-fine-indian-cuisine-ottawa/availability?partySize=1&day=2023-11-21&time=15:30:00.000Z