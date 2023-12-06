"use client";
import React, { useState} from "react";
import {times} from "../../../data/times";
import DatePicker from "react-datepicker";


import {CircularProgress} from "@mui/material";
import Link from "next/link";
// import UseMutipleAvailabilities from "../../../hooks/UseMutipleAvailabilitiesBySport";
import {useRouter} from "next/navigation";



export default function ReservationCard2({openTime,closingTime, sports}: { openTime: string, closingTime: string, sports: {name: string}[] }) {
    const router = useRouter()

    const [startDate, setStartDate] = useState(new Date());
    const [day, setDay] = useState(new Date().toISOString().split("T")[0]);
    const [time, setTime] = useState(openTime)
    const [changeData, setChangeData] = useState(true)
    const [optionSport, setOptionSport] = useState(sports[0].name)

    // const {findMultipleSlotsBySports,loading,error,data} = UseMutipleAvailabilities()
    const loading = false
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

    const handleClickFindMultipleSports = async () => {
        // await findMultipleSlotsBySports({
        //     day,
        //     time,
        //     sport: optionSport
        // })
        if (optionSport === '' || day === '' || time === '') return;
        router.push(`/search?sport=${optionSport}&day=${day}&time=${time}`)
        setChangeData(true)
    }


    return (
        <div className=" bg-white rounded p-3 shadow">
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
                <div className="flex flex-col w-[48%]">
                    <label htmlFor="">Sport</label>
                    <select name="" id="" className="bg-white py-3 border-b font-light" value={optionSport}
                            onChange={
                                (e) => {
                                    setChangeData(false)
                                    setOptionSport(e.target.value)

                                }
                            }
                    >
                        {sports.map((sport, index) => (
                            <option key={index} value={sport.name}>{sport.name}</option>))}
                    </select>
                </div>
            </div>
            <div className="mt-5">
                <button
                    onClick={handleClickFindMultipleSports}
                    // disabled={loading}
                    className="bg-red-600 rounded w-full lg:px-4 text-white font-bold lg:h-16 h-10"
                >
                    {loading ?
                        <CircularProgress className="text-white"/> :
                        <>Find a free slot</>
                     }
                </button>
            </div>
        </div>

    );
}