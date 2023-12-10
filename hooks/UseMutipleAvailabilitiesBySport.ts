import axios from "axios";
import {useState} from "react";

export default function UseAvailabilities() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [data, setData] = useState<{ time: any }[] | null>(null)

    const findMultipleSlotsBySports = async ({ day, time, sport}: {  day: string, time: string, sport: string }) => {
        setLoading(true)
        try {
            const response =
                await axios.get(
                    `${process.env.NEXT_PUBLIC_URL}/api/pitch/multipleAvailabilityBySport`, {
                        params: {
                            day,
                            time,
                        }
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
        findMultipleSlotsBySports,
    }
}
//http://localhost:3000/api/restaurant/vivaan-fine-indian-cuisine-ottawa/availability?partySize=1&day=2023-11-21&time=15:30:00.000Z