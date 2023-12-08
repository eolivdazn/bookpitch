import axios from "axios";
import {useState} from "react";
import {pitchProps} from "@/app/be/componenets/CreatePitch";

export default function UseCreatePitch() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [createPitchData, setCreatePitchData] = useState<pitchProps|null>(null)

    const createPitch = async ({props}: { props: pitchProps }) => {
        if (!props) return
        setLoading(true)
        setError(null)
        try {
            const response =
                await axios.post(
                    `${process.env.NEXT_PUBLIC_URL}/api/pitch/createPitch`, {
                        props
                    })
            setCreatePitchData(response.data)
            setLoading(false)
            setError(null)

        } catch (error: any) {
            setError(error.response.data.message)
            setLoading(false)
        }

    }
    return {
        loading,
        error,
        createPitchData,
        createPitch,
    }
}
//http://localhost:3000/api/restaurant/vivaan-fine-indian-cuisine-ottawa/availability?partySize=1&day=2023-11-21&time=15:30:00.000Z