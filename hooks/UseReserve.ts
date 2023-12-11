import axios from "axios";
import {useState} from "react";

export default function useReserve() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [data, setData] = useState<{
        booking: {
            booker_email: string,
            id: string,
            booker_first_name: string,
            booker_last_name: string,
            booker_phone: string,
            booking_time: string
        }
    } | null>(null)

    const reservePitch = async ({
                                    slug,
                                    day,
                                    time,
                                    bookerEmail,
                                    bookerLastName,
                                    bookerFirstName,
                                    bookerPhone,
                                    bookerOccasion,
                                    bookerRequest
                                }:
                                    {
                                        slug: string,
                                        day: string,
                                        time: string,
                                        bookerEmail: string,
                                        bookerLastName: string,
                                        bookerFirstName: string,
                                        bookerPhone: string,
                                        bookerOccasion?: string,
                                        bookerRequest?: string
                                    }) => {
        setLoading(true)
        try {
            const response =
                await axios.post(
                    `${process.env.NEXT_PUBLIC_URL}/api/pitch/${slug}/reserve?&day=${day}&time=${time}`, {
                        bookerEmail,
                        bookerLastName,
                        bookerFirstName,
                        bookerPhone,
                        bookerOccasion,
                        bookerRequest,
                    })
            setData(response.data)
            setLoading(false)

        } catch (error: any) {
            setError(error.response.data.message)
            setLoading(false)

        }

    }
    return {
        loading,
        error,
        data,
        reservePitch
    }
}
//http://localhost:3000/api/restaurant/vivaan-fine-indian-cuisine-ottawa/availability?partySize=1&day=2023-11-21&time=15:30:00.000Z