import {NextApiRequest, NextApiResponse} from "next";
import stripe from "@/config/stripe";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if(req.method !== 'POST') {
        return res.status(400).json({
            message: 'Only POST requests allowed'
        })
    }
    const {amount} = req.body;



    const correctAmount = amount * 100;

    try {
        const charge = await stripe.charges.create({
            amount: correctAmount,
            currency: 'eur',
            source: 'tok_visa',
            description: 'My First Test Charge (created for API docs)',
            receipt_email: 'eterra1@hotmail.com',
        });
        res.status(200).json(charge)
    } catch (err) {
        console.log(err)
        return res.status(400).json({message: 'Payment error'})
    }
}