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

    if (!searchParams.location){
        searchParams.location = location[0]
    }
    if (!searchParams.sport){
        searchParams.sport = sports[0]
    }




    const [startDate, setStartDate] = useState(new Date());
    const [day, setDay] = useState(new Date().toISOString().split("T")[0]);
    const [time, setTime] = useState(openTime)
    const [optionSport, setOptionSport] = useState(searchParams.sport ? searchParams.sport : sports[0])
    const [optionLocation, setOptionLocation] = useState(searchParams.location ? searchParams.location : 'Guimaraes')
    if (searchParams.location !== optionLocation){
        setOptionLocation(searchParams.location? searchParams.location : 'Guimaraes')
    }
    if (searchParams.sport !== optionSport){
        setOptionSport(searchParams.sport)
    }

    const loading = false
    const handleDateChange = (date: Date) => {
        if (date) {
            setDay(date.toISOString().split("T")[0])
            setStartDate(date)
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
    }


    return (
        <div className=" bg-white rounded p-3 shadow">
            <div className="text-center border-b pb-2 font-bold">
                <h4 className="text-black mr-7 text-lg">Make a Reservation</h4>
            </div>
            <div className="flex flex-wrap justify-between">
                <div className="flex flex-col lg:w-[25%] w-[50%] border-b">
                    <label htmlFor="">Date</label>
                    <DatePicker
                        selected={startDate}
                        onChange={handleDateChange}
                        className={"bg-white py-3  font-light w-24"}
                        dateFormat="MMMM dd"
                    />
                </div>
                <div className="flex flex-col lg:w-[25%] w-[50%] border-b">
                    <label htmlFor="">Time</label>
                    <select name="" id="select_time" className="bg-white py-3  font-light" value={time}
                            onChange={
                                (e) => {
                                    setTime(e.target.value);
                                    setOptionLocation(optionLocation)
                                    setOptionSport(optionSport)
                                    router.push(`/search?sport=${optionSport}&day=${day}&time=${e.target.value}&location=${optionLocation}`)
                                }
                            }
                    >
                        {availableTimes().map((time, index) => (
                            <option key={index} value={time.time}>{time.displayTime}</option>))}
                    </select>
                </div>
            {/*</div>*/}
            {/*<div className="flex justify-between">*/}
                <div className="flex flex-col lg:w-[25%] w-[50%] border-b">
                    <label htmlFor="">Sport</label>
                    <select name="" id="select_sport" className="bg-white py-3  font-light" value={optionSport}
                            onChange={
                                (e) => {
                                    setOptionSport(e.target.value)
                                    router.push(`/search?sport=${e.target.value}&day=${day}&time=${time}&location=${optionLocation}`)
                                }
                            }
                    >
                        {sports.map((sport, index) => (
                            <option key={index} value={sport}>{sport}</option>))}
                    </select>
                </div>
                <div className="flex flex-col lg:w-[25%] w-[50%] border-b">
                    <label htmlFor="">Location</label>
                    <select name="" id="select_location" className="bg-white py-3  font-light" value={optionLocation}
                            onChange={
                                (e) => {
                                    setOptionLocation(e.target.value)
                                    router.push(`/search?sport=${optionSport}&day=${day}&time=${time}&location=${e.target.value}`)}}>
                        {location.map((location, index) => (
                            <option key={index} value={location}>{location}</option>))}
                    </select>
                </div>
            </div>

            <div className="justify-center flex flex-col items-center">
                <button id="btn_find_slots"
                    onClick={handleClickFindSlots}
                    // disabled={loading}
                    className="mt-2 bg-red-600 rounded w-[80%] lg:px-3 text-white font-bold lg:h-12 h-8"
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