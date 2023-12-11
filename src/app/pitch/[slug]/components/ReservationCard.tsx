"use client";
import React, { useState} from "react";
import {times} from "../../../../../data/times";
import DatePicker from "react-datepicker";


import {CircularProgress} from "@mui/material";
import Link from "next/link";
import UseAvailabilities from "../../../../../hooks/UseAvailabilities";


export default function ReservationCard({openTime,closingTime,slug}: { openTime: string, closingTime: string, slug: string }) {
    const [startDate, setStartDate] = useState(new Date());
    const [day, setDay] = useState(new Date().toISOString().split("T")[0]);
    const [time, setTime] = useState(openTime)
    const [changeData, setChangeData] = useState(true)

    const {findSlot,loading,error,data} = UseAvailabilities()

    const handleDateChange = (date: Date) => {
        if (date) {
            setDay(date.toISOString().split("T")[0])
            setStartDate(date)
            setChangeData(false)
        }
    }

    const availableTimes = () =>{
        return times.filter(time =>   {
            return time.time >= openTime && time.time <= closingTime
        })
    }

    const handleClick = async () => {
        await findSlot({
            day,
            slug,
            time
        })
        setChangeData(true)
    }


    return (
        <div className="lg:fixed lg:w-[15%] bg-white rounded p-3 shadow">
            <div className="text-center border-b pb-2 font-bold">
                <h4 className="text-black mr-7 text-lg">Make a Reservation</h4>
            </div>
            <div className="flex justify-between">
                <div className="flex flex-col w-[48%]">
                    <label htmlFor="">Date</label>
                    <DatePicker
                        selected={startDate}
                        onChange={handleDateChange}
                        className={"bg-white py-3 border-b font-light w-24"}
                        dateFormat="MMMM dd"

                    />
                </div>
                <div className="flex flex-col w-[48%]">
                    <label htmlFor="">Time</label>
                    <select name="" id="" className="bg-white py-3 border-b font-light" value={time}
                            onChange={
                                (e) => {
                                    setTime(e.target.value);
                                    setChangeData(false)
                                }
                            }

                    >
                        {availableTimes().map((time, index) => (
                            <option key={index} value={time.time}>{time.displayTime}</option>))}
                    </select>
                </div>
            </div>
            <div className="mt-5">
                <button
                    onClick={handleClick}
                    // disabled={loading}
                    className="bg-red-600 rounded w-full lg:px-4 text-white font-bold lg:h-16 h-10"
                >
                    {loading ?
                        <CircularProgress className="text-white"/> :
                        <>Find a free slot</>
                     }
                </button>
            </div>
            {data && changeData ? <div className="text-center  font-bold">
                <h4 className="text-black mr-2 text-lg border-b">Available times</h4>
                <div  className="bg-white py-3 font-light text-white flex flex-wrap">
                    {data.map(( slot:any  , index:any) => (
                        slot.available ?
                            (<Link
                                className=" bg-red-600 rounded cursor-pointer  p-2 w-24 text-white mr-3 mb-3 disabled"
                                key={index}
                                href={`reserve/${slug}?&day=${day}&time=${time}`}
                            >
                                {times.find(x => x.time === slot.time)?.displayTime}
                            </Link>)
                            :   (<p className="bg-gray-300 p-2 w-24 mb-3 rounded mr-3">{times.find(x => x.time === slot.time)?.displayTime}</p>)
                    ))}
                </div>
            </div>: null}
        </div>

    );
}