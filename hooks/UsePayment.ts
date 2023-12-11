import axios from "axios";
import {useState} from "react";
import Stripe from "stripe";

export default function usePayment() {
    const [loadingPay, setLoadingPay] = useState(false)
    const [errorPay, setErrorPay] = useState(null)
    const [dataPay, setDataPay] = useState<Stripe.Charge>()

    const payment = async ({
                               amount
                           }:
                               {
                                   amount: number,
                               }) => {
        setLoadingPay(true)
        try {
            const response =
                await axios.post(
                    `${process.env.NEXT_PUBLIC_URL}/api/pitch/payment`, {
                        amount,
                    })
            setDataPay(response.data)
            setLoadingPay(false)

        } catch (error: any) {
            setErrorPay(error.response.data.message)
            setLoadingPay(false)

        }

    }
    return {
        loadingPay,
        errorPay,
        dataPay,
        payment
    }
}
//http://localhost:3000/api/restaurant/vivaan-fine-indian-cuisine-ottawa/availability?partySize=1&day=2023-11-21&time=15:30:00.000Z