"use client";
import * as React from "react";
import useReserve from "../../../../../../hooks/UseReserve";
import {CircularProgress} from "@mui/material";
import {useEffect} from "react";
import Link from "next/link";

export default function Form({slug, day, time, name}: { slug: string, day: string, time: string, name: string }) {

    const {reservePitch, data, loading, error} = useReserve()
    const [didBook, setDidBook] = React.useState(false)

    const [inputs, setInputs] = React.useState({
        bookerEmail: "",
        bookerLastName: "",
        bookerFirstName: "",
        bookerPhone: "",
        bookerOccasion: "",
        bookerRequest: "",
    })

    const [disabled, setDisabled] = React.useState(true)//modal button
    useEffect(() => {
        if (
            inputs.bookerEmail &&
            inputs.bookerLastName &&
            inputs.bookerFirstName &&
            inputs.bookerPhone) {
            return setDisabled(false)
        }


    }, [inputs])



    const handleClick = async () => {
        await reservePitch({
            slug,
            day,
            time,
            bookerEmail: inputs.bookerEmail,
            bookerLastName: inputs.bookerLastName,
            bookerFirstName: inputs.bookerFirstName,
            bookerPhone: inputs.bookerPhone,
            bookerOccasion: inputs.bookerOccasion,
            bookerRequest: inputs.bookerRequest,
        })
        setDidBook(true)
    }
    return (

        <>
            <div className="lg:mt-10 mt:4 flex lg:flex-wrap justify-center lg:w-[660px]">
                {!didBook ? <h3 className="font-bold ">you're almost done!</h3>  : <button className="bg-red-600 text-white rounded-2xl shadow p-4 mb-4">Congrats book done</button>}
            </div>
            {data ? (
                    <>
                        <h2 className="font-bold capitalize">Confirmation details</h2>
                        <div className="lg:mt-4 mt-2 shadow p-2 lg:flex flex-wrap justify-between lg:w-[660px]">
                            <ul>
                                <li className="capitalize">Restaurant: {name}</li>
                                <li className="capitalize">Date: {data.booking.booking_time}</li>
                                <li className="capitalize">Name: {data.booking.booker_first_name} {data.booking.booker_last_name}</li>
                                <li className="">Email: {data.booking.booker_email}</li>
                                <li className="capitalize">Phone: {data.booking.booker_phone}</li>
                            </ul>
                        </div>
                        <Link href="/" className=" lg:w-[660px] border flex mt-8 justify-center p-4 px-4 rounded mr-3 bg-blue-400 text-white"> OpenTable </Link>

                    </>

                )
                : null}
            <div className="lg:mt-10 sm:mt-4 flex flex-wrap justify-between lg:w-[660px]">
                { didBook ? null :
                    (
                        <>
                            <input
                                type="text"
                                className="bg-white  border rounded p-3 w-80 mb-4"
                                placeholder="First name"
                                value={inputs.bookerFirstName}
                                onChange={ (e) => {setInputs({...inputs, bookerFirstName: e.target.value})}}
                            />
                            <input
                                type="text"
                                className="bg-white  border rounded p-3 w-80 mb-4"
                                placeholder="Last name"
                                value={inputs.bookerLastName}
                                onChange={ (e) => {setInputs({...inputs, bookerLastName: e.target.value})}}
                            />
                            <input
                                type="text"
                                className="bg-white  border rounded p-3 w-80 mb-4"
                                placeholder="Phone number"
                                value={inputs.bookerPhone}
                                onChange={ (e) => {setInputs({...inputs, bookerPhone: e.target.value})}}
                            />
                            <input
                                type="text"
                                className="bg-white  border rounded p-3 w-80 mb-4"
                                placeholder="Email"
                                value={inputs.bookerEmail}
                                onChange={ (e) => {setInputs({...inputs, bookerEmail: e.target.value})}}
                            />
                            <input
                                type="text"
                                className="bg-white  border rounded p-3 w-80 mb-4"
                                placeholder="Occasion (optional)"
                                value={inputs.bookerOccasion}
                                onChange={ (e) => {setInputs({...inputs, bookerOccasion: e.target.value})}}
                            />
                            <input
                                type="text"
                                className="bg-white mt-8  border rounded p-3 w-80 mb-4"
                                placeholder="Requests (optional)"
                                value={inputs.bookerRequest}
                                onChange={ (e) => {setInputs({...inputs, bookerRequest: e.target.value})}}
                            />
                            <button
                                className="bg-red-600 w-full p-3 text-white font-bold rounded disabled:bg-gray-400"
                                onClick={handleClick}
                                disabled={disabled}
                            >
                                {loading ? (
                                    <CircularProgress color="inherit" />
                                ) : (
                                    "Complete reservation"
                                )}
                            </button>
                            <p className="mt-4 text-sm">
                                By clicking “Complete reservation” you agree to the OpenTable Terms
                                of Use and Privacy Policy. Standard text message rates may apply.
                                You may opt out of receiving text messages at any time.
                            </p>
                        </>

                    )}
            </div>
        </>
    );
}