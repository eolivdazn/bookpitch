"use client";
import React, {useState} from "react";
import {times} from "../../../data/times";
import DatePicker from "react-datepicker";


import {CircularProgress} from "@mui/material";
import {useRouter} from "next/navigation";
import {SearchParams} from "@/app/search/page";


export default function ReservationCard2({openTime, closingTime, sports, location, searchParams}: {
    openTime: string,
    closingTime: string,
    sports: string[],
    location: string[],
    searchParams: SearchParams
}) {
    const router = useRouter()


    const [startDate, setStartDate] = useState(new Date());
    const [day, setDay] = useState(new Date().toISOString().split("T")[0]);
    const [time, setTime] = useState(openTime)
    const [changeData, setChangeData] = useState(true)
    const [optionSport, setOptionSport] = useState(searchParams.sport)
    const [optionLocation, setOptionLocation] = useState(searchParams.location)


    const loading = false
    const handleDateChange = (date: Date) => {
        if (date) {
            setDay(date.toISOString().split("T")[0])
            setStartDate(date)
            setChangeData(false)
            router.push(`/search?sport=${optionSport}&day=${day}&time=${time}&location=${optionLocation}`)
        }
    }

    const availableTimes = () => {
        return times.filter(time => {
            return time.time >= openTime && time.time <= closingTime
        })
    }

    const handleClickFindSlots = async () => {
        if (optionSport === '' || day === '' || time === '' || optionLocation === '') return;
        router.push(`/search?sport=${optionSport}&day=${day}&time=${time}&location=${optionLocation}`)
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
                                    router.push(`/search?sport=${optionSport}&day=${day}&time=${e.target.value}&location=${optionLocation}`)
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
                                    router.push(`/search?sport=${e.target.value}&day=${day}&time=${time}&location=${optionLocation}`)
                                    setOptionSport(e.target.value)

                                }
                            }
                    >
                        {sports.map((sport, index) => (
                            <option key={index} value={sport}>{sport}</option>))}
                    </select>
                </div>
                <div className="flex flex-col w-[48%]">
                    <label htmlFor="">Location</label>
                    <select name="" id="" className="bg-white py-3 border-b font-light" value={optionLocation}
                            onChange={
                                (e) => {
                                    setChangeData(false)
                                    setOptionLocation(e.target.value)
                                    router.push(`/search?sport=${optionSport}&day=${day}&time=${time}&location=${e.target.value}`)

                                }
                            }
                    >
                        {location.map((location, index) => (
                            <option key={index} value={location}>{location}</option>))}
                    </select>
                </div>
            </div>
            <div className="mt-5">
                <button
                    onClick={handleClickFindSlots}
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