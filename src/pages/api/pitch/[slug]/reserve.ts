import {NextApiRequest, NextApiResponse} from "next";

import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method == 'POST') {
        const {slug, day, time} = req.query as { slug: string, day: string, time: string }
        if (!slug  || !day || !time) {
            return res.status(400).json({
                message: 'Missing query parameters'
            })
        }

        const {bookerEmail,bookerLastName, bookerFirstName, bookerPhone } = req.body

        if (!bookerEmail || !bookerFirstName || !bookerPhone  || !bookerLastName) {
            return res.status(400).json({
                message: 'Missing body parameters'
            })
        }

        const pitch = await prisma.pitch.findUnique({
            where: {
                slug
            },
            select: {
                open_time: true,
                close_time: true,
                id: true
            }
        })
        if (!pitch) {
            return res.status(404).json({
                message: 'Restaurant not found'
            })
        }
        if (!(new Date(`${day}T${time}`) >= new Date(`${day}T${pitch.open_time}`) &&
            new Date(`${day}T${time}`) <= new Date(`${day}T${pitch.close_time}`))) {
            return res.status(400).json({
                message: 'Restaurant is closed'
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
                message: 'Pitch not found'
            })
        }

        const slotsIsAvailable = await prisma.booking.findMany({
            where:{
                booking_time: {
                    equals: new Date(`${day}T${time}`).toISOString()
                },
                pitch_id:{
                    equals: pitchId.id
                }
            }
        })

        console.log(slotsIsAvailable,"slotsIsAvailable")

        if (slotsIsAvailable.length > 0) {
            return res.status(400).json({
                message: 'Pitch time is not available'
            })
        }

        const booking = await prisma.booking.create({
            data: {
                pitch_id: pitch.id,
                booker_email: bookerEmail,
                booker_first_name: bookerFirstName,
                booker_last_name: bookerLastName,
                booker_phone: bookerPhone,
                number_of_people: 1,
                booking_time: new Date(`${day}T${time}`),
                booker_occasion: "test",
                booker_request: "test",

            }
        })
        if (!booking) {
            return res.status(400).json({
                message: 'Booking failed'
            })
        }

        return res.status(200).json({
            booking: booking,
            pitch: slug
        })
    }



}
//http://localhost:3000/api/restaurnt/vivaan-fine-indian-cuisine-ottawa/reserve?partySize=1&day=2023-11-21&time=15:30:00.000Z
//http://localhost:3000/api/restaurant/vivaan-fine-indian-cuisine-ottawa/reserve?partySize=1&day=2023-11-21&time=15:30:00.000Z